var express = require('express'),
    request = require('request'),
    im      = require('im');

var app = express.createServer(express.logger());

app.get('/', function(req, res){
  res.send('Hello World');
});

app.get('/v1/img', function(req, res) {
  if(!req.param('url') || req.param('size') == null) {
    res.send('Usage: /img?url=URL&size=IMAGEMAGICK_SIZE', 400);
  } else if(req.param('size') == '') { // empty string is just no resize
    res.redirect(req.param('url')); // 302. TODO: 301 (permanent)?
  } else {
    im(request.get(req.param('url'))).resize(req.param('size')).convert(res);
  }
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Listening on " + port);
});