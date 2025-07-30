# Huzzl (React + Vite + Node.js + Express)

This is a full-stack web application built with **React (via Vite)** on the frontend and **Node.js/Express** on the backend. It leverages modern libraries and tools to deliver a responsive and real-time experience.

---

## 🌐 Tech Stack

### Frontend
- [React 19](https://reactjs.org/)
- [Vite 7](https://vitejs.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [React Router v7](https://reactrouter.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
- [Socket.IO Client](https://socket.io/docs/v4/client-api/)
- [Lucide React](https://lucide.dev/)
- [Axios](https://axios-http.com/)
- [Sonner](https://sonner.emilkowal.ski/) for toasts
- [Validator.js](https://github.com/validatorjs/validator.js)
- [Vanta.js](https://www.vantajs.com/) + Three.js for animated backgrounds

### Backend
- [Express.js](https://expressjs.com/)
- [Mongoose (MongoDB)](https://mongoosejs.com/)
- [Socket.IO](https://socket.io/)
- [Cloudinary](https://cloudinary.com/) for media upload
- [Multer](https://github.com/expressjs/multer)
- [JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [dotenv](https://github.com/motdotla/dotenv)
- [Cookie Parser](https://github.com/expressjs/cookie-parser)
- [streamifier](https://www.npmjs.com/package/streamifier)

---

## 🛠 Project Structure

```
.
├── frontend/          # React + Vite client
│   ├── public/
│   └── src/
├── backend/           # Express server
│   └── src/
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB Atlas or local instance

---

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/huzzl.git
cd huzzl
```

---

### 2. Install dependencies

#### Frontend
```bash
cd frontend
npm install
```

#### Backend
```bash
cd ../backend
npm install
```

---

### 3. Environment Configuration

#### Backend `.env`
Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

### 4. Run the app

#### Backend (Express API)
```bash
cd backend
npm run start:dev
```

#### Frontend (Vite React)
```bash
cd frontend
npm run dev
```

App runs on `http://localhost:5173` (frontend) and `http://localhost:5000` (backend) by default.

---

## 📦 Scripts

### Frontend
- `npm run dev` – start dev server
- `npm run build` – build production files
- `npm run preview` – preview production build
- `npm run lint` – run ESLint

### Backend
- `npm run start:dev` – run with nodemon for auto-reloading

---

## 📤 Image Upload Logic

Originally, image uploads used base64 encoding, which led to file size issues. To improve performance and reliability:

- A custom image upload logic was implemented using **Multer** and **Streamifier**.
- Images are **streamed directly to Cloudinary**.
- All uploaded images are **converted to WebP format** to reduce size and optimize loading speed.

---

## 📏 ESLint & Formatting

- ESLint is pre-configured with basic React and React Hooks rules.
- TailwindCSS and DaisyUI are used for utility-first UI and styled components.

---

## 💬 Real-time Features
- Chat and presence updates via Socket.IO
- Online users list via `getOnlineUsers` event

---

## 💻 Usage

- Open your browser and go to `http://localhost:5173` (frontend)
- Backend API runs on `http://localhost:5001`
- Create an account, log in, and start chatting with your *tropa*!

---

## 🤝 Credits

This project was built while following [this tutorial](https://www.youtube.com/watch?v=ntKkVrQqBYY) by Codesistency.

---