-- Create database schema for hostel food ordering system

-- Users table for student information
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu items table
CREATE TABLE IF NOT EXISTS menu_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image_url VARCHAR(500),
    is_vegetarian BOOLEAN DEFAULT true,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    delivery_address TEXT NOT NULL,
    delivery_time VARCHAR(100),
    payment_method VARCHAR(50) NOT NULL,
    special_instructions TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table (junction table for orders and menu items)
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id INTEGER REFERENCES menu_items(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Locations table for future scalability
CREATE TABLE IF NOT EXISTS locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add Kenyan-specific columns
ALTER TABLE users ADD COLUMN IF NOT EXISTS student_id VARCHAR(20);
ALTER TABLE users ADD COLUMN IF NOT EXISTS hostel_name VARCHAR(100);
ALTER TABLE users ADD COLUMN IF NOT EXISTS room_number VARCHAR(20);

-- Add M-Pesa transaction fields
ALTER TABLE orders ADD COLUMN IF NOT EXISTS mpesa_transaction_id VARCHAR(50);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS mpesa_phone VARCHAR(15);

-- Update locations table for Nairobi hostels
ALTER TABLE locations ADD COLUMN IF NOT EXISTS hostel_type VARCHAR(50) DEFAULT 'university';
ALTER TABLE locations ADD COLUMN IF NOT EXISTS delivery_zones TEXT[];

-- Add student discount tracking
CREATE TABLE IF NOT EXISTS student_discounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    discount_type VARCHAR(50) NOT NULL,
    discount_amount DECIMAL(5, 2) NOT NULL,
    used_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    order_id INTEGER REFERENCES orders(id)
);

-- Add location_id to menu_items for multi-location support
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS location_id INTEGER REFERENCES locations(id) DEFAULT 1;

-- Add location_id to orders for multi-location support
ALTER TABLE orders ADD COLUMN IF NOT EXISTS location_id INTEGER REFERENCES locations(id) DEFAULT 1;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON menu_items(is_available);
