/** @namespace */
var io	= io || {};

/** worker object */
io._worker	= this;
/**
 * Delay the postMessage with a timer to avoid any sync operation
 * - network operation are async, dont change the logic
*/
io._postMessage	= function(message){
	setTimeout(function(){	io._worker.postMessage(message); }.bind(this), 0);
}


io._listeningSocket	= null;
io._boundSocket		= null;

/**
 * @returns {io.ListeningSocket} of the listening socket.io
*/
io.listen	= function(server, options)
{
	console.assert(!io._listeningSocket)

	io._worker.addEventListener('message', function(event){
		var eventType	= event.data.type;
		var eventData	= event.data.data;

// TODO imcomplete
		console.log("socketioServer from io._worker eventType", eventType)
		if( eventType === 'connect' ){
			console.assert(io._listeningSocket, "no listening socket");
			io._listeningSocket._onConnect(eventData);
		}else if( eventType === 'message' ){
			console.assert(io._boundSocket, "no bound socket");
			io._boundSocket._onMessage(eventData);			
		}else	console.assert(false, 'eventType '+eventType+' isnt handled')
	}, false);

	
	return new io.ListeningSocket();
}


//////////////////////////////////////////////////////////////////////////////////
//		io.ListeningSocket						//
//////////////////////////////////////////////////////////////////////////////////

/**
 * Socket.io
*/
io.ListeningSocket	= function()
{
	console.log("creating io.ListeningSocket")


	// set io._listeningSocket	
	console.assert(io._listeningSocket === null, "panic io._listeningSocket already set");
	io._listeningSocket	= this;
}

io.ListeningSocket.prototype._onConnect	= function(eventData)
{
	// notify the caller with "connected"
	io._postMessage({
		type	: 'connected'
	});
	// notify the io.ListeningSocket instance
	this.trigger('connection', new io.BoundSocket())
}
/**
 * Bind events
*/
io.ListeningSocket.prototype.on	= function(event, callback)
{
	// forward to MicroEvent
	this.bind(event, callback)
}

/**
 * Bind events
*/
io.ListeningSocket.prototype.removeListener	= function(event, callback)
{
	// forward to MicroEvent
	this.unbind(event, callback)
}

// mixin MicroEvent in this object
MicroEvent.mixin(io.ListeningSocket);


//////////////////////////////////////////////////////////////////////////////////
//		io.BoundSocket							//
//////////////////////////////////////////////////////////////////////////////////

/**
*/
io.BoundSocket	= function()
{
	this.sessionId	= "socketioEmuSessionId_42";
	// set io._boundSocket	
	console.assert(io._boundSocket === null, "panic io._boundSocket already set");
	io._boundSocket	= this;
}

// mixin MicroEvent in this object
MicroEvent.mixin(io.BoundSocket);

io.BoundSocket.prototype._onMessage	= function(eventData)
{
	console.log("BoundSocket._onMe2ssage", eventData)
	this.trigger('message', eventData);
}

/**
 * Bind events
*/
io.BoundSocket.prototype.on	= function(event, callback)
{
	// forward to MicroEvent
	this.bind(event, callback)
}

/**
 * Bind events
*/
io.BoundSocket.prototype.removeListener	= function(event, callback)
{
	// forward to MicroEvent
	this.unbind(event, callback)
}


/**
 * Send a message to the other end
*/
io.BoundSocket.prototype.send	= function(message)
{
	console.log("server send ", message)
	//socketioWorker.postmessage
	io._postMessage({
		type	: 'message',
		data	: message
	});
}


// export in common js
if( typeof module !== "undefined" && ('exports' in module)){
	module.exports	= io
}