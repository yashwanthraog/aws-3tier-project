const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

// Point to the internal Kubernetes service route for MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo-service:27017/devopsdb';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch(err => console.error('Database connection error:', err));

app.get('/api/data', (req, res) => {
    res.json({ message: "Success! Hello from the Backend API Layer. Your Database connection is live." });
});

app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
});