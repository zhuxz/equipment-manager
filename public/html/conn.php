<?php

$conn = @mysql_connect('127.0.0.1','root','root');
if (!$conn) {
	die('Could not connect: ' . mysql_error());
}

	mysql_query("SET NAMES utf8");
	mysql_query("SET character_set_client = utf8");
	mysql_query("SET character_set_results = utf8");
	mysql_query("SET character_set_connection = utf8");
	mysql_select_db('ccbv1', $conn);

?>