UPDATE product_attribute SET stock = stock - $1, sold = sold + $1 WHERE id = $2;


UPDATE product_category
SET category_img = 'camera' || (FLOOR(RANDOM() * 6) + 1)::TEXT || '.png'
WHERE parent_category_id = 47;
