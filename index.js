var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + (q.pathname === '/' ? '/index.html' : q.pathname);

  if (!filename.endsWith('.html')) {
    filename += '.html';
  }

  fs.readFile(filename, function(err, data) {
    if (err) {
        fs.readFile('./404.html', function(err404, data404){
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write(err404 ? '404 Not Found' : data404);
      return res.end();
        });

    } else{
        res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
    }
  });
}).listen(8080);