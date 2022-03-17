// importing express
const express = require('express')
const app = express();

//importing filehandle from node js
const fs = require('fs')
const PORT = 3000;

//getting current date values
const d = new Date()

//getting only date value
const date = d.toISOString().slice(0, 10)

// updating the file format since filename cannot contain colon (:)
const filename = date+'-'+d.getHours()+'.'+d.getMinutes().toString()

// writing file in sync
fs.writeFileSync('DateTime/'+filename+'.txt', d.toString())


//reading the file
fs.readFile('DateTime/'+filename+'.txt', (err, data)=>{
    if(err)
    throw err
    else{
        // writing the data to server
        app.get('/',(req, res)=>{
            res.writeHeader(200,{"Content-Type":"text/html"})
            res.write(data)
            res.end()
        })
    }
})


// listener to the port
app.listen(PORT,()=>{
    console.log("Server is up in: " +PORT)
})