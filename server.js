//Math.floor(1000 + Math.random() * 9000)


import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

//set up express app
const app = express();

app.use(express.static(path.join(__dirname, 'UI')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/admin', (req, res) => {
    res.render('create-account');
})

//listen for request
app.listen(process.env.port || 3000, () => {
    console.log('Server is up');
});




