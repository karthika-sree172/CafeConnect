# ☕ CafeConnect - Cafe Ordering Platform

A complete MERN stack cafe ordering platform with intentional bugs and edge cases for **QA testing practice**.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Intentional Bugs for Testing](#intentional-bugs-for-testing)
- [Test Credentials](#test-credentials)

---

## 🎯 Project Overview

CafeConnect is a realistic cafe ordering platform built with React, Node.js, Express, and MongoDB. It includes:

- **User Authentication** (Login/Signup with JWT)
- **Menu Management** (Browse, view details)
- **Shopping Cart** (Add/remove items)
- **Checkout & Order Placement**
- **Admin Dashboard** (Manage menu items & orders)

### Intentional Bugs for QA Testing

This project includes multiple intentional bugs to practice QA testing:

1. **Empty field login** - Backend allows login with empty email/password
2. **Incorrect total calculation** - Cart total sometimes calculated incorrectly
3. **Duplicate order submission** - No debounce on order button
4. **Negative quantity allowed** - No validation for negative quantities
5. **Missing error messages** - Some form validations show no feedback
6. **Invalid email format accepted** - Email validation is weak
7. **Zero price items** - Menu allows items with 0 price
8. **Empty cart checkout** - Can attempt checkout with empty cart

---

## 🛠 Tech Stack

### Frontend
- **React** 18.2.0
- **React Router** 6.10.0
- **Axios** 1.3.4
- **Vite** 4.2.0 (Build tool)
- **CSS3** (Custom styling, no framework)

### Backend
- **Node.js** + **Express.js** 4.18.2
- **MongoDB** with **Mongoose** 7.0.0
- **JWT** (Authentication)
- **bcryptjs** (Password hashing)
- **CORS** (Cross-origin requests)

---

## 📁 Project Structure
