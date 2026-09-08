# Fazar AI — Embeddable AI Voice Assistant Platform

**Fazar AI** is an AI-powered, embeddable voice assistant platform that allows businesses to create, customize, and deploy intelligent voice assistants directly on their websites.

It combines **Google authentication**, **Gemini-powered conversations**, **browser-based voice interaction**, **website navigation**, **customizable assistant themes**, and **Razorpay-powered Pro subscriptions** into a complete SaaS workflow.

---

## Overview

Fazar AI is designed for businesses that want to add an intelligent voice assistant to their website without building and maintaining an AI assistant from scratch.

The platform provides a dashboard where users can configure their assistant, define business information, choose its personality and appearance, configure website pages, connect a Gemini API key, and generate the assistant for embedding.

The deployed assistant runs directly on the customer's website and communicates with the Fazar AI backend to retrieve configuration and process AI requests.

### Core Workflow

```text
User
  │
  ▼
Google Authentication
  │
  ▼
Fazar AI Dashboard
  │
  ├── Assistant Builder
  │      ├── Assistant Name
  │      ├── Business Information
  │      ├── Tone
  │      ├── Theme
  │      ├── Gemini API Key
  │      └── Website Pages
  │
  ├── Billing
  │      └── Razorpay Pro Subscription
  │
  └── Embed Code
           │
           ▼
      Customer Website
           │
           ▼
      Fazar AI Voice Assistant
           │
           ▼
       Fazar Backend
           │
           ▼
         Gemini AI
```

---

## ✨ Key Features

| Feature | Description |
|:--------|:------------|
| **Google Authentication** | Users can create and access their Fazar AI account using Google authentication through Firebase. |
| **JWT Authentication** | The backend creates JWT-based sessions for protected API requests. |
| **AI Voice Assistant** | Website visitors can communicate with the assistant using their voice. |
| **Gemini Integration** | Assistant requests are processed using Google's Gemini AI. |
| **Assistant Builder** | Businesses can configure their assistant without modifying source code. |
| **Custom Assistant Name** | Each business can give its assistant a custom name. |
| **Business Context** | Business name, type, and description are stored as assistant configuration. |
| **Custom Tone** | Assistants can be configured as `friendly`, `professional`, or `sales`. |
| **Custom Themes** | Multiple visual themes are available for the embeddable assistant. |
| **Website Page Configuration** | Businesses can define pages, paths, and keywords for their website. |
| **Website Navigation** | The assistant can use configured page information to assist visitors with navigation. |
| **Browser Speech Recognition** | Converts visitor speech into text. |
| **Browser Speech Synthesis** | Converts AI-generated responses into spoken responses. |
| **Usage Tracking** | User message usage can be tracked through `totalMessages`. |
| **Free & Pro Plans** | The platform supports Free and Pro subscription states. |
| **Razorpay Payments** | Pro subscriptions are processed using Razorpay. |
| **90-Day Pro Subscription** | Successful Pro payments activate the plan for 90 days. |
| **Embeddable Assistant** | The assistant can be deployed to external websites using the Fazar AI widget. |
| **SaaS Dashboard** | Businesses can manage their assistant configuration from the web application. |

---

## 🤖 AI Assistant System

The assistant is designed as a **voice-first AI interface** rather than a traditional text chat application.

### Voice Interaction Flow

```text
Visitor Speaks
      │
      ▼
Browser Speech Recognition
      │
      ▼
Recognized Text
      │
      ▼
POST /api/assistant/ask
      │
      ▼
Fazar Backend
      │
      ▼
Assistant Configuration
      │
      ▼
Gemini AI
      │
      ▼
Generated Response
      │
      ▼
Browser Speech Synthesis
      │
      ▼
Visitor Hears Response
```

The assistant can receive information such as:

- Assistant name
- Business name
- Business type
- Business description
- Assistant tone
- Website pages
- Current website path
- Navigation configuration

This allows the AI to generate responses based on the business and website context instead of behaving like a generic chatbot.

---

## 🎙️ Voice Interaction

Fazar AI uses browser speech capabilities for the voice interface.

### Speech Recognition

The browser converts the visitor's speech into text.

The project is configured toward **Indian English (`en-IN`)** for speech recognition.

```text
Microphone
    ↓
SpeechRecognition
    ↓
Text
```

### Speech Synthesis

After Gemini generates the response, the browser can convert the response text back into speech.

