const router = require('express').Router();
let social = require('../models/socials.model');
const User = require('../models/user.model');

router.route('/').get(async (req, res) => {
    let result = await social.find();
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(400).send("Error");
    }
});


router.route('/add').post(async (req, res) => {
    console.log(req.body);
    const { username, facebook, twitter, instagram } = req.body;
    try {
        const existingUser = await User.findOne({ username }); //bcoz implementing update functionality directly inside adding page

        console.log(username);
        if (existingUser) {
            const existingSocial = await social.findOne({ username });
            console.log('existing socials: ', existingSocial);
            if (existingSocial) {
                console.log(req.body + "socials exist");
                let result = await social.findByIdAndUpdate(existingSocial._id, req.body)
                if (result) {
                    console.log(existingSocial);
                    //errornious
                    const userIndex = existingUser.connections.findIndex(id => id.equals(existingSocial._id));
                    existingUser.connections[userIndex] = existingSocial._id;
                    await existingUser.save();

                    res.status(200).send({ message: "Social Updated till end" })
                    // res.status(200).send({ message: "Social Updated!" })
                } else {
                    console.log("line 36");
                    res.status(400).send({ message: "Error: " + err })
                }
            }
            else {
                try {
                    const newSocial = new social(req.body);
                    await newSocial.save();

                    try {
                        existingUser.connections.push(newSocial._id); // Assuming you want to store the social entry's _id
                        await existingUser.save();

                        res.status(200).send({ message: "Social Added and User updated!" });
                    } 
                    catch (error) {
                        res.status(404).send({ message: "User not found" });
                    }
                }
                catch (error) {
                    console.error("Error:", error);
                    res.status(500).send({ message: "An error occurred" });
                }


                // const newSocial = new social(req.body);
                // await newSocial.save()
                // console.log(newSocial);
                // //errorniuos:
                // existingUser.connections.push(newSocial);
                // await existingUser.save();

                // res.status(200).send({ message: "Social Added and User updated!" })
            }
        }
        else {
            console.log("Line 59");
            res.status(400).send({ message: "User not found for username: " + username })
        }

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error: " + error })
    }
})


//changes needed are left: in get using username
router.route('/:id').get(async (req, res) => {
    let result = await social.findById({ _id: req.params.id })
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(400).send("Error");
        console.log('error:', Error);
    }
});

router.route('/:id').delete(async (req, res) => {
    // social.findByIdAndDelete(req.params.id)
    //     .then(() => res.json('Social Deleted.'))
    //     .catch(err => res.status(400).json('Error: ' + err));
    let result = await social.findByIdAndDelete({ _id: req.params.id });
    if (result) {
        res.status(200).send({ message: "Social Deleted!" })
    } else {
        res.status(400).send({ message: "Error: " + err })
    }

});

router.route('/update/:id').post(async (req, res) => {
    let result = await social.findByIdAndUpdate({ _id: req.params.id }, req.body)
    if (result) {
        res.status(200).send({ message: "Social Updated!" })
    } else {
        res.status(400).send({ message: "Error: " + err })
    }
});

module.exports = router;