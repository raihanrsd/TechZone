import psycopg2
import csv
from psycopg2 import sql
from faker import Faker
import random



csv_file_path = 'Mobile.csv'
connection = psycopg2.connect(
    dbname="techzone",
    user="techzone_admin",
    password="123456789",
    host="localhost",
    port="5432"
)

cursor = connection.cursor()


# The code for inserting the smartphone brands into the product_category
# unique_brands = set()
# with open(csv_file_path, 'r') as csv_file:
#     reader = csv.DictReader(csv_file)
#     for row in reader:
#         brand_name = row.get('Brand')
#         if brand_name:
#             unique_brands.add(brand_name.title())


# print(unique_brands)

# for brand_name in unique_brands:
#     # Check if the category_name already exists
#     check_query = sql.SQL("SELECT * FROM product_category WHERE category_name = {}").format(sql.Literal(brand_name))
#     cursor.execute(check_query)
#     existing_category = cursor.fetchone()

#     if not existing_category:
#         # Insert the new category with initcap format
#         insert_query = sql.SQL("""
#             INSERT INTO product_category (category_name, parent_category_id, category_description, category_img)
#             VALUES ({}, {}, 'This is a category Description', 'category_img.png')
#         """).format(sql.Literal(brand_name), sql.Literal(2))
        
#         cursor.execute(insert_query)




############################################################################################################
# Code for inserting each product into the product table
fake = Faker()
# model_rows_dict = {}

# def insert_product_and_attributes(model, category_id, rows):
#     # Find the minimum selling price for the model
#     min_selling_price = min(float(row['Selling Price']) for row in rows)
#     min_original_price = min(
#         float(row['Original Price']) if row['Original Price'] else min_selling_price + float('100')
#         for row in rows
#     )

#     # Check if the product with this model already exists
#     check_product_query = sql.SQL("""
#         SELECT id FROM product
#         WHERE product_name = {} LIMIT 1
#     """).format(sql.Literal(model))

#     cursor.execute(check_product_query)
#     existing_product = cursor.fetchone()

#     if not existing_product:
#         # Insert product information
#         insert_product_query = sql.SQL("""
#             INSERT INTO product (
#                 product_name, price, previous_price,
#                 product_description, product_exerpt, product_img,
#                 category_id, discount_status, discount, product_status,
#                 visibility_status, date_added
#             )
#             VALUES (
#                 {}, {}, {},
#                 {}, {}, {},
#                 {}, TRUE, {}, TRUE,
#                 TRUE, CURRENT_DATE
#             )
#         """).format(
#             sql.Literal(model),
#             sql.Literal(min_selling_price),
#             sql.Literal(min_original_price),  # Using min_selling_price as previous_price
#             sql.Literal(fake.text()),
#             sql.Literal(fake.text(max_nb_chars=50)),
#             sql.Literal('none.png'),
#             sql.Literal(category_id),
#             sql.Literal(random.uniform(10, 20))
#         )

#         cursor.execute(insert_product_query)

#         # Get the generated product_id
#         cursor.execute("SELECT lastval()")
#         product_id = cursor.fetchone()[0]

#         # Get unique attribute values for each attribute_name
#         # print("INSERT ", model, category_id)
#         unique_attributes = {key: set(row[key] for row in rows) for key in ['Color', 'Memory', 'Storage']}
#         # print(unique_attributes)


#         # Insert product_attribute information
#         # print('This is the min Selling price', min_selling_price)
#         for attribute_name, values in unique_attributes.items():
#             base_spec_claimed = False
#             min_attribute_value_price = float('inf')

#             for _value in values:
#                 # Find the minimum price for this attribute value
#                 attribute_value_price = min(
#                     float(row['Selling Price'])
#                     for row in rows
#                     if row[attribute_name] == _value
#                 )

#                 # Calculate price increase

#                 # print(attribute_value_price, min_selling_price, min_attribute_value_price)
#                 price_increase = 0
#                 price_increase = attribute_value_price - float(min_selling_price)
                

#                 # Set base_spec condition
#                 base_spec = False
#                 if price_increase == 0 and not base_spec_claimed:
#                     base_spec = True
#                     base_spec_claimed = True

#                 # Set stock based on the formula
#                 stock = int(300 / len(values))

