
const express = require('express'),
      path = require('path');

//set up express app
const app = express();

app.use(express.static(path.join(__dirname, 'UI')));



//listen for request
const server = app.listen(process.env.port || 3000, () => {
    console.log('Server is up');
});




