import { db } from "./connect.js";

import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send("Mortal service online");
});

app.get('/api', (req, res) => {
    // SQL query to fetch all rows from the "enemies" table
    const sql = "SELECT * FROM enemies";

    // Initialize the response data object
    const data = { enemies: [] };

    // Query the database
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            // Respond with an error JSON if the query fails
            return res.status(500).json({ code: 500, status: err.message });
        }

        // Process rows into the data object
        rows.forEach((row) => {
            data.enemies.push({
                id: row.enemy_id,
                name: row.enemy_name,
                reason: row.enemy_reason,
            });
        });

        // Respond with the formatted JSON data
        res.set('Content-Type', 'application/json');
        res.status(200).json(data);
    });
});

app.post('/api', (req, res) => {
    // Example: Adding a new enemy
    const { name, reason } = req.body;

    if (!name || !reason) {
        return res.status(400).json({ code: 400, status: "Missing name or reason" });
    }

    const sql = "INSERT INTO enemies (enemy_name, enemy_reason) VALUES (?, ?)";
    db.run(sql, [name, reason], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ code: 500, status: err.message });
        }

        res.status(201).json({
            id: this.lastID,
            name,
            reason,
            message: "Enemy added successfully",
        });
    });
});

app.delete('/api', (req, res) => {
    // Example: Deleting an enemy by ID
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ code: 400, status: "Missing enemy ID" });
    }

    const sql = "DELETE FROM enemies WHERE enemy_id = ?";
    db.run(sql, [id], function (err) {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ code: 500, status: err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ code: 404, status: "Enemy not found" });
        }

        res.status(200).json({ message: "Enemy deleted successfully", id });
    });
});

// Start the server on port 3666
app.listen(3666, (err) => {
    if (err) {
        console.error('ERROR:', err.message);
    } else {
        console.log("LISTENING ON PORT 3666");
    }
});

export default app;