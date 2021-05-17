const express=require('express');
const app=express();

app.use(express.json());
// Import router 
const authRoute=require('./routes/auth');

// rorute middleWare
app.use('/api/user',authRoute);



app.listen(3001,()=>{
    console.log("Server runnung port 3000");
})