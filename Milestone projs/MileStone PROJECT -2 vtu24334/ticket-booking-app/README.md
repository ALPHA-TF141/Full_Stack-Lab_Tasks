# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## MySQL Booking Backend Setup

This project includes a Node/Express backend that stores OTP verification ids and ticket dispatch details in MySQL.

### 1. Create the database

Open MySQL Workbench/phpMyAdmin/terminal and run:

```sql
SOURCE database/schema.sql;
```

If `SOURCE` is not available, open `database/schema.sql`, copy the SQL, and run it.

### 2. Configure database login

Copy `.env.example` to `.env` and update your MySQL password:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=ticket_booking_db
DB_PORT=3306
SERVER_PORT=5000

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_character_gmail_app_password
```

For Gmail, do not use your normal Gmail password. Turn on 2-Step Verification in your Google account, then create an App Password for Mail. Use that 16-character app password as `SMTP_PASS`.

### 3. Run backend and frontend

Open one terminal for the backend:

```bash
npm run server
```

Open a second terminal for React:

```bash
npm start
```

React runs at `http://localhost:3000` and the backend API runs at `http://localhost:5000`.

### Stored data

OTP verification records are stored in `otp_verifications`.

Final ticket dispatch records are stored in `bookings`, including `booking_code`, `otp_verification_id`, `ticket_start_number`, and `ticket_end_number`.

To see the latest dispatched ticket:

```sql
SELECT * FROM last_ticket_dispatched;
```

## Optional Spring Boot Security Demo

This project also includes a small optional Spring Boot service in `spring-security-demo`.
It does not replace the existing Node/Express backend. It is a lightweight add-on that demonstrates a protected API endpoint using Spring Security.

### Run the Spring Boot service

Make sure Java 17+ and Maven are installed, then run:

```bash
cd spring-security-demo
mvn spring-boot:run
```

The Spring Boot service runs on `http://localhost:8081`.

Public health check:

```bash
curl http://localhost:8081/api/security/health
```

Protected security status endpoint:

```bash
curl -H "X-DEMO-API-KEY: change-this-demo-key" http://localhost:8081/api/security/status
```

The demo API key is configured in:

```text
spring-security-demo/src/main/resources/application.properties
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
