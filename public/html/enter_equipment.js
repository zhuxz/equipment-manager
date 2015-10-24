var g_equipmentsMgr = null;

function enterEquipmentsMgr() {
	if (g_equipmentsMgr) return g_equipmentsMgr;
	
	g_equipmentsMgr = new EquipmentsMgr();

	g_equipmentsMgr.BuildEquipmentHead = function () {
		var s = [];
		s.push("<tr>");
		s.push("<th><a style='border-style: none none outset;' href='enter_equipment.html'>设备入库</a></th>");
		s.push("<th><a href='out_storage.html'>设备出库</a></th>");
		s.push("<th><a href='allocation_equipment.html'>设备调拨</a></th>");
		s.push("<th><a href='borrow_equipment.html'>设备借用</a></th>");
		s.push("<th><a href='scrap_equipment.html'>设备报废</a></th>");
		s.push("<th></th>");
		s.push("<th></th>");
		s.push("<th></th>");
		s.push("<th>未出库设备<span class='am-badge am-badge-warning'>", g_inStorageCount, "</span></th>");
		s.push("<th>已出库设备<span class='am-badge am-badge-warning'>", g_outStorageCount, "</span></th>");
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
	}
	
	g_equipmentsMgr.PopulatEquipmentTable = function (data) {
		var s = [];
		var iRow = 0;
		s.push("<table id='", this.tableId, "' class='am-table show-table'>");
		s.push("<thead>");
		s.push(this.BuildEquipmentHead());
		s.push("</thead>");	

		s.push("<tbody>");

		for (iRow = 0; iRow < data.length; iRow++) {
			s.push(this.BuildEquipmentRow(data[iRow]));
		}
		s.push("</tbody>");
		
		s.push("</table>");

		s.push("<p style='text-align: center;'>");
		s.push("<a href='javascript:void(0)' onclick=\"activeEquipmentInWin(this);\">");
		s.push("<img src='../assets/images/equipment_in.png' alt=''>");
		s.push("</a>");
		s.push("</p>");
		
		$("#" + this.containerId).html(s.join(""));
		return true;
	};
	return g_equipmentsMgr;
}

var _EnterEquipmentGridSetting = null;
function EnterEquipmentGridSetting() {
	if (_EnterEquipmentGridSetting) return _EnterEquipmentGridSetting;
	
	var ret = EquipmentGridSetting();
	ret.fnDrawCallback = function () {
		$("button[btnUpdateEquipment]").unbind("click");
		$("button[btnRemoveEquipment]").unbind("click");
		$("button[btnUpdateEquipment]").click(on_btnUpdateEquipment_Click);
		$("button[btnRemoveEquipment]").click(on_btnRemoveEquipment_Click);
		return true;
	}
	
	_EnterEquipmentGridSetting = ret
	
	return ret;
}

function InitDepartmentList(list, data) {
	var target = (typeof list == "string" ? $("#" + list) : list);
	var s = [];
	s.push("<option value='-1'>使用部门</option>");
	$.each(data, function (i, department) {
		s.push("<option value='", department.id, "'>", department.desc, "</option>");
		return true;
	});
	target.html(s.join(""));
	return true;
}

function InitEquipmentsTable() {
	$('#my-modal-loading').modal();
	$.get("../lib/data.php?act=equipments", {}, function (data) {
		if (data.err == 0) {
			cacheData(cacheKey().equipments, data.data);
			enterEquipmentsMgr().PopulatEquipmentTable(data.data);
			$('#tbl_equipments').DataTable(EnterEquipmentGridSetting());
			$('#my-modal-loading').modal("close");
		}
		return true;
	}, "json");
	    
	return true;
}

function on_enter_equipment_load() {
	//cacheData(cacheKey().equipments, g_equipments);
	InitEquipmentsTable();

	$.get("../lib/data.php?act=departmentList", {}, function (data) {
		if (data.err == 0) {
			cacheData(cacheKey().departmentList, data.data);
			InitDepartmentList("doc-select-department", data.data);
		}
		return true;
	}, "json");

	return true;
}

function activeEquipmentInWin(pSender) {
	if ($(pSender).attr("init") == 1) {
		$('#doc-modal-equipmentIn').modal("toggle");
	} else {
		$('#doc-modal-equipmentIn').modal({closeViaDimmer:false, width: 900, height:600});
		$(pSender).attr("init", 1);
	}
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
			enterEquipmentsMgr().PopulatEquipmentTable(data.data);
			$('#tbl_equipments').DataTable(EnterEquipmentGridSetting());			
		} else {
			alert("error.");
		}
		return true;
	}, "json");
	return true;
}

function mdlUpdateEquipment_populate(eqId) {
	var equipments = getData(cacheKey().equipments);
	if (!equipments) return false;

	var curEquipment;
	$.each(equipments, function () {
		if (arguments[1].contract_code == eqId) {
			curEquipment = arguments[1];
			return false;
		} else {
			return true;	
		}
	});

	var winId = "#mdlUpdateEquipment";
	if (curEquipment) {
		$(winId + " form input[name='contract_code']").val(curEquipment.contract_code);
		$(winId + " form input[name='supplier']").val(curEquipment.supplier);
		$(winId + " form input[name='model']").val(curEquipment.model);
		$(winId + " form input[name='code']").val(curEquipment.code);
		$(winId + " form input[name='guaranteeStart']").val(curEquipment.maintain_start);
		$(winId + " form input[name='guaranteeEnd']").val(curEquipment.maintain_stop);
		$(winId + " form input[name='quantity']").val(curEquipment.quantity);
		$(winId + " form input[name='price']").val(curEquipment.price);
		$(winId + " form input[name='operate_user_name']").val(curEquipment.operate_user_name);
		$(winId + " form input[name='user_id']").val(curEquipment.user_id);
		$(winId + " form input[name='desc']").val(curEquipment.desc);
		$(winId + " form input[name='in_code']").val(curEquipment.in_code);
		$(winId + " form input[name='financial_code']").val(curEquipment.financial_code);
		$(winId + " form input[name='serials_code']").val(curEquipment.serials_code);
		$(winId + " form input[name='in_time']").val(curEquipment.in_time);
	}
	
	return true;
}

function on_btnUpdateEquipment_Click() {
	var eqId = this.getAttribute("eqid");
	mdlUpdateEquipment_populate(eqId);
	
	var winId = "#mdlUpdateEquipment";
	$(winId).modal({
		relatedTarget: this,
		onConfirm: function(options) {
			Log($(this.relatedTarget).attr("eqid"));
		},
		//closeViaDimmer: false,
		width: 900, 
		height: 600
	});
	
	return true;
}

function on_btnRemoveEquipment_Click() {
	var winId = "#mdlRemoveEquipment";
	$(winId).modal({
		relatedTarget: this,
		onConfirm: function(options) {
			var eqId = $(this.relatedTarget).attr('eqid');
			//Log(eqId);
			var post = {};
			post.id = eqId;
			$.post("../lib/data.php?act=delequipment", post, function (data) {
				if (data.err == 0) {
					cacheData(cacheKey().equipments, data.data);
					enterEquipmentsMgr().PopulatEquipmentTable(data.data);
					$('#tbl_equipments').DataTable(EnterEquipmentGridSetting());			
				} else {
					alert("error.");
				}
				return true;
			}, "json");
		},
		closeOnConfirm: false
		//closeViaDimmer: false
		// closeOnConfirm: false,
		//onCancel: function() {
		//	alert('算求，不删除了');
		//}
	});
		
	return true;
}