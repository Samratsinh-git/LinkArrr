const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const Authenticate = async (req, res, next) => {
  // console.log(req);
  try {
    console.log("line 7: " + req.cookies.jwtoken);
    const authHeader = req.headers["authorization"];
    // console.log(authHeader);
    const token = authHeader.split(" ")[1];
    // console.log("Line 11: " + token);
    
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Verified");
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User Not Found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();
  } catch (error) {
    res.status(401).send("Unauthorized: No token provided");
    console.log("HERE");
    console.log(error);
  }
};

module.exports = Authenticate;
