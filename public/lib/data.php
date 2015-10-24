<?php

include("common.php");
include("department.php");

function fGetEquipments ( $filter='' ) {
	$contract_code = $_POST['contractCode'];
	$buyDateStart = $_POST['startDate'];
	$buyDateEnd = $_POST['endDate'];
	$ret = array('data' => GetEquipments($contract_code, $buyDateStart, $buyDateEnd), 'err' => '0');
	return json_encode($ret);
}

function fSaveEquipment ( $filter='' ) {
	$ret = array('data' => GetEquipments(), 'err' => '0');
	return json_encode($ret);
}

function fDeleteEquipmentById () {
	$id = $_POST['id'];
	DeleteEquipmentById($id);
}

$_act = $_GET['act'];

$response = "";

if ( $_act == "departmentList" ) {	
	$response = fGetDepartmentList();
} elseif ( $_act == "equipments" ) {
	$response = fGetEquipments();
} elseif ( $_act == "delequipment" ) {
	$response = fDeleteEquipmentById();
} else {
	# code...
}

echo $response;

?>