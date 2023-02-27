const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: { type: String, isRequired: true, trim: true, min: 3, max: 40, },
        email: { type: String, isRequired: true, trim: true, unique: true, lowercase: true, },
        pass: { type: String, isRequired: true },
    },
    {
        timestamps: true,
    }
)

const UserModel = mongoose.model("user", userSchema);

module.exports = {
    UserModel
}