#                 insert_attribute_query = sql.SQL("""
#                     INSERT INTO product_attribute (
#                         product_id, attribute_name, _value,
#                         price_increase, stock, sold, base_spec
#                     )
#                     VALUES (
#                         {}, {}, {}, {}, {}, 50, {}
#                     )
#                 """).format(
#                     sql.Literal(product_id),
#                     sql.Literal(attribute_name),
#                     sql.Literal(_value),
#                     sql.Literal(price_increase),
#                     sql.Literal(stock),
#                     sql.Literal(base_spec)
#                 )


#                 # print("Insert ", 23, attribute_name, _value, price_increase, stock, base_spec)

#                 cursor.execute(insert_attribute_query)




# with open(csv_file_path, 'r') as csv_file:
#     reader = csv.DictReader(csv_file)
#     for row in reader:
#         model_name = row.get('Model')

#         if model_name not in model_rows_dict:
#             model_rows_dict[model_name] = []

#         model_rows_dict[model_name].append(row)

# # Iterate through the dictionary and insert products and attributes
# for model, rows in model_rows_dict.items():
#     # Find category_id for the model's brand
#     brand_category_query = sql.SQL("""
#         SELECT category_id FROM product_category WHERE category_name = {}
#     """).format(sql.Literal(rows[0].get('Brand')))

#     cursor.execute(brand_category_query)
#     brand_category_id = cursor.fetchone()

#     if brand_category_id:
#         # Insert product and attributes
#         insert_product_and_attributes(model, brand_category_id[0], rows)




############################################################################################################
# Code for inserting each category of the laptop
# unique_brands = set()
# csv_file_path = 'laptop.csv'
# with open(csv_file_path, 'r') as csv_file:
#     reader = csv.DictReader(csv_file)
#     for row in reader:
#         brand_name = row.get('brand')
#         if brand_name:
#             unique_brands.add(brand_name.title())


# # print(unique_brands)

# for brand_name in unique_brands:
#     # Check if the category_name already exists
#     check_query = sql.SQL("SELECT * FROM product_category WHERE category_name = {}").format(sql.Literal(brand_name))
#     cursor.execute(check_query)
#     existing_category = cursor.fetchone()

#     if not existing_category:
#         # Insert the new category with initcap format
#         insert_query = sql.SQL("""
#             INSERT INTO product_category (category_name, parent_category_id, category_description, category_img)
#             VALUES ({}, {}, 'This is a category Description', 'category_img.png')
#         """).format(sql.Literal(brand_name), sql.Literal(3))
        
#         cursor.execute(insert_query)
#         # print("insert ", brand_name)
#     else:
#         insert_query = sql.SQL("""
#             INSERT INTO product_category (category_name, parent_category_id, category_description, category_img)
#             VALUES ({}, {}, 'This is a category Description', 'category_img.png')
#         """).format(sql.Literal(brand_name + ' Laptop'), sql.Literal(3))
#         # print("insert ", brand_name + ' Laptop')
#         cursor.execute(insert_query)




# Code for inserting each laptop into the product table
# csv_file_path = 'laptop.csv'
# model_rows_dict = {}

# def insert_product_and_attributes(model, category_id, rows):
#     # Find the minimum selling price for the model
#     min_selling_price = min(float(row['price']) for row in rows)
#     min_original_price = min_selling_price + 10000

#     # Check if the product with this model already exists
#     check_product_query = sql.SQL("""
#         SELECT id FROM product
#         WHERE product_name = {} LIMIT 1
#     """).format(sql.Literal(model))

#     cursor.execute(check_product_query)
#     existing_product = cursor.fetchone()

#     if not existing_product:
#         # Insert product information
#         insert_product_query = sql.SQL("""
#             INSERT INTO product (
#                 product_name, price, previous_price,
#                 product_description, product_exerpt, product_img,
#                 category_id, discount_status, discount, product_status,
#                 visibility_status, date_added
#             )
#             VALUES (
#                 {}, {}, {},
#                 {}, {}, {},
#                 {}, TRUE, {}, TRUE,
#                 TRUE, CURRENT_DATE
#             )
#         """).format(
#             sql.Literal(model),
#             sql.Literal(min_selling_price),
#             sql.Literal(min_original_price),  # Using min_selling_price as previous_price
#             sql.Literal(fake.text()),
#             sql.Literal(fake.text(max_nb_chars=50)),
#             sql.Literal('none.png'),
#             sql.Literal(category_id),
#             sql.Literal(random.uniform(10, 20))
#         )

