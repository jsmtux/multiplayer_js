function NetworkManager(scene) {
    this.local_objects = {};
    this.local_index = 0;
    this.remote_objects = {};
    this.scene = scene;
    this.received_data = {};
    this.websocket;
    this.connected = false;
}

NetworkManager.prototype.connect = function(url) {
    var object = this;
    this.websocket = new WebSocket(url);
    this.websocket.onopen = function(evt) { object.connected = true; console.log("connected"); };
    this.websocket.onclose = function(evt) { object.connected = false; console.log("disconnected"); };
    this.websocket.onmessage = function(evt) {
        object.received_data = JSON.parse(evt.data);
    };
    this.websocket.onerror = function(evt) { 
        console.log('error: ' + evt.data + '\n');
        object.websocket.close();
        object.connected = false;
    };
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
    this.websocket.send(JSON.stringify(infoToSend));
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
