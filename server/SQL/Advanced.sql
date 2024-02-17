

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


SELECT U.* FROM GENERAL_USER U 
JOIN ORDERS O ON U.user_id = O.user_id
JOIN TRACKER T ON O.order_id = T.order_id
WHERE T.tracker_id = 2;

