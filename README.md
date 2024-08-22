# Expense Tracker

Expense Tracker is a simple web application that allows users to track their income and expenses. The application includes user authentication, budget management, and transaction tracking features.

## Features

- **User Authentication**: Register, login, and logout.
- **Transaction Management**: Add, view, and delete transactions.
- **Budget Management**: Set budgets for different categories.
- **Dashboard**: View a summary of your financial activity.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/username/expense-tracker.git
   ```

2. Navigate to the backend directory and install dependencies:

   ```bash
   cd expense-tracker/expense-tracker-backend
   npm install
   ```

3. Create a `.env` file in the `expense-tracker-backend` directory and add the following variables:

   ```plaintext
   MONGO_URI=mongodb://localhost:27017/expense-tracker
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

5. Navigate to the frontend directory and install dependencies:

   ```bash
   cd ../my-expense-tracker
   npm install
   ```

6. Start the frontend server:

   ```bash
   npm start
   ```

## Usage

- Navigate to `http://localhost:3000` in your browser.
- Register or login to your account.
- Start adding your income and expense transactions.

## Contributing

Feel free to fork this repository and submit pull requests for new features, bug fixes, or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
