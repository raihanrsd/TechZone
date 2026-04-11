# TechZone

Full-stack e-commerce platform for electronics with role-based workflows for customers, admins, and delivery agents.

## Tech Stack

- **Frontend:** React (Create React App), React Router, Axios, Bootstrap, Chart.js
- **Backend:** Node.js, Express, PostgreSQL (`pg`)
- **Auth:** JWT (custom middleware via `token` header)
- **File Uploads:** Multer (local disk under `server/public/images/...`)

## Repository Structure

- `client/` – React frontend
- `server/` – Express API + PostgreSQL integration
- `server/SQL/` – schema, alter scripts, procedures, triggers, and advanced queries

---

## Database Design and Critical Operations

### Core Domain Tables

- `general_user`, `customer`, `admin`, `delivery_man`
- `product_category`, `product`, `product_attribute`, `product_image`, `product_video`
- `orders`, `order_product`, `tracker`, `order_delivery_man`
- `wishlist`, `promo`, `shipping_address`
- `product_review`, `product_qa`, `product_qa_answers`
- `messages`, `notification`, `notice_board`, `contact_us`

### Critical Integrity Rules

- **Strong FK usage** with cascading cleanup in many relations (e.g. product/category/order-linked records).
- **Validation checks**:
  - non-negative money/stock/points fields
  - rating bounded (`0..5`)
  - tracker progress bounded (`0..100`)
- **Unique constraints**:
  - user identity fields (`username`, `email`, `contact_no`)
  - category uniqueness (`category_name`)
  - product attribute uniqueness (`product_id`, `attribute_name`, `_value`)
- **Default timestamps/dates** for operational history (`date_added`, `time_added`, etc.).

### Critical Trigger/Procedure Logic

1. **User role auto-provisioning on signup**
   - Trigger inserts into role table based on `staff_status`:
     - `customer` => `customer` row (points initialized)
     - `admin` => `admin` row
     - `delivery_man` => `delivery_man` row

2. **Order lifecycle automation**
   - On order insert:
     - creates tracker row automatically
     - creates order notification
     - credits customer points
   - On tracker progress update:
     - `progress = 100` => marks order `Delivered`, sets delivery timestamp, pushes notification
     - otherwise keeps `Pending`, pushes status notification
   - On order cancellation:
     - removes tracker record
     - notifies user

3. **Loyalty point accrual**
   - order creation => points increment
   - product review creation => points increment
   - product question creation => points increment

4. **Customer-service and delivery messaging procedures**
   - auto-assigns available customer-service admin when customer registers
   - sends delivery-man intro message and notification after order acceptance

5. **Operational analytics functions**
   - `get_product_sold_count(start_date, end_date)`
   - `get_order_count(start_date, end_date)`
   - `get_cumulative_earned_amount(start_date, end_date)`

6. **Audit logging hooks (if `call_log` table exists)**
   - logs product update events
   - logs product-attribute update events

---

## API Overview

### Base URL (development)

- Server runs on `http://localhost:5000` (or `PORT` env value).

### Authentication Convention

- Protected routes require header:
  - `token: <jwt_token>`

---

## API Endpoints (Complete)

## System / Upload / Static

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/` | ✅ | Get current authenticated user (`general_user`) |
| POST | `/upload/:name` | ❌ | Upload product images via multipart (`images` field) |
| GET | `/images/products/:file` | ❌ | Static product image serving |
| GET | `/images/categories/:file` | ❌ | Static category image serving |

## Auth (`/auth`)

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/auth/` | ❌ | Health route |
| POST | `/auth/register` | ❌ | Register user, hash password, issue JWT |
| POST | `/auth/login` | ❌ | Login and issue JWT |
| GET | `/auth/is-verify` | ✅ | Validate token and return user role |

