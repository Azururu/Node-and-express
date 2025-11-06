import express from 'express';
import catRouter from './routes/cat-router.js';

const router = express.Router();

router.use('/cat', catRouter);

// router.use('/users', userRouter);

export default router;
