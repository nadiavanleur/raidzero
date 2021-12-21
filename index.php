<?php 
$app_vars = (object) [
    'example' => 'data'
];
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="build/static/css/main.css" type="text/css">
    </head>
    <script type="text/javascript">
        var myApp = <?php echo json_encode($app_vars); ?>;
    </script>
    <body>
        <div id="root"></div>
        <script type="text/javascript" src="build/static/js/main.js" ></script>
    </body>
</html>