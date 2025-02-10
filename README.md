# Blog API

A RESTful API for managing authors, blogs, and categories using **Node.js**, **Express**, and **MongoDB**.

## Features
- User authentication with JWT
- CRUD operations for authors, blogs, and categories
- Secure API with authentication middleware
- Profile and image uploads using Multer
- MongoDB database integration with Mongoose

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Other Dependencies:** bcrypt, multer, cookie-parser, morgan, nodemon

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/blog-api.git
   cd blog-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables (`.env` file):
   ```
   MONGO_URI=mongodb://localhost:27017/Blog_API
   PORT=5000
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints

### Author Management
| Method | Endpoint         | Description             |
|--------|----------------|-------------------------|
| GET    | `/author/read`  | Get all authors         |
| POST   | `/author/create` | Register a new author  |
| POST   | `/author/login`  | Author login           |
| PUT    | `/author/update/:id` | Update author profile |
| DELETE | `/author/delete/:id` | Delete an author     |

### Blog Management
| Method | Endpoint         | Description             |
|--------|----------------|-------------------------|
| GET    | `/blog/read`    | Get all blogs           |
| POST   | `/blog/create`  | Create a new blog       |
| PUT    | `/blog/update/:id` | Update a blog        |
| DELETE | `/blog/delete/:id` | Delete a blog        |

### Category Management
| Method | Endpoint         | Description             |
|--------|----------------|-------------------------|
| GET    | `/category/read` | Get all categories     |
| POST   | `/category/create` | Create a new category |
| PUT    | `/category/update/:id` | Update a category |
| DELETE | `/category/delete/:id` | Delete a category |

### Usage Example (Postman or Curl)
```sh
curl -X POST "http://localhost:5000/blog/create" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -d '{"title": "My First Blog", "content": "This is my first blog post!"}'
```

## License
This project is licensed under the **MIT License**.
