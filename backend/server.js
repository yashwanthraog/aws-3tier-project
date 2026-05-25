// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const PORT = 5000;

// // Point to the internal Kubernetes service route for MongoDB
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo-service:27017/devopsdb';

// mongoose.connect(MONGO_URI)
//   .then(() => console.log('Connected to MongoDB successfully!'))
//   .catch(err => console.error('Database connection error:', err));

// app.get('/api/data', (req, res) => {
//     res.json({ message: "Success! Hello from the Backend API Layer. Your Database connection is live." });
// });

// app.listen(PORT, () => {
//     console.log(`Backend listening on port ${PORT}`);
// });

// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();
// const PORT = 5000;

// // Middleware to parse incoming JSON request bodies
// app.use(express.json());

// // Point to the internal Kubernetes service route for MongoDB
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo-service:27017/devopsdb';

// mongoose.connect(MONGO_URI)
//   .then(() => console.log('Connected to MongoDB successfully!'))
//   .catch(err => console.error('Database connection error:', err));

// // 🛢️ Define the Mongoose Database Schema for Games
// const gameSchema = new mongoose.Schema({
//   title: String,
//   genre: String,
//   description: String
// });
// const Game = mongoose.model('Game', gameSchema);

// // 🔍 GET Endpoint: Ingress rewrites '/api/games' to '/games' before hitting this
// app.get('/games', async (req, res) => {
//   try {
//     const allGames = await Game.find({});
//     res.json(allGames);
//   } catch (err) {
//     res.status(500).json({ error: "Could not fetch games from database" });
//   }
// });

// // 🚀 POST Endpoint: Ingress rewrites data seed path to '/games' before hitting this
// app.post('/games', async (req, res) => {
//   try {
//     const gameData = req.body;
//     if (Array.isArray(gameData)) {
//       const insertedGames = await Game.insertMany(gameData);
//       return res.status(201).json(insertedGames);
//     }
//     const newGame = new Game(gameData);
//     await newGame.save();
//     res.status(201).json(newGame);
//   } catch (err) {
//     res.status(500).json({ error: "Could not save game data to database" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Backend listening on port ${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo-service:27017/devopsdb';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch(err => console.error('Database connection error:', err));

const gameSchema = new mongoose.Schema({
  title: String,
  genre: String,
  description: String
});
const Game = mongoose.model('Game', gameSchema);

// GET API - Process rewritten paths cleanly
app.get('/games', async (req, res) => {
  try {
    const allGames = await Game.find({});
    res.json(allGames);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch games from database" });
  }
});

// POST API - Seed Data entries directly 
app.post('/games', async (req, res) => {
  try {
    const gameData = req.body;
    if (Array.isArray(gameData)) {
      const insertedGames = await Game.insertMany(gameData);
      return res.status(201).json(insertedGames);
    }
    const newGame = new Game(gameData);
    await newGame.save();
    res.status(201).json(newGame);
  } catch (err) {
    res.status(500).json({ error: "Could not save game data to database" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
