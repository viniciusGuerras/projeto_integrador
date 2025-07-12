const materialRoutes = require("./routes/material.routes.js");
const classroomRoutes = require("./routes/room.routes.js");
const userRoutes = require("./routes/user.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const express = require("express");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/materials", materialRoutes);
app.use("/classrooms", classroomRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});