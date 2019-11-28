<?php

use Models\Model;
use Classes\Auth;
use Classes\Usuario;

$app->get('', function($req, $res, $args){
    return $res->getBody()->write("Ya entraron putos :v");
});

$app->group('/usuarios', function() use ($db){

    $this->get('', function($req, $res, $args) use ($db){
        return $res->getBody()->write( 
            json_encode( $db->query("SELECT * FROM usuario")->fetchAll() )
        );
    });

    $this->get('/{id}',function($req, $res, $args) use ($db){
        $id = $args['id'];
        return $res->getBody()->write( 
            json_encode( $db->query("SELECT * FROM usuario WHERE idusuario = $id")->fetchAll() )
        );
    });

    $this->post('',function($req, $res, $args) use ($db){
        $data = $req->getParam("data");
        return $res->getBody()->write(
            json_encode( Model::insertObject($db, new Usuario($data)) )
        );
    });

    $this->post('/login', function($req, $res, $args) use ($db){
        $data = $req->getParam('data');

        return $res->getBody()->write( json_encode(Model::getObjectsByAttributes($db,new Usuario($data))) );

        /*
        if($data["usuario"] == "omar" && $data["contraseña"] == "salazar"){
            //Generate JWT

            $jwt = Auth::SignIn(array(
                "usuario" => $data["usuario"]
            ));

            $response = array(
                'jwt' => $jwt
            );

            return $res->getBody()->write( json_encode($response) );
        }
        */

    });

    $this->post('/verify-token', function($req, $res, $args){
        print_r($req->getHeader('token'));
        print_r(Auth::GetData($req->getHeader('token')[0]) );
    });

    $this->delete('/{id}', function($req, $res, $args) use ($db){
        $data = $req->getParam('data');
        return $res->getBody()->write( json_encode( Model::deleteObjectById( $db, new Usuario($data) ) ) );
    });

    $this->put('', function($req, $res, $args) use ($db){
        $data = $req->getParam('data');
        return $res->getBody()->write( json_encode( Model::updateObjectById($db, new Usuario($data)) ) );
    });

});

?>
