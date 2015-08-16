
function Bunni(x, y) {

	this.texture = PIXI.Texture.fromImage("bunny.png");

	Networkable.call(this, this.texture, x, y);
}

Bunni.prototype = new Networkable();

