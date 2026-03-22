# 💬 Chatter-Box

**Ephemeral Real-Time Messaging Application**

Chatter-Box is a privacy-focused, one-to-one messaging application built with modern web technologies. It enables users to communicate in real time through temporary chat rooms where messages automatically expire after a fixed duration.

---

## 🚀 Features

* ⚡ **Real-time messaging** between two users
* ⏳ **Ephemeral chat rooms** with automatic message deletion (self-destruct after 10 minutes)
* 🔄 **Consistent UI state** using server-state synchronization
* 🧠 **Schema validation** for type-safe APIs
* 📱 **Responsive UI** for seamless experience across devices

---

## 🏗️ Tech Stack

### Frontend

* **Next.js 16**
* **TypeScript**
* **TanStack Query**
* **TailwindCSS**

### Backend

* **Elysia (Bun runtime)**
* **Zod** (schema validation)

### Infrastructure

* **Upstash Redis**

  * Real-time communication
  * TTL-based data expiration

---

## 🧠 How It Works

### 1. Chat Room Creation

* A unique chat room is created for two users.
* The room is assigned a **Time-To-Live (TTL) of 10 minutes**.

### 2. Messaging Flow

* Messages are stored in **Redis (Upstash)**.
* Clients fetch and sync messages using **TanStack Query**.

### 3. Real-Time Updates

* Messages are propagated with low latency using Redis.
* UI stays in sync through efficient cache invalidation and refetching.

### 4. Self-Destruct Mechanism

* Each chat room and its messages automatically expire after 10 minutes.
* Redis handles cleanup using **TTL**, eliminating the need for manual deletion or background jobs.

---

## 🔐 Design Philosophy

Chatter-Box is built around the idea of **ephemeral communication**:

* No long-term message storage
* Reduced data persistence
* Minimal backend cleanup overhead

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/PratyakshG/chatter_box.git

# Navigate to project
cd chatter_box

# Install dependencies
bun install or npm install

# Run development server
bun dev or npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env` file and add:

```
UPSTASH_REDIS_REST_URL=your_url
UPSTASH_REDIS_REST_TOKEN=your_token
```

---

## 🧪 Future Improvements

* 🔌 Improve scalability of real-time connections for high concurrency
* 📨 Add delivery and read receipts using event acknowledgments
* 👥 Support for group chats
* 🔐 End-to-end encryption
* 📩 Message status indicators (delivered/read)
* 🕒 Custom expiration timers

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## 📄 License

This project is completely open-source.

---

## 👨‍💻 Author

**Pratyaksh Gupta**

* GitHub: https://github.com/PratyakshG
* Portfolio: https://portfolio-pratyaksh.vercel.app/

---
