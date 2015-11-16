<?php
	header('content-Type: text/html; charset=utf-8');
    $timeContent = $_POST['timeContent'];
    $fileName = $_POST['fileName'];

    $file = fopen($fileName, "a+"); //開啟檔案
    fwrite($file, $timeContent.PHP_EOL);
	fclose($file);
?>