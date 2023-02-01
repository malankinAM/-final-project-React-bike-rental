const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    firstName: {type: String},
    lastName: {type: String},
    password: {type: String, required: true},
    clientId: {type: String, required: true, unique: true},
    approved: {type: Boolean}
})

module.exports = model("User",userSchema)