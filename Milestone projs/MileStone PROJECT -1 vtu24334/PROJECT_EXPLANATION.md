# InventioTrack - Complete Project Explanation

## 🎯 Project Overview
**InventioTrack** is an **Inventory Management System** built with modern full-stack technologies. It helps businesses manage products, suppliers, stock levels, and sales/purchase transactions with AI-powered reorder suggestions.

---

## 📦 Tech Stack & Dependencies

### **Frontend**
- **Next.js 15.5** - React framework for production
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless component library (Accordion, Dialog, Dropdown, Select, etc.)
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Zustand** - State management (alternative to Redux)
- **Recharts** - Data visualization/charts
- **Lucide React** - Icon library

### **Backend**
- **Next.js API Routes** - Serverless API endpoints
- **MySQL2/Promise** - Database driver (async)
- **Express Session** - Session management
- **Bcryptjs** - Password hashing & encryption

### **AI/ML**
- **Genkit** - Google's AI framework for building AI flows
- **@genkit-ai/google-genai** - Google AI (Gemini) integration

### **Database**
- **MySQL** - Relational database (local: `inventiotrack` database)

### **Dev Tools**
- **Turbopack** - Fast bundler (runs on port 9002)
- **TSX** - TypeScript executor

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  - Login Page (src/app/page.tsx)                        │
│  - Admin Dashboard (src/app/(admin)/dashboard)          │
│  - Product Management (src/app/(admin)/products)        │
│  - Supplier Management (src/app/(admin)/suppliers)      │
│  - Transaction History (src/app/(admin)/transactions)   │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP/JSON
┌────────────────────────▼────────────────────────────────┐
│            API Routes (Next.js Backend)                 │
│  - /api/login (Authentication)                         │
│  - /api/products (CRUD Operations)                      │
│  - /api/transactions (Transaction Management)          │
│  - /api/test (Testing endpoint)                        │
└────────────────────────┬────────────────────────────────┘
                         │ SQL Queries
┌────────────────────────▼────────────────────────────────┐
│         MySQL Database (inventiotrack)                  │
│  - admin (credentials)                                 │
│  - products (inventory)                                │
│  - suppliers (vendor info)                             │
│  - transactions (purchase/sale history)                │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Folder Structure & Purpose

### **Root Level Files**
```
- package.json          → Dependencies & run scripts
- tsconfig.json         → TypeScript configuration
- tailwind.config.ts    → Tailwind CSS customization
- postcss.config.mjs    → CSS processing config
- next.config.ts        → Next.js settings
- hash.js               → Utility to generate bcrypt hashes (admin123)
- components.json       → UI component registry
```

### **src/app** - Main Application
```
src/app/
├── page.tsx                    ← Landing page (LOGIN FORM)
├── layout.tsx                  ← Root layout
├── globals.css                 ← Global styles
│
└── (admin)/                    ← Route group (doesn't appear in URL)
    ├── layout.tsx              ← Admin sidebar + header layout
    ├── dashboard/page.tsx      ← Dashboard (home after login)
    ├── products/page.tsx       ← Product management CRUD
    ├── suppliers/page.tsx      ← Supplier management CRUD
    └── transactions/page.tsx   ← Transaction history view
    
└── api/                        ← Backend API routes
    ├── login/route.js          ← Authentication endpoint
    ├── products/
    │   ├── route.js            ← GET all, POST create products
    │   └── [id]/route.ts       ← GET/PUT/DELETE single product
    ├── transactions/route.js   ← Transaction management
    └── test/route.js           ← Testing endpoint
```

