const express = require("express");
const app = express();
const userRoutes = require("./routes/user.routes.js");
const authRoutes = require("./routes/auth.routes.js");

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});