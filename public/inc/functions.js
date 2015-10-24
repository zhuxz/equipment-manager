function InitComboBox(target, title, list) {
	var jqTarget = (typeof target == "string" ? $("#" + target) : target);
	var s = [];
	s.push("<option value='-1'>", title, "</option>");
	$.each(data, function (i, option) {
		s.push("<option value='", option.id, "'>", option.desc, "</option>");
		return true;
	});
	jqTarget.html(s.join(""));
	return true;
}