### **src/components** - Reusable UI Components
```
components/
├── app-sidebar.tsx             ← Navigation menu
├── breadcrumb-nav.tsx          ← Breadcrumb navigation
├── nav-main.tsx                ← Main navigation items
│
└── ui/                         ← Pre-built Radix UI components
    ├── button.tsx              ← Button component
    ├── card.tsx                ← Card container
    ├── table.tsx               ← Data table
    ├── form.tsx                ← Form wrapper
    ├── dialog.tsx              ← Modal dialog
    ├── select.tsx              ← Dropdown select
    ├── input.tsx               ← Input field
    ├── alert.tsx               ← Alert messages
    ├── badge.tsx               ← Status badges
    ├── skeleton.tsx            ← Loading skeleton
    ├── toast.tsx & toaster.tsx ← Toast notifications
    └── ... (20+ more UI components)
```

### **src/ai** - AI/ML Features
```
ai/
├── genkit.ts                   ← Genkit AI initialization
├── dev.ts                      ← Development AI setup
└── flows/
    └── suggest-optimal-reorder-quantities-flow.ts
       └── AI function that analyzes inventory and suggests reorders
```

### **src/lib** - Utilities & Stores
```
lib/
├── db.js                       ← MySQL database connection pool
├── store.ts                    ← Zustand state management
│   └── Contains: Products, Suppliers, Transactions data
├── utils.ts                    ← Helper functions
└── placeholder-images.ts       ← Mock image data
```

### **src/config** - Configuration Files
```
config/
└── db.ts                       ← MySQL connection config
    └── Connects to: inventiotrack database
```

### **src/hooks** - Custom React Hooks
```
hooks/
├── use-mobile.tsx              ← Detect mobile screen size
└── use-toast.ts                ← Toast notification hook
```

---

## 🔄 Data Flow & Process

### **1️⃣ Authentication Flow**
```
User Login (page.tsx)
    ↓
POST /api/login {username, password}
    ↓
Backend validates against MySQL admin table
    ↓
Bcrypt compares hashed password
    ↓
If valid: Redirect to /dashboard
If invalid: Show error message
```

### **2️⃣ Product Management Flow**
```
Admin clicks "Add Product" on /products page
    ↓
Form submission with product data
    ↓
POST /api/products
    ↓
Backend validates & inserts into MySQL
    ↓
Frontend updates UI / shows success toast
    ↓
User can view/edit/delete products in table
```

### **3️⃣ Dashboard AI Reorder Suggestion Flow**
```
Dashboard loads (dashboard page.tsx)
    ↓
Fetch all products from Zustand store
    ↓
User clicks "Refresh AI Analysis"
    ↓
Call suggestOptimalReorderQuantitiesFlow() (AI)
    ↓
Genkit + Google Gemini analyze inventory data
    ↓
AI calculates: Reorder Level = (Daily Sales × Lead Time) + Safety Stock
    ↓
AI suggests reorder quantities for low-stock items
    ↓
Display suggestions on dashboard
```

### **4️⃣ Transaction Recording Flow**
```
When stock changes (purchase or sale)
    ↓
Create transaction record:
  { productId, type: 'purchase'|'sale', quantity, date }
    ↓
POST /api/transactions
    ↓
Update product quantity in MySQL
    ↓
Store transaction in transactions table
    ↓
Show on Transactions page with history
```

---

## 🗄️ Database Schema

### **MySQL Database: `inventiotrack`**

#### **admin** Table (Authentication)
```sql
admin {
  id: int (PK)
  username: varchar
  password: varchar (bcrypt hashed)
}
```

#### **products** Table
```sql
products {
  id: varchar (PK)
  product_name: varchar
  category: varchar
  price: decimal
  quantity: int
  averageDailySales: float
  leadTimeDays: int
  safetyStock: int
  supplierId: varchar (FK → suppliers)
  created_at: timestamp
  status: ENUM ('In Stock', 'Low Stock')
}
```

#### **suppliers** Table
```sql
suppliers {
  id: varchar (PK)
  name: varchar
  contactName: varchar
  email: varchar
  phone: varchar
}
```

#### **transactions** Table
```sql
transactions {
  id: varchar (PK)
  productId: varchar (FK → products)
  productName: varchar
  type: ENUM ('purchase', 'sale')
  quantity: int
  date: timestamp
  notes: text
}
```

