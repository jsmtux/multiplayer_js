
function Scene(width, height)
{
	this.objects = [];

	this.stage = new PIXI.Stage(0x66FF99);

	this.renderer = PIXI.autoDetectRenderer(width, height);

	document.body.appendChild(this.renderer.view);
}

Scene.prototype.addObject = function(obj)
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

