# Coffee Shop Web Application

"A responsive full-stack coffee ordering platform where customers can explore varieties, customize drinks, and make payments online. Admins manage the menu, pricing, and stock levels, while the backend handles order tracking and analytics. Built using React, Node.js, and MongoDB, it ensures fast performance, secure transactions, and smooth scalability for modern businesses."

---

## 🚀 Key Features

- **Custom Drink Builder:** Interactive menu allowing custom options for size, milk, sweetness, and toppings.
- **Admin Dashboard:** Full management of menu items, real-time stock levels, pricing, and sales analytics.
- **Secure Online Payments:** Integrated checkout flow for fast and secure digital transactions.
- **Order Tracking & Management:** Real-time order status tracking from placement to fulfillment.
- **Responsive Web UI:** Optimized user interface across desktop, tablet, and mobile browsers.

---

## 🛠️ Tech Stack

- **Frontend:** React, HTML5, CSS3 / Tailwind CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB / Mongoose
- **State Management & API:** Axios / Context API / Redux Toolkit

---

## 💻 Local Setup Instructions

Follow these step-by-step instructions to set up and run the project in your local development environment:

### 1. **Clone the Repository**
Clone the repository to your local machine and navigate into the project directory:
```bash
git clone [https://github.com/Zunair-01/coffee-shop-web.git](https://github.com/Zunair-01/coffee-shop-web.git)

```

### 2. **Install Backend Dependencies**

Navigate to the server directory and install required Node modules:

```bash
cd server
npm install

```

### 3. **Install Frontend Dependencies**

Navigate to the client directory and install required dependencies:

```bash
cd ../client
npm install

```

### 4. **Configure Environment Variables**

Create a `.env` file in the `server` folder with the following configuration:

```env
PORT=5000
MONGO_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/coffee_db
JWT_SECRET=your_jwt_secret_key
PAYMENT_GATEWAY_KEY=your_payment_api_key

```

### 5. **Run the Application**

Start the backend server (from `server` directory):

```bash
npm run dev

```

Start the frontend application (from `client` directory):

```bash
npm start

```

Access the web application in your browser at: **`http://localhost:3000`**

```

```
