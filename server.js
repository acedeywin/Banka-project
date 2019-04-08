import express from 'express';
import bodyParser from 'body-parser';
import apiRouter from './routers/apiRouter';

//set up express app
const  app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('UI'));

//Mount the routers
app.use('/api/v1', apiRouter);

//Catch error
app.use((req, res, next) => {
    var err = new Error('Not found');
    err.status = 404;
    next(err);
});

//error handler
app.use((err, req, res, next) => {
    //render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: req.app.get('env') === 'development' ? err : {}
    })
});

//listen for request
const PORT = 3002;
const server = app.listen(process.env.port || PORT, () => {
    console.log('Server is up...');
});

export default server;




