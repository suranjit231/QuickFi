# QuickFi

A loan management application that allows users to register, login, and apply for loans on a term basis. The platform includes an admin dashboard for loan approval, rejection, and analytics. Users have a personalized dashboard to track loan status, repayment schedule, and loan history.

## Features

### Users feature

**-Register and Login_**: Users can register and login with secure authentication using JSON Web Tokens (JWT).

**-Apply for a Loan: _**: Users can apply for loans with customizable terms:

- Loan terms: 1 week, 2 weeks, 3 weeks, 4 weeks, 8 weeks, or 12 weeks.

- Only one active loan allowed at a time; users must complete repayments before applying for another loan.

**-Personal Dashboard:_**: 

- rack active loan status, including principal, interest, repayment term, and outstanding balance.

- View loan history and repayment records.

- Receive notifications on loan approval, rejection, and due dates.

### Admin Features

**-Admin Dashboard_**:

- Approve or reject loan applications from users.

- View detailed loan analytics, including outstanding balances, total interest earned, user history, and more.

- Access error logs and monitor the application’s health.

### Tech Stack

**-Frontend-**: React, Redux

**-Backend-**: Node.js, Express.js, MongoDB

**-Authentication-**: JSON Web Token (JWT)

**-Error Handling-**: Comprehensive handling for validation errors, authentication errors, and server errors.

## Setup Instructions
1. Clone the repository
```
git clone https://github.com/suranjit231/QuickFi.git
```
2. Navigate to backend for backend configuration first  ->
```
cd backend 
```
3. Install Dependencies:
```
npm install
```
4. Add a .env file for backend in the roots of backend ( sibling to server.js )
```
DB_URL= (your mongodb atlas url)
JWT_SECRET= (your jwt setret key)
PORT= ( you backend server port)
```

6. Please make sure that you are authorized your client url for access the api in ( server.js ) file
```
//====== setup cors =======//
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true,
  };

  app.use(cors(corsOptions))

```

5. Start the Development Server:
```
npm start or
node server.js
```
7. Access the Application:

- The frontend is available at http://localhost:3000.
- The backend API is accessible at http://localhost:3200.


## Frontend setup 

**--Note** :

1. Open another terminal navigate to the client 
```
cd client
```
2. Install Dependencies:
```
npm install
```
## Important note:

* Please make sure that your client .env file presents at correct place that is:

1. In the roots of client directory and ( sibling to src folder )

2. Add this ,env variable
```
REACT_APP_SERVER_URL= < Backend api base url that is http://localhost:3000 >

```

3. Now your setup complete start fronted by
```
npm start
```
4. Now you can explore frontend by clicking all
