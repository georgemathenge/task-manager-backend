🛠️ Task Management System — Backend
This is the backend API for the Task Management System. Built with Node.js, Express, and Prisma ORM, it provides a robust and scalable RESTful API to manage tasks, collaborators, comments, file attachments, and more.
The application uses MySQL as its database.

⚙️ Features
🔐 User authentication and role-based access

✅ CRUD operations for tasks

🗂️ Support for file attachments

📆 Due date and status tracking

👥 Collaborators and comments on tasks

📜 Task history and change logs

🌐 RESTful API structure

🔄 Prisma ORM with MySQL

🧰 Tech Stack
Node.js

Express.js

Prisma ORM

MySQL

Multer (for file uploads)

dotenv (for environment configuration)

CORS, Helmet, Morgan (security and logging middleware)

📦 Prerequisites
Node.js (>= 18.x)

MySQL (>= 8.x)

npm 

🚀 Getting Started
🔧 Installation
# Clone the repository
git clone https://github.com/georgemathenge/task-manager-backend.git
cd task-manager-backend

# Install dependencies
npm install
🗄️ Environment Setup
Create a .env file in the root directory:

DATABASE_URL="mysql://user:password@localhost:3306/task_manager"
PORT=3000
JWT_SECRET=your_jwt_secret_key
🔄 Prisma Setup

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init
🔌 Run the App

npm run dev
The server should now be running at: http://localhost:3000

📁 Folder Structure (Simplified)

src/
├── controllers/
├── routes/
├── middlewares/
├── services/
├── prisma/
│   └── schema.prisma
├── uploads/
├── utils/
└── index.js
