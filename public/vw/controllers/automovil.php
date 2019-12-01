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

    $this->get('/', function($req, $res, $args) use ($db){
        $params = $req->getQueryParams();
        $user_id = $params['user_id'];
        $res->getBody()->write(
            json_encode(
                $db->query("SELECT * FROM usuario_has_automovil WHERE usuario_idusuario = $user_id")->fetchAll()
            )
        );
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