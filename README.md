# 🩺 Doctor Appointment System

This is a **Node.js** and **Express.js**-based system that helps manage doctor appointments efficiently, including slot creation and scheduling.

---

## 🧑🏻‍💻 Technologies Used

- **NodeJS & ExpressJS**: create a lightweight backend server.
- **MongoDB**: as database
- **Joi**: for robust request validation.

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

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/templar-ajay/book-appointments-with-doctors.git
cd book-appointments-with-doctors-main
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Rename the `.env.sample` file to `.env` and add your MongoDB connection string and port number:

```env
PORT=3000
MONGODB_URI=<your-mongodb-uri>
```

### 4. Start the Application

- **Development Mode** (with nodemon):

```bash
npm run dev
```

- **Production Mode**:

```bash
npm start
```

The server will run on `http://localhost:3000`.

---

## 📦 Dependencies

The following packages are used in this project:

| Package     | Version  | Description                     |
| ----------- | -------- | ------------------------------- |
| express     | ^4.21.2  | Web framework for Node.js       |
| mongoose    | ^8.9.1   | MongoDB ODM for Node.js         |
| dotenv      | ^16.4.7  | Environment variable management |
| joi         | ^17.13.3 | Data validation                 |
| body-parser | ^1.20.3  | Middleware for request parsing  |

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
