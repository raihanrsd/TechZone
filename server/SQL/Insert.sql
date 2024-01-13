
INSERT INTO general_user(username, email, password, contact_no, profile_img, full_name, gender, staff_status)
VALUES ('admin', 'admin@gmail.com', '123456', '1234567', 'nice.img', 'admin rashid', 'male', 'admin');


INSERT INTO general_user(username, email, password, contact_no, profile_img, full_name, gender, staff_status)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;