#         cursor.execute(insert_product_query)

#         # Get the generated product_id
#         cursor.execute("SELECT lastval()")
#         product_id = cursor.fetchone()[0]

#         # Get unique attribute values for each attribute_name
#         # print("INSERT ", model, category_id)
#         unique_attributes = {key: set(row[key] for row in rows) for key in ['processor_name', 'ram(GB)', 'ssd(GB)', 'Hard Disk(GB)', 'Operating System', 'graphics', 'screen_size(inches)', 'no_of_cores', 'resolution (pixels)', 'no_of_threads', 'spec_score']}
#         #print(unique_attributes)


#         # Insert product_attribute information
#         # print('This is the min Selling price', min_selling_price)
#         for attribute_name, values in unique_attributes.items():
#             base_spec_claimed = False

#             for _value in values:
#                 # Find the minimum price for this attribute value
#                 attribute_value_price = min(
#                     float(row['price'])
#                     for row in rows
#                     if row[attribute_name] == _value
#                 )

#                 # Calculate price increase

#                 # print(attribute_value_price, min_selling_price, min_attribute_value_price)
#                 price_increase = 0
#                 price_increase = attribute_value_price - float(min_selling_price)
                

#                 # Set base_spec condition
#                 base_spec = False
#                 if price_increase == 0 and not base_spec_claimed:
#                     base_spec = True
#                     base_spec_claimed = True

#                 # Set stock based on the formula
#                 stock = int(300 / len(values))

#                 insert_attribute_query = sql.SQL("""
#                     INSERT INTO product_attribute (
#                         product_id, attribute_name, _value,
#                         price_increase, stock, sold, base_spec
#                     )
#                     VALUES (
#                         {}, {}, {}, {}, {}, 50, {}
#                     )
#                 """).format(
#                     sql.Literal(product_id),
#                     sql.Literal(attribute_name.replace('_', ' ').title()),
#                     sql.Literal(_value),
#                     sql.Literal(price_increase),
#                     sql.Literal(stock),
#                     sql.Literal(base_spec)
#                 )

#                 cursor.execute(insert_attribute_query)




# with open(csv_file_path, 'r') as csv_file:
#     reader = csv.DictReader(csv_file)
#     for row in reader:
#         model_name = row.get('model_name')

#         if model_name not in model_rows_dict:
#             model_rows_dict[model_name] = []

#         model_rows_dict[model_name].append(row)

# # Iterate through the dictionary and insert products and attributes
# for model, rows in model_rows_dict.items():
#     # Find category_id for the model's brand
#     brand_category_query = sql.SQL("""
#         SELECT category_id FROM product_category WHERE category_name = {}
#     """).format(sql.Literal(rows[0].get('brand').title()))

#     brand_category_query_alt = sql.SQL(
#         "SELECT category_id FROM product_category WHERE category_name = {}"
#     ).format(sql.Literal(rows[0].get('brand').title() + ' Laptop')
#     )
#     cursor.execute(brand_category_query)
#     brand_category_id = cursor.fetchone()
#     cursor.execute(brand_category_query_alt)
#     brand_category_alt_id = cursor.fetchone()
#     if brand_category_alt_id is not None:
#         brand_category_id = brand_category_alt_id

#     if brand_category_id:
#         # Insert product and attributes
#         insert_product_and_attributes(model, brand_category_id[0], rows)


############################################################################################################

# Here is the code for inserting the category of the cameras
# unique_brands = set()
# csv_file_path = 'camera.csv'
# with open(csv_file_path, 'r') as csv_file:
#     reader = csv.DictReader(csv_file)
#     for row in reader:
#         brand_name = row.get('Model').split(' ')[0].title()
#         if brand_name:
#             unique_brands.add(brand_name.title())


# # print(unique_brands)

# for brand_name in unique_brands:
#     # Check if the category_name already exists
#     check_query = sql.SQL("SELECT * FROM product_category WHERE category_name = {}").format(sql.Literal(brand_name))
#     cursor.execute(check_query)
#     existing_category = cursor.fetchone()

