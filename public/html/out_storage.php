<?php

include('../lib/common.php');

function fOutEquipment () {
	# code...
}

$_act = $_POST['act'];

if ( $_act == "outEquipment" ) {	
	fSaveEquipment();
} elseif ( $_act == ".." ) {
	fUpdateEquipment();
} else {
	# code...
}

$g_equipments = GetAllEquipments();

?>
