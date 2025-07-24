-- Update database schema for delivery time slots

-- Add delivery slot management table
CREATE TABLE IF NOT EXISTS delivery_slots (
    id SERIAL PRIMARY KEY,
    slot_name VARCHAR(50) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    max_capacity INTEGER DEFAULT 25,
    current_orders INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    location_id INTEGER REFERENCES locations(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default delivery slots
INSERT INTO delivery_slots (slot_name, start_time, end_time, max_capacity, location_id) VALUES
('noon', '12:00:00', '13:00:00', 25, 1),
('evening', '18:00:00', '19:00:00', 30, 1),
('late-evening', '20:00:00', '21:00:00', 20, 1)
ON CONFLICT DO NOTHING;

-- Add delivery slot tracking to orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS delivery_slot VARCHAR(50);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS estimated_delivery_time TIMESTAMP;

-- Create index for delivery slot queries
CREATE INDEX IF NOT EXISTS idx_orders_delivery_slot ON orders(delivery_slot);
CREATE INDEX IF NOT EXISTS idx_orders_estimated_delivery ON orders(estimated_delivery_time);

-- Add peak hours tracking
CREATE TABLE IF NOT EXISTS peak_hours_stats (
    id SERIAL PRIMARY KEY,
    hour_of_day INTEGER NOT NULL,
    day_of_week INTEGER NOT NULL,
    average_orders INTEGER DEFAULT 0,
    max_orders INTEGER DEFAULT 0,
    average_wait_time INTEGER DEFAULT 15,
    location_id INTEGER REFERENCES locations(id),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert peak hours data for lunch and dinner
INSERT INTO peak_hours_stats (hour_of_day, day_of_week, average_orders, max_orders, average_wait_time, location_id) VALUES
-- Lunch hours (12-14)
(12, 1, 45, 60, 25, 1), (12, 2, 45, 60, 25, 1), (12, 3, 45, 60, 25, 1), (12, 4, 45, 60, 25, 1), (12, 5, 45, 60, 25, 1),
(13, 1, 35, 50, 20, 1), (13, 2, 35, 50, 20, 1), (13, 3, 35, 50, 20, 1), (13, 4, 35, 50, 20, 1), (13, 5, 35, 50, 20, 1),
-- Dinner hours (18-20)
(18, 1, 52, 70, 30, 1), (18, 2, 52, 70, 30, 1), (18, 3, 52, 70, 30, 1), (18, 4, 52, 70, 30, 1), (18, 5, 52, 70, 30, 1),
(19, 1, 48, 65, 28, 1), (19, 2, 48, 65, 28, 1), (19, 3, 48, 65, 28, 1), (19, 4, 48, 65, 28, 1), (19, 5, 48, 65, 28, 1),
(20, 1, 25, 40, 20, 1), (20, 2, 25, 40, 20, 1), (20, 3, 25, 40, 20, 1), (20, 4, 25, 40, 20, 1), (20, 5, 25, 40, 20, 1)
ON CONFLICT DO NOTHING;

-- Create function to update delivery slot capacity
CREATE OR REPLACE FUNCTION update_delivery_slot_capacity()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE delivery_slots 
        SET current_orders = current_orders + 1 
        WHERE slot_name = NEW.delivery_slot;
        RETURN NEW;
    ELSIF TG_OP = 'UPDATE' THEN
        -- If delivery slot changed
        IF OLD.delivery_slot != NEW.delivery_slot THEN
            UPDATE delivery_slots 
            SET current_orders = current_orders - 1 
            WHERE slot_name = OLD.delivery_slot;
            
            UPDATE delivery_slots 
            SET current_orders = current_orders + 1 
            WHERE slot_name = NEW.delivery_slot;
        END IF;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE delivery_slots 
        SET current_orders = current_orders - 1 
        WHERE slot_name = OLD.delivery_slot;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic capacity updates
CREATE TRIGGER delivery_slot_capacity_trigger
    AFTER INSERT OR UPDATE OR DELETE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_delivery_slot_capacity();
