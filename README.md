# Feedants Full-Stack Internship Assignment

This repository contains the solution for the Feedants Full Stack Development Internship Technical Assignment: building a functional Competition Details Screen.

## Tech Stack

*   **Frontend**: React Native with Expo
*   **Backend**: Node.js, Express.js
*   **Database**: MongoDB (Mongoose)

## Setup Instructions

### Prerequisites
*   Node.js (v18+)
*   MongoDB installed and running locally (or provide a MongoDB URI)
*   Expo CLI

### 1. Backend Setup

1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure environment variables:
    The project includes a `.env` file with default local settings.
    ```
    MONGODB_URI=mongodb://localhost:27017/feedants
    PORT=5000
    JWT_SECRET=feedants-demo-secret-key-2024
    NODE_ENV=development
    ```
4.  Seed the database with sample data matching the design reference:
    ```bash
    npm run seed
    ```
5.  Start the backend server:
    ```bash
    npm run dev
    ```

### 2. Frontend Setup

1.  Open a new terminal and navigate to the `mobile` directory:
    ```bash
    cd mobile
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Update API URL (if needed):
    The app is configured to use `http://10.0.2.2:5000/api` for Android emulator or `http://localhost:5000/api` for others in `mobile/src/api/client.js`. Change this if your network setup is different.
4.  Start the Expo development server:
    ```bash
    npx expo start
    ```

## Features Implemented

*   **Accurate UI**: Closely matches the provided design reference using a custom design system (tokens for colors, spacing, typography).
*   **Dynamic State Management**:
    *   Countdown timer based on actual dates.
    *   Action button state varies (Upcoming, Register Now, Upload Submission) depending on the competition's current lifecycle phase.
    *   Spots available progress bar.
*   **Atomic Spot Reservation**: Ensures that concurrent registrations do not exceed `totalSpots` by using MongoDB's `$inc` in a `findOneAndUpdate` atomic operation with conditions.
*   **Robust Backend Architecture**:
    *   MVC structure with controllers, models, and routes.
    *   Centralized error handling and input validation (express-validator).
    *   JWT-based authentication (mocked for demo purposes upon app launch).

## Assignment Requirements Addressed

### Important Assumptions
*   **Authentication**: I assumed a basic JWT authentication flow exists. For this demo, the frontend automatically logs in a "demo user" on launch to obtain an auth token and user ID, allowing the registration flow to work seamlessly.
*   **Data Structure**: I assumed that rewards and previous winners can be embedded documents within the Competition model since they are tightly coupled and won't exceed MongoDB document size limits.

### Major Technical Decisions
*   **Atomic Operations for Concurrency**: To handle thousands of concurrent users trying to register for limited spots, I used a direct atomic `$inc` operation on `bookedSpots` in the database, with a condition that `bookedSpots < totalSpots`. This avoids the "read-modify-write" race condition without needing complex distributed locks.
*   **Compound Unique Indexing**: Placed a unique index on `(userId, competitionId)` in the Registration model to strictly prevent a user from registering twice at the database level.
*   **Virtual Fields**: Used Mongoose virtuals to compute the current competition phase (e.g., `registration_open`, `submission_open`) dynamically based on server time, reducing frontend logic complexity.

### Trade-offs Considered
*   **Transactions vs Atomic Updates**: While I used Mongoose Transactions for the registration flow to ensure consistency (creating registration + crediting referral), I relied primarily on the atomic `$inc` constraint to prevent overbooking, as it is faster and more scalable than locking entire documents in high-concurrency situations.
*   **Embedded vs Referenced Models**: I embedded `judge`, `rewards`, and `previousWinners` inside the Competition schema for faster read performance (one query) at the cost of slight duplication if judges are shared across competitions.

### Future Improvements for Production
*   **Caching layer**: Introduce Redis to cache competition details and list endpoints, as read traffic will be much higher than write traffic.
*   **Payment Integration**: The current `paymentStatus` is immediately marked 'completed'. In production, this would integrate with Razorpay/Stripe webhooks to finalize registration.
*   **WebSocket/SSE**: Use WebSockets or Server-Sent Events for the countdown timer and "spots remaining" indicator so they update in real-time across all active clients without polling.
*   **Image Optimization**: Implement a CDN and image optimization pipeline for the judge and winner photos instead of serving direct URLs.
