<?php
header('Content-Type: application/json; charset=utf-8');
$file = file_get_contents("https://colabprod01.pace.edu/api/influx/sensordata/Odin");
// $response = json_decode($file);
echo $file;
?>