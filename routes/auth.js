const router =require('express').Router();
const User=require('../model/User');

router.post('/register', async (req,res)=>{
    const newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });

    try{
        const savedUser=await User.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }

    newUser.save();
   
})

// router.get('/',(req,res)=>{
//     const newUser = new User({
//         name:req.body.name,
//         email:req.body.email,
//         passward:req.body.passward
//     })
   
// })


module.exports=router;