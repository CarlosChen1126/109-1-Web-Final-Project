const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');

require('dotenv').config()
const app = express()

// Body Parser Middleware
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));
//app.use(express.static('https://acs-web-final-project.herokuapp.com/public'));
app.use(cors());
app.use(express.json());
app.use(function(req, res, next) {
  //  res.header('Access-Control-Allow-Origin', 'http://localhost:3000' ||  'https://acs-web-final-project.herokuapp.com/')
    res.header('Access-Control-Allow-Origin',  '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
  })
  
const dboptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    auto_reconnect: true,
    useUnifiedTopology: true,
    poolSize: 10
  }
  // TODO : connect mongodb here
  
  if (!process.env.MONGO_URL) {
    console.error('Missing MONGO_URL!!!')
    process.exit(1)
  }
  
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  
  const db = mongoose.connection
  
  db.on('error', (error) => {
    console.error(error)
  })
  
  db.once('open', () => {
    console.log('MongoDB connected!') 
    })

routes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));