UPDATE product_attribute SET stock = stock - $1, sold = sold + $1 WHERE id = $2;


