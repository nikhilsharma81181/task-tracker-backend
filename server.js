const express = require("express");
const app = express();
const cors = require("cors")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.routes")
const {requireLogin } = require("./middlewares/validator")
const { projectRouter } = require("./routes/project.routes")
const { taskRouter } = require("./routes/task.routes")
const { commentRouter } = require("./routes/comment.routes")
const { statsRouter } = require("./routes/statistics.routes")
require("dotenv").config();


app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.get("/", (req, res) => {
    res.send("HOMEPAGE")
})

app.use("/user", userRouter)

app.use("/projects", requireLogin, projectRouter)

app.use("/tasks", requireLogin, taskRouter)

app.use("/comment", requireLogin, commentRouter)

app.use("/stats", requireLogin, statsRouter)

app.listen(process.env.PORT, async () => {
    try {
        console.log("Server is connected to DB")
    } catch (err) {
        console.log(err)
        console.log("Something went wrong")
    }
    console.log("Server is running")
})