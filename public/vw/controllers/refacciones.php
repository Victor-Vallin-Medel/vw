<?php

$app->group('/refacciones', function() use ($db){

    $this->get('', function($req, $res, $args) use($db){
        $res->getBody()->write(
            json_encode(
                $db->query("SELECT * FROM refacciones")->fetchAll()
            )
        );
        return $res->withStatus(200);
    });

    $this->get('/{id}', function($req, $res, $args) use($db){
        $id = $args['id'];
        $res->getBody()->write(
            json_encode(
                $db->query("SELECT * FROM refacciones WHERE idrefacciones = $id")->fetchArray()
            )
        );
        return $res->withStatus(200);
    });

    //Get all refacciones by idreparacion
    $this->get('/', function($req, $res, $args) use ($db){
        $params = $req->getQueryParams();
        $id_reparacion = $params['idreparaciones'];

        $result = $db->query("SELECT rr.reparaciones_idreparaciones, rr.refacciones_idrefacciones, rp.idreparaciones, rp.descripcion. rp.precio as reparacion_precio, rp.existencia as reparacion_existencia, r.idrefacciones, r.nombre, r.precio as refacciones_precio, r.existencia FROM reparaciones_has_refacciones rr, reparaciones rp, refacciones r WHERE rr.reparaciones_idreparaciones = $id_reparacion AND r.idrefacciones = rr.refacciones_idrefacciones AND rr.reparaciones_idreparaciones = rp.idreparaciones")->fetchAll();

        $refaccion = array();

        $res->getBody()->write(
            json_encode(array())
        );
        $res->withStatus(200);
    });

    $this->post('', function($req, $res, $args) use($db){
        $data = $req->getParsedBody();

        $columns = array('nombre', 'precio', 'existencia');

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

        $refacion( $data['nombre'], $data['precio'], $data['existencia'] );
        $result = $db->query("INSERT INTO refacciones (nombre, precio, existencia) VALUES (?,?,?)", $refaccion);
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

    $this->patch('/{id}', function($req, $res, $args) use($db){
        $id = $args['id'];
        $data = $req->getParsedBody();
        $columns = array('nombre', 'precio', 'existencia');

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
                $query = "UPDATE FROM refacciones SET $key = '$value' WHERE idrefacciones = $id";
            }
            else{
                $query = "UPDATE FROM refacciones SET $key = $value WHERE idrefacciones = $id";
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