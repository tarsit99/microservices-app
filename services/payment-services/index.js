// const express = require('express');
// const app = express();
// const PORT = 3002;

// app.use(express.json());

// let payments = [];

// // Create a new payment
// app.post('/payments', (req, res) => {
//   const payment = req.body;
//   payments.push(payment);
//   res.status(201).json({
//     message: 'Payment processed successfully',
//     payment: payment
//   });
// });

// // Get all payments
// app.get('/payments', (req, res) => {
//   res.json(payments);
// });

// // Get a payment by ID
// app.get('/payments/:id', (req, res) => {
//   const paymentId = parseInt(req.params.id, 10);
//   const payment = payments.find(p => p.id === paymentId);

//   if (payment) {
//     res.json(payment);
//   } else {
//     res.status(404).json({ message: 'Payment not found' });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Payment service running on port ${PORT}`);
// });

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());

let payments = [];
app.get('/health', (_req, res) => res.sendStatus(200));   // <--
app.get('/payments', (_req, res) => res.json(payments));
app.post('/payments', (req, res) => {
  payments.push(req.body);
  res.status(201).json({ message: 'Payment processed successfully', payment: req.body });
});
app.get('/payments/:id', (req, res) => {
  const p = payments.find(x => x.id === parseInt(req.params.id, 10));
  if (!p) return res.status(404).json({ message: 'Payment not found' });
  res.json(p);
});

app.listen(PORT, () => console.log(`Payment service running on port ${PORT}`));