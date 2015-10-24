<?php
function GetDepartmentList () {
	$arr = array( array('id' => '1', 'name' => 'development', 'desc' => '软件部'),
		array('id' => '2', 'name' => 'finace', 'desc' => '后勤部'),
		array('id' => '3', 'name' => 'back', 'desc' => '财务部')
    );
	return $arr;
}

# return an array of all Equipments in database
function GetAllEquipments () {
	for ( $i=1; $i < 100; $i++ ) {
		$eq["id"] = $i;
		$eq["contract_code"] = "合同编号".$i;
		$eq["supplier"] = "供应商".$i;
		$eq["name"] = "设备名称".$i;
		$eq["model"] = "设备型号".$i;
		$eq["quantity"] = rand(10, 100);
		$eq["storage_id"] = "使用部门".$i;
		$eq["price"] = rand(1000, 1000000) / 100;
		$eq["operate_user_name"] = "经办人".$i;
		$eq["code"] = "设备编号".$i;
		$eq["maintain_start"] = date("Y-m-d", mktime(0,0,0,rand(1, 12), rand(1, 28), rand(1991, 2015)));
		$eq["maintain_stop"] = date("Y-m-d", mktime(0,0,0,rand(1, 12), rand(1, 28), rand(2015, 2019)));
		$eq["source_id"] = "设备来源".$i;
		$eq["category_id"] = "设备类别".$i;
		$eq["kind_id"] = "设备大类".$i;
		$eq["brand_id"] = "设备品牌".$i;
		$eq["in_code"] = "入库编号".$i;
		$eq["serials_code"] = "资产序列号".$i;
		$eq["in_time"] = date("Y-m-d", mktime(0,0,0,rand(1, 12), rand(1, 28), rand(1998, 2015)));//mktime(0,0,0,rand(1, 12), rand(1, 28), rand(1998, 2015))   mktime(13,15,23,6,7,2006)
		$eq["unit_id"] = "设备计量单位".$i;
		$eq["organization_id"] = "使用分行".$i;
		$eq["user_id"] = "使用人".$i;
		$eq["desc"] = "标准配置".$i;
		$eq["financial_code"] = "资产编号".$i;

		$arr[] = $eq;
	}
	
	return $arr;
}

# return an array of Equipments in database with filter
function GetEquipments ($contract_code, $guaranteeStart, $guaranteeEnd) {
	if (strlen($contract_code) > 0 || strlen($guaranteeStart) > 0 || strlen($guaranteeEnd) > 0) {
		for ( $i=1; $i < 8; $i++ ) {
			$eq["id"] = $i;
			$eq["contract_code"] = "合同编号".$i;
			$eq["supplier"] = "供应商".$i;
			$eq["name"] = "设备名称".$i;
			$eq["model"] = "设备型号".$i;
			$eq["quantity"] = rand(10, 100);
			$eq["storage_id"] = "使用部门".$i;
			$eq["price"] = rand(1000, 1000000) / 100;
			$eq["operate_user_name"] = "经办人".$i;
			$eq["code"] = "设备编号".$i;
			$eq["maintain_start"] = date("Y-m-d", mktime(0,0,0,rand(1, 12), rand(1, 28), rand(1991, 2015)));
			$eq["maintain_stop"] = date("Y-m-d", mktime(0,0,0,rand(1, 12), rand(1, 28), rand(2015, 2019)));
			$eq["source_id"] = "设备来源".$i;
			$eq["category_id"] = "设备类别".$i;
			$eq["kind_id"] = "设备大类".$i;
			$eq["brand_id"] = "设备品牌".$i;
			$eq["in_code"] = "入库编号".$i;
			$eq["serials_code"] = "资产序列号".$i;
			$eq["in_time"] = date("Y-m-d", mktime(0,0,0,rand(1, 12), rand(1, 28), rand(1998, 2015)));//mktime(0,0,0,rand(1, 12), rand(1, 28), rand(1998, 2015))   mktime(13,15,23,6,7,2006)
			$eq["unit_id"] = "设备计量单位".$i;
			$eq["organization_id"] = "使用分行".$i;
			$eq["user_id"] = "使用人".$i;
			$eq["desc"] = "标准配置".$i;
			$eq["financial_code"] = "资产编号".$i;

			$arr[] = $eq;
		}
	} else {
		$arr = GetAllEquipments();
	}
	return $arr;
}

function SaveEquipment () {
	# code...
}

function getOutStorageCount () {
	# code...
	return rand(1, 50);
}

function getInStorageCount () {
	# code...
	return rand(1, 100);
}

function DeleteEquipmentById ( $id ) {
	# code...
	error_log("You messed up!", 3, "/my-errors.log");
}

?>