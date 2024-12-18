# 🩺 Appointment Booking System for Doctors

This is a Appointment Booking system that helps manage doctor appointments efficiently, including slot creation (one-time, and recursively on daily & weekly basis) and Appointment booking.

---

## 🧑🏻‍💻 Technologies Used

- **NodeJS & ExpressJS**: to build a lightweight backend server.
- **NextJS**: to build a fast frontend
- **MongoDB**: used as database
- **Joi**: for robust request validation on the server.
- **NextUI**: for building beautiful UI components

---

## 🛠️ Features

- **Slot Management**: Create and manage doctor time slots.
- **Data Validation**: Input validation using **Joi**.
- **Appointment Booking**: Book and view appointments as recurring or one time appointments
- **Environment Configuration**: Secure environment variables using **dotenv**.
- **Database Integration**: Connect with **MongoDB** using Mongoose.
- **Development Mode**: Uses **Nodemon** for smooth development.

---

## 📂 Project Structure

```bash
.
├── src/
│   ├── app.js           # Main application entry point
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routes for APIs
│   └── controllers/     # Business logic
├── package.json         # Project dependencies and scripts
├── .env.sample          # Sample environment variables
├── .gitignore           # Ignored files for version control
└── README.md            # Project documentation
```

## 1. Clone this Repository

```bash
git clone https://github.com/templar-ajay/book-appointments-with-doctors.git
cd book-appointments-with-doctors
```

---

## ![Docker Icon](https://img.icons8.com/?size=24&id=Wln8Z3PcXanx&format=png) Docker Instructions to run this project

### 2. Build the project

```bash
docker-compose build
```

### 3. Start the App

```bash
docker-compose up
```

## 🧑🏻‍💻 Local Environment Setup Instructions

### Pre-requisites

1. [NodeJS](https://nodejs.org/en) (preferred version: 22.11.0).
2. An up and running [MongoDB](https://www.mongodb.com/) server (local or remote)
3. [Git](https://git-scm.com/)

### 2. Install Backend Dependencies

```bash
cd backend
npm i
```

### 3. Configure Environment Variables

copy the `.env.sample` file to `.env` and add your MongoDB connection string and port number:

```env
PORT=3000
MONGODB_URI=<your-mongodb-uri>
```

### 4. Start the Backend

- **Development Mode** (with nodemon):

```bash
npm run dev
```

- **Production Mode**:

```bash
npm start
```

The server will run on `http://localhost:3000`.

### 5. Install Frontend Dependencies

```bash
cd frontend # if you are in the backend directory use cd ../frontend
npm i
```

### 6. Configure Environment Variables

copy the `.env.sample` file to `.env.local` and add your MongoDB connection string and port number:

```env
BACKEND_URL=http://localhost:3000
```

### 7. Start the Frontend

- **Development Mode** (with nodemon):

```bash
npm run dev
```

- **Production Mode**:

```bash
npm run build && npm start
```

---

## 📦 Backend Dependencies

The following packages are used in this project's backend:

| Package     | Version  | Description                     |
| ----------- | -------- | ------------------------------- |
| express     | ^4.21.2  | Web framework for Node.js       |
| mongoose    | ^8.9.1   | MongoDB ODM for Node.js         |
| dotenv      | ^16.4.7  | Environment variable management |
| joi         | ^17.13.3 | Data validation                 |
| body-parser | ^1.20.3  | Middleware for request parsing  |

## 📦 Frontend Dependencies

The following packages are used in this project's frontend:

| Package           | Version | Description                           |
| ----------------- | ------- | ------------------------------------- |
| next              | ^15.0.4 | A fast and Full Stack React Framework |
| @nextui-org/react | ^2.2.3  | UI components library for Next.js     |

---

## 🔧 Future Improvements

- Add user authentication (Doctors, Patients, Admin).
- Integrate frontend (React or Next.js) for better interaction.
- Implement monthly and custom recurrences for slots.
- Add automated testing.

---

## 👨‍💻 Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push to your branch and open a pull request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 📞 Contact

For any inquiries or suggestions:

- **Email**: [templar.ajay@gmail.com](mailto:templar.ajay@gmail.com)
- **GitHub**: [templar-ajay](https://github.com/templar-ajay)

---

Happy Coding! 🎉
