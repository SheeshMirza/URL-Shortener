## REST API Based URL Shortener

### Overview

This project is a URL shortener service implemented as a REST API using Node.js, Express.js, MongoDB, and Redis. It allows users to create shortened versions of long URLs, making them easier to share and manage.

### Features

- **Shorten Long URLs:** Users can input a long URL and receive a shortened version.
- **Redirect to Original URLs:** Shortened URLs redirect users to the original long URLs.
- **Analytics:** Basic analytics such as click counts are tracked for each shortened URL.
- **QR Code Generation:** Optionally, users can generate QR codes for shortened URLs.
- **Scalability:** Utilizes MongoDB and Redis for data storage and caching, providing scalability and performance.

### Tech Stack

- Node.js: JavaScript runtime environment
- Express.js: Web application framework for Node.js
- MongoDB: NoSQL database for storing URL data
- Redis: In-memory data store used for caching
- Docker: Containerization platform for easy deployment
- Jest: Testing framework for unit testing

### Getting Started

1. **Clone the Repository:** `git clone <repository-url>`
2. **Install Dependencies:** `npm install`
3. **Set Up Environment Variables:**
   - Create a `.env` file based on the provided `.env.example` file.
   - Update the variables with your specific configurations.
4. **Start the Server:** `npm start`
5. **Access the API:** Visit `http://localhost:<PORT>`

### API Endpoints

- **POST /api/shorten**

  - **Payload:**
    ```json
    {
      "longUrl": "https://example.com",
      "qrCode": true
    }
    ```
  - **Response:**
    ```json
    {
      "shortUrl": "http://localhost:3000/abc123",
      "shortUrlQR": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAA..."
    }
    ```
  - **Description:** Shorten a long URL and optionally generate a QR code.

- **GET /:shortCode**
  - **Description:** Redirect to the original long URL associated with the given short code.

### Testing

- Run Unit Tests: `npm test`
