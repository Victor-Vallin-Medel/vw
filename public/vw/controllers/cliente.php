<?php

use Models\Model as Model;
use Classes\Cliente as Cliente;

$app->group('/cliente', function() use ($db){

    $this->get('/', function($req, $res, $args) use ($db){
        return $res->getBody()->write( json_encode(Model::getObjects($db, new Cliente())) );
    });

    $this->get('/{id}',function($req, $res, $args){
    });

});

?>
