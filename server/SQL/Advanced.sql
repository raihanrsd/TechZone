

-- common spec sql
SELECT DISTINCT C.category_id, A.attribute_name FROM product P 
LEFT JOIN product_attribute A ON P.id = A.product_id
RIGHT JOIN product_category C on P.category_id = C.category_id
ORDER BY C.category_id ASC;


-- budget device in a particular category
WITH M AS(
WITH N AS (
SELECT P.id FROM product_category C 
LEFT JOIN product P ON p.category_id = C.category_id 
WHERE P.price = (
    SELECT MIN(price) FROM product 
    WHERE category_id = P.category_id 
))


-- search term in specs
SELECT P.id FROM product P 
LEFT JOIN product_attribute A 
ON P.id = A.product_id 
WHERE LOWER(A._value) LIKE '%a16%' OR LOWER(P.product_name) LIKE '%sam%'
UNION(
    SELECT N.id FROM N
)
)
SELECT M.id FROM M
MINUS(
    SELECT DISTINCT P1.id FROM product P1 LEFT JOIN 
    product_attribute A1
    on P1.id = A1.product_id 
    WHERE LOWER(A1._value) LIKE '%bKa%'OR LOWER(P1.product_name) LIKE '%iph%'
)
;


SELECT * FROM product 
WHERE id IN (
    SELECT M.id FROM M
);




-- TOP N PRODUCTS 
WITH product_sell AS(
WITH max_s AS(
    SELECT
        product_id,
        SUM(sold) AS total_sold
    FROM product_attribute
    GROUP BY product_id, attribute_name
)

SELECT P.id AS id, COALESCE(MAX(total_sold), 0) AS max_total_sold
FROM product P
LEFT JOIN max_s AS A ON P.id = A.product_id
GROUP BY P.id
)

SELECT * FROM product WHERE id IN (
SELECT P1.id from product_sell P1
LEFT JOIN product_sell P2 ON P1.max_total_sold < P2.max_total_sold
GROUP BY P1.id
HAVING COUNT(DISTINCT P2.id) < 5);



-- featured product in terms of price

SELECT SUM(max_increase) FROM product p
LEFT JOIN 
(
SELECT product_id, MAX(price_increase) AS max_increase FROM product_attribute
GROUP BY attribute_name, product_id) N
ON P.id = N.product_id
WHERE P.id = P1.id;




-- TOP N PRODUCTS ACCORDING TO PRICE

SELECT * from product 
WHERE id IN (
SELECT P1.id FROM product P1 
LEFT JOIN product P2 ON P1.price + (
    SELECT SUM(max_increase) FROM product p
    LEFT JOIN 
    (
    SELECT product_id, MAX(price_increase) AS max_increase FROM product_attribute
    GROUP BY attribute_name, product_id) N
    ON P.id = N.product_id
        WHERE P.id = P1.id

) < P2.price + (
    SELECT SUM(max_increase) FROM product p
    LEFT JOIN 
    (
    SELECT product_id, MAX(price_increase) AS max_increase FROM product_attribute
    GROUP BY attribute_name, product_id) N
    ON P.id = N.product_id
    WHERE P.id = P2.id
)
GROUP BY P1.id
HAVING COUNT(DISTINCT P2.ID) < 3);


-- user wishlist
SELECT DISTINCT P.* FROM general_user G 
LEFT JOIN wishlist W ON W.user_id = G.user_id
LEFT JOIN product P ON P.id = W.product_id
WHERE G.user_id = 'something'
;

-- top wishlisted product
SELECT * FROM product WHERE 
id IN (
WITH N AS (
SELECT P.id, COUNT(G.user_id) AS MAX_COUNT FROM general_user G 
JOIN wishlist W ON W.user_id = G.user_id
JOIN product P ON P.id = W.product_id
GROUP BY P.id)


SELECT N1.id FROM N N1
LEFT JOIN N M ON N1.MAX_COUNT < M.MAX_COUNT
GROUP BY N1.id
HAVING COUNT(M.id) < 1)
;





SELECT * FROM general_user WHERE user_id = (

SELECT user_id from ORDERS WHERE order_id = (
    SELECT order_id FROM tracker WHERE tracker_id = 2
));


