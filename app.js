import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;

const cat = {
  cat_id: 1,
  name: 'mr. meow',
  birthdate: '15-11-2020',
  weight: 4,
  owner: 'Geralt',
  image: 'https://loremflickr.com/320/240/cat'
}

app.use('/public', express.static('public'));

app.get('/api/v1/cat', (request, response) => {
  response.send(cat);
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
