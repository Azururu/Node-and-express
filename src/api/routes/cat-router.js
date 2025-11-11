import express from 'express';
import {createThumbnail} from '../../middlewares/upload.js';
import {
  getCats,
  getCatById,
  postCat,
  putCat,
  deleteCat,
} from '../controllers/cat-controller.js';

import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const catRouter = express.Router();

catRouter.route('/').get(getCats).post(upload.single('file'), createThumbnail, postCat);

catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

export default catRouter;
