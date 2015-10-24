<?php
function fGetDepartmentList () {
	$ret = array('data' => GetDepartmentList(), 'err' => '0');
	return json_encode($ret);
}
?>