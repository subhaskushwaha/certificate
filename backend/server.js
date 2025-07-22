const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // ✅ Needed for static file paths
const Certificate = require("./models/Certificate");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve index.html on root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/certificates", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// API to verify certificate by name
app.post("/verify", async (req, res) => {
  const { name } = req.body;

  try {
    const cert = await Certificate.findOne({ name });

    if (cert) {
      res.json({ success: true, data: cert });
    } else {
      res.json({ success: false, message: "Certificate not found" });
    }
  } catch (err) {
    console.error("Error during verification:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
