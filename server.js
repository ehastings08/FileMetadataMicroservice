var express = require('express');
var app = express();
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });
var server = require('http').Server(app);
var io = require('socket.io')(server);

var listener = server.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post("/get-file-size", upload.single('file'), function(req, res) {
  io.on('connection', function(socket) {
    socket.emit('alert', { filesize: req.file.size });
  });
  
  res.redirect('/');
});

