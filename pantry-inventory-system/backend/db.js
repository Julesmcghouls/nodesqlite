const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./pantry.db");

// Initialize DB schema & load JSON data
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_name TEXT,
    category TEXT,
    quantity REAL,
    storage_location TEXT,
    best_by_date TEXT,
    out_of_stock BOOLEAN
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT
  )`);

  // Insert default user for Basic Auth (username: admin, password: admin, role: admin)
  db.run(
    `INSERT OR IGNORE INTO users (username, password, role) VALUES (?, ?, ?)`,
    ["admin", "admin", "admin"]
  );
});

module.exports = db;