-- user info from tracker id
SELECT U.* FROM GENERAL_USER U 
JOIN ORDERS O ON U.user_id = O.user_id
JOIN TRACKER T ON O.order_id = T.order_id
WHERE T.tracker_id = 2;



-- available orders 

SELECT *
        FROM orders
        WHERE order_id IN (
            SELECT order_id FROM orders 
            EXCEPT 
            SELECT order_id FROM order_delivery_man
        );

-- completed orders 
SELECT * from orders WHERE order_id IN (
                SELECT order_id FROM orders WHERE 
                order_status = 'Delivered' OR order_status = 'Cancelled'
                INTERSECT(
                    SELECT order_id FROM order_delivery_man
                    WHERE user_id = '8c1ffbd8-9fb3-4b3d-87f8-1ca6ff5f8902'
                )
            )



-- retriving user messages

SELECT * FROM general_user WHERE user_id IN (
            SELECT sender_id FROM messages WHERE receiver_id = '6324f33a-e369-40e6-97ba-3dce6bb688ef'
            UNION
            SELECT receiver_id FROM messages WHERE sender_id = '6324f33a-e369-40e6-97ba-3dce6bb688ef'
        );




-- retriving the available customer service individual

SELECT A.user_id
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


-- retriving both info of delivery man
SELECT G.*, D.* FROM general_user G 
LEFT JOIN delivery_man D ON G.user_id = D.user_id 
WHERE G.user_id IN (SELECT DISTINCT user_id 
FROM order_delivery_man WHERE order_id = 71);



-- top sold product in a time line

SELECT O.*, OP.* FROM orders O JOIN order_product OP ON O.order_id = OP.order_id
WHERE O.order_time BETWEEN '2024-01-01' AND '2024-12-31';




-- best selling product

WITH RankedProducts AS (
  SELECT
    p.id AS product_id,
    p.product_name,
    pa.attribute_name,
    MAX(pa.sold) AS max_sold,
    ROW_NUMBER() OVER (PARTITION BY p.id ORDER BY MAX(pa.sold) DESC) AS rnk
  FROM
    product p
    JOIN product_attribute pa ON p.id = pa.product_id
  GROUP BY
    p.id, p.product_name, pa.attribute_name
)
SELECT
  product_id,
  product_name,
  attribute_name,
  max_sold
FROM
  RankedProducts
WHERE
  rnk = 1
ORDER BY
  max_sold DESC
LIMIT 10;



-- top wishlisted products
WITH WishListCounts AS (
    SELECT
        product_id,
        COUNT(*) AS wish_count
    FROM
        wishlist
    GROUP BY
        product_id
)

SELECT
    p.id AS product_id,
    p.product_name,
    COALESCE(wc.wish_count, 0) AS wish_count
FROM
    product p
LEFT JOIN
    WishListCounts wc ON p.id = wc.product_id
ORDER BY
    COALESCE(wc.wish_count, 0) DESC
LIMIT 10;



-- top rated products
WITH AvgRatings AS (
    SELECT
        p.id AS product_id,
        p.product_name,
        AVG(pr.rating) AS avg_rating
    FROM
        product p
    LEFT JOIN
        product_review pr ON p.id = pr.product_id
    GROUP BY
        p.id, p.product_name
)

SELECT
    product_id,
    product_name,
    COALESCE(avg_rating, 0) AS avg_rating
FROM
    AvgRatings
ORDER BY
    COALESCE(avg_rating, 0) DESC
LIMIT 10;




-- most valuable user
SELECT
    u.user_id,
    u.username,
    u.email,
    u.full_name,
    SUM(o.total_price) AS cumulative_value
FROM
    general_user u
JOIN
    orders o ON u.user_id = o.user_id
GROUP BY
    u.user_id, u.username, u.email, u.full_name
ORDER BY
    cumulative_value DESC
LIMIT 10;


-- most active user

SELECT cu.user_id, gu.username, cu.points
FROM customer cu
JOIN general_user gu ON cu.user_id = gu.user_id
ORDER BY cu.points DESC
LIMIT 10;