## Product Discovery / Catalog

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/shop` | Optional | Full product catalog (specs/images/wishlist enrichment) |
| GET | `/product/:id` | Optional | Single product details |
| GET | `/categories` | ❌ | List all categories |
| GET | `/attributes` | ❌ | List distinct attribute names |
| GET | `/search` | Optional | Search products by category and term |
| GET | `/topRank` | ❌ | Top-ranked products by sold specs |
| GET | `/featured_product/:number` | Optional | Featured products (top N) |
| GET | `/featured_product/price/:number` | ❌ | Top N by computed price model |

## Filters

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/category` | ❌ | Parent category children (`parent_category_id = 1`) |
| GET | `/attribute` | ❌ | Distinct attributes with values |
| GET | `/maxPrice` | ❌ | Maximum product price |
| GET | `/allFilter` | Optional | Composite filter (category, text, price range, attribute values, sorting) |

## Wishlist (`/wishlist`)

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/wishlist` | ✅ | Get current user wishlist |
| GET | `/wishlist/top/:number` | ❌ | Top wishlisted products |
| POST | `/wishlist/:id` | ✅ | Add product to wishlist |
| DELETE | `/wishlist/:id` | ✅ | Remove product from wishlist |

## Cart / Product Option Helpers (`/products/cart`)

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/products/cart` | ❌ | Resolve cart product list by IDs |
| POST | `/products/cart/:id` | ❌ | Get base specs for a product |

## Shipping Address (`/shipping_address`)

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/shipping_address` | ✅ | List user addresses |
| POST | `/shipping_address` | ✅ | Create address |
| PUT | `/shipping_address/:id` | ✅ | Update address |
| DELETE | `/shipping_address/:id` | ✅ | Delete address |

## Orders

### Place Order (`/order`)

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/order` | ✅ | Create order, optionally create address, decrement stock, increment sold, create order-product rows |

### Order Details (`/get_order`)

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/get_order/:id` | ✅ | Fetch order with products/images/tracker/user/assignment checks |
| PUT | `/get_order/cancel_order/:id` | ✅ | Cancel order with reason |

### Tracker (`/tracker`)

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/tracker/:id` | ✅ | Get tracker by tracker id |
| POST | `/tracker` | ✅ | Update tracker progress |
| PUT | `/tracker` | ✅ | Update estimated delivery date |

### Promo (`/promo`)

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/promo` | ❌ | Validate promo by name and active date range |
| GET | `/promo/get_promos` | ✅ (Admin) | List promos |
| POST | `/promo/add_promo` | ✅ (Admin) | Create promo |
| DELETE | `/promo/delete_promo` | ✅ (Admin) | Delete promo |
| PUT | `/promo/update_promo` | ✅ (Admin) | Update promo |

## User Profile / Engagement

### User Info (`/info`)

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/info/user` | ✅ | Get current profile |
| PUT | `/info/user` | ✅ | Update profile (unique validation handling) |
| GET | `/info/user/order` | ✅ | Get user orders (admin gets all orders) |

### Notifications (`/notifications`)

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/notifications` | ✅ | Get notifications + unread count |
| PUT | `/notifications/seen` | ✅ | Mark all notifications as read |

### Reviews (`/review`)

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/review` | ✅ | Add product review |
| GET | `/review/:id` | ❌ | List product reviews |

### Q&A (`/qa`)

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/qa/question` | ✅ | Add product question |
| POST | `/qa/answer` | ✅ (Admin) | Add answer to a question |
| GET | `/qa/question/:id` | ❌ | Get product questions and answers |

## Messaging (`/messages`)

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/messages/get_users` | ✅ | Get conversation list with last message/unread metadata |
| GET | `/messages/get_messages?user_id=<uuid>` | ✅ | Get thread messages and mark incoming as seen |
| POST | `/messages/send_message` | ✅ | Send message |

## Delivery Man

