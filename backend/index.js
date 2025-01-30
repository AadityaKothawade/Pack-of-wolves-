import express from "express";
import authRoutes from "./routes/auth.js"
import groupRoutes from "./routes/group.js"

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/groups", groupRoutes);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});