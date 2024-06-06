const express = require('express') 
const connectToMongo = require('./db'); 
 
connectToMongo(); 
 
const app = express() 
const port = 5000 
 
app.use(express.json()) 
 
//available routes f
app.get('/',(req, res)=>{ 
    res.send("Hello Harshith!") 
}) 
app.use('/api/auth', require('./routes/auth')) 
app.use('/api/notes', require('./routes/notes'))
 
app.listen(port, () => { 
  console.log(`Your app listening on port http://localhost:${port}`) 
})