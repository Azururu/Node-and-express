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
  const userId = parseInt(req.params.user_id);
  const loggedUser = res.locals.user;
  try {
    if (userId !== loggedUser.user_id && loggedUser.role !== 'admin') {
      return res.status(403).send('Not logged user or admin');
    }

    const cats = await findCatsByUserId(userId);
    if (!cats) {
      return res.status(404).send('No Cats found');
    }
    res.status(200).json({message: 'Success', cats});
  } catch (error) {
    res.status(500).json({message: 'Error fetching cats.', error: error.message});
  }
}

const postCat = async (req, res) => {
  const loggedUser = res.locals.user;
  try {
    if (!loggedUser) {
      return res.status(404).send('No permission.');
    }
    req.body.owner = loggedUser.user_id;
    console.log(req.body);
    console.log(req.file);
    console.log(req.file.filename);
    req.body.filename = req.file.filename;
    const result = await addCat(req.body);
    res.status(200).json({message: 'Success', result});
  } catch (error) {
    res.status(500).json({message: 'Error adding cat.', error: error.message});
  }
};

const putCat = async (req, res) => {
  const catId = parseInt(req.params.id);
  const loggedUser = res.locals.user;
  try {
    const cat = await findCatById(catId);
    if (!cat) return res.status(404).send('No cat');

    if (cat.owner !== loggedUser.user_id && loggedUser.role !== 'admin') {
      return res.status(401).send('No permission.');
    }

    const result = await updateCat(req.body, catId, loggedUser.user_id, loggedUser.role);
    res.json({message: 'Cat updated', result});
  } catch (error) {
    res.status(500).json({message: 'Error updating cat', error: error.message});
  }
};

const deleteCat = async (req, res) => {
  const catId = parseInt(req.params.id);
  const loggedUser = res.locals.user;
  try {
    const cat = await findCatById(catId);
    if (!cat) return res.status(404).send('No cat');

    if (cat.owner !== loggedUser.user_id && loggedUser.role !== 'admin') {
      return res.status(401).send('No permission.');
    }

    const result = await removeCat(catId, loggedUser.user_id, loggedUser.role);
    res.json({message: 'Cat deleted', result});
  } catch (error) {
    res.status(500).json({message: 'Error deleting cat', error: error.message});
  }
};

export {getCats, getCatById, postCat, putCat, deleteCat, getCatsByUserId};