#     if not existing_category:
#         # Insert the new category with initcap format
#         insert_query = sql.SQL("""
#             INSERT INTO product_category (category_name, parent_category_id, category_description, category_img)
#             VALUES ({}, {}, 'This is a category Description', 'category_img.png')
#         """).format(sql.Literal(brand_name), sql.Literal(47))
        
#         cursor.execute(insert_query)
#         #print("insert ", brand_name)
#     else:
#         insert_query = sql.SQL("""
#             INSERT INTO product_category (category_name, parent_category_id, category_description, category_img)
#             VALUES ({}, {}, 'This is a category Description', 'category_img.png')
#         """).format(sql.Literal(brand_name + ' Camera'), sql.Literal(47))
#         # print("insert ", brand_name + ' Camera')
#         cursor.execute(insert_query)

# Code for inserting each camera into the product table

# model_rows_dict = {}
# csv_file_path = 'camera.csv'

# def insert_product_and_attributes(model, category_id, rows):
#     # Find the minimum selling price for the model
#     min_selling_price = min(float(row['Price']) for row in rows) * 100
#     min_original_price = min_selling_price + 1000

#     # Check if the product with this model already exists
#     check_product_query = sql.SQL("""
#         SELECT id FROM product
#         WHERE product_name = {} LIMIT 1
#     """).format(sql.Literal(model))

#     cursor.execute(check_product_query)
#     existing_product = cursor.fetchone()

#     # print(existing_product, model, category_id)

#     if not existing_product:
#         # Insert product information
#         insert_product_query = sql.SQL("""
#             INSERT INTO product (
#                 product_name, price, previous_price,
#                 product_description, product_exerpt, product_img,
#                 category_id, discount_status, discount, product_status,
#                 visibility_status, date_added
#             )
#             VALUES (
#                 {}, {}, {},
#                 {}, {}, {},
#                 {}, TRUE, {}, TRUE,
#                 TRUE, CURRENT_DATE
#             )
#         """).format(
#             sql.Literal(model),
#             sql.Literal(min_selling_price),
#             sql.Literal(min_original_price),  # Using min_selling_price as previous_price
#             sql.Literal(fake.text()),
#             sql.Literal(fake.text(max_nb_chars=50)),
#             sql.Literal('none.png'),
#             sql.Literal(category_id),
#             sql.Literal(random.uniform(10, 20))
#         )

#         cursor.execute(insert_product_query)
#         product_id = 100
#         # Get the generated product_id
#         cursor.execute("SELECT lastval()")
#         product_id = cursor.fetchone()[0]

#         # Get unique attribute values for each attribute_name
#         # print("INSERT ", model, category_id)
#         unique_attributes = {key: set(row[key] for row in rows) for key in ['Release date' ,'Max resolution' ,'Low resolution' ,'Effective pixels','Zoom wide (W)','Zoom tele (T)','Normal focus range','Macro focus range','Storage included','Weight (inc. batteries)','Dimensions']}
#         #print(unique_attributes)


#         # Insert product_attribute information
#         # print('This is the min Selling price', min_selling_price)
#         for attribute_name, values in unique_attributes.items():
#             base_spec_claimed = False
#             min_attribute_value_price = float('inf')

#             for _value in values:
#                 # Find the minimum price for this attribute value
#                 attribute_value_price = min(
#                     float(row['Price'])
#                     for row in rows
#                     if row[attribute_name] == _value
#                 ) * 100

#                 # Calculate price increase

#                 # print(attribute_value_price, min_selling_price, min_attribute_value_price)
#                 price_increase = 0
#                 price_increase = attribute_value_price - float(min_selling_price)
                

#                 # Set base_spec condition
#                 base_spec = False
#                 if price_increase == 0 and not base_spec_claimed:
#                     base_spec = True
#                     base_spec_claimed = True

#                 # Set stock based on the formula
#                 stock = int(300 / len(values))

#                 insert_attribute_query = sql.SQL("""
#                     INSERT INTO product_attribute (
#                         product_id, attribute_name, _value,
#                         price_increase, stock, sold, base_spec
#                     )
#                     VALUES (
#                         {}, {}, {}, {}, {}, 50, {}
#                     )
#                 """).format(
#                     sql.Literal(product_id),
#                     sql.Literal(attribute_name),
#                     sql.Literal(_value),
#                     sql.Literal(price_increase),
#                     sql.Literal(stock),
#                     sql.Literal(base_spec)
#                 )

