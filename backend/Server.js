import express from 'express';
import connection from './utils/connection.js';
import cors from 'cors';
import crudRouter from './routers/crudRouter.js';
import authRouter from './routers/authRouter.js';
import fetchRouter from './routers/fetchRouter.js';
import clearExpiredDiscounts from './controllers/discountValidation.js';
import cron from 'node-cron';

const app = express();
const port = 3000;

app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("uploads"))

// Schedule to run at midnight (0:0)
cron.schedule('0 0 * * *', () => {
  clearExpiredDiscounts();
});

app.use('/crud', crudRouter);
app.use('/auth', authRouter);
app.use('/get', fetchRouter);

connection;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
