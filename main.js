
function main()
{
	var totalIterations = 3000;
	var animatePixels = 5;
	var sceneWidth = 800;
	var sceneHeight = 300;

	var iteration = 0;
	var ended = false;

	var updateLoopTime = 1000 / 15;

	var scene = new Scene(sceneWidth, sceneHeight);

	var bunni = new Bunni(200, 150);

	scene.addObject(bunni);

	var updateInterval = setInterval(update, updateLoopTime);

	requestAnimationFrame(render);

	function update() {

		var init = bunni.getInitState();
		var next = bunni.getNextState();

		next.copy(init);

		/* FIXME Handle up + left cases move sprite faster */
		if (keys[keyNames.UP]) {
			next.y += -animatePixels;
		}
		if (keys[keyNames.DOWN]) {
			next.y += animatePixels;
		}
		if (keys[keyNames.LEFT]) {
			next.x += -animatePixels;
		}
		if (keys[keyNames.RIGHT]) {
			next.x += animatePixels;
		}

		if (keys[keyNames.ESC]) {
			ended = true;
		}

		console.log("init position " + init.x);

		Networkable.lastUpdated = getMillis();

		if (ended) {
			clearInterval(updateInterval);
		}
		iteration++;
	}

	function render() {

		var elapsed = getMillis() - Networkable.lastUpdated;

		if (elapsed < updateLoopTime) { /* if you remove this, shit happens */
			scene.drawAll(elapsed / updateLoopTime);
		}
		if (!ended) {
			requestAnimationFrame(render);
		}
	}
}

