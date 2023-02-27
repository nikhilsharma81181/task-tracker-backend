const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
    {
        name: { type: String, isRequired: true, trim: true, min: 3, max: 40, },
        desc: { type: String, isRequired: true, trim: true, min: 3, max: 200, },
        projectID: { type: mongoose.Schema.Types.ObjectId, ref: 'project', required: true, },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true, },
        status: { type: String, isRequired: true, default: "new" },
        duration: { type: Number, default: 0 },
        initialTime: { type: Date, default: Date.now },
        endTime: { type: Number, default: Date.now },
        isActive: { type: Boolean, default: false}
    }
)

const TaskModel = mongoose.model("task", taskSchema)

module.exports = {
    TaskModel
}