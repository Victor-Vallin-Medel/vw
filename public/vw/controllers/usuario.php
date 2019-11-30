<?php

use Models\Model;
use Classes\Auth;
use Classes\Usuario;

$app->get('', function($req, $res, $args){
    return $res->getBody()->write("Ya entraron putos :v");
});

$app->group('/usuarios', function() use ($db){

    $this->get('', function($req, $res, $args) use ($db){
        $res->withStatus(200);
        return $res->getBody()->write( 
            json_encode( $db->query("SELECT idusuario, nombre, apPat, apMat, email, direcciones_iddirecciones, roles_idroles FROM usuario")->fetchAll() )
        );
    });

    
    $this->get('/{id}',function($req, $res, $args) use ($db){
        $id = $args['id'];
        $result = $db->query("SELECT idusuario, nombre, apPat, apMat, email, direcciones_iddirecciones, roles_idroles FROM usuario WHERE idusuario = $id");

        //If user doesn't exists
        if($result->numRows()==0){
            $res->getBody()->write(
                json_encode(array(
                    "error" => "No existe el usuario"
                ))
            );
            return $res->withStatus(400);
        }

        $user = $result->fetchAll();
        $res->withStatus(200);
        return $res->getBody()->write( 
            json_encode( $user )
        );
    });

    $this->post('',function($req, $res, $args) use ($db){
        $direccion = array(
            //$req->getParam('')
        );

        $usuario = array(
            $req->getParam('nombre'),
            $req->getParam('apPat'),
            $req->getParam('apMat'),
            $req->getParam('email'),
            $req->getParam('password'),
            $req->getParam('direcciones_iddirecciones'),
            $req->getParam('roles_idroles')
        );
        $columns = array( 'nombre', 'apPat', 'apMat', 'email', 'password', 'direcciones_iddirecciones', 'roles_idroles' );
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

        //Check if username exists
        $password = password_hash($data['password'], PASSWORD_DEFAULT);
        $user = array( $data['nombre'], $data['apPat'], $data['apMat'], $data['email'], $password, $data['direcciones_iddirecciones'], $data['roles_idroles']);
        $result = $db->query("INSERT INTO usuario (nombre, apPat, apMat, email, password, direcciones_iddirecciones, roles_idroles) VALUES (?,?,?,?,?,?,?)", $user);
        if($result->affectedRows() != 1 || $result == false){
            $res->getBody()->write(
                json_encode(
                    array(
                        "error" => "Ocurrio un error inesperado, puede que el nombre de usuario ya este en uso"
                    )
                )
            );
            return $res->withStatus(400);
        }

        $res->getBody()->write( json_encode($result->affectedRows()) );
        return $res->withStatus(200);
    });

    $this->post('/login', function($req, $res, $args) use ($db){
        $data = $req->getParam('data');

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

            //Generate JWT
            $jwt = Auth::SignIn(array(
                "email" => $user['email'],
                "nombre" => $user['nombre'],
                "apPat" => $user['apPat'],
                "apMat" => $user['apMat'],
                "direcciones_iddirecciones" => $user['direcciones_iddirecciones'],
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

    $this->put('', function($req, $res, $args) use ($db){
        $data = $req->getParam('data');

        $columns = array( 'nombre', 'apPat', 'apMat', 'usuario', 'password', 'direcciones_iddirecciones', 'roles_idroles' );

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

        //Check if updated
        $password = password_hash($data['password'], PASSWORD_DEFAULT);
        $user = array( $data['nombre'], $data['apPat'], $data['apMat'], $data['usuario'], $password, $data['direcciones_iddirecciones'], $data['roles_idroles']);
        $result = $db->query("INSERT INTO usuario (nombre, apPat, apMat, usuario, password, direcciones_iddirecciones, roles_idroles) VALUES (?,?,?,?,?,?,?)", $user);
        if($result->affectedRows() != 1){
            $res->getBody()->write(
                json_encode(
                    array(
                        "error" => "Ocurrio un error inesperado, puede que el nombre de usuario ya esté en uso"
                    )
                )
            );
            return $res->withStatus(400);
        }
        $res->getBody()->write( json_encode($result->affectedRows()) );
        return $res->withStatus(200);
    });

});

$app->get('/clientes', function($req, $res, $args) use ($db){
    return $res->getBody()->write(
        json_encode( $db->query("SELECT u.idusuario, u.nombre, u.apPat, u.apMat, u.usuario, u.direcciones_iddirecciones, u.roles_idroles FROM usuario u,direcciones d,roles r WHERE u.roles_idroles = r.idroles AND r.nombre LIKE 'Cliente'")->fetchAll() )
    );
});

$app->get('/empleados', function($req, $res, $args) use ($db){
    return $res->getBody()->write(
        json_encode( $db->query("SELECT u.idusuario, u.nombre, u.apPat, u.apMat, u.usuario, u.direcciones_iddirecciones, u.roles_idroles FROM usuario u,direcciones d,roles r WHERE u.roles_idroles = r.idroles AND r.nombre LIKE 'Administrador'")->fetchAll() )
    );
});
?>
