const express = require('express');

var app = express();

app.set('view engine');
app.use(express.static(__dirname + '/public'));

app.get('/public', (req,res) => {
});

app.get('/bad', (req,res) => {
  res.send({
      errorMessage: 'There was an error'
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});