# 📦 InventioTrack – Complete Project Explanation (JavaScript Version)

## 🎯 Project Overview

**InventioTrack** is an **Inventory Management System** built using modern full-stack technologies. It helps businesses manage products, suppliers, stock levels, and transactions with AI-powered reorder suggestions.

---

## 📦 Tech Stack & Dependencies

### Frontend

* Next.js 15.5 – React framework
* React 19 – UI library
* JavaScript (ES6+)
* Tailwind CSS – Styling
* Radix UI – UI components
* React Hook Form – Form handling
* Zod – Validation
* Zustand – State management
* Recharts – Charts
* Lucide React – Icons

### Backend

* Next.js API Routes – Backend APIs
* MySQL2/Promise – Database connection
* Express Session – Session handling
* Bcryptjs – Password hashing

### AI/ML

* Genkit – Google AI framework
* Google Gemini – AI model

### Database

* MySQL – Relational database

---

## 🏗️ Architecture Overview

Frontend (React) → API Routes (Next.js) → MySQL Database

---

## 📁 Folder Structure

### Root Files

* package.json
* jsconfig.json
* tailwind.config.js
* next.config.js
* postcss.config.mjs
* hash.js

### src/app

* page.jsx (Login)
* layout.jsx
* globals.css

(admin)

* dashboard/page.jsx
* products/page.jsx
* suppliers/page.jsx
* transactions/page.jsx

api/

* login/route.js
* products/route.js
* products/[id]/route.js
* transactions/route.js
* test/route.js

### src/components

* app-sidebar.jsx
* breadcrumb-nav.jsx

ui/

* button.jsx
* card.jsx
* table.jsx
* form.jsx
* dialog.jsx
* select.jsx
* input.jsx

### src/ai

* genkit.js
* dev.js
* flows/suggest-optimal-reorder-quantities-flow.js

### src/lib

* db.js
* store.js
* utils.js

### src/config

* db.js

### src/hooks

* use-mobile.js
* use-toast.js

---

## 🔄 Data Flow

### Authentication Flow

User → Login Page → /api/login → MySQL → Redirect to Dashboard

### Product Flow

Form → /api/products → MySQL → UI Update

### AI Flow

Dashboard → AI Flow → Analyze Data → Suggest Reorder

### Transaction Flow

Stock Change → /api/transactions → Update DB

---

## 🗄️ Database Schema

### admin

* id
* username
* password

### products

* id
* product_name
* category
* price
* quantity
* averageDailySales
* leadTimeDays
* safetyStock
* supplierId
* created_at
* status

### suppliers

* id
* name
* contactName
* email
* phone

### transactions

* id
* productId
* productName
* type
* quantity
* date
* notes

---

## 🔐 Authentication

* Login via /api/login
* Password hashed using bcryptjs
* Default: admin / admin123

---

## 🎨 UI/UX

* Sidebar navigation
* Dashboard cards
* Tables for data
* Forms for input
* Toast notifications
* Charts using Recharts

---

## 🚀 Running the Project

```bash
npm run dev
```

---

## 🤖 AI Reorder Logic

Reorder Level = (Daily Sales × Lead Time) + Safety Stock

If stock is below reorder level → Suggest reorder

---

## 📊 Zustand Store Example

```js
const useStore = create((set) => ({
  products: [],
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] }))
}));
```

---

## 🔌 API Example

```js
export async function GET(req) {
  return Response.json({ message: "OK" });
}
```

---

## 🛠️ Key Changes (TS → JS)

* Removed TypeScript
* Using jsconfig.json
* .ts/.tsx → .js/.jsx
* No types/interfaces

---

## 🎯 Features

* Secure Login
* Product Management
* Supplier Management
* Transaction Tracking
* Dashboard Analytics
* AI Reorder Suggestions

---

## 💬 Summary

InventioTrack is a full-stack inventory system built with Next.js and JavaScript, using MySQL for storage and Genkit AI for intelligent inventory decisions.
