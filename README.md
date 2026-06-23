# **Chat App**

A modern, feature-rich chat application built with a **Node.js** backend and a **React.js** frontend. This application supports private and group chats, real-time messaging, and user authentication.

## **Features**

- **User Authentication**:
  - Sign up, log in, and log out functionality.
  - Secure password storage and validation.

- **Real-Time Messaging**:
  - Send and receive messages instantly using **Socket.IO**.
  - Supports both private and group chats.

- **Group Chat Management**:
  - Create and manage group chats.
  - Add or remove participants.

- **Chat History**:
  - View chat history with message timestamps.
  - Persistent storage of messages in the database.

- **Responsive Design**:
  - Fully responsive UI for seamless usage across devices.

---

## **Tech Stack**

### **Frontend**:
- **React.js**: For building the user interface.
- **CSS**: For styling components.
- **Axios**: For making API requests.

### **Backend**:
- **Node.js**: For server-side logic.
- **Express.js**: For building RESTful APIs.
- **Socket.IO**: For real-time communication.
- **MongoDB**: For database storage.

---

## **Installation**

### **Prerequisites**:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (running locally or on a cloud service like MongoDB Atlas)

### **Steps**:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
   ```

2. **Install Dependencies**:
   - For the **Frontend**:
     ```bash
     cd Frontend
     npm install
     ```
   - For the **Backend**:
     ```bash
     cd ../Backend
     npm install
     ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the Backend directory with the following variables:
     ```env
     PORT=8000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Run the Application**:
   - Start the **Backend**:
     ```bash
     cd Backend
     npm start
     ```
   - Start the **Frontend**:
     ```bash
     cd ../Frontend
     npm start
     ```

5. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000`.

---

## **Project Structure**

### **Frontend**:
```
Frontend/
├── public/               # Static files
├── src/
│   ├── Components/       # Reusable React components
│   ├── Pages/            # Page-level components
│   ├── Styles/           # CSS files
│   ├── App.js            # Main React component
│   ├── index.js          # Entry point
├── .gitignore            # Files to ignore in Git
├── package.json          # Frontend dependencies
```

### **Backend**:
```
Backend/
├── controllers/          # API logic
├── models/               # Mongoose schemas
├── routes/               # API routes
├── server.js             # Entry point
├── .env                  # Environment variables
├── .gitignore            # Files to ignore in Git
├── package.json          # Backend dependencies
```

---

## **API Endpoints**

### **User Routes**:
| Method | Endpoint               | Description                     |
|--------|-------------------------|---------------------------------|
| POST   | `/sign_up`             | Register a new user             |
| POST   | `/login`               | Log in an existing user         |
| GET    | `/user_profile/:id`    | Get user profile by ID          |
| GET    | `/all_user`            | Get all users                   |
| GET    | `/chat/:user_id`       | Get chats for a specific user   |
| PUT    | `/edit_profile`        | Edit user profile               |
| DELETE | `/log_out`             | Log out the user                |

### **Chat Routes**:
| Method | Endpoint               | Description                     |
|--------|-------------------------|---------------------------------|
| GET    | `/allChats`            | Get all chats                   |
| GET    | `/chat/:chat_id`       | Get a specific chat by ID       |
| POST   | `/create-private-chat` | Create a private chat           |
| POST   | `/create-group-chat`   | Create a group chat             |
| DELETE | `/delete`              | Delete a chat                   |
| DELETE | `/clear`               | Clear all messages in a chat    |

### **Message Routes**:
| Method | Endpoint                       | Description                     |
|--------|---------------------------------|---------------------------------|
| POST   | `/send`                        | Send a message                  |
| GET    | `/:chat_id`                    | Get all messages in a chat      |
| PUT    | `/edit/:chat_id`               | Edit a message                  |
| DELETE | `/delete/:chat_id`             | Delete a specific message       |
| DELETE | `/deleteAllMessagesFromDatabase` | Delete all messages in the DB   |

---

## **Environment Variables**

The following environment variables are required for the backend:

| Variable       | Description                          |
|----------------|--------------------------------------|
| `MONGO_URI`    | MongoDB connection string            |

---

## **Contributing**

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## **Contact**

For any questions or feedback, feel free to reach out:

- **Email**: rahulsingh654932@gmail.com
---
```
