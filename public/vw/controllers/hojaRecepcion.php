<?php

$app->group('/hojas', function() use($db){

    $this->get('', function($req, $res, $args) use ($db){
        $res->getBody()->write(
            json_encode(
                $db->query("SELECT * FROM hojaRecepcion")->fetchAll()
            )
        );
        return $res->withStatus(200);
    });

    $this->get('/{id}', function($req, $res, $args){
        $id = $args['id'];
        $res->getBody()->write(
            json_encode(
                $db->query("SELECT * FROM hojaRecepcion WHERE idhojaRecepcion = $id")->fetchArray()
            )
        );
    });

    $this->post('', function($req, $res, $args) use ($db){
        $data = $req->getParsedBody();

        $columns = array('observaciones', 'citas_idcitas');
        foreach($data as $key => $value){
            if( !in_array($key, $columns) ){
                $res->getBody()->write(
                    json_encode(
                        array(
                            "error" => "No existe el campo $key"
                        )
                    )
                );
                return $res->withStatus(400);
            }
        }

        $hoja = array( json_encode($data['observaciones']), $data['citas_idcitas'] );

        $result = $db->query("INSERT INTO hojaRecepcion (observaciones, citas_idcitas) VALUES (?, ?)", $hoja);
        if($result->affectedRows() != 1){
            $res->getBody()->write(
                json_encode(
                    array(
                        "error" => "Ocurrió un error inesperado"
                    )
                )
            );
            return $res->withStatus(400);
        }

        return $res->withStatus(200);
    });

    $this->patch('', function($req, $res, $args) use ($db){


    });

    $this->delete('/{id}', function($req, $res, $args) use ($db){
        $id = $args['id'];
        $result = $db->query("DELETE FROM hojaRecepcion WHERE idhojaRecepcion = $id");
        if($result->affectedRows() != 1){
            $res->getBody()->write(
                json_encode(
                    array(
                        "error" => "Ocurrió un error eliminando la hoja de recepcion"
                    )
                )
            );
            return $res->withStatus(400);
        }
        return $res->withStatus(200);
    });
});

?>