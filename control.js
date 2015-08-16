
var keyNames = {
	UP: 38,
	DOWN:40, 
	LEFT:37,
	RIGHT:39
};

var keys = {
	37: false,
	38: false,
	39: false,
	40: false,
};

function keyDown(event) {
	var key = event.keyCode || event.which;
	if (keys[key] !== undefined)
		keys[key] = true;
}

function keyUp(event) {
	var key = event.keyCode || event.which;
	if (keys[key] !== undefined)
		keys[key] = false;
}

