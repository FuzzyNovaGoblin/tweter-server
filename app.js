const express = require('express')
const app = express();
const port = 8000;
const path = require('path');

//app.get('/', (req, res) => {
//    res.send('Hello World!')
//});

console.log(path.join(__dirname, 'web/index.html'))
app.use('/', express.static(path.join(__dirname, 'web/')));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
