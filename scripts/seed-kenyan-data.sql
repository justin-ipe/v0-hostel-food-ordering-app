-- Seed data for Comrade Eats - Qwetu & Qejani Hostels

-- Insert hostel locations
INSERT INTO locations (name, address, phone, is_active) VALUES
('Qwetu Hostel', 'Qwetu Hostel, University Way, Nairobi', '+254-712-345-678', true),
('Qejani Hostel', 'Qejani Hostel, University Way, Nairobi', '+254-712-345-679', true)
ON CONFLICT DO NOTHING;

-- Insert sample students
INSERT INTO users (name, email, phone, address) VALUES
('John Kamau', 'john.kamau@student.university.ac.ke', '+254-712-345-678', 'Qwetu Hostel, Room 205, Block A'),
('Mary Wanjiku', 'mary.wanjiku@student.university.ac.ke', '+254-723-456-789', 'Qejani Hostel, Room 301, Block B'),
('Peter Otieno', 'peter.otieno@student.university.ac.ke', '+254-734-567-890', 'Qwetu Hostel, Room 102, Block C'),
('Grace Akinyi', 'grace.akinyi@student.university.ac.ke', '+254-745-678-901', 'Qejani Hostel, Room 405, Block A'),
('David Mwangi', 'david.mwangi@student.university.ac.ke', '+254-756-789-012', 'Qwetu Hostel, Room 203, Block B')
ON CONFLICT (email) DO NOTHING;

-- Insert Kenyan menu items with student-friendly pricing
INSERT INTO menu_items (name, description, price, category, image_url, is_vegetarian, is_available, location_id) VALUES
-- Main Meals
('Beef Stew + Ugali', 'Tender beef stew served with fresh ugali - a comrade favorite!', 150.00, 'mains', '/placeholder.svg?height=200&width=300', false, true, 1),
('Sukuma Wiki + Ugali', 'Nutritious sukuma wiki (collard greens) with ugali - budget-friendly and filling', 80.00, 'mains', '/placeholder.svg?height=200&width=300', true, true, 1),
('Githeri Special', 'Traditional maize and beans mix - the ultimate student meal', 70.00, 'mains', '/placeholder.svg?height=200&width=300', true, true, 1),
('Pilau + Kachumbari', 'Spiced rice with fresh tomato-onion salad - weekend special!', 120.00, 'mains', '/placeholder.svg?height=200&width=300', false, true, 1),
('Nyama Choma + Ugali', 'Grilled meat with ugali - perfect for celebrations', 200.00, 'mains', '/placeholder.svg?height=200&width=300', false, true, 1),

-- Student Combos
('Chicken + Chapati Combo', 'Grilled chicken with 2 soft chapatis - perfect for sharing or not!', 180.00, 'combos', '/placeholder.svg?height=200&width=300', false, true, 1),
('Rice + Beans Combo', 'Simple, filling, and affordable - a student staple', 90.00, 'combos', '/placeholder.svg?height=200&width=300', true, true, 1),
('Fish + Ugali Combo', 'Fresh fish with ugali - brain food for exams!', 160.00, 'combos', '/placeholder.svg?height=200&width=300', false, true, 1),

-- Snacks & Quick Bites
('Mandazi (4 pieces)', 'Sweet, fluffy mandazi - perfect with tea or as a snack', 40.00, 'snacks', '/placeholder.svg?height=200&width=300', true, true, 1),
('Samosa (2 pieces)', 'Crispy samosas filled with spiced meat or vegetables', 50.00, 'snacks', '/placeholder.svg?height=200&width=300', false, true, 1),
('Chapati (2 pieces)', 'Soft, warm chapatis - great with stew or on their own', 30.00, 'snacks', '/placeholder.svg?height=200&width=300', true, true, 1),
('Boiled Eggs (2 pieces)', 'Protein-packed boiled eggs - perfect study snack', 40.00, 'snacks', '/placeholder.svg?height=200&width=300', true, true, 1),

-- Drinks
('Chai ya Rangi', 'Kenyan milk tea - the perfect study companion', 25.00, 'drinks', '/placeholder.svg?height=200&width=300', true, true, 1),
('Black Tea', 'Simple black tea - budget-friendly caffeine fix', 15.00, 'drinks', '/placeholder.svg?height=200&width=300', true, true, 1),
('Soda (500ml)', 'Cold soda - Coke, Fanta, or Sprite', 60.00, 'drinks', '/placeholder.svg?height=200&width=300', true, true, 1),
('Fresh Juice', 'Passion fruit or orange juice - vitamin boost for comrades', 80.00, 'drinks', '/placeholder.svg?height=200&width=300', true, true, 1),
('Drinking Water (500ml)', 'Clean drinking water - stay hydrated!', 20.00, 'drinks', '/placeholder.svg?height=200&width=300', true, true, 1)
ON CONFLICT DO NOTHING;

-- Insert sample orders with Kenyan context
INSERT INTO orders (user_id, total_amount, status, delivery_address, delivery_time, payment_method, special_instructions, location_id) VALUES
(1, 170.00, 'delivered', 'Qwetu Hostel, Room 205, Block A', 'asap', 'mpesa', 'Please knock softly, roommate is sleeping', 1),
(2, 130.00, 'preparing', 'Qejani Hostel, Room 301, Block B', 'lunch', 'cash', 'Extra sukuma wiki please', 2),
(3, 110.00, 'confirmed', 'Qwetu Hostel, Room 102, Block C', 'dinner', 'mpesa', 'Call when you arrive at the gate', 1),
(4, 240.00, 'pending', 'Qejani Hostel, Room 405, Block A', 'asap', 'mpesa', 'Ordering for 3 people - group study session', 2),
(1, 95.00, 'delivered', 'Qwetu Hostel, Room 205, Block A', 'lunch', 'cash', 'Thanks for the quick delivery!', 1)
ON CONFLICT DO NOTHING;

-- Insert sample order items with Kenyan foods
INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES
-- Order 1 items (John's order)
(1, 1, 1, 150.00), -- Beef Stew + Ugali
(1, 13, 1, 25.00), -- Chai ya Rangi

-- Order 2 items (Mary's order)
(2, 2, 1, 80.00), -- Sukuma Wiki + Ugali
(2, 9, 1, 40.00), -- Mandazi
(2, 14, 1, 15.00), -- Black Tea

-- Order 3 items (Peter's order)
(3, 3, 1, 70.00), -- Githeri Special
(3, 11, 1, 30.00), -- Chapati
(3, 13, 1, 25.00), -- Chai ya Rangi

-- Order 4 items (Grace's group order)
(4, 6, 2, 180.00), -- Chicken + Chapati Combo x2
(4, 15, 3, 60.00), -- Soda x3

-- Order 5 items (John's previous order)
(5, 7, 1, 90.00), -- Rice + Beans Combo
(5, 17, 1, 20.00) -- Water
ON CONFLICT DO NOTHING;
