const cats = [
  {
    cat_id: 9592,
    name: 'mr. meow',
    birthdate: '15-11-2020',
    weight: 4,
    filename: 'jgkllj42lg',
    owner: 'Gerald',
  },
  {
    cat_id: 9590,
    name: 'mr. meow2',
    birthdate: '15-11-2020',
    weight: 6,
    filename: '4jgklj1l4j5',
    owner: 'Gerald',
  },
];

const listAllCats = () => {
  return cats;
};

const findCatById = id => {
  return cats.find((cat) => cat.cat_id === id);
};

const addCat = (cat) => {
  const {name, birthdate, weight, filename, owner} = cat;
  const newId = cats[0].cat_id + 1;
  cats.unshift({cat_id: newId, name, birthdate, weight, filename, owner});
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
