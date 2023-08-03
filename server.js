require('dotenv/config');
const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require('./routes/Authentication')
const electionRoutes = require('./routes/Election')
const openElectionRoutes = require('./routes/OpenElection')
const closedElectionRoutes = require("./routes/ClosedElection")
const candidatesRoutes = require('./routes/Candidates')
const DB = "mongodb+srv://singhshivam14062001:Mohsin69@cluster0.n3fgstc.mongodb.net/?retryWrites=true&w=majority"
app.use(cors());
app.use(express.json({ limit: "5mb" }));

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

app.use('/api', authRoutes);
app.use('/api/election', electionRoutes);
app.use("/api/candidate", candidatesRoutes);
app.use("/api/election/open", openElectionRoutes);
app.use("/api/election/closed", closedElectionRoutes);

//! Home route
app.get("/", (req, res) => {
  return res.status(200).json("Node server running !!!");
});

app.get("*", (req, res) => {
  return res.status(404).json({ message: "Page not found" });
})

//! Listening port Route
app.listen(process.env.PORT, () => {
  console.log("Server running on PORT 5500");
});