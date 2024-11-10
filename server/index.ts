import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './src/routes'; 
import db from './src/config/db.config';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/api/v1/', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

db.on("error", (error: unknown) => {
  console.error("Error connecting to MongoDB:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

export = app;
