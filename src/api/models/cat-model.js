const cats = [
  {
    cat_id: 1,
    name: 'mr. meow',
    birthdate: '15-11-2020',
    weight: 4,
    owner: 'Gerald',
    image: 'https://loremflickr.com/320/240/cat'
  }
];

const listAllCats = () => {
  return cats;
};

const findCatById = id => {
  return cats.find((cat) => cat.cat_id === id);
};

const addCat = (cat) => {
  const {name, birthdate, weight, owner, image} = cat;
  const newId = cats[0].cat_id + 1;
  cats.unshift({cat_id: newId, name, birthdate, weight, owner, image});
  return {cat_id: newId};
};

const updateCat = (data, id) => {
  const index = cats.findIndex(cat => cat.cat_id === id);
  cats[index] = {
    ...cats[index],
    ...data,
    cat_id: id
  };

  return cats[index];
};

const removeCat = id => {
  const index = cats.findIndex(cat => cat.cat_id === id);
  cats.splice(index, 1);
  return true;
}

export {listAllCats, findCatById, addCat, updateCat, removeCat};


