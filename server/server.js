const path = require('path');
const express = require('express')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 1337;
var app = express();

app.use(express.static(publicPath));
 
// app.get('/', function (req, res) {
//   res.send('Hello World')
// })
 
app.listen(1337, ()=>{
    console.log(`Serever is up on port ${port}`);
});