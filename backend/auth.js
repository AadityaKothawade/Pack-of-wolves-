import express from "express";
import db from "../db/db.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
        if (result.rows.length > 0) {
            return res.status(400).send("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.query("INSERT INTO users (username, email, password) VALUES ($1, $2, $3)", [username, email, hashedPassword]);

        res.status(201).send("User created successfully");
    } catch (err) {
        console.error("Error while registering user:", err);
        res.status(500).send("An error occurred while registering the user");
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            return res.status(404).send("User not found");
        }

        const user = result.rows[0];
        const isMatched = await bcrypt.compare(password, user.password);

        if (!isMatched) {
            return res.status(400).send("Invalid credentials");
        }

        delete user.password;
        res.status(200).json(user);

    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).send("An error occurred during login");
    }
});

export default router;