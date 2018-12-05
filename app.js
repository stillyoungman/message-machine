const express = require('express');
const app = express();
const path = require('path');



app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req,res,next)=>{
    res.sendFile(path.join(__dirname,'views','app','index.html'))
})

console.log(process);

app.listen(3000);