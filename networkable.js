
function NetworkableState(x, y)
{
	this.x = x;
	this.y = y;
}

NetworkableState.prototype.copy = function(another)
{
	this.x = another.x;
	this.y = another.y;
}

function Networkable(tex_path, x, y)
{
	/* FIXME we are creating one new texture image every time, they should be stored in a map*/
	this.texture = PIXI.Texture.fromImage(tex_path);

	this.initState = new NetworkableState(x, y);
	this.nextState = new NetworkableState(x, y);
	this.staticData = {"texture":tex_path};

	this.sprite = new PIXI.Sprite(this.texture);

	this.sprite.anchor.x = 0.5;
	this.sprite.anchor.y = 0.5;

	this.sprite.position.x = x;
	this.sprite.position.y = y;
}

Networkable.lastUpdated = 0;

Networkable.prototype.getInitState = function()
{
	return this.initState;
}

Networkable.prototype.getNextState = function()
{
	return this.nextState;
}

Networkable.prototype.draw = function(percent)
{
	var init = this.getInitState();
	var next = this.getNextState();

	this.sprite.position.x = init.x + (next.x - init.x) * percent;
	this.sprite.position.y = init.y + (next.y - init.y) * percent;
}

