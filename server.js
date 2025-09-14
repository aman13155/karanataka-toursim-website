const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); // serve frontend

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/karnatakaTourism", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Error:", err));

// Schemas
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  place: String,
  date: { type: Date, default: Date.now }
});

const SupportSchema = new mongoose.Schema({
  name: String,
  email: String,
  service: String,
  details: String,
  date: { type: Date, default: Date.now }
});

// Models
const User = mongoose.model("User", UserSchema);
const Booking = mongoose.model("Booking", BookingSchema);
const Support = mongoose.model("Support", SupportSchema);

// Routes
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  await newUser.save();
  res.json({ message: "User registered successfully!" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) res.json({ message: "Login successful" });
  else res.json({ message: "Invalid credentials" });
});

// Booking
app.post("/booking", async (req, res) => {
  const { name, email, place, date } = req.body;
  const newBooking = new Booking({ name, email, place, date });
  await newBooking.save();
  res.json({ message: "Booking successful!" });
});

// Support
app.post("/support", async (req, res) => {
  const { name, email, service, details } = req.body;
  const newSupport = new Support({ name, email, service, details });
  await newSupport.save();
  res.json({ message: "Support request submitted!" });
});

// Admin routes
app.get("/admin/users", async (req, res) => res.json(await User.find()));
app.get("/admin/bookings", async (req, res) => res.json(await Booking.find()));
app.get("/admin/support", async (req, res) => res.json(await Support.find().sort({ date: -1 })));

// Start server
app.listen(5000, () => console.log("🚀 Server running at http://localhost:5000"));
