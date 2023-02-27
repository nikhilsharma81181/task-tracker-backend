const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
    {
        name: { type: String, isRequired: true, trim: true, min: 3, max: 40, },
        des: { type: String, trim: true, min: 3, max: 200, },
        color: { type: String, isRequired: true, trim: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, },
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now }
    }
)

const ProjectModel = mongoose.model("project", projectSchema);

module.exports = {
    ProjectModel
}