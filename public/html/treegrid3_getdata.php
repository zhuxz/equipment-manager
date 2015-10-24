<?php





$id = isset($_POST['id']) ? intval($_POST['id']) : 0;

include 'conn.php';
$result = array();
$sql = "select * from osa_organization where org_father_id=$id";
$rs = mysql_query($sql, $conn);
while($row = mysql_fetch_array($rs)){
	$row['state'] = has_child($row['organization_id']) ? 'closed' : 'open';
	$row['address'] = "<a href='test.php?method=".$row['organization_id']."'>添加、删除、修改</a>";
	array_push($result, $row);
}

function has_child($id){
	$rs = mysql_query("select count(*) from osa_organization where org_father_id=$id");
	$row = mysql_fetch_array($rs);
	return $row[0] > 0 ? true : false;
}

echo json_encode($result);

?>





