// first we require the library
const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/contact_list_db'); // to connect to database
const db = mongoose.connection;  //aqquire the connection(if it is error or running up)

// error
db.on('error', console.error.bind(console, 'connection error:'));

//server up and running
db.once('open', function() {
  console.log("successfully connected");
});

