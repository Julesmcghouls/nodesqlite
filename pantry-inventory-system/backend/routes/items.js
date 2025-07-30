const express = require("express");
const router = express.Router();
const db = require("../db");

// GET items with pagination, search, sorting
router.get("/", (req, res, next) => {
  const { page = 1, limit = 10, search = "", sort = "best_by_date" } = req.query;
  const offset = (page - 1) * limit;

  let baseQuery = "SELECT * FROM items WHERE item_name LIKE ?";
  let countQuery = "SELECT COUNT(*) as total FROM items WHERE item_name LIKE ?";
  let params = [`%${search}%`];

  if (sort === "best_by_date") {
    baseQuery += " ORDER BY best_by_date ASC";
  } else if (sort === "category") {
    baseQuery += " ORDER BY category ASC";
  } else {
    baseQuery += " ORDER BY id ASC";
  }

  baseQuery += " LIMIT ? OFFSET ?";
  params.push(parseInt(limit), parseInt(offset));

  db.all(baseQuery, params, (err, rows) => {
    if (err) return next(err);
    db.get(countQuery, [`%${search}%`], (err, countRow) => {
      if (err) return next(err);
      res.json({
        items: rows,
        total: countRow.total,
        page: parseInt(page),
        limit: parseInt(limit),
      });
    });
  });
});

// POST add item
router.post("/", (req, res, next) => {
  const {
    item_name,
    category,
    quantity,
    storage_location,
    best_by_date,
    out_of_stock,
  } = req.body;

  db.run(
    `INSERT INTO items (item_name, category, quantity, storage_location, best_by_date, out_of_stock)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [item_name, category, quantity, storage_location, best_by_date, out_of_stock],
    function (err) {
      if (err) return next(err);
      res.json({ id: this.lastID });
    }
  );
});

// PUT update item by id
router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const {
    item_name,
    category,
    quantity,
    storage_location,
    best_by_date,
    out_of_stock,
  } = req.body;

  db.run(
    `UPDATE items SET item_name=?, category=?, quantity=?, storage_location=?, best_by_date=?, out_of_stock=? WHERE id=?`,
    [item_name, category, quantity, storage_location, best_by_date, out_of_stock, id],
    function (err) {
      if (err) return next(err);
      res.json({ updated: this.changes });
    }
  );
});

// DELETE item by id
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  db.run("DELETE FROM items WHERE id=?", [id], function (err) {
    if (err) return next(err);
    res.json({ deleted: this.changes });
  });
});

module.exports = router;