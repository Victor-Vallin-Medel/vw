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
        $params = $req->getQueryParams();
        $user_id = $params['idusuario'];
        $res->getBody()->write(
            json_encode(
                $db->query("SELECT * FROM usuario_has_automovil WHERE usuario_idusuario = $user_id")->fetchAll()
            )
        );
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
        $res->getBody()->write(
            json_encode($db->query("SELECT ua.usuario_idusuario, ua.automovil_idautomovil, ua.numserie, a.nombre, a.version, a.modelo  FROM usuario_has_automovil ua, automovil a WHERE ua.automovil_idautomovil = a.idautomovil")->fetchAll())
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
        $automovil = $req->getParsedBody();

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