# Slooze Foods

Slooze Foods is a full-stack food ordering application built with Next.js. It features multi-region support (India/America), role-based user access (Admin, Manager, Member), cart management, and a complete order processing workflow.

## 📋 Table of Contents
- [Getting Started](#-getting-started)
- [Prerequisites](#-prerequisites)
- [Installation & Local Setup](#-installation--local-setup)
- [Environment Variables](#-environment-variables)
- [Architecture & Design](#-architecture--design)
- [API Collection](#-api-collection)
- [Datasets & Models](#-datasets--models)
- [Repository & Demo](#-repository--demo)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### 🛠 Prerequisites

Ensure you have the following installed on your system:
* **Node.js** (v18 or higher recommended)
* **npm** or **yarn**
* **MongoDB** (Local instance or Atlas connection string)

### 💻 Installation & Local Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/aashutoshpatel11/slooze-foods.git](https://github.com/aashutoshpatel11/slooze-foods.git)
    cd slooze-foods
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure Environment Variables**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    DB_NAME=slooze_foods
    JWT_KEY=your_secret_jwt_key
    NEXT_PUBLIC_SERVER=http://localhost:3000
    SERVER_URL=http://localhost:3000
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

5.  **Access the application**
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Architecture & Design

**Tech Stack:**
* **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
* **Language:** TypeScript
* **Database:** MongoDB with [Mongoose](https://mongoosejs.com/)
* **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) (Client-side state)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
* **Authentication:** JWT (JSON Web Tokens) via HTTP-only cookies

**Key Features:**
* **Region Selection:** Users choose a region (India/America) which filters food items and orders.
* **Role-Based Access Control:**
    * **ADMIN:** Can edit orders and view all details.
    * **MANAGER/MEMBER:** Standard ordering capabilities.
* **Cart System:** Users can add/remove items and view their total before placing an order.
* **Order Management:** Create, Place, Update (Payment Method), and Cancel orders.

## 📡 API Collection

The application exposes the following RESTful API endpoints located in `src/app/api`:

### User APIs
| Method | Endpoint | Description | Body / Params |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/user/sign-up` | Register a new user | `{ fullname, email, password, country, role }` |
| `POST` | `/api/user/sign-in` | Authenticate user | `{ email, password, country }` |
| `GET` | `/api/user/current-user` | Get logged-in user details | (Cookie Token) |
| `GET` | `/api/user/log-out` | Clear auth cookie | - |
| `GET` | `/api/user/cart/[userId]` | Fetch user's cart | `userId` (URL param) |
| `GET` | `/api/user/make-cart-empy/[userId]` | Clear user's cart | `userId` (URL param) |

### Food Item APIs
| Method | Endpoint | Description | Body / Params |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/food-item/get-all` | Fetch items by region | `{ country }` |
| `POST` | `/api/food-item/add` | Create new food item | `{ name, price, country }` |
| `POST` | `/api/food-item/add-to-cart/[ids]` | Add item to user cart | `ids` format: `userId=foodItemId` |
| `DELETE` | `/api/food-item/remove/[id]` | Delete a food item | `id` (URL param) |

### Order APIs
| Method | Endpoint | Description | Body / Params |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/order/create` | Initialize a new order | `{ country }` |
| `POST` | `/api/order/get` | Get placed orders | `{ country }` |
| `POST` | `/api/order/add/[id]` | Add item to order | `id` format: `orderId=foodItemId` |
| `POST` | `/api/order/place/[orderId]` | Finalize/Place order | `{ paymentMethod }` |
| `PATCH` | `/api/order/update/[orderId]` | Update payment method | `{ paymentMethod }` |
| `DELETE` | `/api/order/cancel/[orderId]` | Cancel an order | `orderId` (URL param) |

## Datasets & Models

The application uses MongoDB. Below are the Mongoose schemas used:

### 1. User Model
* **fullname:** String (Required)
* **email:** String (Required, Unique)
* **password:** String (Required)
* **country:** String (Enum: "INDIA", "AMERICA")
* **role:** String (Enum: "ADMIN", "MANAGER", "MEMBER")
* **cart:** Array of ObjectIds (Ref: `FoodItem`)

### 2. FoodItem Model
* **name:** String (Required)
* **price:** Number (Default: 0)
* **country:** String (Enum: "INDIA", "AMERICA")

### 3. Order Model
* **items:** Array of ObjectIds (Ref: `FoodItem`)
* **country:** String (Enum: "INDIA", "AMERICA")
* **isplaced:** Boolean (Default: false)
* **paymentMethod:** String (Enum: "COD", "DEBIT", "CREDIT", "UPI", Default: "COD")

## 🔗 Repository & Demo

* **Git Repository:** [https://github.com/aashutoshpatel11/slooze-foods](https://github.com/aashutoshpatel11/slooze-foods)
* **Live Deployment / Demo Video:** [Link to your Demo Video or Deployed App Here]

---
