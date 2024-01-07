
CREATE DATABASE TECHZONE;

CREATE TABLE general_user (
    user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(200) UNIQUE NOT NULL,
    email VARCHAR(200) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    contact_no VARCHAR(200) UNIQUE,
    profile_img TEXT,
    full_name VARCHAR(200) NOT NULL,
    gender VARCHAR(10),
    staff_status VARCHAR(20) NOT NULL
);



CREATE TABLE customer (
    user_id uuid PRIMARY KEY,
    points INTEGER NOT NULL CHECK (points >= 0),
    FOREIGN KEY (user_id) REFERENCES general_user(user_id) ON DELETE CASCADE
);

CREATE TABLE admin (
    user_id uuid PRIMARY KEY,
    clearance_level VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES general_user(user_id) ON DELETE CASCADE
);

CREATE TABLE delivery_man (
    user_id uuid PRIMARY KEY,
    hiring_date DATE NOT NULL DEFAULT CURRENT_DATE,
    salary DECIMAL(10, 2) NOT NULL CHECK (salary >= 0),
    total_orders INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES general_user(user_id) ON DELETE CASCADE
);


CREATE TABLE product_category(
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(200) NOT NULL,
    category_description TEXT,
    category_img TEXT,
    visibility_status BOOLEAN NOT NULL DEFAULT TRUE,
    parent_category_id INTEGER,
    FOREIGN KEY (parent_category_id) REFERENCES product_category(category_id) ON DELETE CASCADE
);

CREATE TABLE product (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(200) NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    previous_price DECIMAL(10, 2) NOT NULL CHECK (previous_price >= 0),
    product_description TEXT,
    product_exerpt TEXT,
    product_img TEXT,
    category_id INTEGER NOT NULL,
    discount_status BOOLEAN NOT NULL,
    discount DECIMAL(2, 1) NOT NULL CHECK (discount >= 0 AND discount <= 100),
    product_status VARCHAR(20) NOT NULL,
    visibility_status BOOLEAN NOT NULL,
    date_added DATE NOT NULL DEFAULT CURRENT_DATE,
    FOREIGN KEY (category_id) REFERENCES product_category(category_id) ON DELETE CASCADE
);


CREATE TABLE product_review (
    review_id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL,
    product_id INTEGER NOT NULL,
    review TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 0 AND rating <= 5),
    date_added DATE NOT NULL DEFAULT CURRENT_DATE,
    FOREIGN KEY (user_id) REFERENCES general_user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);


CREATE TABLE shipping_address (
    address_id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL,
    _address TEXT NOT NULL,
    city VARCHAR(200) NOT NULL,
    shipping_state VARCHAR(200) NOT NULL,
    zip_code VARCHAR(200) NOT NULL,
    country VARCHAR(200) NOT NULL,
    visibility_status BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES general_user(user_id) ON DELETE CASCADE
);


CREATE TABLE orders(
    order_id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL,
    date_added DATE NOT NULL DEFAULT CURRENT_DATE,
    payment_status BOOLEAN NOT NULL, -- we might add dues system later
    payment_method VARCHAR(200) NOT NULL,
    order_status VARCHAR(200) NOT NULL,
    promo_name VARCHAR(200),
    delivery_charge DECIMAL(10, 2) NOT NULL CHECK (delivery_charge >= 0),
    transaction_id VARCHAR(200), -- For payment gateway
    address_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES general_user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (address_id) REFERENCES shipping_address(address_id) ON DELETE NO ACTION,
    FOREIGN KEY (promo_name) REFERENCES promo(promo_name) ON DELETE NO ACTION
);


CREATE TABLE order_product (
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity >= 1),
    CONSTRAINT order_product_pkey PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);




-- we will handle the cart in the frontend

CREATE TABLE tracker(
    tracker_id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    tracker_description TEXT NOT NULL,
    progress INTEGER NOT NULL CHECK (progress >= 0 AND progress <= 100),
    estimated_delivery_date DATE NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
);