```text
AI Response
    ↓
SpeechSynthesisUtterance
    ↓
Voice Output
```

The assistant maintains a voice-oriented interaction without requiring a traditional text input interface.

---

## 🧠 Gemini AI Integration

Gemini acts as the intelligence layer of Fazar AI.

Fazar AI manages the application logic and configuration while Gemini is responsible for natural-language understanding and response generation.

```text
Fazar AI
 ├── User
 ├── Assistant Configuration
 ├── Business Context
 ├── Website Pages
 ├── Navigation Context
 └── Subscription / Usage
          │
          ▼
       Gemini AI
          │
          ▼
      AI Response
```

Each assistant can be configured with business-specific information so that the AI can respond according to the business it represents.

The project also tracks Gemini integration status:

```text
active
invalid
quota_exceeded
```

---

## 🧭 Website Navigation System

Businesses can configure website pages using:

```javascript
{
    name: "Pricing",
    path: "/pricing",
    keywords: [
        "price",
        "pricing",
        "cost",
        "plans"
    ]
}
```

The assistant can use this information to associate natural-language requests with website pages.

### Example

Visitor says:

> "Show me your pricing plans."

Configured page:

```text
Name:
Pricing

Path:
/pricing

Keywords:
price
pricing
cost
plans
```

The assistant can identify the relevant page and use `/pricing` for navigation.

The current website path is also sent with assistant requests:

```javascript
{
    message,
    userId,
    currentPath
}
```

This gives the backend and AI additional context about where the visitor currently is on the website.

---

## 🎨 Assistant Customization

Fazar AI allows businesses to customize how their assistant behaves and looks.

### Assistant Configuration

```text
Assistant Name
Business Name
Business Type
Business Description
Tone
Theme
Gemini API Key
Website Pages
```

### Supported Tones

```text
friendly
professional
sales
```

### Supported Themes

```text
dark
light
glass
midnight
ocean
aurora
sunset
cyber
emerald
rose
royal
ice
monochrome
cherry
lavender
neon
amethyst
```

This allows the same Fazar AI infrastructure to power assistants for different types of businesses.

---

## 🔐 Authentication & Security

Fazar AI uses two authentication layers.

### Google Authentication

Firebase handles the Google sign-in process on the frontend.

```text
Google
  ↓
Firebase Authentication
  ↓
Name + Email
  ↓
Fazar Backend
```

### JWT Authentication

After authentication, the Fazar backend generates a JWT containing the user's ID.

```text
User Login
   ↓
JWT Generated
   ↓
Cookie
   ↓
Protected API Requests
```

Protected routes use authentication middleware to identify the current user through:

```javascript
req.userId
```

This allows controllers to securely operate on the authenticated user's MongoDB record.

---

## 👤 User System

Each Fazar AI account is represented by a MongoDB user document.

The user model contains:

```text
Account Information
 ├── name
 └── email

Assistant Configuration
 ├── assistantName
 ├── bussinessName
 ├── bussinessType
 ├── bussinessDescription
 ├── tone
 └── theme

Assistant Capabilities
 ├── enableVoice
 ├── pages
 └── enableNavigation

AI Configuration
 ├── geminiApiKey
 └── geminiStatus

Usage
 └── totalMessages

Subscription
 ├── plan
 ├── requestLimits
 └── proExpiresAt

Setup
 └── isSetupComplete
```

---

## 💳 Billing & Subscription System

Fazar AI uses **Razorpay** for Pro subscription payments.

The current Pro plan is:

```text
₹599
90 Days
```

### Payment Flow

```text
User
  │
  ▼
Billing Page
  │
  ▼
POST /api/billing/pay
  │
  ▼
Create Razorpay Order
  │
  ▼
Razorpay Checkout
  │
  ▼
Payment
  │
  ▼
razorpay_order_id
razorpay_payment_id
razorpay_signature
  │
  ▼
POST /api/billing/verify
  │
  ▼
Signature Verification
  │
  ├── Invalid → Payment Failed
  │
  └── Valid
       │
       ▼
   Billing = paid
       │
       ▼
   User = pro
       │
       ▼
   Pro Expiry = +90 Days
```

### Razorpay Signature Verification

The backend verifies the payment using an HMAC SHA-256 signature generated from the Razorpay order ID and payment ID.

```javascript
const sign = crypto
    .createHmac("sha256", razorpaySecretKey)
    .update(
        razorpay_order_id + "|" + razorpay_payment_id
    )
    .digest("hex");
```

