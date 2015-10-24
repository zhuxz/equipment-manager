var g_equipmentsMgr = null;

function outEquipmentsMgr() {
	if (g_equipmentsMgr) return g_equipmentsMgr;
	
	g_equipmentsMgr = new EquipmentsMgr();
	
	g_equipmentsMgr.BuildEquipmentRow = function (data) {
		var s = [];
		s.push("<tr>");
		s.push("<td>", data.contract_code, "</td>");
		s.push("<td>", data.supplier, "</td>");
		s.push("<td>", data.name, "</td>");
		s.push("<td>", data.model, "</td>");
		s.push("<td>", data.quantity, "</td>");
		s.push("<td>", data.storage_id, "</td>");
		s.push("<td>", data.price, "</td>");
		s.push("<td>", data.operate_user_name, "</td>");
		s.push("<td>", data.code, "</td>");
		s.push("<td>");
		s.push("<div class='am-btn-toolbar'>");
		s.push("<div class='am-btn-group am-btn-group-sm'>");
		s.push("<button class=\"am-btn am-btn-default am-btn-sm am-text-secondary\" data-am-modal=\"{target: '#doc-modal-1', closeViaDimmer: 0, width: 900, height: 600}\">");
		s.push("<span class=\"am-icon-pencil-square-o\"></span> 出库");
		s.push("</button>");
		s.push("</div>");
		s.push("</div>");
		s.push("</td>");
		s.push("</tr>");

		return s.join("");
	};
	g_equipmentsMgr.BuildEquipmentHead = function () {
		var s = [];
		s.push("<tr>");
		s.push("<th><a href='enter_equipment.html'>设备入库</a></th>");
		s.push("<th><a style='border-style: none none outset;' href='out_storage.html'>设备出库</a></th>");
		s.push("<th><a href='allocation_equipment.html'>设备调拨</a></th>");
		s.push("<th><a href='borrow_equipment.html'>设备借用</a></th>");
		s.push("<th><a href='scrap_equipment.html'>设备报废</a></th>");
		s.push("<th></th>");
		s.push("<th></th>");
		s.push("<th>未被验收</th>");
		s.push("<th>已被验收</th>");
		s.push("<th>全部</th>");
		s.push("</tr>");
		s.push("<tr class='am-warning'>");
		s.push("<th>合同编号</th>");
		s.push("<th>供应商</th>");
		s.push("<th>设备名称</th>");
		s.push("<th>设备型号</th>");
		s.push("<th>入库总数</th>");
		s.push("<th>现库存</th>");
		s.push("<th>单价</th>");
		s.push("<th>经办人</th>");
		s.push("<th>资产编号</th>");
		s.push("<th>操作</th>");
		s.push("</tr>");

		return s.join("");
	};
	return g_equipmentsMgr;
}

function on_out_storage_load() {
	cacheData(cacheKey().equipments, g_equipments);

	//outEquipmentsMgr().PopulatEquipmentTable(g_equipments);

	$('#tbl_equipments').DataTable(EquipmentGridSetting());

	return true;
}

function OnSearchEquipmentsClick() {
	var startDate = $("#frmSearch input[name='guaranteeStart']").val();
	var endDate = $("#frmSearch input[name='guaranteeEnd']").val();
	var contractCode = $("#frmSearch input[name='contractCode']").val();
	var post = {};
	post.startDate = startDate;
	post.endDate = endDate;
	post.contractCode = contractCode;
	$.post("../lib/data.php?act=equipments", post, function (data) {
		if (data.err == 0) {
			cacheData(cacheKey().equipments, data.data);
			var mgr = outEquipmentsMgr();
			mgr.PopulatEquipmentTable(data.data);
			$('#' + mgr.tableId).DataTable(EquipmentGridSetting());
		} else {
			alert("error.");
		}
		return true;
	}, "json");
	return true;
}