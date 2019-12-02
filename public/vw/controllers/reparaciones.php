<?php

$app->group('/reparaciones', function() use ($db){

    $this->get('', function($req, $res, $args) use($db){
        $res->getBody()->write(
            json_encode(
                $db->query("SELECT * FROM reparaciones")->fetchAll()
            )
        );
        return $res->withStatus(200);
    });

    $this->get('/{id}', function($req, $res, $args) use($db){
        $id = $args['id'];
        $res->getBody()->write(
            json_encode(
                $db->query("SELECT * FROM reparaciones WHERE idreparaciones = $id")->fetchArray()
            )
        );
        return $res->withStatus(200);
    });

    $this->post('', function($req, $res, $args) use($db){
        $data = $req->getParsedBody();

        $columns = array('descripcion', 'precio');

        foreach($columns as $column){
            if( !array_key_exists($column) ){
                $res->getBody()->write(
                    json_encode(
                        array(
                            "error" => "Falta el campo $column"
                        )
                    )
                );
            }
            return $res->withStatus(400);
        }

        $reparacion( $data['descripcion'], $data['precio'] );
        $result = $db->query("INSERT INTO reparaciones (descripcion, precio) VALUES (?,?)", $reparacion);
        if($result->affectedRows() != 1){
            $res->getBody()->write(
                json_encode(
                    array(
                        "error" => "Ocurrió un error al insertar la refacción"
                    )
                )
            );
            return $res->withStatus(400);
        }
        return $res->withStatus(200);
    });

    $this->post('/', function($req, $res, $args) use ($db){
        $params = $req->getQueryParams();
        $data = $req->getParsedBody();
        //Add refaccion to reparacion
        if( isset($params['idreparaciones']) ){
            if( !isset($data['reparaciones_idreparaciones']) && !isset($data['refacciones_idrefacciones']) ){
                $res->getBody()->write(
                    json_encode(
                        array(
                            "error" => "Faltan datos"
                        )
                    )
                );
                return $res->withStatus(400);
            }

            $r = array( $data['reparaciones_idreparaciones'], $data['refacciones_idrefacciones'] );
            $result = $db->query("INSERT INTO reparaciones_has_refacciones (reparaciones_idreparaciones, refacciones_idrefacciones) VALUES (?,?)", $r);

            if( $result->affectedRows()!=1 ){
                $res->getBody()->write(
                    json_encode(
                        array(
                            "error" => "Ocurrió un error insertando los datos"
                        )
                    )
                );
                return $res->withStatus(400);
            }

            return $res->withStatus(200);
        }

    });

    $this->patch('/{id}', function($req, $res, $args) use($db){
        $id = $args['id'];
        $data = $req->getParsedBody();
        $columns = array('descripcion', 'precio');

        foreach($data as $key => $value){
            if( !in_array($key, $columns) ){
                $res->getBody()->write(
                    json_encode(
                        array(
                            "error" => "La columna $key no existe"
                        )
                    )
                );
                return $res->withStatus(400);
            }
        }

        foreach($data as $key => $value){
            if(gettype($value) == 'string'){
                $query = "UPDATE FROM reparaciones SET $key = '$value' WHERE idreparaciones = $id";
            }
            else{
                $query = "UPDATE FROM reparaciones SET $key = $value WHERE idreparaciones = $id";
            }
            $result = $db->query($query);
            if($result->affectedRows()!=1)
            {
                $res->getBody()->write(
                    json_encode(
                        array(
                            "error" => "Hubo un error insertando el campo $key"
                        )
                    )
                );
                return $res->withStatus(400);
            }
        }

        return $res->withStatus(200);
    });

    $this->delete('', function($req, $res, $args) use($db){

    });
});

?>