---

## 🔐 Authentication & Security

### **Login Process**
1. User enters username & password on `/page.tsx`
2. Form submission → POST `/api/login`
3. Backend queries MySQL `admin` table
4. **Bcryptjs** compares password hash:
   - `bcrypt.compare(inputPassword, storedHash)` → boolean
5. If match → Redirect to `/dashboard`
6. If no match → Error message displayed

### **Default Credentials** (from `hash.js`)
```
Username: admin
Password: admin123
```

### **Protected Routes**
- Only `/` (login) is public
- `/dashboard` and `/admin/*` should check auth (recommend adding middleware)

---

## 🎨 UI/UX Components & Features

### **Layout Structure**
```
┌─────────────────────────────────────────┐
│  Header (Breadcrumbs + Sidebar Toggle)  ← Sticky top
├──────────┬──────────────────────────────┤
│ SIDEBAR  │  MAIN CONTENT AREA           │
│ Nav      │  - Dashboard cards           │
│ Items    │  - Tables (products, etc.)   │
│          │  - Forms (add/edit)          │
│          │  - AI Suggestions            │
└──────────┴──────────────────────────────┘
```

### **Key UI Components Used**
- **Card** - Container for sections
- **Table** - Display products/transactions
- **Button** - CTA, form submission, actions
- **Dialog** - Add/edit modals
- **Form** - User input (React Hook Form + Zod validation)
- **Select** - Dropdown menus
- **Alert/Toast** - Success/error messages
- **Badge** - Status indicators (Low Stock, etc.)
- **Skeleton** - Loading states
- **Chart (Recharts)** - Data visualization