### Delivery profile (`/delivery_man`)

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/delivery_man` | ✅ | Verify and fetch delivery-man profile |

### Delivery orders (`/DMorders`)

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/DMorders/available_orders` | ✅ | List pending unassigned orders |
| POST | `/DMorders/accept_order` | ✅ | Accept order and assign delivery man |
| GET | `/DMorders/assigned_orders` | ✅ | List assigned pending orders |
| PUT | `/DMorders/change_payment_status` | ✅ | Toggle order payment status |
| GET | `/DMorders/completed_orders` | ✅ | List delivered/cancelled assigned orders |

## Admin (`/admin`)

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/admin/` | ❌ | Admin root route |

### Product & Category Management

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/admin/add/product` | ❌ | Add product + its specs |
| POST | `/admin/add/category` | ❌ | Add category (supports parent category) |
| DELETE | `/admin/delete/category/:id` | ❌ | Delete category |
| DELETE | `/admin/delete/product/:id` | ❌ | Delete product |
| PUT | `/admin/update/product/:id` | ❌ | Update product and upsert specs |

### Product Images

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/admin/upload/product/images` | ❌ | Persist image URLs for product |
| DELETE | `/admin/upload/product/images/:id` | ❌ | Delete product image row |
| GET | `/admin/upload/product/images/:id` | ❌ | Get images by product id |

### Order / User Admin Views

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/admin/all_orders` | ✅ (Admin) | Full order list + assigned delivery-man details |
| GET | `/admin/all/admins` | ✅ (Admin) | List admins |
| GET | `/admin/all/users` | ✅ (Admin) | List customers |
| GET | `/admin/all/delivery_man` | ✅ (Admin) | List delivery men |
| PUT | `/admin/all/change_admin_rank` | ✅ (Admin) | Update admin clearance level |
| GET | `/admin/all/get_call_logs` | ✅ (Admin) | Read call/audit logs |

### Analytics

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/admin/analytics/product_date` | ✅ (Admin) | Product sold count time series |
| GET | `/admin/analytics/order_date` | ✅ (Admin) | Order count time series |
| GET | `/admin/analytics/price_date` | ✅ (Admin) | Cumulative revenue time series |
| GET | `/admin/analytics/best_selling_products` | ✅ (Admin) | Top best-selling products |
| GET | `/admin/analytics/top_wishlisted_products` | ✅ (Admin) | Top wishlisted products |
| GET | `/admin/analytics/top_rated_products` | ✅ (Admin) | Top rated products |
| GET | `/admin/analytics/most_valuable_users` | ✅ (Admin) | Top users by total spend |
| GET | `/admin/analytics/most_active_users` | ✅ (Admin) | Top users by points |
| GET | `/admin/analytics/orders_delivery_man` | ✅ (Admin) | Delivery-man completion stats |

---

## Local Setup

## 1) Database

1. Create PostgreSQL database/user.
2. Update server DB credentials in `server/db.js`.
3. Run schema scripts from `server/SQL/`:
   - `CreateTable.sql`
   - then required migrations from `Alter.sql`
   - optional procedures/triggers in `PL_SQL&TRIGGERS.SQL`

> Note: some advanced/admin features expect DB objects such as stored procedures, functions, and `call_log` table.

## 2) Server

```bash
cd server
npm install
npm start
```

Required env values (example):

```env
PORT=5000
jwtSecret=your_secret
```

## 3) Client

```bash
cd client
npm install
npm start
```

Client runs at `http://localhost:3000` by default.

---

## Authorization & Roles

- JWT is required for protected routes and sent in `token` header.
- Role enforcement is performed in route handlers using `general_user.staff_status` and presence in `admin` / `delivery_man` tables.

---

## Notes for Production Hardening

- Move DB credentials from source code to environment variables.
- Add stricter request validation (schema validation for all payloads).
- Enforce admin authorization on currently open admin mutation routes.
- Add DB transactions around multi-step order placement to guarantee consistency.
- Replace dynamic SQL string interpolation with parameterized queries everywhere.
- Add API versioning (`/api/v1/...`) and OpenAPI spec generation.

---

## Contributors

- Raihan Rashid
- Abhishek Roy
