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
DECLARE 
    USERID uuid;
BEGIN
    -- Insert a record into the tracker table when a new order is added
    SELECT user_id INTO USERID FROM orders WHERE order_id = NEW.order_id;
    IF NEW.progress = 100 THEN
        UPDATE orders SET order_status = 'Delivered' WHERE order_id = NEW.order_id;
        INSERT INTO notification(user_id, notification_description) VALUES (USERID, 'Your order has been delivered. Order Id # ' || NEW.order_id);

        CALL set_delivery_time(NEW.order_id);
    ELSE 
        UPDATE orders SET order_status = 'Pending' WHERE order_id = NEW.order_id;
        INSERT INTO notification(user_id, notification_description) VALUES (USERID, 'Your order status has been updated. Order Id # ' || NEW.order_id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function after an insert on the orders table
CREATE TRIGGER tracker_progress_update
AFTER UPDATE ON tracker
FOR EACH ROW
EXECUTE FUNCTION update_order_payment();



CREATE OR REPLACE FUNCTION remove_tracker_on_cancel()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.order_status = 'Cancelled' THEN
        -- Delete the corresponding row from the tracker table
        DELETE FROM tracker WHERE order_id = NEW.order_id;
        INSERT INTO notification(user_id, notification_description)
        VALUES (NEW.user_id, "Your order Has been cancelled and your order has been updated");

    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER remove_tracker_trigger
AFTER UPDATE OF order_status ON orders
FOR EACH ROW
EXECUTE FUNCTION remove_tracker_on_cancel();


CREATE OR REPLACE FUNCTION notification_on_order()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO notification(user_id, notification_description)
    VALUES (NEW.user_id, 'Your Order has been placed. Your order Id is ' || NEW.order_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_order_notification
AFTER INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION notification_on_order();


-- 6. Create a trigger to notify the user when a new tracker is created
CREATE OR REPLACE FUNCTION notification_on_tracker()
RETURNS TRIGGER AS $$
DECLARE 
    USERID uuid;
BEGIN
    SELECT user_id INTO USERID FROM orders WHERE order_id = NEW.order_id;
    INSERT INTO notification(user_id, notification_description)
    VALUES (USERID, 'Your tracker is created. Please track your order at /tracker/' || NEW.tracker_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER add_tracker_notification
AFTER INSERT ON tracker
FOR EACH ROW
EXECUTE FUNCTION notification_on_tracker();




-- procedure 1
CREATE OR REPLACE PROCEDURE set_delivery_time(order_id_arg INT)
LANGUAGE plpgsql
AS $$
BEGIN
  -- Update the delivery_time to the current timestamp
  UPDATE orders
  SET delivery_time = CURRENT_TIMESTAMP
  WHERE order_id = order_id_arg;

END;
$$;



-- procedure 2
CREATE OR REPLACE PROCEDURE assign_customer_service_admin(user_id_to_assign UUID)
LANGUAGE plpgsql
AS $$
DECLARE
    admin_to_assign UUID;
BEGIN
    -- Select a customer service admin with the fewest customers and not fired
    SELECT A.user_id
    INTO admin_to_assign
    FROM admin A
    LEFT JOIN (
        SELECT DISTINCT sender_id, receiver_id
        FROM messages
    ) M ON A.user_id = M.sender_id
    WHERE A.is_employed = true
    AND A.clearance_level = 'customer_service'
    GROUP BY A.user_id
    ORDER BY COUNT(M.receiver_id) ASC
    LIMIT 1
    ;

    -- If an admin is found, assign the user to them
    IF admin_to_assign IS NOT NULL THEN
        INSERT INTO messages(sender_id, receiver_id, _message)
        VALUES (admin_to_assign, user_id_to_assign, 'Hello! I am your new guide in your journey to Awesomeness. Feel Free to knock me up if you have any queries!');

        RAISE NOTICE 'User % assigned to Customer Service Admin %', user_id_to_assign, admin_to_assign;
    ELSE
        RAISE EXCEPTION 'No available Customer Service Admin found';
    END IF;
END;
$$;



-- prodcedure 3
CREATE OR REPLACE PROCEDURE delivery_man_message(delivery_man_id UUID, orderId INT)
LANGUAGE plpgsql
AS $$
DECLARE
    user_id_to_message UUID;
    delivery_man_name TEXT;
BEGIN
    -- Select a customer service admin with the fewest customers and not fired
    SELECT user_id INTO user_id_to_message FROM orders WHERE order_id = orderId;
    INSERT INTO messages(sender_id, receiver_id, _message) VALUES (delivery_man_id, user_id_to_message,
    'Hello! I am the delivery man for your order #' || orderId || '. I will be delivering your order soon. Please be ready to receive it. Thank you!');
    SELECT full_name INTO delivery_man_name FROM general_user WHERE user_id = delivery_man_id;
    INSERT INTO notification(user_id, notification_description) VALUES (user_id_to_message, 'Your order #' || orderId || ' is being delivered by our delivery man ' || delivery_man_name);
END;
$$;





-- Function 1
-- finding out the total products sold for some day interval for each day
CREATE OR REPLACE FUNCTION get_product_sold_count(start_date DATE, end_date DATE)
RETURNS TABLE (date_sold DATE, total_products_sold BIGINT) AS
$$
BEGIN
    RETURN QUERY
    SELECT
        d::DATE AS date_sold,
        COUNT(op.product_id) AS total_products_sold
    FROM
        generate_series(start_date, end_date, interval '1 day') d
    LEFT JOIN
        orders o ON d::DATE = o.date_added
    LEFT JOIN
        order_product op ON o.order_id = op.order_id
    GROUP BY
        d::DATE
    ORDER BY
        d::DATE;
END;
$$ LANGUAGE plpgsql;









