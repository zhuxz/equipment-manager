function EquipmentGridSetting() {
	var ret = {
        "oLanguage": {
            "sSearch": "搜索:",
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "没有记录",
            "sInfoFiltered": "(从 _MAX_ 条记录中过滤)",
            "sInfo": "显示第  _START_ 条到第  _END_ 条记录,一共  _TOTAL_ 条记录",
            "sInfoEmpty": "显示0条记录",
            "oPaginate": {
                "sPrevious": " 上一页 ",
                "sNext":     " 下一页 ",
                }
            },
            "bAutoWidth":false,
            "bPaginate":true,
            "bRetrieve":true,
            "bSort":true,
            "bFilter":true
    };
	return ret;
}

function EquipmentsMgr(containerId, tableId) {
	if (typeof tableId != "undefined") this.tableId = tableId;
	if (typeof containerId != "undefined") this.containerId = containerId;
}

EquipmentsMgr.prototype = {
	constructor : EquipmentsMgr,
	tableId : "tbl_equipments",
	containerId : "divEquipmentsContainer",
	BuildEquipmentHead : function () {
		var s = [];
		s.push("<tr>");
		s.push("<th><a style='border-style: none none outset;' href='enter_equipment.html'>设备入库</a></th>");
		s.push("<th><a href='out_storage.html'>设备出库</a></th>");
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
	},
	BuildEquipmentRow : function (data) {
		var s = [];
		s.push("<tr eqid='", data.id, "'>");
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
		s.push("<button class='am-btn am-btn-default am-btn-sm am-text-secondary' btnUpdateEquipment eqid='", data.contract_code, "'>");
		s.push("<span class='am-icon-pencil-square-o'></span> 修改");
		s.push("</button>");
		s.push("<button class='am-btn am-btn-default am-btn-sm am-text-danger am-hide-sm-only' btnRemoveEquipment eqid='", data.id, "'>");
		s.push("<span class='am-icon-trash-o'></span> 删除");
		s.push("</button>");
		s.push("</div>");
		s.push("</div>");
		s.push("</td>");
		s.push("</tr>");

		return s.join("");
	},
	PopulatEquipmentTable : function (data) {
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
		
		$("#" + this.containerId).html(s.join(""));
		return true;
	}
};