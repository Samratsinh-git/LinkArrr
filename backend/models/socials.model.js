const mongoose = require("mongoose")

const Schema = mongoose.Schema;
const socialsSchema = new Schema({
    username: { type: String, required: true },
    linkedin: { type: String /* sparse: true*/ },
    instagram: { type: String /*sparse: true */ },
    facebook: { type: String /*sparse: true */ },
    snapchat: { type: String /*sparse: true */ },
    twitter: { type: String /*sparse: true */ },
    reddit: { type: String /*sparse: true */ },
    telegram: { type: String /*sparse: true */ },
    twitch: { type: String /*sparse: true */ },
    discord: { type: String /*sparse: true */ },
    teams: { type: String /*sparse: true */ },
    quora: { type: String /*sparse: true */ },
    skype: { type: String /*sparse: true */ },
    pinterest: { type: String /*sparse: true */ }
}, { timestamps: true });

socialsSchema.index(
    { linkedin: 1, instagram: 1, facebook: 1, snapchat: 1, twitter: 1, reddit: 1, telegram: 1, twitch: 1, discord: 1, teams: 1, quora: 1, skype: 1, pinterest: 1 },
    { unique: true, sparse: true }
);

const social = mongoose.model('social', socialsSchema)
module.exports = social;