CREATE TABLE wishlist (
    user_id uuid NOT NULL,
    product_id INTEGER NOT NULL,
    CONSTRAINT wishlist_pkey PRIMARY KEY (user_id, product_id),
    FOREIGN KEY (user_id) REFERENCES general_user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);



CREATE TABLE promo(
    promo_name VARCHAR(200) PRIMARY KEY,
    promo_discount DECIMAL(2, 1) NOT NULL CHECK (promo_discount >= 0 AND promo_discount <= 100),
    promo_status VARCHAR(200) NOT NULL,
    promo_start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    promo_end_date DATE NOT NULL
);



CREATE TABLE product_attribute(
    product_id INTEGER NOT NULL,
    attribute_name VARCHAR(200) NOT NULL,
    _value VARCHAR(200) NOT NULL,
    price_increase DECIMAL(10, 2) NOT NULL CHECK (price_increase >= 0),
    stock INTEGER NOT NULL CHECK (stock >= 0),
    sold INTEGER NOT NULL CHECK (sold >= 0),
    CONSTRAINT product_attribute_pkey PRIMARY KEY (product_id, attribute_name, _value),
    FOREIGN KEY (product_id) REFERENCES product(id) ON DELETE CASCADE
);



CREATE TABLE contact_us(
    contact_id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL,
    contact_description TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES general_user(user_id) ON DELETE CASCADE
);


CREATE TABLE messages(
    message_id SERIAL PRIMARY KEY,
    sender_id uuid NOT NULL,
    receiver_id uuid NOT NULL,
    _message TEXT NOT NULL,
    seen_status BOOLEAN NOT NULL DEFAULT FALSE,
    date_added DATE NOT NULL DEFAULT CURRENT_DATE,
    FOREIGN KEY (sender_id) REFERENCES general_user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES general_user(user_id) ON DELETE CASCADE
);


CREATE TABLE notification(
    notification_id SERIAL PRIMARY KEY,
    user_id uuid NOT NULL,
    notification_description TEXT NOT NULL,
    seen_status BOOLEAN NOT NULL DEFAULT FALSE,
    date_added DATE NOT NULL DEFAULT CURRENT_DATE,
    FOREIGN KEY (user_id) REFERENCES general_user(user_id) ON DELETE CASCADE
);



CREATE TABLE notice_board(
    notice_id SERIAL PRIMARY KEY,
    notice_description TEXT NOT NULL,
    date_added DATE NOT NULL DEFAULT CURRENT_DATE
);



CREATE TABLE order_delivery_man(
    user_id uuid NOT NULL,
    order_id INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES delivery_man(user_id) ON DELETE CASCADE
);

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- Step 1: Add a new UUID column
ALTER TABLE general_user
ADD COLUMN user_uuid UUID DEFAULT uuid_generate_v4() UNIQUE;

-- Step 2: Update existing rows with UUID values
UPDATE general_user
SET user_uuid = uuid_generate_v4();

-- Step 3: Drop the old SERIAL column
ALTER TABLE general_user
DROP COLUMN user_id;

-- Step 4: Rename the new UUID column to match the old name
ALTER TABLE general_user
RENAME COLUMN user_uuid TO user_id;




DROP TABLE general_user CASCADE;
DROP TABLE admin CASCADE;
DROP TABLE customer CASCADE;
DROP TABLE delivery_man CASCADE;
DROP TABLE product CASCADE;
DROP TABLE product_review CASCADE;
DROP TABLE order_product CASCADE;
DROP TABLE orders CASCADE;
DROP TABLE shipping_address CASCADE;
DROP TABLE tracker CASCADE;
DROP TABLE wishlist CASCADE;
DROP TABLE promo CASCADE;
DROP TABLE product_category CASCADE;
DROP TABLE product_attribute CASCADE;
DROP TABLE contact_us CASCADE;
DROP TABLE messages CASCADE;
DROP TABLE notification CASCADE;
DROP TABLE notice_board CASCADE;
DROP TABLE order_delivery_man CASCADE;

