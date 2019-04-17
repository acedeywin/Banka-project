import express from 'express';
import bodyParser from 'body-parser';
import apiRouter from './routers/apiRouter';

//set up express app
const  app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));
app.use(express.static('./UI'));

//Mount the routers
app.use('/api/v1', apiRouter);

//Handling non-error input
app.use( (req, res, next) => {
    res.status(200);
    res.send({
        message: "200 OK"
    })
})

//Catch error
app.use((req, res, next) => {
    let err = new Error('Not found');
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
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3005;
  console.log(`Server is up @ ${port}... And running!!!`);
}
const server = app.listen(port);

export default server;




