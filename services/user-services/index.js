const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Temporary in-memory storage
let users = [{ id: 1, name: 'Tarsit' }];

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// POST new user
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser); // Save to memory
  res.status(201).json({
    message: 'User created successfully',
    user: newUser
  });
});

// GET user by ID
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});