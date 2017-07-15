$(function() {
  var socket = io();
  socket.on('alert', function(data) {
    var file_size = data.filesize;
    alert('File size: '+file_size);
  });
});