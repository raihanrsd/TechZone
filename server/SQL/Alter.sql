ALTER TABLE promo
ALTER COLUMN promo_end_date DROP NOT NULL;


ALTER TABLE promo
ALTER COLUMN promo_discount TYPE DECIMAL(3, 1);


-- Adding spec_description column to order_product table
ALTER TABLE order_product
ADD COLUMN spec_description TEXT;

-- Modifying the primary key to include spec_description
ALTER TABLE order_product
DROP CONSTRAINT order_product_pkey;

ALTER TABLE order_product
ADD PRIMARY KEY (order_id, product_id, spec_description);

ALTER TABLE order_product
ADD COLUMN price DECIMAL(10, 2) NOT NULL;

ALTER TABLE orders
ADD COLUMN discount_amount DECIMAL(10, 2) NOT NULL DEFAULT 0;


ALTER TABLE orders
ADD COLUMN total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0);

ALTER TABLE orders
DROP COLUMN total_amount;

ALTER TABLE orders
ADD COLUMN total_price DECIMAL(10, 2) NOT NULL CHECK (total_price >= 0);

ALTER TABLE orders
DROP COLUMN payment_status;

ALTER TABLE orders ADD COLUMN 
payment_status BOOLEAN NOT NULL DEFAULT FALSE;


ALTER TABLE orders
DROP COLUMN order_status;

ALTER TABLE orders ADD COLUMN 
order_status TEXT NOT NULL DEFAULT 'Pending';



ALTER TABLE orders
ADD COLUMN _address TEXT DEFAULT '27/2, Kazi Reazuddin Road',
ADD COLUMN city VARCHAR(200) DEFAULT 'Dhaka',
ADD COLUMN shipping_state VARCHAR(200) DEFAULT 'Dhaka',
ADD COLUMN zip_code VARCHAR(200) DEFAULT '1205',
ADD COLUMN country VARCHAR(200) DEFAULT 'Bangladesh';


ALTER TABLE orders
DROP COLUMN address_id;

ALTER TABLE notification
ADD COLUMN time_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE notification
DROP COLUMN date_added;


ALTER TABLE product_review
ADD COLUMN time_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE product_review
DROP COLUMN date_added;


-- Drop the existing constraint
ALTER TABLE product_review
DROP CONSTRAINT product_review_rating_check;

-- Alter the column to use NUMERIC data type
ALTER TABLE product_review
ALTER COLUMN rating TYPE NUMERIC;

-- Add the new constraint to allow decimal values between 0 and 5
ALTER TABLE product_review
ADD CONSTRAINT product_review_rating_check CHECK (rating >= 0 AND rating <= 5);




ALTER TABLE product
ADD COLUMN admin_id uuid NOT NULL DEFAULT 'f26f0f2f-2ee1-48a6-8187-8fad86bf74eb',
ADD FOREIGN KEY (admin_id) REFERENCES admin(user_id) ON DELETE CASCADE;



ALTER TABLE orders 
ADD COLUMN delivery_time TIMESTAMP DEFAULT NULL; 

ALTER TABLE orders 
ADD COLUMN reason_for_cancellation TEXT DEFAULT '';



ALTER TABLE messages
ADD COLUMN time_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE messages
DROP COLUMN date_added;

ALTER TABLE admin
ADD COLUMN is_employed BOOLEAN DEFAULT TRUE;



ALTER TABLE admin
ADD COLUMN hire_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

