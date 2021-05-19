const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Acess Denied");

  // if exists 
  try{
    const verified=jwt.verify(token,process.env.RANDOM_SECRET);
    req.user=verified;
  }catch(error){
    res.status(400).send('Invalid token');
  }
}


