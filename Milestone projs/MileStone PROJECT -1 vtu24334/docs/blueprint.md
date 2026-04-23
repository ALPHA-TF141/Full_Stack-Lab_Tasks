# **App Name**: InventioTrack

## Core Features:

- Secure Admin Portal: Admin authentication with login/logout, secure password hashing and validation, session management, and role-based access control for enhanced security.
- Product Catalog Management: Comprehensive CRUD operations for products, including Product ID, Name, Category, Price, and Quantity fields, along with search, filtering, validation, and error handling capabilities.
- Supplier Directory: Manage supplier information through add, edit, and delete operations, including contact details and relational mapping to associated products.
- Stock Movement Control: Process purchase and sales transactions to automatically update stock quantities, prevent negative stock levels, and log a complete transaction history.
- Dashboard Overview: A centralized dashboard displaying total product count, low stock alerts, a feed of recent transactions, and summary cards with key inventory statistics.
- AI-Powered Reorder Tool: A tool that analyzes current stock levels and applies a simple demand forecasting rule (Reorder Level = (Average Daily Sales × Lead Time) + Safety Stock) to suggest optimal reorder quantities for low-stock products, displayed directly on the dashboard.

## Style Guidelines:

- Primary color: A deep, professional blue (#2966A3), conveying reliability and efficiency, used for primary actions, headings, and key UI elements.
- Background color: A very light, muted grayish-blue (#F0F2F5), providing a clean and open backdrop for optimal content readability.
- Accent color: A bright, vibrant cyan (#47EBEB), used for interactive elements, alerts, and critical information to establish clear visual hierarchy.
- Typography: 'Inter' (Google Font) for all text, ensuring a clean, modern, and professional UI with excellent readability across various screen sizes.
- Layout: A structured design featuring a persistent sidebar navigation, a responsive grid system, clear section separation, and a card-based dashboard layout for intuitive data presentation.
- Iconography: Use a consistent set of clean line-art icons, including specific symbols for Add (+), Edit (✏), Delete (🗑), and Alert (⚠) functions.
- Animation: Implement smooth page transitions, subtle loading indicators, clear form submission feedback, and non-distracting micro-interactions to enhance user experience.