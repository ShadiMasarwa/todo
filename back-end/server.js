const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 5000;
const taskRouter = require("./routes/TaskRouter");

app.use(cors());
app.use(express.json());
app.use("/", taskRouter);

app.listen(PORT, () => {
  console.log("Server running and listening to port " + PORT + "...");
});
