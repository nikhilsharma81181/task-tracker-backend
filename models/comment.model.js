const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
    {
        text: { type: String, isRequired: true, trim: true, min: 3, max: 40, },
        taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'tasks', required: true, },
        time: { type: Date, default: Date.now },
    }
)

const CommentModel = mongoose.model("comment", commentSchema)

module.exports = {
    CommentModel
}