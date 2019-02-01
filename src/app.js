var express = require("express");
var bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const {
  sequelize
} = require('./models')
// const a =
//   sequelize;
// console.log(a);
/// configFile
var config = require('./config/config');
var app = express();
//var db = require('./db');

app.use(morgan('combined'));
app.use(cors());


// create application/json parser
app.use(bodyParser.json());
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/', function (req, res) {
  res.send('Hello World!!');
});

app.get('/status', (req, res) => {
  res.status(200).send({
    message: 'get status'
  })
})
// routes
require('./routes')(app);
// app.post('/register', (req, res) => {
//   console.log('requested');
//   res.send('sss');
// })


sequelize.sync()
  .then(() => {
    app.listen(config.port);
    console.log(`Running at the ${config.port}`);
    console.log(`Database & tables created!`)
  })
