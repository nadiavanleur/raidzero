<?php 
$data = (object) [
    'title' => 'Raid:Zero',
    'description' => 'text',
    'theme_color' => '#000000'
];

$app_vars = (object) [
    'example' => 'data'
];
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <title><?php echo $data->title ?></title>
        <meta name="theme-color" content="<?php echo $data->theme_color ?>" />
        <meta name="description" content="<?php echo $data->description ?>" />

        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="stylesheet" href="/build/static/css/main.css" type="text/css">
    </head>
    <script type="text/javascript">
        var myApp = <?php echo json_encode($app_vars); ?>;
    </script>
    <body>
        <div id="app"></div>
        <script type="text/javascript" src="/build/static/js/main.js" ></script>
    </body>
</html>