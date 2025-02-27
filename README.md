# DD Cattle Company Horse Management System

A comprehensive web application for managing and showcasing horses at DD Cattle Company. This full-stack solution provides both public access to ranch information and secure administrative tools for horse health management.

## Features

### Public Frontend

- Showcase of ranch mustangs with detailed profiles
- Photo galleries and videos of horses
- Ranch information and history
- Brand decoder tool for wild horse identification
- Responsive design for all devices
- Public riding logs and horse updates

### Administrative Dashboard

- Secure authentication and role-based access
- Comprehensive horse health tracking:
  - Vaccination records and schedules
  - Farrier/trimming schedules
  - Worming treatment tracking
  - Weight and height monitoring
  - Coggins test tracking
- Photo and video management
- Riding log management


## Technology Stack

### Frontend

- React 18
- React Bootstrap for UI components
- Redux Toolkit for state management
- RTK Query for API integration
- Vite for build tooling

### Backend

- Express.js
- PostgreSQL database
- Sequelize ORM
- JWT authentication
- Multer for file uploads
- Node.js



## Getting Started

### Prerequisites

- Node.js 16+
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies in all three directories:
   ```bash
   cd frontend && npm install
   cd ../admin-frontend && npm install
   cd ../server && npm install
   ```
3. Configure environment variables
4. Initialize database
5. Start development servers

## Security

- JWT-based authentication
- Role-based access control
- Secure file upload handling
- Environment-based configurations