---

## 📦 Subscription States

Users begin with:

```text
plan: free
```

After successful payment:

```text
plan: pro
```

and:

```text
proExpiresAt:
90 days from payment
```

The platform can distinguish between Free and Pro accounts using the stored subscription state.

---

## 🏗️ Assistant Builder

The Builder is the primary configuration interface.

The user enters information such as:

```text
Assistant Name
Business Name
Business Type
Business Description
Tone
Theme
Gemini API Key
Website Pages
```

The frontend sends the configuration to:

```text
POST /api/user/assistant
```

The backend:

```text
1. Authenticates the user
2. Finds the user through req.userId
3. Updates assistant configuration
4. Stores configured website pages
5. Marks setup as complete
6. Saves the user
7. Returns the updated user
```

Once setup is complete:

```text
isSetupComplete = true
```

The application can then display the embed configuration.

---

## 🔁 Edit Assistant Workflow

Fazar AI supports editing an already-created assistant.

The flow is:

```text
Assistant Saved
     │
     ▼
Embed Code
     │
     ▼
Edit Assistant Configuration
     │
     ▼
Builder
     │
     ▼
Update Configuration
     │
     ▼
Save
     │
     ▼
Embed Code
```

This allows businesses to modify their assistant after initial setup.

---

## 🌐 Embeddable Architecture

The Fazar AI assistant is designed to work on external websites.

The customer website loads the Fazar AI assistant script and styling.

```text
Customer Website
      │
      ▼
assistant.js
      │
      ├── Assistant UI
      ├── Voice Interaction
      ├── Configuration
      └── API Requests
              │
              ▼
       Fazar Backend
              │
              ├── MongoDB
              └── Gemini
```

Because the configuration is associated with the Fazar user/account, the same assistant infrastructure can support multiple businesses.

```text
Business A
   ↓
User A
   ↓
Assistant A Configuration

Business B
   ↓
User B
   ↓
Assistant B Configuration
```

---

## 🔌 API Endpoints

### Authentication

```text
POST /api/auth/google_auth
```

Creates or retrieves a Fazar account and generates the authentication token.

```text
POST /api/auth/logout
```

Clears the authentication cookie.

---

### User / Assistant

```text
POST /api/user/assistant
```

Saves or updates assistant configuration.

```text
GET /api/user/current
```

Retrieves the currently authenticated user.

---

### Assistant

```text
GET /api/assistant/config/:userId
```

Retrieves the assistant configuration for a specific assistant.

```text
POST /api/assistant/ask
```

Processes an assistant request and returns the AI response.

The request contains information such as:

```javascript
{
    message,
    userId,
    currentPath
}
```

---

### Billing

```text
POST /api/billing/pay
```

Creates a Razorpay order.

```text
POST /api/billing/verify
```

Verifies the Razorpay payment and activates the Pro plan.

---

## 🗄️ Database Structure

Fazar AI uses MongoDB with Mongoose.

### User Collection

The User model stores:

```text
name
email
assistantName
bussinessName
bussinessType
bussinessDescription
tone
theme
enableVoice
pages
enableNavigation
geminiApiKey
geminiStatus
totalMessages
plan
requestLimits
proExpiresAt
isSetupComplete
createdAt
updatedAt
```

### Page Structure

Pages are embedded inside the user document.

```javascript
{
    name: String,
    path: String,
    keywords: [String]
}
```

### Billing Collection

Billing records associate payments with the Fazar user and Razorpay order.

```text
userId
amount
plan
orderId
paymentId
status
```

---

## 🏛️ System Architecture Diagram

<p align="center">
  <img src="./System Architecture.png" alt="Fazar AI System Architecture" width="800">
</p>

---

## 🧰 Tech Stack

| Category | Technologies Used |
|:---------|:------------------|
| **Frontend** | React.js, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | Firebase Authentication, JWT |
| **AI** | Google Gemini |
| **Voice Input** | Browser Speech Recognition |
| **Voice Output** | Browser Speech Synthesis |
| **Payments** | Razorpay |
| **HTTP Client** | Axios |
| **Routing** | React Router |
| **Frontend Hosting** | Vercel |
| **Backend Hosting** | Render |
| **Domain / DNS** | Name.com |

---

## 🗂️ Folder Structure