#                 if len(unique_attributes[attribute_name]) > 1:
#                     print("Insert ", 23, attribute_name, _value, price_increase, stock, base_spec)

#                 # print("Insert ", 23, attribute_name, _value, price_increase, stock, base_spec)

#                 cursor.execute(insert_attribute_query)




# with open(csv_file_path, 'r') as csv_file:
#     reader = csv.DictReader(csv_file)
#     for row in reader:
#         model_name = row.get('Model')

#         if model_name not in model_rows_dict:
#             model_rows_dict[model_name] = []

#         model_rows_dict[model_name].append(row)

# # # Iterate through the dictionary and insert products and attributes
# for model, rows in model_rows_dict.items():
#     # Find category_id for the model's brand
#     brand_category_query = sql.SQL("""
#         SELECT category_id FROM product_category WHERE category_name = {}
#     """).format(sql.Literal(rows[0].get('Model').split(' ')[0].title().strip()))
#     # print(rows[0].get('Model').split(' ')[0].title())
    
#     cursor.execute(brand_category_query)
#     brand_category_id = cursor.fetchone()
#     print(brand_category_id)
#     brand_category_query_alt = sql.SQL(
#         "SELECT category_id FROM product_category WHERE category_name = {}"
#     ).format(sql.Literal(rows[0].get('Model').split(' ')[0].title().strip() + ' Camera')
#     )
    
#     cursor.execute(brand_category_query_alt)
#     brand_category_id_alt = cursor.fetchone()
#     if brand_category_id_alt is not None:
#         brand_category_id = brand_category_id_alt
    
#     print(brand_category_id, model)
    
#     if brand_category_id:
#         # Insert product and attributes
#         insert_product_and_attributes(model, brand_category_id[0], rows)


############################################################################################################

# Code for inserting tv categories
# unique_brands = set()
# csv_file_path = 'TV.csv'
# with open(csv_file_path, 'r') as csv_file:
#     reader = csv.DictReader(csv_file)
#     for row in reader:
#         brand_name = row.get('Brand')
#         if brand_name:
#             unique_brands.add(brand_name.title())


# print(unique_brands)

# for brand_name in unique_brands:
#     # Check if the category_name already exists
#     check_query = sql.SQL("SELECT * FROM product_category WHERE category_name = {}").format(sql.Literal(brand_name))
#     cursor.execute(check_query)
#     existing_category = cursor.fetchone()

#     if not existing_category:
#         # Insert the new category with initcap format
#         insert_query = sql.SQL("""
#             INSERT INTO product_category (category_name, parent_category_id, category_description, category_img)
#             VALUES ({}, {}, 'This is a category Description', 'category_img.png')
#         """).format(sql.Literal(brand_name), sql.Literal(127))
        
#         cursor.execute(insert_query)
#         # print("insert ", brand_name)
#     else:
#         insert_query = sql.SQL("""
#             INSERT INTO product_category (category_name, parent_category_id, category_description, category_img)
#             VALUES ({}, {}, 'This is a category Description', 'category_img.png')
#         """).format(sql.Literal(brand_name + ' TV'), sql.Literal(127))
#         #print("insert ", brand_name + ' TV')
#         cursor.execute(insert_query)


# Code for inserting each tv into the product table

# model_rows_dict = {}
# csv_file_path = 'TV.csv'

# def insert_product_and_attributes(model, category_id, rows):
#     # Find the minimum selling price for the model
#     min_selling_price = min(float(row['Selling Price']) for row in rows)
#     min_original_price = min(float(row['Original Price']) if row['Original Price'] else min_selling_price + 1000 for row in rows)


#     # Check if the product with this model already exists
#     check_product_query = sql.SQL("""
#         SELECT id FROM product
#         WHERE product_name = {} LIMIT 1
#     """).format(sql.Literal(model))

#     cursor.execute(check_product_query)
#     existing_product = cursor.fetchone()

#     # print(existing_product, model, category_id)

