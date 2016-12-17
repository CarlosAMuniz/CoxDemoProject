var http = require("http");
var url =  require("url");

function start(route, handle) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        var postData = "";
        console.log("Request for " + pathname + " received");
        console.log("Request Method is = " + request.method);
        request.setEncoding("utf8");

        request.on('data', function (postDataChunk) {
            postData += postDataChunk;
            console.log("");
            console.log("Received POST data chunk '" + postDataChunk + "'.");
            console.log("");
        });
        request.on('end', function () {
            console.log("Ended receving chunks " + postData);
            route(handle, pathname, response, postData);
        });
        
    }


    http.createServer(onRequest).listen(8888);
    console.log("Server has started");
}

exports.start = start;
