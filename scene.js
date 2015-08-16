
function Scene(width, height)
{
	this.objects = [];
	this.network_manager = new NetworkManager(this);

	this.stage = new PIXI.Stage(0x66FF99);

	this.renderer = PIXI.autoDetectRenderer(width, height);

	document.body.appendChild(this.renderer.view);
}

Scene.prototype.addObject = function(obj)
{
	this.objects.push(obj);
	this.network_manager.addObject(obj);
	this.stage.addChild(obj.sprite);
}

Scene.prototype.addRemoteObject = function(obj)
{
	this.objects.push(obj);
	this.stage.addChild(obj.sprite);
}

Scene.prototype.drawAll = function(percent)
{
	for (var i in this.objects) {
		this.objects[i].draw(percent);
	}
	this.renderer.render(this.stage);
}

Scene.prototype.prepareUpdate = function()
{
	for (var i in this.objects){
		this.objects[i].getInitState().copy(this.objects[i].getNextState());
	}
	this.network_manager.updateState();
}

Scene.prototype.finishUpdate = function()
{
	this.network_manager.sendState();
	Networkable.lastUpdated = getMillis();
}
