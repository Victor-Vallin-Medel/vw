<?php

use Classes\Auth;

$app->get('', function($req, $res, $args){
    return $res->getBody()->write("Ya entraron putos :v");
});

$app->group('/usuarios', function() use ($db){

    $this->get('', function($req, $res, $args) use ($db){
        $res->withStatus(200);
        return $res->getBody()->write( 
            json_encode( $db->query("SELECT u.idusuario, u.nombre, u.apPat, u.apMat, u.email, u.direcciones_iddirecciones, u.roles_idroles, d.calle, d.colonia, d.cp, c.nombre as ciudad FROM usuario u, direcciones d, ciudades c WHERE u.direcciones_iddirecciones = d.iddirecciones AND c.idciudades = d.ciudades_idciudades")->fetchAll() )
        );
    });

    
    $this->get('/{id}',function($req, $res, $args) use ($db){
        $id = $args['id'];
        $result = $db->query("SELECT u.idusuario, u.nombre, u.apPat, u.apMat, u.email, u.direcciones_iddirecciones, u.roles_idroles, d.calle, d.colonia, d.cp, c.nombre as ciudad FROM usuario u, direcciones d, ciudades c WHERE u.direcciones_iddirecciones = d.iddirecciones AND c.idciudades = d.ciudades_idciudades AND idusuario = $id");

        //If user doesn't exists
        if($result->numRows()==0){
            $res->getBody()->write(
                json_encode(array(
                    "error" => "No existe el usuario"
                ))
            );
            return $res->withStatus(400);
        }

        $user = $result->fetchArray();
        $res->withStatus(200);
        return $res->getBody()->write( 
            json_encode( $user )
        );
    });

    $this->post('',function($req, $res, $args) use ($db){
        $data = $req->getParsedBody();
        $columns = array( 'nombre', 'apPat', 'apMat', 'email', 'password', 'roles_idroles', 'calle', 'colonia', 'cp', 'ciudades_idciudades' );
        //Check if information is complete
        foreach($columns as $column){
            if( !array_key_exists($column, $data) ){
                $res->getBody()->write(
                    json_encode(
                        array(
                            "error" => "No se ha podido insertar el usuario ya que falta el campo $column"
                        )
                    )
                );
                return $res->withStatus(400);
            }
        }

        $direccion = array(
            $req->getParam('calle'),
            $req->getParam('cp'),
            $req->getParam('colonia'),
            $req->getParam('ciudades_idciudades')
        );

        //Insert direccion
        $result = $db->query("INSERT INTO direcciones (calle,cp,colonia,ciudades_idciudades) VALUES (?,?,?,?)",$direccion);
        if($result->affectedRows() != 1){
            $res->getBody()->write(
                json_encode(
                    array(
                        "error" => "Hubo un error insertando la dirección, probablemente la ciudad no existe"
                    )
                )
            );
            return $res->withStatus(400);
        }

        $direcciones_iddirecciones = $result->getInsertedId();

        //Check if username exists
        $password = password_hash($data['password'], PASSWORD_DEFAULT);
        $user = array( $data['nombre'], $data['apPat'], $data['apMat'], $data['email'], $password, $direcciones_iddirecciones, $data['roles_idroles']);

        $result = $db->query("INSERT INTO usuario (nombre, apPat, apMat, email, password, direcciones_iddirecciones, roles_idroles) VALUES (?,?,?,?,?,?,?)", $user);
        if($result->affectedRows() != 1){
            $res->getBody()->write(
                json_encode(
                    array(
                        "error" => "Ocurrio un error inesperado, puede que el nombre de email ya este en uso"
                    )
                )
            );
            return $res->withStatus(400);
        }

        $user_id = $result->getInsertedId();

        $ciudad = $db->query("SELECT nombre FROM ciudades WHERE idciudades = ?",$data['ciudades_idciudades'])->fetchArray()['nombre'];

        //Generate JWT
        $jwt = Auth::SignIn(array(
            "idusuario" => $user_id,
            "email" => $data['email'],
            "nombre" => $data['nombre'],
            "apPat" => $data['apPat'],
            "apMat" => $data['apMat'],
            "direcciones_iddirecciones" => $direcciones_iddirecciones,
            "calle" => $data['calle'],
            "colonia" => $data['colonia'],
            "cp" => $data['cp'],
            "ciudad" => $ciudad,
            "roles_idroles" => $data['roles_idroles']
        ));

        $response = array(
            'jwt' => $jwt
        );
        $res->getBody()->write( json_encode($response) );


        return $res->withStatus(200);
    });



    $this->post('/login', function($req, $res, $args) use ($db){
        $email = $req->getParam('email');
        $password = $req->getParam('password');
        $result = $db->query("SELECT email,password FROM usuario WHERE email = '$email'");

        //If user doesn't exists
        if($result->numRows() != 1 ){
            $res->getBody()->write(
                json_encode(
                    array(
                        "error" => "No existe el usuario"
                    )
                )
            );
            return $res->withStatus(400);
        }

        $user = $result->fetchArray();
        //CHECK PASSWORD
        if( password_verify($password, $user['password']) ){

            $user = $db->query("SELECT idusuario, nombre, apPat, apMat, email, direcciones_iddirecciones, roles_idroles FROM usuario WHERE email = '$email'")->fetchArray();
            $direccion = $db->query("SELECT * FROM direcciones WHERE iddirecciones = ?", $user['direcciones_iddirecciones'])->fetchArray();
            $ciudad = $db->query("SELECT * FROM ciudades WHERE idciudades = ?",$direccion['ciudades_idciudades'])->fetchArray();

            //Generate JWT
            $jwt = Auth::SignIn(array(
                "idusuario" => $user['idusuario'],
                "email" => $user['email'],
                "nombre" => $user['nombre'],
                "apPat" => $user['apPat'],
                "apMat" => $user['apMat'],
                "direcciones_iddirecciones" => $user['direcciones_iddirecciones'],
                "calle" => $direccion['calle'],
                "colonia" => $direccion['colonia'],
                "cp" => $direccion['cp'],
                "ciudad" => $ciudad['nombre'],
                "roles_idroles" => $user['roles_idroles']
            ));

            $response = array(
                'jwt' => $jwt
            );
            $res->getBody()->write( json_encode($response) );
            return $res->withStatus(200);
        }
        $res->getBody()->write(
            json_encode(
                array(
                    "error" => "Ocurrio un error inesperado"
                )
            )
        );
        return $res->withStatus(400);
    });

    $this->post('/verify-token', function($req, $res, $args){
        print_r($req->getHeader('token'));
        print_r(Auth::GetData($req->getHeader('token')[0]) );
    });

    $this->delete('/{id}', function($req, $res, $args) use ($db){
        $id = $args['id'];
        $result = $db->query("DELETE FROM usuario WHERE idusuario = $id");
        if($result->affectedRows()==0){
            $res->getBody()->write(
                json_encode(
                    array(
                        "error" => "No existe el usuario"
                    )
                )
            );
            return $res->withStatus(400);
        }

        $res->getBody()->write( 
            json_encode( $result->affectedRows() )
        );
        return $res->withStatus(200);
    });

    $this->put('/{id}', function($req, $res, $args) use ($db){
        $id_usuario = $args['id'];
        $data = $req->getParsedBody();

        $columns = array( 'nombre', 'apPat', 'apMat', 'usuario', 'password', 'direcciones_iddirecciones', 'roles_idroles' );

        //Check if information is complete
        foreach($data as $key => $value){
            if( !in_array($key, $columns) )
            {
                $res->getBody()->write(
                    json_encode(
                        array(
                            "error" => "El campo $key no existe"
                        )
                    )
                );
                return $res->withStatus(400);
            }
        }

        //Execute sql query foreach field
        foreach($data as $key => $value){
             $result = $db->query("UPDATE FROM usuario SET $key = ? WHERE idusuario = $id_usuario",array($value) );
            if( $result->affectedRows() != 1){
                $req->getBody()->write(
                    json_encode(
                        array(
                            "error" => "Ocurrio un error insertando en el campo $key. Valor: $value"
                        )
                    )
                );
                return $res->withStatus(400);
            }
        }

        //Check if updated
        $res->getBody()->write( json_encode($result->affectedRows()) );
        return $res->withStatus(200);
    });

    $this->get('/rol/clientes', function($req, $res, $args) use ($db){
        return $res->getBody()->write(
            json_encode( $db->query("SELECT u.idusuario, u.nombre, u.apPat, u.apMat, u.email, u.direcciones_iddirecciones, d.calle, d.cp, d.colonia, c.nombre as ciudad, u.roles_idroles FROM usuario u,direcciones d,roles r, ciudades c WHERE u.roles_idroles = r.idroles AND u.direcciones_iddirecciones = d.iddirecciones AND r.nombre LIKE 'Cliente'")->fetchAll() )
        );
    });

    $this->get('/rol/empleados', function($req, $res, $args) use ($db){
        return $res->getBody()->write(
            json_encode( $db->query("SELECT u.idusuario, u.nombre, u.apPat, u.apMat, u.email, u.direcciones_iddirecciones, d.calle, d.cp, d.colonia, c.nombre as ciudad, u.roles_idroles FROM usuario u,direcciones d,roles r, ciudades c WHERE u.roles_idroles = r.idroles AND u.direcciones_iddirecciones = d.iddirecciones AND r.nombre LIKE 'Administrador'")->fetchAll() )
        );
    });
});
?>
