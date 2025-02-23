import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from 'morgan';

import userRoutes from "./routes/userRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";
import errorHandling from "./middlewares/errorHandler.js";
import createUserTable from "./data/createUserTable.js";
import createCardsTable from "./data/createCardRequestTable.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const apiVersion = process.env.API_VERSION
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'x-client-key',
    'x-client-token',
    'x-client-secret',
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));

// Routes
app.use(`${apiVersion}/user`, userRoutes);
app.use(`${apiVersion}/card`, cardRoutes);

// Error handling middleware
app.use(errorHandling);

const startServer = async () => {
  try {
    // Ensure table is created before running server
    await createUserTable(); 
    await createCardsTable();
    console.log("✅ Database tables are ready");

    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Error setting up the database:", error);
    process.exit(1); // Exit process if database setup fails
  }
};

// Start server
startServer();