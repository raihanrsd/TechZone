CREATE OR REPLACE FUNCTION insert_user_data()
RETURNS TRIGGER AS $$
BEGIN
    -- Check the type of user and insert into the corresponding table
    IF NEW.staff_status = 'customer' THEN
        INSERT INTO customer(user_id, points) VALUES (NEW.user_id, 0);
    ELSIF NEW.staff_status = 'admin' THEN
        INSERT INTO admin(user_id, clearance_level) VALUES (NEW.user_id, 'default_clearance');
    ELSIF NEW.staff_status = 'delivery_man' THEN
        INSERT INTO delivery_man(user_id, salary) VALUES (NEW.user_id, 5000);
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_user_trigger
BEFORE INSERT ON general_user
FOR EACH ROW
EXECUTE FUNCTION insert_user_data();

CREATE OR REPLACE FUNCTION create_order_tracker()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert a record into the tracker table when a new order is added
    INSERT INTO tracker (order_id, tracker_description, progress, estimated_delivery_date)
    VALUES (NEW.order_id, 'Your order is being evaluated', 0, CURRENT_DATE + INTERVAL '10 days');

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function after an insert on the orders table
CREATE TRIGGER orders_after_insert_trigger
AFTER INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION create_order_tracker();



CREATE OR REPLACE FUNCTION update_order_payment()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert a record into the tracker table when a new order is added
    IF progress = 100 THEN
        UPDATE orders SET order_status = 'Delivered' WHERE order_id = NEW.order_id;
    ELSE 
        UPDATE orders SET order_status = 'Pending' WHERE order_id = NEW.order_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function after an insert on the orders table
CREATE TRIGGER tracker_progress_update
AFTER UPDATE ON tracker OF progress
FOR EACH ROW
EXECUTE FUNCTION update_order_payment();






