const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.set('port', PORT);
app.set('env', NODE_ENV);




app.route('/Node').get(function (req, res) {
    try {
        const data = fs.readFileSync(path.join(__dirname, './stats.json'));
        const stats = JSON.parse(data);
        
        console.log(stats);

    } catch (e) {
        next(e);
    }

});

//app.use('/', require(path.join(__dirname, 'routes')));

app.use((req, res, next) => {
    const err = new Error(`${req.method} ${req.url} Not Found`);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
        },
    });
});

app.listen(PORT, () => {
    console.log(
        `Express Server started on Port ${app.get(
      'port'
    )} | Environment : ${app.get('env')}`
    );
});