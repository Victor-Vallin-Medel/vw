<?php

use Models\Model;
use Classes\Auth;
use Classes\Usuario;

$app->group('/usuarios', function() use ($db){

    $this->get('/', function($req, $res, $args) use ($db){
        return $res->getBody()->write( json_encode(Model::getObjects($db, new Usuario())) );
    });

    $this->get('/{id}',function($req, $res, $args){
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

    $this->post('/verifyToken', function($req, $res, $args){
        print_r($req->getHeader('token'));
        print_r(Auth::GetData($req->getHeader('token')[0]) );
    });

});

?>