#     if not existing_product:
#         # Insert product information
#         insert_product_query = sql.SQL("""
#             INSERT INTO product (
#                 product_name, price, previous_price,
#                 product_description, product_exerpt, product_img,
#                 category_id, discount_status, discount, product_status,
#                 visibility_status, date_added
#             )
#             VALUES (
#                 {}, {}, {},
#                 {}, {}, {},
#                 {}, TRUE, {}, TRUE,
#                 TRUE, CURRENT_DATE
#             )
#         """).format(
#             sql.Literal(model),
#             sql.Literal(min_selling_price),
#             sql.Literal(min_original_price),  # Using min_selling_price as previous_price
#             sql.Literal(fake.text()),
#             sql.Literal(fake.text(max_nb_chars=50)),
#             sql.Literal('none.png'),
#             sql.Literal(category_id),
#             sql.Literal(random.uniform(10, 20))
#         )

#         cursor.execute(insert_product_query)
#         product_id = 100
#         # Get the generated product_id
#         cursor.execute("SELECT lastval()")
#         product_id = cursor.fetchone()[0]

#         # Get unique attribute values for each attribute_name
#         #print("INSERT ", model, category_id)
#         unique_attributes = {key: set(row[key] for row in rows) for key in ['Resolution', 'Size ', 'Operating System']}
#         # print(unique_attributes)


#         # Insert product_attribute information
#         # print('This is the min Selling price', min_selling_price)
#         for attribute_name, values in unique_attributes.items():
#             base_spec_claimed = False
#             min_attribute_value_price = float('inf')

#             for _value in values:
#                 # Find the minimum price for this attribute value
#                 attribute_value_price = min(
#                     float(row['Selling Price'])
#                     for row in rows
#                     if row[attribute_name] == _value
#                 )

#                 # Calculate price increase

#                 # print(attribute_value_price, min_selling_price, min_attribute_value_price)
#                 price_increase = 0
#                 price_increase = attribute_value_price - float(min_selling_price)
                

#                 # Set base_spec condition
#                 base_spec = False
#                 if price_increase == 0 and not base_spec_claimed:
#                     base_spec = True
#                     base_spec_claimed = True

#                 # Set stock based on the formula
#                 stock = int(300 / len(values))

#                 insert_attribute_query = sql.SQL("""
#                     INSERT INTO product_attribute (
#                         product_id, attribute_name, _value,
#                         price_increase, stock, sold, base_spec
#                     )
#                     VALUES (
#                         {}, {}, {}, {}, {}, 50, {}
#                     )
#                 """).format(
#                     sql.Literal(product_id),
#                     sql.Literal(attribute_name),
#                     sql.Literal(_value),
#                     sql.Literal(price_increase),
#                     sql.Literal(stock),
#                     sql.Literal(base_spec)
#                 )

#                 if len(unique_attributes[attribute_name]) > 1:
#                     print("Insert ", 23, attribute_name, _value, price_increase, stock, base_spec)

#                 #print("Insert ", 23, attribute_name, _value, price_increase, stock, base_spec)

#                 cursor.execute(insert_attribute_query)




# with open(csv_file_path, 'r') as csv_file:
#     reader = csv.DictReader(csv_file)
#     for row in reader:
#         model_name = row.get('Brand').strip() + ' ' + row.get('Resolution').strip()

#         if model_name not in model_rows_dict:
#             model_rows_dict[model_name] = []

#         model_rows_dict[model_name].append(row)

# # print(model_rows_dict)

# # # Iterate through the dictionary and insert products and attributes
# for model, rows in model_rows_dict.items():
#     # Find category_id for the model's brand
#     brand_category_query = sql.SQL("""
#         SELECT category_id FROM product_category WHERE category_name = {}
#     """).format(sql.Literal(rows[0].get('Brand').title()))
#     # print(rows[0].get('Model').split(' ')[0].title())
    
#     cursor.execute(brand_category_query)
#     brand_category_id = cursor.fetchone()
#     # print(brand_category_id)
#     brand_category_query_alt = sql.SQL(
#         "SELECT category_id FROM product_category WHERE category_name = {}"
#     ).format(sql.Literal(rows[0].get('Brand').title().strip() + ' TV')
#     )
    
#     cursor.execute(brand_category_query_alt)
#     brand_category_id_alt = cursor.fetchone()
#     if brand_category_id_alt is not None:
#         brand_category_id = brand_category_id_alt
    
#     print(brand_category_id, model)
    
#     if brand_category_id:
#         # Insert product and attributes
#         insert_product_and_attributes(model, brand_category_id[0], rows)








connection.commit()

cursor.close()
connection.close()


    