### **Color Scheme**
- **Primary**: Deep blue (#2966A3) - Headers, buttons
- **Background**: Light gray (#F0F2F5) - Page background
- **Accent**: Cyan (#47EBEB) - Alerts, highlights
- **Typography**: Inter font (Google Font)

---

## 🚀 Running the Project

### **Run Development Server**
```bash
npm run dev
```
- Starts on `http://localhost:9002` (Turbopack)
- Hot reload enabled

### **Run AI Development Server**
```bash
npm run genkit:dev
```
- Starts Genkit + AI flow development interface

### **Build for Production**
```bash
npm run build
npm start
```

### **Environment Setup**
1. Create `.env.local`:
   ```
   DB_PASSWORD=your_mysql_root_password
   ```
2. Ensure MySQL is running with `inventiotrack` database

---

## 🤖 AI Integration - Genkit

### **AI Flow: `suggestOptimalReorderQuantitiesFlow`**

**Purpose**: Analyze products and suggest reorder quantities

**Input Schema**:
```typescript
{
  productId: string
  productName: string
  currentStock: number
  averageDailySales: number
  leadTimeDays: number
  safetyStock: number
}[]
```

**AI Formula**:
```
Reorder Level = (Average Daily Sales × Lead Time Days) + Safety Stock

Suggested Quantity = 
  if currentStock < reorderLevel ? MAX(0, reorderLevel - currentStock) : 0
```

**Example**:
```
Product: Wireless Mouse
- Current Stock: 15 units
- Daily Sales: 2.5 units/day
- Lead Time: 5 days
- Safety Stock: 20 units

Reorder Level = (2.5 × 5) + 20 = 32.5 units
Suggested Order = 32.5 - 15 = 17.5 ≈ 18 units
```

**Output**:
```typescript
{
  productId: string
  productName: string
  reorderLevel: number
  suggestedReorderQuantity: number
  reasoning: string  // Explanation from AI
}[]
```

---

## 📊 State Management - Zustand

### **Global Store** (`src/lib/store.ts`)

Uses **Zustand** for client-side state (instead of Redux):

```typescript
useStore() returns:
{
  products: Product[]        // All products
  suppliers: Supplier[]      // All suppliers
  transactions: Transaction[]// All transactions
  
  // Product actions
  addProduct(product) → void
  updateProduct(id, changes) → void
  deleteProduct(id) → void
  
  // Supplier actions
  addSupplier(supplier) → void
  updateSupplier(id, changes) → void
  deleteSupplier(id) → void
  
  // Transaction actions
  addTransaction(transaction) → void
}
```

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/login` | User authentication |
| GET | `/api/products` | Fetch all products |
| POST | `/api/products` | Create new product |
| GET | `/api/products/[id]` | Fetch single product |
| PUT | `/api/products/[id]` | Update product |
| DELETE | `/api/products/[id]` | Delete product |
| GET/POST | `/api/transactions` | Manage transactions |
| GET | `/api/test` | Testing endpoint |

---

## 🎯 Key Features Explained

### **1. Secure Admin Portal**
- Login authentication with bcryptjs hashing
- Session management
- Password-protected admin area

### **2. Product Catalog Management**
- Full CRUD operations
- Search & filter capabilities
- Low stock status tracking
- Price, quantity, category management

### **3. Supplier Directory**
- Add/edit/delete suppliers
- Contact details
- Links to products

### **4. Stock Movement Control**
- Record purchase transactions
- Record sale transactions
- Automatic stock quantity updates
- Prevent negative stock
- Transaction history

### **5. Dashboard Analytics**
- Total product count card
- Low stock alerts card
- Recent activity feed
- Efficiency score

### **6. AI-Powered Reorder Tool**
- Analyzes current inventory
- Applies demand forecasting algorithm
- Suggests optimal order quantities
- Displayed on dashboard with reasoning

---

## 🔍 Workflow Summary

```
1. USER ACCESSES http://localhost:9002
   ↓
2. SHOWN LOGIN PAGE (/page.tsx)
   ↓
3. ENTERS admin / admin123
   ↓
4. AUTHENTICATES via /api/login
   ↓
5. REDIRECTED TO /dashboard (fixed from 404)
   ↓
6. VIEWS:
   - Product count card
   - Low stock warnings
   - Recent transactions
   - AI reorder suggestions (Genkit)
   ↓
7. CAN NAVIGATE:
   - Products page → Manage inventory
   - Suppliers page → Manage vendors
   - Transactions page → View history
   - Dashboard → Return to home
   ↓
8. SIDEBAR & BREADCRUMBS provide navigation
```

---

## 📝 Important Notes for Explanation

1. **MVC-like Architecture**: 
   - Views = React components
   - Controllers = Next.js API routes
   - Models = MySQL database

2. **Route Groups**: 
   - `(admin)` folder is a Next.js route group - doesn't affect URLs
   - `/admin/dashboard` → Actually `/dashboard`

3. **Responsiveness**: 
   - Tailwind CSS ensures mobile-friendly design
   - Sidebar collapses on smaller screens (`use-mobile` hook)

4. **Real-time State**: 
   - Zustand provides fast, reactive state updates
   - No database persistence for client state (mock data)

5. **AI Intelligence**: 
   - Genkit integrates with Google's Gemini API
   - Provides intelligent reorder suggestions based on demand forecasting

---

## 🛠️ Technologies at a Glance

| Category | Tool | Purpose |
|----------|------|---------|
| **Frontend** | Next.js + React | UI Framework |
| **Styling** | Tailwind CSS | CSS Framework |
| **Components** | Radix UI | Accessible components |
| **Forms** | React Hook Form + Zod | Form management & validation |
| **State** | Zustand | Client state |
| **Backend** | Next.js API Routes | Serverless endpoints |
| **Database** | MySQL | Data persistence |
| **Auth** | Bcryptjs | Password hashing |
| **AI/ML** | Genkit + Google Gemini | Intelligent suggestions |
| **Icons** | Lucide React | Icon set |
| **Charts** | Recharts | Data visualization |

---

**Now you have a complete understanding to explain the entire project structure, data flow, and technology choices! 🎉**
