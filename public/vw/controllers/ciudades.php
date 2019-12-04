<?php

$app->group('/ciudades', function() use ($db){
    $this->get('', function($req,$res,$args) use ($db){
        $res->getBody()->write(
            json_encode(
                $db->query("SELECT * FROM ciudades")->fetchAll()
            )
        );
        return $res->withStatus(200);
    });

    $this->get('/{id}', function($req,$res,$args) use ($db){
        $id = $args['id'];
        $res->getBody()->write(
            json_encode(
                $db->query("SELECT * FROM ciudades WHERE idciudades = ?",$id)->fetchArray()
            )
        );
        return $res->withStatus(200);
    });
});


?>