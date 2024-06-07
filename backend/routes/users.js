const router = require('express').Router();
const { HttpStatusCode } = require('axios');
let User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('../modules/auth');
const cookieParser = require("cookie-parser");

router.use(cookieParser());

//doubt => can we do the same routing through just app.get methods like did by colt steel? 
//Ans Yes u can, differnce is- use get and post direct methods when the routes of different files do not relate with each other... when u think that they can relate but u dont want them to interfere use router.route........['}
// Also note that here we r just using '/' & not '/user' all coz of krupa of app.use('/users', usersRouter); in server.js !!!
router.route('/').get(async (req, res) => {
    let result = await User.find().populate("connections");
    console.log(result);
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(400).send("Error: " + console.error());
    }
});
//----------------------userPage-----------------------------------------------------------------------------------------------------------------
router.route('/:userID')
    .get(authenticate, async (req, res) => {
        // console.log("LINE 26");
        try {
            const userID = req.params.userID;
            console.log(userID);
            const user = await User.findById(userID).populate("connections");
            if (user) {
                console.log("1");
                return res.status(200).send(user);
            } else {
                console.log("2");
                res.status(404).send({ error: 'User not found' });
            }
        } catch (error) {
            console.log("3");
            res.status(500).send({ error: 'Internal server error' });
        }
    });
//-------------------------------------------LOGIN:--------------------------------------------------------------------------------------------
router.route('/').post(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(200).json({ data: "User doesn't exist" });
    }
    const token = await user.generateAuthToken();
    console.log(token);

    res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        sameSite:'none',
        secure:true
    });
//akksjdh
    

    bcrypt.compare(password, user.password, function (err, re) {
        // console.log("1");
        if (err) {
            // console.log("2");
            return res.status(200).json({ data: "Internal Error" })
        }
        else if (re) {
            // console.log("3");
            return res.status(200).json({ data: "Login successful", user: user, token : 'Bearer ' + token });
        }
        else {
            // console.log("4");
            return res.status(200).json({ data: "Invalid Password" })
        }
    })
});
// res.status = HttpStatus.Ok
// res.end("Login Successful")
// return res.status(201).json({message:"Login successful",status:201})
// res.status(200).json({
//     status: 'success',
//     results: 5,
//     data:"Login successful"
// });
// res.status(200).json(user);
//------------------------------------------------------------------------------------------------------------------------------------------

// const username = req.body.username;  // use this when u want to fetch only userrname from the requested body i.e req.body and then pass it as single key value pair in newUser viz {username}
// const newUser = new User(
//     req.body
// );

// // let result = await newUser.save();
// await newUser.save();
// if (newUser) {
//     res.status(200).send(newUser);
// } else {
//     res.status(400).send("Error");
// }
//----------------------------Too backward version:-----------------------------------------------------------------------------------------------------------
// .then(() => res.json('User Added!!'))
// .catch(err => res.status(400).json('Error: ' + err))
//-----------------------------------------SIGNUP----------------------------------------------------------------------------
router.route('/add').post(async (req, res) => {

    const { name, username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
        console.log("User already exists ni error");    
        return res.status(400).json({ data: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    newUser = new User({
        name,
        username,
        email,
        password: hashedPassword,
    });

    console.log(newUser+"here");

    try {
        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        // res.status(400).send('Error: ' + error.message);
        res.status(400).json({ data: "Error" });
    }

});


// newUser = new User({
//     username,
//     password: hashedPassword,
// });
// try {
//     await newUser.save();
//     res.status(200).json(newUser);
// } catch (error) {
//     // res.status(400).send('Error: ' + error.message);
//     res.status(400).json({data:"Error"});
// }


module.exports = router;