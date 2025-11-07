import {
  addCat,
  findCatById,
  listAllCats,
  removeCat,
  updateCat,
} from '../models/cat-model.js';

const getCats = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(parseInt(req.params.id));
  if (cat) {
    res.status(200);
    res.json(cat);
  } else {
    res.status(404).send('No cat');
  }
};

const postCat = (req, res) => {
  const result = addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'Cat added successfully'});
  } else {
    res.sendStatus(400);
  }
};

const putCat = (req, res) => {
  const updateData = updateCat(req.body, parseInt(req.params.id));
  if (updateData) {
    res.status(200);
    res.json({message: 'Cat item updated.', updateData});
  } else {
    res.status(404).send('Could not update cat');
  }
};

const deleteCat = (req, res) => {
  const result = removeCat(parseInt(req.params.id));
  if (result) {
    res.status(200);
    res.json({message: 'Cat item deleted.', result});
  } else {
    res.status(404).send('Could not delete cat');
  }
};

export {getCats, getCatById, postCat, putCat, deleteCat};
