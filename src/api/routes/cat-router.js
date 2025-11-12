import express from 'express';
import {createThumbnail} from '../../middlewares/upload.js';
import {
  getCats,
  getCatById,
  postCat,
  putCat,
  deleteCat,
  getCatsByUserId
} from '../controllers/cat-controller.js';
import {authenticateToken} from '../../middlewares/authentication.js';

import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const catRouter = express.Router();

catRouter.route('/user/:user_id').get(authenticateToken, getCatsByUserId);

catRouter.route('/').get(getCats).post(authenticateToken, upload.single('file'), createThumbnail, postCat);

catRouter.route('/:id').get(getCatById).put(authenticateToken, putCat).delete(authenticateToken, deleteCat);

export default catRouter;
