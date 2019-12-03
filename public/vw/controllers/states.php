<?

$app->group('/estados', function($req, $res, $args) use($db){
    $res->getBody()->write(
        json_encode(
            $db->query("SELECT * FROM states")->fetchAll()
        )
    );
    return $res->withStatus(200);
});


?>