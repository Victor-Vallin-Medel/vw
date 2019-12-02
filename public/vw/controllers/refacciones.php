<?php

$app->group('/refacciones', function() use ($db){

    $this->get('', function($req, $res, $args){
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

    $this->get('/', function($req, $res, $args) use ($db){
        
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