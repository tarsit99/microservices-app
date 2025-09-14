const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

// In-memory store
let products = [{ id: 101, name: 'Laptop', price: 50000 }];

// LIST
app.get('/products', (req, res) => {
  res.json(products);
});

// CREATE
app.post('/products', (req, res) => {
  const product = req.body;   // { id, name, price }
  products.push(product);
  res.status(201).json({ message: 'Product created', product });
});

// GET BY ID
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

app.listen(PORT, () => {
  console.log(`Product service running on port ${PORT}`);
});