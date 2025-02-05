# Travel and Accommodation Booking Platform

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [Project Management](#project-management)

## Introduction

This is a full-fledged Travel and Accommodation Booking Platform built using React with TypeScript. The application allows users to search for hotels, view details, book rooms, and manage bookings. Admins can also manage cities, hotels, and rooms through a dedicated dashboard.

## Features

### User Features

- **Login Page**: User authentication (Admin/User roles)
- **Home Page**:
  - Robust search functionality
  - Featured deals section
  - Recently visited hotels
  - Trending destinations
- **Search Results Page**:
  - Comprehensive search filters
  - Infinite scroll hotel listings
- **Hotel Page**:
  - Visual gallery
  - Detailed hotel information
  - Room availability and selection
- **Checkout and Confirmation**:
  - Secure payment and personal details form
  - Booking confirmation page with receipt download

### Admin Features

- Functional left navigation panel
- Search functionality for hotels, cities, and rooms
- CRUD operations (Create, Update, Delete) for cities, hotels, and rooms
- Detailed grid views for data management

## Tech Stack

- **Frontend**:
  - React with TypeScript
  - React Router for navigation
  - Formik & Yup for form handling and validation
  - React Testing Library for unit testing
  - React Infinite Scroll Component
  - React Leaflet for maps
  - Framer Motion for animations
  - React Icons
- **Backend**:
  - The API is documented using Swagger (provided separately)
  - JWT-based authentication

## Installation

### Prerequisites

- Node.js & npm/yarn installed

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/travel-and-hotels.git
   cd travel-and-hotels
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

## Project Structure

```
travel-and-hotels/
│── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components
│   ├── services/         # API services and data fetching
│   ├── context/          # Global state management
│   ├── hooks/            # Custom React hooks
│   ├── assets/           # Static assets like images
│   ├── App.tsx           # Root component
│   ├── index.tsx         # Entry point
│── public/               # Static files
│── package.json          # Dependencies and scripts
│── README.md             # Project documentation
```

## Available Scripts

- `npm start` - Runs the development server
- `npm run build` - Builds the project for production
- `npm test` - Runs unit tests
- `npm run eject` - Ejects the configuration (use with caution)

## Testing

- The project uses **React Testing Library** for unit tests.
- Run tests with:
  ```sh
  npm test
  ```

## API Documentation

The backend API is documented via Swagger:
[Swagger Documentation](https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/swagger/index.html)

## Project Management

- Use **Jira**, **Trello**, or **Linear.app** for tracking progress.
- Follow Git best practices with meaningful commit messages.
- Ensure proper error handling and state management.

## Contributors

- **[Your Name]** - Developer

## License

This project is licensed under the MIT License - see the LICENSE file for details.
