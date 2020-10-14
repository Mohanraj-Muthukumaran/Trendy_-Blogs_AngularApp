//Install express server
const express = require('express');
const path = require('path');
 
const app = express();
 
// Serve only the static files form the angularapp directory
app.use(express.static('https://'+__dirname + '/angularapp'));
 
app.get('/*', function(req,res) {
    res.sendFile(path.join('https://'+__dirname+'/angularapp/index.html'));
});
 
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);