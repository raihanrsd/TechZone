
INSERT INTO general_user(username, email, password, contact_no, profile_img, full_name, gender, staff_status)
VALUES ('admin', 'admin@gmail.com', '123456', '1234567', 'nice.img', 'admin rashid', 'male', 'admin');


INSERT INTO general_user(username, email, password, contact_no, profile_img, full_name, gender, staff_status)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;

INSERT INTO product (
    product_name, price, previous_price, product_description, product_exerpt,
    category_id, product_img, visibility_status, discount_status, discount, product_status
)
VALUES (
    'iPhone 14 Pro Max', 1480, 1600, 
    'This is another text product description which I will use to investigate further into the issue',
    'nom nom', 5, 'nice.img', 'true', 'false', 50, 'true'
);


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(15, 'Display', '6.7', 0, 400, 100, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(15, 'Processor', 'A16 Pro Chip', 0, 400, 100, 'true');


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(15, 'Camera', '12MP', 0, 400, 100, 'true');


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(15, 'Storage', '128GB', 0, 400, 100, 'true');


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(15, 'Color', 'Titanium blue', 0, 200, 60, 'true');


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(15, 'Color', 'Natural Titanium', 0, 200, 50, 'true');




INSERT INTO product (
    product_name, price, previous_price, product_description, product_exerpt,
    category_id, product_img, visibility_status, discount_status, discount, product_status
)
VALUES (
    'iPhone 13', 880, 1000, 
    'This is another text product description which I will use to investigate further into the issue',
    'nom nom', 5, 'nice.img', 'true', 'false', 50, 'true'
);


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(16, 'Display', '6.1', 0, 400, 150, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(16, 'Processor', 'A14 bionic chip', 0, 400, 150, 'true');


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(16, 'Camera', '12MP', 0, 400, 150, 'true');


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(16, 'Storage', '48GB', 0, 200, 100, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(16, 'Storage', '96GB', 80, 200, 50, 'false');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(16, 'Color', 'Blue', 0, 200, 90, 'false');


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(16, 'Color', 'Black', 0, 200, 60, 'true');




INSERT INTO product (
    product_name, price, previous_price, product_description, product_exerpt,
    category_id, product_img, visibility_status, discount_status, discount, product_status
)
VALUES (
    'iPhone 13 Pro', 950, 1100, 
    'This is another text product description which I will use to investigate further into the issue',
    'nom nom', 5, 'nice.img', 'true', 'false', 50, 'true'
);


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(17, 'Display', '6.1', 0, 400, 150, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(17, 'Processor', 'A15 bionic chip', 0, 400, 150, 'true');


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(17, 'Camera', '12MP', 0, 400, 150, 'true');


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(17, 'Storage', '48GB', 0, 200, 100, 'true');


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(17, 'Color', 'Titanium Blue', 50, 200, 90, 'false');


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(17, 'Color', 'Black', 0, 200, 60, 'true');



INSERT INTO product (
    product_name, price, previous_price, product_description, product_exerpt,
    category_id, product_img, visibility_status, discount_status, discount, product_status
)
VALUES (
    'iPhone 13 Pro Max', 1200, 1300, 
    'This is another text product description which I will use to investigate further into the issue',
    'nom nom', 5, 'nice.img', 'true', 'false', 50, 'true'
);


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(18, 'Display', '6.7', 0, 400, 170, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(18, 'Processor', 'A15 Pro Chip', 0, 400, 170, 'true');


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(18, 'Camera', '12MP', 0, 400, 170, 'true');


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(18, 'Storage', '96GB', 0, 200, 100, 'true');


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(18, 'Color', 'Titanium Blue', 50, 200, 90, 'false');


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(18, 'Color', 'Sage Green', 0, 200, 80, 'true');




INSERT INTO product (
    product_name, price, previous_price, product_description, product_exerpt,
    category_id, product_img, visibility_status, discount_status, discount, product_status
)
VALUES (
    'Samsung Galaxy S22 plus', 1440, 1500, 
    'This is another text product description which I will use to investigate further into the issue',
    'nom nom', 7, 'nice.img', 'true', 'false', 50, 'true'
);


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(19, 'Display', '6.7', 0, 400, 170, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(19, 'Processor', 'Snapdragon 8', 0, 400, 170, 'true');


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(19, 'Camera', '16MP', 0, 400, 170, 'true');


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(19, 'Storage', '256GB', 0, 200, 100, 'true');


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(19, 'Color', 'Phantom White', 50, 200, 70, 'false');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(19, 'Color', 'Phantom Black', 100, 200, 40, 'false');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(19, 'Color', 'Green', 0, 200, 60, 'true');


INSERT INTO product (
    product_name, price, previous_price, product_description, product_exerpt,
    category_id, product_img, visibility_status, discount_status, discount, product_status
)
VALUES (
    'Samsung Galaxy S22 Ultra', 1750, 1800, 
    'This is another text product description which I will use to investigate further into the issue',
    'nom nom', 7, 'nice.img', 'true', 'false', 50, 'true'
);


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(20, 'Display', '6.8', 0, 400, 170, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(20, 'Processor', 'Snapdragon 8', 0, 400, 170, 'true');


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(20, 'Camera', '32MP', 0, 400, 170, 'true');


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(20, 'Storage', '512GB', 0, 200, 100, 'true');


INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(20, 'Color', 'Burgundy', 50, 200, 70, 'false');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(20, 'Color', 'Phantom Black', 100, 200, 40, 'false');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(20, 'Color', 'Green', 0, 200, 60, 'true');


-- Inserting the product details
INSERT INTO product (
    product_name, price, previous_price, product_description, product_exerpt,
    category_id, product_img, visibility_status, discount_status, discount, product_status
)
VALUES (
    'Samsung Galaxy S23 Plus', 1850, 0, 
    'This is the product description for Samsung Galaxy S23 Plus.',
    'A high-end smartphone with advanced features and a large storage capacity.', 1, 'samsung_galaxy_s23_plus.jpg', 'true', 'false', 0, 'true'
);

-- Inserting product attributes
INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(22, 'Display', '6.9 inch', 0, 50, 12, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(22, 'Processor', 'Snapdragon 9', 0, 50, 15, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(22, 'Storage', '1TB', 0, 50, 5, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(22, 'Camera', '48MP', 0, 50, 18, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(22, 'Color', 'Mystic Blue', 0, 50, 8, 'false');


-- Samsung Galaxy S23 Ultra
INSERT INTO product (
    product_name, price, previous_price, product_description, product_exerpt,
    category_id, product_img, visibility_status, discount_status, discount, product_status
)
VALUES (
    'Samsung Galaxy S23 Ultra', 2150, 0, 
    'This is the product description for Samsung Galaxy S23 Ultra.',
    'A premium smartphone with a large display, powerful camera, and massive storage capacity.', 1, 'samsung_galaxy_s23_ultra.jpg', 'false', 'false', 0, 'true'
);

-- Inserting product attributes for Samsung Galaxy S23 Ultra
INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(23, 'Display', '7.0 inch', 0, 42, 18, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(23, 'Processor', 'Snapdragon 9', 0, 42, 14, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(23, 'Storage', '1TB', 0, 42, 5, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(23, 'Camera', '108MP', 0, 42, 23, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(23, 'Color', 'Mystic Bronze', 0, 42, 10, 'false');

-- Samsung Galaxy S21
INSERT INTO product (
    product_name, price, previous_price, product_description, product_exerpt,
    category_id, product_img, visibility_status, discount_status, discount, product_status
)
VALUES (
    'Samsung Galaxy S21', 1000, 0, 
    'This is the product description for Samsung Galaxy S21.',
    'A sleek and powerful smartphone with an efficient processor and ample storage.', 1, 'samsung_galaxy_s21.jpg', 'false', 'false', 0, 'true'
);

-- Inserting product attributes for Samsung Galaxy S21
INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(24, 'Display', '6.4 inch', 0, 32, 18, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(24, 'Processor', 'Exynos 2100', 0, 32, 12, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(24, 'Storage', '128GB', 0, 32, 3, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(24, 'Camera', '12MP', 0, 32, 14, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(24, 'Color', 'Phantom Gray', 0, 32, 6, 'false');

-- Samsung Galaxy S21 Plus
INSERT INTO product (
    product_name, price, previous_price, product_description, product_exerpt,
    category_id, product_img, visibility_status, discount_status, discount, product_status
)
VALUES (
    'Samsung Galaxy S21 Plus', 1300, 0, 
    'This is the product description for Samsung Galaxy S21 Plus.',
    'A larger variant of the Galaxy S21 with enhanced features and increased storage capacity.', 1, 'samsung_galaxy_s21_plus.jpg', 'true', 'false', 0, 'true'
);

-- Inserting product attributes for Samsung Galaxy S21 Plus
INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(25, 'Display', '6.5 inch', 0, 29, 15, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(25, 'Processor', 'Exynos 2100', 0, 29, 10, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(25, 'Storage', '256GB', 0, 29, 7, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(25, 'Camera', '12MP', 0, 29, 12, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(25, 'Color', 'Phantom Pink', 0, 29, 5, 'false');


-- Samsung Galaxy S19
INSERT INTO product (
    product_name, price, previous_price, product_description, product_exerpt,
    category_id, product_img, visibility_status, discount_status, discount, product_status
)
VALUES (
    'Samsung Galaxy S19', 1100, 0, 
    'This is the product description for Samsung Galaxy S19.',
    'A powerful smartphone with an Exynos 990 processor and a high-quality 108MP camera.', 1, 'samsung_galaxy_s19.jpg', 'true', 'false', 0, 'true'
);

-- Inserting product attributes for Samsung Galaxy S19
INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES((SELECT product_id FROM product WHERE product_name = 'Samsung Galaxy S19'), 'Display', '6.6 inch', 0, 15, 8, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES((SELECT product_id FROM product WHERE product_name = 'Samsung Galaxy S19'), 'Processor', 'Exynos 990', 0, 15, 7, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES((SELECT product_id FROM product WHERE product_name = 'Samsung Galaxy S19'), 'Storage', '256GB', 0, 15, 5, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES((SELECT product_id FROM product WHERE product_name = 'Samsung Galaxy S19'), 'Camera', '108MP', 0, 15, 8, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES((SELECT product_id FROM product WHERE product_name = 'Samsung Galaxy S19'), 'Color', 'Burgundy Red', 0, 15, 3, 'false');



INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(LAST_VAL(), 'Display', '6.6 inch', 0, 15, 8, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES((SELECT product_id FROM product WHERE product_name = 'Samsung Galaxy S19'), 'Processor', 'Exynos 990', 0, 15, 7, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES((SELECT product_id FROM product WHERE product_name = 'Samsung Galaxy S19'), 'Storage', '256GB', 0, 15, 5, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES((SELECT product_id FROM product WHERE product_name = 'Samsung Galaxy S19'), 'Camera', '108MP', 0, 15, 8, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES((SELECT product_id FROM product WHERE product_name = 'Samsung Galaxy S19'), 'Color', 'Burgundy Red', 0, 15, 3, 'false');


-- Inserting product attributes for Samsung Galaxy S19
INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(28, 'Display', '6.6 inch', 0, 15, 280, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(28, 'Processor', 'Exynos 990', 0, 15, 8, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(28, 'Storage', '256GB', 0, 15, 0, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(28, 'Camera', '108MP', 0, 15, 0, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(28, 'Color', 'Burgundy Red', 0, 15, 0, 'true');

-- Inserting the product details
INSERT INTO product (
    product_name, price, previous_price, product_description, product_exerpt,
    category_id, product_img, visibility_status, discount_status, discount, product_status
)
VALUES (
    'Samsung Galaxy S23 Plus', 1850, 0, 
    'This is the product description for Samsung Galaxy S23 Plus.',
    'A high-end smartphone with advanced features and a large storage capacity.', 1, 'samsung_galaxy_s23_plus.jpg', 'true', 'false', 0, 'true'
);

-- Inserting product attributes
INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(32, 'Display', '6.9 inch', 0, 50, 12, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(32, 'Processor', 'Snapdragon 9', 0, 50, 15, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(32, 'Storage', '1TB', 0, 50, 5, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(32, 'Camera', '48MP', 0, 50, 18, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(32, 'Color', 'Mystic Blue', 0, 50, 8, 'false');


INSERT INTO product (
    product_name, price, previous_price, product_description, product_exerpt,
    category_id, product_img, visibility_status, discount_status, discount, product_status
)
VALUES (
    'Google Pixel 7', 500, 0, 
    'This is the product description for Google Pixel 7.',
    'A high-end smartphone with Google Tensor G2 processor and a sleek design.', 6, 'google_pixel_7_black.jpg', 'true', 'false', 0, 'true'
);

-- Inserting product attributes
INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(35, 'Display', '6.3 inch', 0, 50, 10, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(35, 'Processor', 'Google Tensor G2', 0, 50, 8, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(35, 'Storage', '128GB', 0, 50, 12, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(35, 'Color', 'Black', 0, 50, 10, 'false');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(35, 'Color', 'Gray', 0, 50, 10, 'false');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(35, 'Color', 'Green', 0, 50, 10, 'true');


-- Inserting the product details
INSERT INTO product (
    product_name, price, previous_price, product_description, product_exerpt,
    category_id, product_img, visibility_status, discount_status, discount, product_status
)
VALUES (
    'Google Pixel 8 Pro', 850, 900, 
    'This is the product description for Google Pixel 8 Pro.',
    'A premium smartphone with Google Tensor G3 processor and an impressive display.', 6, 'google_pixel_8_pro_black.jpg', 'true', 'false', 0, 'true'
);

-- Inserting product attributes
INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(36, 'Display', '6.8 inch', 0, 64, 20, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(36, 'Processor', 'Google Tensor G3', 0, 64, 18, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(36, 'Storage', '512GB', 0, 64, 22, 'true');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(36, 'Color', 'Black', 0, 64, 20, 'false');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(36, 'Color', 'Gray', 0, 64, 20, 'false');

INSERT INTO product_attribute(product_id, attribute_name, _value, price_increase, stock, sold, base_spec) 
VALUES(36, 'Color', 'Blue', 0, 64, 20, 'false');





-- wishlist adds 
INSERT INTO wishlist(user_id, product_id)
VALUES('f26f0f2f-2ee1-48a6-8187-8fad86bf74eb', 10);


INSERT INTO wishlist(user_id, product_id)
VALUES('f26f0f2f-2ee1-48a6-8187-8fad86bf74eb', 11);


INSERT INTO wishlist(user_id, product_id)
VALUES('f26f0f2f-2ee1-48a6-8187-8fad86bf74eb', 12);



INSERT INTO wishlist(user_id, product_id)
VALUES('f26f0f2f-2ee1-48a6-8187-8fad86bf74eb', 13);



INSERT INTO wishlist(user_id, product_id)
VALUES('f26f0f2f-2ee1-48a6-8187-8fad86bf74eb', 14);


INSERT INTO wishlist(user_id, product_id)
VALUES('f26f0f2f-2ee1-48a6-8187-8fad86bf74eb', 15);


INSERT INTO wishlist(user_id, product_id)
VALUES('f26f0f2f-2ee1-48a6-8187-8fad86bf74eb', 32);


INSERT INTO wishlist(user_id, product_id)
VALUES('f26f0f2f-2ee1-48a6-8187-8fad86bf74eb', 35);


INSERT INTO wishlist(user_id, product_id)
VALUES('f26f0f2f-2ee1-48a6-8187-8fad86bf74eb', 36);



INSERT INTO wishlist(user_id, product_id)
VALUES('2ef67e73-1cd8-45a5-bc92-21117bb50e06', 13);



INSERT INTO wishlist(user_id, product_id)
VALUES('2ef67e73-1cd8-45a5-bc92-21117bb50e06', 14);


INSERT INTO wishlist(user_id, product_id)
VALUES('2ef67e73-1cd8-45a5-bc92-21117bb50e06', 15);


INSERT INTO wishlist(user_id, product_id)
VALUES('2ef67e73-1cd8-45a5-bc92-21117bb50e06', 32);


INSERT INTO wishlist(user_id, product_id)
VALUES('2ef67e73-1cd8-45a5-bc92-21117bb50e06', 35);


INSERT INTO wishlist(user_id, product_id)
VALUES('2ef67e73-1cd8-45a5-bc92-21117bb50e06', 36);


INSERT INTO wishlist(user_id, product_id)
VALUES('d13a2780-521d-4d53-b5af-60f36e727fb6', 10);


INSERT INTO wishlist(user_id, product_id)
VALUES('d13a2780-521d-4d53-b5af-60f36e727fb6', 11);


INSERT INTO wishlist(user_id, product_id)
VALUES('d13a2780-521d-4d53-b5af-60f36e727fb6', 12);



INSERT INTO wishlist(user_id, product_id)
VALUES('d13a2780-521d-4d53-b5af-60f36e727fb6', 13);



INSERT INTO wishlist(user_id, product_id)
VALUES('d13a2780-521d-4d53-b5af-60f36e727fb6', 14);


INSERT INTO wishlist(user_id, product_id)
VALUES('d13a2780-521d-4d53-b5af-60f36e727fb6', 15);


f26f0f2f-2ee1-48a6-8187-8fad86bf74eb



INSERT INTO general_user(username, email, password, contact_no, profile_img, full_name, staff_status)
VALUES('raihanrsd03', 'raihanrsd03@gmail.com', '123456', '12345678', 'nice.img', 'raihan rashid', 'customer');




INSERT INTO general_user(username, email, password, contact_no, profile_img, full_name, staff_status)
VALUES('customerService1', 'customerService1@gmail.com', '$2b$10$K2uLTjOY1TG/IkFwn7dPXOrWSySMJxp/wi1j3Pj7UBNarsxqKOfIO', '1253234', 'user.img', 'raihan rashid', 'admin');


INSERT INTO general_user(username, email, password, contact_no, profile_img, full_name, staff_status)
VALUES('customerService2', 'customerService2@gmail.com', '$2b$10$K2uLTjOY1TG/IkFwn7dPXOrWSySMJxp/wi1j3Pj7UBNarsxqKOfIO', '12532343', 'user.img', 'raihan rashid', 'admin');



INSERT INTO general_user(username, email, password, contact_no, profile_img, full_name, staff_status)
VALUES('customerService3', 'customerService3@gmail.com', '$2b$10$K2uLTjOY1TG/IkFwn7dPXOrWSySMJxp/wi1j3Pj7UBNarsxqKOfIO', '125323433', 'user.img', 'raihan rashid', 'admin');


INSERT INTO messages(sender_id, receiver_id, _message)
VALUES ('f26f0f2f-2ee1-48a6-8187-8fad86bf74eb', '6324f33a-e369-40e6-97ba-3dce6bb688ef',  'This is the another message');


INSERT INTO messages(sender_id, receiver_id, _message)
VALUES ('e3620496-1472-46f8-b089-abaab6472f3a', '6324f33a-e369-40e6-97ba-3dce6bb688ef',  'Hello I am in charge of your customer service. Please feel free to state your queries.');

