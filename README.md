# 📝 Supabase Todo App

A modern, full-stack Todo application built with **React**, **TypeScript**, **Vite**, and **Supabase**. This project demonstrates user authentication, real-time database operations, and a clean, responsive UI.

## ✨ Features

### 🔐 Authentication System
- **User Registration** with email verification
- **Secure Login/Logout** functionality  
- **Tab-based UI** for seamless switching between login and signup
- **Form validation** with error handling
- **Success notifications** for user feedback

### 📋 Task Management
- **Create Tasks** - Add new todos with a clean interface
- **View Tasks** - Display all user-specific tasks in chronological order
- **Delete Tasks** - Remove completed or unwanted tasks
- **Real-time Updates** - Instant synchronization with Supabase database
- **User Isolation** - Each user sees only their own tasks

### 🎨 Modern UI/UX
- **Dark Theme** with professional styling
- **Responsive Design** that works on all devices
- **Smooth Animations** and hover effects
- **Clean Typography** and intuitive layout
- **Form Validation** with visual feedback

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Backend & Database:** Supabase
- **Authentication:** Supabase Auth
- **Styling:** CSS3 with custom properties
- **Package Manager:** Bun/npm

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- Bun or npm package manager
- A Supabase account

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd supabase-course
```

### 2. Install Dependencies
```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

### 3. Set up Supabase

#### Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the database to set up

#### Create the Tasks Table
Run this SQL in your Supabase SQL Editor:

```sql
-- Create the tasks table
CREATE TABLE tasks (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  image_url TEXT,
  email TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see only their own tasks
CREATE POLICY "Users can view their own tasks" ON tasks
  FOR SELECT USING (auth.jwt() ->> 'email' = email);

-- Create policy to allow users to insert their own tasks
CREATE POLICY "Users can create their own tasks" ON tasks
  FOR INSERT WITH CHECK (auth.jwt() ->> 'email' = email);

-- Create policy to allow users to update their own tasks
CREATE POLICY "Users can update their own tasks" ON tasks
  FOR UPDATE USING (auth.jwt() ->> 'email' = email);

-- Create policy to allow users to delete their own tasks
CREATE POLICY "Users can delete their own tasks" ON tasks
  FOR DELETE USING (auth.jwt() ->> 'email' = email);
```

### 4. Configure Environment Variables
Update `src/supabase-client.ts` with your Supabase credentials:

```typescript
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "YOUR_SUPABASE_URL",
  "YOUR_SUPABASE_ANON_KEY"
);
```

> **Note:** In production, use environment variables instead of hardcoding credentials.

### 5. Run the Development Server
```bash
# Using Bun
bun run dev

# Or using npm
npm run dev
```

Visit `http://localhost:5173` to see your application!

## 🚀 Deployment

### Build for Production
```bash
# Using Bun
bun run build

# Or using npm
npm run build
```

### Deploy Options
- **Vercel** (recommended for React apps)
- **Netlify** 
- **Supabase Hosting**
- **Any static hosting service**

## 📱 Usage

### Getting Started
1. **Sign Up:** Create a new account with your email
2. **Verify Email:** Check your inbox and click the verification link
3. **Login:** Sign in with your credentials
4. **Add Tasks:** Use the input field to create new todos
5. **Manage Tasks:** Delete completed tasks as needed
6. **Logout:** Use the logout button when finished

### Features in Detail

#### Authentication Flow
- Toggle between Login and Signup tabs
- Email verification required for new accounts
- Secure session management
- Automatic form clearing on tab switch

#### Task Management
- Create tasks with descriptive titles
- Tasks are automatically associated with your user account
- Real-time updates without page refresh
- Clean, organized task display

## 🏗️ Project Structure

```
supabase-course/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── auth.tsx          # Authentication component
│   │   ├── auth.css          # Auth styling
│   │   ├── task-manager.tsx  # Task management component
│   │   └── task.css          # Task styling
│   ├── assets/
│   ├── App.tsx               # Main app component
│   ├── App.css               # Global app styles
│   ├── main.tsx              # Application entry point
│   └── supabase-client.ts    # Supabase configuration
├── package.json
├── vite.config.ts
└── README.md
```

## 🔧 Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build
- `bun run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) for the amazing backend-as-a-service platform
- [React](https://reactjs.org) for the powerful frontend framework
- [Vite](https://vitejs.dev) for the lightning-fast build tool

## 📞 Support

If you have any questions or run into issues, please:
1. Check the [Supabase Documentation](https://supabase.com/docs)
2. Review the code comments in this project
3. Open an issue in this repository