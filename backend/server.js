import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/meassage.routes.js"; // Fixed typo
import userRoutes from "./routes/user.routes.js";
import connecttoMongoDb from "./db/connecttoMongoDb.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

// Check if JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined');
    process.exit(1);
}

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000; // Use environment variable for PORT

app.use(express.json()); // to parse incoming JSON payloads
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Serve static files from the frontend build
app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Connect to MongoDB and start the server
connecttoMongoDb().then(() => {
    server.listen(PORT, () => {
        console.log(`Server Running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit process on failure
});
