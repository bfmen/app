#!/sbin/node

var net = require('net');

function proxyPort(srcport, destServer, destport) {
  var server = net.createServer(function (c) { //'connection' listener

    c.on('end', function () {
      console.log('src disconnected');
    });

    var client = net.connect({ port: destport, host: destServer }, function () { //'connect' listener
      console.log('ok....');
      c.on('data', function (data) {
        console.log(data.length);
        client.write(data);
      });
    });

    client.on('error', function (err) {
      console.log("dest=" + err);
      c.destroy();
    });

    c.on('error', function (err) {
      console.log("src" + err);
      client.destroy();
    });

    client.on('data', function (data) {
      c.write(data);
    });

    client.on('end', function () {
      console.log('dest disconnected ');
    });

  });
  server.listen(srcport, function () { //'listening' listener
    console.log('server bound' + srcport);
  });
}

var params = process.argv;
if (params.length != 5) {
  console.log("node port.js srcport destserver destport ", params);
  return;
}

proxyPort(params[2], params[3], params[4]);

console.log(process.argv);

// node main 1080 127.0.0.1 1080
