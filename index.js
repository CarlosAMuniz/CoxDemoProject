var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/"] = requestHandlers.start;
handle["/reserveTimeSlot"] = requestHandlers.reserveTimeSlot;
handle["/reservingTimeSlot"] = requestHandlers.reservingTimeSlot;
server.start(router.route, handle);