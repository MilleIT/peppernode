var zerorpc = require("zerorpc");

var client = new zerorpc.Client();
client.connect("tcp://127.0.0.1:4242");

client.invoke("start", function(error, res, more) {
    console.log(res);
});


// this is a test file, please dont remove yet but this isn't used
