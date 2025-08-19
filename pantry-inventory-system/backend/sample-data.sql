-- Sample data for the pantry inventory system
-- Run this after the database is created to populate with example items

INSERT INTO items (item_name, category, quantity, storage_location, best_by_date, out_of_stock) VALUES
('Canned Tomatoes', 'Pantry', 5, 'Shelf A1', '2025-12-31', 0),
('Whole Wheat Bread', 'Bakery', 1, 'Counter', '2024-12-20', 0),
('Milk', 'Dairy', 2, 'Refrigerator', '2024-12-18', 0),
('Apples', 'Produce', 8, 'Refrigerator Crisper', '2024-12-25', 0),
('Rice', 'Pantry', 3, 'Shelf B2', 'Forever', 0),
('Expired Yogurt', 'Dairy', 0, 'Refrigerator', '2024-12-01', 1),
('Pasta', 'Pantry', 6, 'Shelf A2', '2025-06-15', 0),
('Chicken Breast', 'Meat', 2, 'Freezer', '2024-12-22', 0),
('Olive Oil', 'Pantry', 1, 'Shelf C1', '2025-08-30', 0),
('Bananas', 'Produce', 0, 'Counter', '2024-12-16', 1),
('Cereal', 'Pantry', 2, 'Shelf A3', '2025-03-15', 0),
('Cheese', 'Dairy', 1, 'Refrigerator', '2024-12-28', 0),
('Ground Beef', 'Meat', 1, 'Freezer', '2025-01-15', 0),
('Lettuce', 'Produce', 1, 'Refrigerator Crisper', '2024-12-17', 0),
('Canned Beans', 'Pantry', 4, 'Shelf A1', '2026-01-20', 0);