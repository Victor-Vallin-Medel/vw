<?php

$app->group('/direcciones', function() use($db){
    $this->get('',function($req, $res, $args) use ($db){
        $res->getBody()->write(
            json_encode(
                $db->query("SELECT * FROM direcciones")->fetchAll()
            )
        );
    });

    $this->get('/{id}',function($req, $res, $args) use ($db){
        $id = $args['id'];
        $res->getBody()->write(
            json_encode(
                $db->query("SELECT * FROM direcciones WHERE iddirecciones = ?",$id)->fetchArray()
            )
        );
    });

    $this->post('', function($req, $res, $args) use ($db){
        $direccion = $req->getParsedBody();
        $columns = array('calle', 'colonia', 'cp', 'ciudades_idciudades');

        foreach($column as $column){
            if( !array_key_exists($column, $direccion) ){
                $res->getBody()->write(
                    json_encode(
                        array(
                            "error" => "No se ha podido insertar el usuario ya que falta el campo $column"
                        )
                    )
                );
                return $res->withStatus(400);
            }
        }

        $result = $db->query("INSERT INTO direcciones (calle,cp,colonia,ciudades_idciudades) VALUES (?,?,?,?)",$direccion);
        if($result->affectedRows() != 1){
            $res->getBody()->write(
                json_encode(
                    array(
                        "error" => "Hubo un error insertando la dirección, probablemente la ciudad no existe"
                    )
                )
            );
            return $res->withStatus(400);
        }

        $res->getBody()->write(
            json_encode(
                array( "iddirecciones" => $res->getInsertedId() )
            )
        );
    });

    $this->put('/{id}', function($req, $res, $args){
        $id = $args['id'];
        
    });
});

?>