function stopPropagation(event) {
	if (event && event.stopPropagation) {
		event && event.stopPropagation();
	} else {
		window.event.cancelBubble = true;
	}
}