```bash
FAZAR-AI
├── client
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── utils
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
│
├── server
│   ├── configs
│   │   ├── razorpay.js
│   │   └── token.js
│   ├── controllers
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── billing.controller.js
│   │   └── assistant.controller.js
│   ├── middleware
│   │   └── auth.middleware.js
│   ├── models
│   │   ├── user.model.js
│   │   └── billing.model.js
│   ├── routes
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── assistant.routes.js
│   │   └── billing.routes.js
│   ├── app.js
│   ├── package.json
│   └── .env
│
├── assistant.js
├── assistant.css
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/kasaudhanshivam/Fazar-AI.git
cd Fazar-AI
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=8000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret_key
```

Start the development server:

```bash
npm run dev
```

Backend:

```text
http://localhost:8000
```

---

### 3. Frontend Setup

Open another terminal:

```bash
cd client
npm install
```

Create the frontend environment file:

```env
VITE_FIREBASE_KEY=your_firebase_key
VITE_CLIENT_URL=http://localhost:5173
```

Start the Vite development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

### Backend

| Variable | Purpose |
|:---------|:--------|
| `PORT` | Backend server port |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign JWT tokens |
| `RAZORPAY_KEY_ID` | Razorpay public key |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key |

### Frontend

| Variable | Purpose |
|:---------|:--------|
| `VITE_FIREBASE_KEY` | Firebase client configuration |
| `VITE_CLIENT_URL` | Frontend application URL |

Do not commit backend secrets or `.env` files to GitHub.

---

## 🚀 Production Deployment

### Frontend

The frontend is deployed using Vercel.

Production domain:

```text
https://fazarai.shivamkasaudhan.dev
```

Because Fazar AI uses client-side routing, the Vercel deployment uses a rewrite to serve the React application for frontend routes.

```json
{
    "rewrites": [
        {
            "source": "/(.*)",
            "destination": "/index.html"
        }
    ]
}
```

### Backend

The backend is deployed using Render.

Production backend:

```text
https://fazarai.onrender.com
```

### DNS

The Fazar AI frontend uses:

```text
fazarai.shivamkasaudhan.dev
```

as a subdomain configured through DNS.

---

## 🔄 Complete Product Flow

```text
                    ┌───────────────────┐
                    │       User        │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Google Sign-In    │
                    │    Firebase       │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │  Fazar Dashboard  │
                    └─────────┬─────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
             ┌─────────────┐      ┌─────────────┐
             │   Builder   │      │   Billing   │
             └──────┬──────┘      └──────┬──────┘
                    │                    │
                    ▼                    ▼
             ┌─────────────┐      ┌─────────────┐
             │  MongoDB    │      │   Razorpay  │
             └──────┬──────┘      └──────┬──────┘
                    │                    │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │   Embed Assistant │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Customer Website  │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Voice Interaction │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Fazar Backend API │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │    Gemini AI      │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │ Voice Response    │
                    └───────────────────┘
```

---

## 🔮 Future Enhancements

- **Automatic Language Detection** — Support automatic switching between English, Hindi, and Hinglish conversations.
- **Dedicated AI Voice Infrastructure** — Provide consistent voice quality across browsers and devices.
- **Conversation Analytics** — Track assistant requests, usage, and performance.
- **Conversation History** — Allow businesses to review previous assistant interactions.
- **Multiple Assistants** — Support multiple assistants under one business account.
- **Expanded Subscription Plans** — Add additional plans with different usage limits.
- **Website Crawling** — Automatically build assistant knowledge from website content.
- **Advanced Website Actions** — Allow assistants to perform more structured website actions.
- **Admin Dashboard** — Manage users, subscriptions, usage, and platform health.
- **Subscription Management** — Add automated renewals and subscription management.
- **Rate Limiting & Abuse Protection** — Strengthen API and assistant request protection.
- **Dockerized Deployment** — Support containerized production deployments.
- **Monitoring & Observability** — Add structured logs, metrics, and error monitoring.

---

## 🤝 Contributing

Contributions are welcome.

To contribute:

```bash
# Fork the repository

# Create a feature branch
git checkout -b feature-name

# Make your changes

# Commit
git commit -m "Added new feature"

# Push
git push origin feature-name

# Open a Pull Request
```

---

## 💙 Developed By

**Shivam Kasaudhan**

Fazar AI is built to make intelligent voice assistants easier to create, customize, and deploy across modern websites.

If you like the project, consider giving the repository a ⭐ on GitHub.
