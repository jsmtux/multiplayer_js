
function NetworkableState(x, y)
{
	this.x = x;
	this.y = y;
}

NetworkableState.prototype.copy = function(another)
{
	another.x = this.x;
	another.y = this.y;
}

function Networkable(texture, x, y)
{
	this.initState = new NetworkableState(x, y);
	this.nextState = new NetworkableState(x, y);

	this.sprite = new PIXI.Sprite(texture);

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

	console.log("--- rendering position " + this.sprite.position.x);
}

