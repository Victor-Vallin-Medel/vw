<?php


$app->group('/citas',function() use ($db){
    $this->get('/', function($req, $res, $args) use ($db){
        return $res->getBody()->write(
            json_encode( $db->query("SELECT * FROM citas")->fetchAll() )
        );
    });

    $this->get('/{id}', function($req, $res, $args) use ($db){
        $id = $args['id'];
        return $res->getBody()->write(
            json_encode( $db->query("SELECT * FROM citas idcitas = $id")->fetchAll() )
        );
    });

    $this->post('/', function($req, $res, $args) use ($db){
        
    });

    $this->put('/{id}', function($req, $res, $args) use ($db){
        $id = $args['id'];
        return $res->getBody()->write(
            json_encode()
        );
    });

    $this->delete('/{id}', function($req, $res, $args) use ($db){
        $id = $args['id'];
        return $res->getBody()->write(
            json_encode( $db->query("DELETE FROM citas WHERE idcita = $id")->affectedRows() )
        );
    });


});

?>