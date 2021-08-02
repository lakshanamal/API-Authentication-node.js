const router = require("express").Router();
const User = require("../model/User");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const { authValidation,loginValidate} = require("../validation");

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

router.post('/login',async (req,res)=>{

    const email=req.body.email;
    const password=req.body.password;

    // validation
    const {error}=loginValidate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const validateUser=await User.findOne({email:email});  // return user that equal to entered email

    if(!validateUser) return res.status(400).send("Email or password invalid");

     const validatePassword=await bcrypt.compare(req.body.password,validateUser.password);
     if(!validatePassword) return res.status(400).send("Worng password");

     const token=jwt.sign({_id:validateUser.id},process.env.RANDOM_SECRET);
     res.header('auth-token',token).send(token);
     res.send("Logged in");
    // mn mokuth kiyannema na mai
    
})

module.exports = router;
