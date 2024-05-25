import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs'; // For hashing and checking passwords securely
import jwt from 'jsonwebtoken'; // For issuing JWTs
import userModel from './models/user.js'; // Adjusted import path

const app = express();
app.use(express.json());
app.use(cors());

// Environment variable for MongoDB URI and secret key
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/VCP";
const secretKey = process.env.SECRET_KEY || "your_secret_key_here";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Could not connect to MongoDB", err));

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Create and assign a token
        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
        res.json({ token, message: "Logged in successfully" });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

app.post('/register', async (req, res) => {
  try {
    // Hash the password before saving to database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new userModel({
        ...req.body,
        password: hashedPassword
    });

    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ message: "Email already exists." });
    } else {
      res.status(500).json(err);
    }
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
