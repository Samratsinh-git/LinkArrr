const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        mininput: 3
    },
    password: {
        type: String,
        required: true
    },
    connections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'social', 
    }],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
}, {
    timestamps: true,
});

//---------------Generating Token-----------------------
userSchema.methods.generateAuthToken = async function () {
    try {
        //syntax : jwt.sign(<PAYLOAD>,<SECRETKEY>,<[OPTIONS/CALLBACKS]>)
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token }); 
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

const User = mongoose.model('User', userSchema)
module.exports = User;