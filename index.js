const express = require("express");
var cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db/db.js");
const teamRoutes = require("./routes/teamMemberRoutes.js");
const eventsRoutes = require("./routes/eventRoutes.js");

dotenv.config();
connectDB();
const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/api/team", teamRoutes);
app.use("/api/events", eventsRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
