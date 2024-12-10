import express  from 'express';
import cors   from 'cors';
import http from 'http';
import dotenv  from 'dotenv';
import bodyParser  from'body-parser';
import cookieParser from'cookie-parser';
import mongoose from 'mongoose'

import authRoutes from './routers/AuthRoutes.js';
import productRoutes from './routers/ProductRoutes.js';

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json({limit:'30mb', extended:true}));
app.use(bodyParser.urlencoded({limit:'30mb', extended:true}));
app.use(cors({origin:'*'}));
app.use(cookieParser());

dotenv.config();
const port = 3001;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection failed:", err));


server.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
