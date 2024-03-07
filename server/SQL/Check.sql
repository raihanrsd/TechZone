
-- checking while registering user
SELECT * FROM general_user WHERE email = $1 OR username = $2 OR contact_no = $3

-- checking while logging in user
SELECT * FROM general_user WHERE email = $1

-- checking while displaying dashboard
SELECT * FROM general_user WHERE user_id = $1


-- checking to see if the category already exists
SELECT * FROM category WHERE category_name = $1



SELECT DISTINCT PA.attribute_name FROM product_attribute PA 
JOIN product P ON PA.product_id = P.id
JOIN category C ON C.parent_category_id = 2 AND C.category_id = 







