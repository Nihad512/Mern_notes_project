const express=require('express');
const dotenv=require('dotenv').config();

const PORT=process.env.PORT||5000

const app =express();


app.get('/',(req,res)=>{
    res.json({message:'welcome to the Support API'})
})
//routes
app.use('/api/users',require('./routes/userRoutes'))


app.listen(PORT, ()=> console.log(`server started on port ${PORT}`));