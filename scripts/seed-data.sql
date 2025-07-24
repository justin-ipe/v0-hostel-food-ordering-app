-- Seed data for hostel food ordering system

-- Insert default location
INSERT INTO locations (name, address, phone, is_active) VALUES
('Main Campus Hostel', 'University Campus, Block A', '+91-9876543210', true)
ON CONFLICT DO NOTHING;

-- Insert sample users
INSERT INTO users (name, email, phone, address) VALUES
('John Doe', 'john.doe@university.edu', '+91-9876543210', 'Room 205, Block A, University Hostel'),
('Jane Smith', 'jane.smith@university.edu', '+91-9876543211', 'Room 301, Block B, University Hostel'),
('Mike Johnson', 'mike.johnson@university.edu', '+91-9876543212', 'Room 102, Block A, University Hostel'),
('Sarah Wilson', 'sarah.wilson@university.edu', '+91-9876543213', 'Room 405, Block C, University Hostel'),
('David Brown', 'david.brown@university.edu', '+91-9876543214', 'Room 203, Block B, University Hostel')
ON CONFLICT (email) DO NOTHING;

-- Insert sample menu items
INSERT INTO menu_items (name, description, price, category, image_url, is_vegetarian, is_available, location_id) VALUES
('Chicken Biryani', 'Aromatic basmati rice with tender chicken pieces and traditional spices', 120.00, 'rice', '/placeholder.svg?height=200&width=300', false, true, 1),
('Veg Biryani', 'Fragrant basmati rice with mixed vegetables and aromatic spices', 100.00, 'rice', '/placeholder.svg?height=200&width=300', true, true, 1),
('Paneer Butter Masala', 'Creamy tomato curry with soft paneer cubes', 100.00, 'curry', '/placeholder.svg?height=200&width=300', true, true, 1),
('Chicken Curry', 'Traditional spicy chicken curry with authentic Indian spices', 110.00, 'curry', '/placeholder.svg?height=200&width=300', false, true, 1),
('Dal Tadka', 'Yellow lentils tempered with cumin, garlic, and spices', 70.00, 'curry', '/placeholder.svg?height=200&width=300', true, true, 1),
('Veg Fried Rice', 'Wok-tossed rice with fresh vegetables and soy sauce', 80.00, 'rice', '/placeholder.svg?height=200&width=300', true, true, 1),
('Chicken Fried Rice', 'Stir-fried rice with chicken pieces and vegetables', 95.00, 'rice', '/placeholder.svg?height=200&width=300', false, true, 1),
('Samosa', 'Crispy pastry filled with spiced potatoes and peas', 25.00, 'snacks', '/placeholder.svg?height=200&width=300', true, true, 1),
('Pakora', 'Deep-fried fritters made with gram flour and vegetables', 30.00, 'snacks', '/placeholder.svg?height=200&width=300', true, true, 1),
('Chicken Roll', 'Grilled chicken wrapped in soft roti with vegetables', 60.00, 'snacks', '/placeholder.svg?height=200&width=300', false, true, 1),
('Masala Chai', 'Traditional Indian spiced tea with milk', 15.00, 'beverages', '/placeholder.svg?height=200&width=300', true, true, 1),
('Fresh Lime Water', 'Refreshing lime juice with mint and salt', 20.00, 'beverages', '/placeholder.svg?height=200&width=300', true, true, 1),
('Lassi', 'Traditional yogurt-based drink, sweet or salted', 25.00, 'beverages', '/placeholder.svg?height=200&width=300', true, true, 1),
('Cold Coffee', 'Chilled coffee with milk and ice cream', 35.00, 'beverages', '/placeholder.svg?height=200&width=300', true, true, 1)
ON CONFLICT DO NOTHING;

-- Insert sample orders
INSERT INTO orders (user_id, total_amount, status, delivery_address, delivery_time, payment_method, special_instructions, location_id) VALUES
(1, 130.00, 'delivered', 'Room 205, Block A, University Hostel', 'asap', 'cod', 'Please call before delivery', 1),
(2, 155.00, 'preparing', 'Room 301, Block B, University Hostel', 'lunch', 'upi', 'Extra spicy please', 1),
(3, 85.00, 'confirmed', 'Room 102, Block A, University Hostel', 'evening', 'cod', '', 1),
(4, 200.00, 'pending', 'Room 405, Block C, University Hostel', 'asap', 'card', 'No onions in curry', 1),
(1, 95.00, 'delivered', 'Room 205, Block A, University Hostel', 'lunch', 'upi', '', 1)
ON CONFLICT DO NOTHING;

-- Insert sample order items
INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES
-- Order 1 items
(1, 1, 1, 120.00), -- Chicken Biryani
(1, 11, 1, 15.00), -- Masala Chai

-- Order 2 items  
(2, 3, 1, 100.00), -- Paneer Butter Masala
(2, 8, 2, 25.00), -- Samosa x2
(2, 12, 1, 20.00), -- Fresh Lime Water

-- Order 3 items
(3, 6, 1, 80.00), -- Veg Fried Rice
(3, 11, 1, 15.00), -- Masala Chai

-- Order 4 items
(4, 1, 1, 120.00), -- Chicken Biryani
(4, 4, 1, 110.00), -- Chicken Curry
(4, 10, 1, 60.00), -- Chicken Roll
(4, 14, 1, 35.00), -- Cold Coffee

-- Order 5 items
(5, 7, 1, 95.00) -- Chicken Fried Rice
ON CONFLICT DO NOTHING;
