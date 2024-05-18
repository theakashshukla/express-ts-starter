# @astreak/express-ts-starter: A Robust Express.js Starter with TypeScript

Namskaram! 🙏 Welcome to the Express.js TypeScript Starter. This project provides a solid foundation for building RESTful APIs and web applications with Express.js, leveraging the power of TypeScript for type safety and improved developer experience.

## Features

- **TypeScript:** Enhanced code quality, maintainability, and tooling with static typing.
- **Express.js:** Minimalist and flexible web application framework for Node.js.
- **Authentication:** Secure user authentication with JSON Web Tokens (JWT).
- **MongoDB Integration:** Database integration using Mongoose for seamless data modeling and interaction.
- **Redis Caching:** Optional integration with Redis for improved performance through data caching.
- **Morgan Logging:** Configurable request logging with Morgan.
- **Helmet Security:** Essential security middleware to protect against common vulnerabilities.
- **CORS Support:** Easily manage Cross-Origin Resource Sharing (CORS) for your API.
- **Input Validation:** Use Express Validator for robust validation of incoming request data.
- **Rate Limiting:** Prevent abuse with Express Rate Limit.
- **Testing:** Jest testing framework for writing unit and integration tests.

## Prerequisites

- **Node.js:** Make sure you have Node.js and NPM (Node Package Manager) installed. You can download them from the official website: [https://nodejs.org/](https://nodejs.org/)
- **MongoDB:** Install and run a MongoDB instance. Refer to the MongoDB documentation for installation instructions: [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)
- **Redis (Optional):** If you want to use Redis for caching, install it. See the Redis installation guide: [https://redis.io/docs/getting-started/](https://redis.io/docs/getting-started/)

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/theakashshukla/express-ts-starter.git
   cd express-ts-starter

2. **Install Dependencies:**

   ```bash
   npm install


3. **Setup Environment Variables:**

Create a .env file in the root of your project and add your environment variables. You can start by copying the example file:

   ```bash
   cp .env.example .env


4. **Install TypeScript (if not already installed):**

   ```bash
   npm install -g typescript

5. **Start the Development Server:**

   ```bash
   npm run dev


6. **Production Build:**

   ```bash
   npm run build


7. **Run Prodcution Server**

   ```bash
    npm run start


8. **Run Tests:**

   ```bash
   npm run test

9. **Prettier:**

   ```bash
   npm run format

## Project Structure

The project structure is designed to provide a clear and organized way to build your application. Here's an overview of the structure:

```bash
express-ts-starter/

├── src
│   ├── config
│   │   ├── dbConfig.ts
│   │   ├── index.ts
│   │   ├── redisConfig.ts
│   ├── controllers
│   │   └── userController.ts
│   ├── middlewares
│   │   ├── authMiddleware.ts
│   │   ├── authorizationMiddleware.ts
│   │   ├── rateLimit.ts
│   │   ├── validationMiddleware.ts
│   │   └── errorHandler.ts
│   ├── models
│   │   └── userModel.ts
│   ├── routes
│   │   ├── index.ts
│   │   ├── health.ts
│   │   └── userRoutes.ts
│   ├── services
│   │   ├── userService.ts
│   ├── utils
│   │   ├── authUtils.ts
│   │   ├── bcryptUtils.ts
│   │   ├── logger.ts
│   │   └── token.ts
│   |── validators
│   │   ├── userValidator.ts
│   |   └── serviceValidator.ts
│   └── app.ts
├── tests
├── .env
├── .env.example
├── .gitignore
├── jest.config.js
├── package.json
├── tsconfig.json
└── README.md

## Scripts

- `npm run dev`: Start the development server with Nodemon.
- `npm run build`: Compile TypeScript to JavaScript.
- `npm run start`: Start the production server.
- `npm run test`: Run tests using Jest.
- `npm run format`: Format code using Prettier.

## Testing

This project uses the Jest testing framework for writing unit and integration tests. You can find the test files in the `tests` directory. To run the tests, use the following command:

```bash
npm run test

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you find a bug or want to add a new feature.

## License

This project is open-source and available under the [ISC License](https://opensource.org/licenses/ISC).

