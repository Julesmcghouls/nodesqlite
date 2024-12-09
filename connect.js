// Import sqlite3 module
import sqlite3 from 'sqlite3';

// Enable verbose mode for detailed logs
const sql3 = sqlite3.verbose();

// Connect to the SQLite database
const db = new sql3.Database('./mydata.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('Connected to the SQLite database.');
});

// SQL to create the table if it doesn't exist
const sql = `CREATE TABLE IF NOT EXISTS enemies (
    enemy_id INTEGER PRIMARY KEY AUTOINCREMENT,
    enemy_name TEXT NOT NULL,
    enemy_reason TEXT NOT NULL
)`;

// Execute the SQL command
db.run(sql, [], (err) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log('Table "enemies" created or already exists.');
});

// Export the database object
export { db };