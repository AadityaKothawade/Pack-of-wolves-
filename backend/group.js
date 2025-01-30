import express from "express";
import db from "../db/db.js";

const router = express.Router();

router.post("/create", async (req, res) => {
    const { name, description, created_by } = req.body;

    try {
        const result = await db.query(
            "INSERT INTO groups (name, description, created_by) VALUES ($1, $2, $3) RETURNING *",
            [name, description, created_by]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error creating group:", err);
        res.status(500).send("Server error");
    }
});

router.post("/join", async (req, res) => {
    const { user_id, group_id, role } = req.body;

    try {
        await db.query(
            "INSERT INTO group_members (user_id, group_id, role) VALUES ($1, $2, $3)",
            [user_id, group_id, role]
        );
        res.status(200).send("Joined group successfully with role: " + role);
    } catch (err) {
        console.error("Error joining group:", err);
        res.status(500).send("Server error");
    }
});

router.get("/:id/members", async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            `SELECT users.id, users.username FROM group_members 
             JOIN users ON group_members.user_id = users.id 
             WHERE group_members.group_id = $1`,
            [id]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error("Error fetching group members:", err);
        res.status(500).send("Server error");
    }
});

export default router;