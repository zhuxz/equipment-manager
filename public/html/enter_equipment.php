<?php

include('../lib/common.php');

function fSaveEquipment () {
	# code...
}

function fUpdateEquipment () {
	# code...
}

$_act = $_POST['act'];

if ( $_act == "saveEquipment" ) {
	fSaveEquipment();
} elseif ( $_act == "updateEquipment" ) {
	fUpdateEquipment();
} else {
	# code...
}

$g_inStorageCount = getInStorageCount();
$g_outStorageCount = getOutStorageCount();
//$g_equipments = GetAllEquipments();

?>
