
function Bunni(x, y) {
	Networkable.call(this, "bunny.png", x, y);
}

Bunni.prototype = Object.create(Networkable.prototype);
Bunni.prototype.constructor = Bunny;

