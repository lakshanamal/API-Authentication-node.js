const router = require("express").Router();
const User = require("../model/User");
const bcrypt=require('bcrypt');
const { authValidation } = require("../validation");

//validation

router.post("/register", async (req, res) => {
  // lets validate the data before we a user
  const { error } = authValidation(req.body); // error eka withari enne meken
  if (error) return res.status(400).send(error.details[0].message);
  
  // check user exesit in database
  const checkUser=await  User.findOne({email:req.body.email});
  if(checkUser) return res.status(400).send("User alredy in the system");

  // password encryption
  const salt= await bcrypt.genSalt(10);
  const hashedPassword=await bcrypt.hash(req.body.password,salt);
  console.log(hashedPassword);

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });
    
      try {
        const savedUser = await newUser.save(); // mongoose required
        res.send(savedUser);
      } catch (err) {
        res.status(400).send(err);
      }
  });

// router.get('/',(req,res)=>{
//     const newUser = new User({
//         name:req.body.name,
//         email:req.body.email,
//         passward:req.body.passward
//     })

// })

module.exports = router;
