import {
  addCat,
  findCatById,
  findCatsByUserId,
  listAllCats,
  removeCat,
  updateCat,
} from '../models/cat-model.js';

const getCats = async (req, res) => {
  res.json(await listAllCats());
};

const getCatById = async (req, res) => {
  const cat = await findCatById(parseInt(req.params.id));
  if (cat) {
    res.status(200);
    res.json(cat);
  } else {
    res.status(404).send('No cat');
  }
};

const getCatsByUserId = async (req, res) => {
  const cats = await findCatsByUserId(parseInt(req.params.user_id));
  if (cats.length !== 0) {
    res.status(200);
    res.json(cats);
  } else {
    res.status(404).send('No cat');
  }
}

const postCat = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  console.log(req.file.filename);
  req.body.filename = req.file.filename;
  const result = await addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'Cat added successfully.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCat = async (req, res) => {
  const updateData = await updateCat(req.body, parseInt(req.params.id));
  if (updateData) {
    res.status(200);
    res.json({message: 'Cat item updated.', updateData});
  } else {
    res.status(404).send('Could not update cat');
  }
};

const deleteCat = async (req, res) => {
  const result = await removeCat(parseInt(req.params.id));
  if (result) {
    res.status(200);
    res.json({message: 'Cat item deleted.', result});
  } else {
    res.status(404).send('Could not delete cat');
  }
};

export {getCats, getCatById, postCat, putCat, deleteCat, getCatsByUserId};
