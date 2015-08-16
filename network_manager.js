function NetworkManager(scene) {
	this.local_objects = {};
	this.local_index = 0;
	this.remote_objects = {};
	this.scene = scene;
	this.received_data = {};
}

NetworkManager.prototype.addObject = function(object){
	this.local_objects[this.local_index++] = object;
}

NetworkManager.prototype.sendState = function(){
	var infoToSend = {};
	for (var i in this.local_objects)
	{
		// TODO: only send fields that are different in current and next state
		infoToSend[i] = this.local_objects[i].getNextState();
		// TODO: only send static data if this is the first time we send a object
		infoToSend[i].staticData = this.local_objects[i].staticData;
	}
	//sendInfo(infoToSend);
	this.received_data = infoToSend;
	console.log(JSON.stringify(infoToSend));
}

NetworkManager.prototype.updateState = function(){
	for (var i in this.received_data)
	{
		if (this.remote_objects[i] === undefined)
		{
			//FIXME we should have a factory that would create the different types of objects from the JSON description
			var obj = new Networkable(this.received_data[i].staticData.texture, this.received_data[i].x, this.received_data[i].y);
			console.log("adding new object " + obj);
			this.remote_objects[i] = obj;
			this.scene.addRemoteObject(obj);
		}
		else
		{
			console.log("received data for object " + i);
			this.remote_objects[i].getNextState().copy(this.received_data[i]);
			this.remote_objects[i].getNextState().x += 100;
		}
	}
	this.received_data = {};
}
