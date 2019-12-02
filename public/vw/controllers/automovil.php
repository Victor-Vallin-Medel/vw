<?php

use Models\Model;
use Classes\Automovil;

$app->group('/automoviles', function() use ($db){

    $this->get('',function($req, $res, $args) use ($db){
        return $res->getBody()->write(
            json_encode( $db->query("SELECT * FROM automovil")->fetchAll() )
        );
    });

    $this->get('/{id}', function($req, $res, $args) use ($db){
        $id = $args['id'];
        return $res->getBody()->write(
            json_encode( $db->query("SELECT * FROM automovil WHERE idautomovil = $id")->fetchArray() )
        );
    });

    //With QueryString ?idusuario={id}
    $this->get('/', function($req, $res, $args) use ($db){

        //Get all automoviles of a user
        $params = $req->getQueryParams();
        if( isset($params['idusuario']) ){
            $user_id = $params['idusuario'];
            $res->getBody()->write(
                json_encode(
                    $db->query("SELECT ua.*, a.* FROM usuario_has_automovil ua, automovil a WHERE ua.usuario_idusuario = $user_id AND a.idautomovil = ua.automovil_idautomovil")->fetchAll()
                )
            );
            return $res->withStatus(200);
        }
        
        //Get by numserie
        if( isset($params['numserie']) ){
            $numserie = $params['numserie'];
            $res->getBody()->write(
                json_encode(
                    $db->query("SELECT a.* FROM automovil a, usuario_has_automovil ua WHERE ua.numserie = '$numserie' AND ua.automovil_idautomovil = a.idautomovil")->fetchArray()
                )
            );
            return $res->withStatus(200);
        }
        return $res->withStatus(400);
    });

    //Cantidad by idusuario
    $this->get('/cantidad/', function($req, $res, $args) use($db){
        $params = $req->getQueryParams();
        $user_id = $params['idusuario'];

        $result = $db->query("SELECT COUNT(*) as cantidad FROM usuario_has_automovil WHERE usuario_idusuario = $user_id GROUP BY usuario_idusuario");
        if($result->numRows() == 0){
            $res->getBody()->write(
                json_encode(
                    array(
                        "cantidad" => 0
                    )
                )
            );
            return $res->withStatus(200);
        }
        $cantidad = $result->fetchArray();
        $res->getBody()->write(
            json_encode(
                $cantidad
            )
        );

        return $res->withStatus(200);
    });

    $this->get('/vista/distinct', function($req, $res, $args) use($db){

        $nombres = $db->query("SELECT DISTINCT nombre FROM automovil")->fetchAll();
        $versiones = $db->query("SELECT DISTINCT version FROM automovil")->fetchAll();
        $modelos = $db->query("SELECT DISTINCT modelo FROM automovil")->fetchAll();
        $distinct_nombres = array();
        $distinct_version = array();
        $distinct_modelo = array();

        foreach($nombres as $nombre){
            array_push($distinct_nombres, $nombre['nombre']);
        }
        foreach($versiones as $version){
            array_push($distinct_version, $version['version']);
        }
        foreach($modelos as $modelo){
            array_push($distinct_modelo, $modelo['modelo']);
        }

        $res->getBody()->write(
            json_encode(
                array(
                    "nombre" => $distinct_nombres,
                    "version" => $distinct_version,
                    "modelo" => $distinct_modelo
                )
            )
        );
        $res->withStatus(200);
    });

    $this->get('/vista/registrados', function($req, $res, $args) use ($db){
        $result = $db->query("SELECT ua.usuario_idusuario, ua.automovil_idautomovil, ua.numserie, a.nombre, a.version, a.modelo, u.nombre as unombre, u.apPat, u.apMat  FROM usuario u,usuario_has_automovil ua, automovil a WHERE ua.automovil_idautomovil = a.idautomovil AND ua.usuario_idusuario = u.idusuario")->fetchAll();

        $autos = array();

        foreach($result as $row){
            $usuario = array(
                "idusuario" => $row['usuario_idusuario'],
                "nombre" => $row['unombre'],
                "apPat" => $row['apPat'],
                "apMat" => $row['apMat']
            );

            $auto = array(
                "usuario_idusuario" => $row['usuario_idusuario'],
                "automovil_idautomovil" => $row['automovil_idautomovil'],
                "numserie" => $row['numserie'],
                "version" => $row['version'],
                "modelo" => $row['modelo'],
                "nombre" => $row['nombre'],
                "usuario" => $usuario
            );
            array_push($autos, $auto);
        }

        $res->getBody()->write(
            json_encode($autos)
        );
        return $res->withStatus(200);
    });

    $this->get('/estado/{estado}', function($req, $res, $args) use ($db){
        $estado = $args['estado'];
        return $res->getBody()->write(
            json_encode( $db->query("SELECT * FROM automovil WHERE ") )
        );
    });

    $this->post('', function($req, $res, $args) use ($db){
        
    });

    //Add usuario_has_automovil
    $this->post('/', function($req, $res, $args) use ($db){
        $user_id = $req->getQueryParams()['idusuario'];
        $data = $req->getParsedBody();
        $usuario_auto = array( $data['usuario_idusuario'], $data['automovil_idautomovil'], $data['numserie'] );
        $result = $db->query("INSERT INTO usuario_has_automovil VALUES (?,?,?)", $usuario_auto);

        if($result->affectedRows() != 1){
            $res->getBody()->write(
                json_encode(
                    array(
                        "error" => "Ocurrió un error inesperado, probablemente el numero de serie ya está registrado"
                    )
                )
            );
            return $res->withStatus(400);
        }

        return $res->withStatus(200);
    });

    $this->put('', function($req, $res, $args) use ($db){
        $data = $req->getParam('data');
        return $res->getBody()->write(
            json_encode( Model::updateObjectById($db, new Automovil($data)) )
        );
    });

    $this->delete('/{id}', function($req, $res, $args) use ($db){
        $id = $args['id'];
        return $res->getBody()->write(
            $db->query("DELETE FROM automovil WHERE idautomovil = $id")->affectedRows()
        );
    });

});


?>