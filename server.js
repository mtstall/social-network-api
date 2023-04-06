const express = require('express');
const db = require('./config/connection');
// Require model
const { User } = require('./models');
const { Thought } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// USER ROUTES
// Creates a new user
app.post('/new-user/:user', (req, res) => {
  const newUser = new User({ username: req.params.user });
  newUser.save();
  if (newUser) {
    res.status(201).json(newUser);
  } else {
    console.log('Uh Oh, something went wrong');
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Finds all users
app.get('/all-users', (req, res) => {
  // Using model in route to find all documents that are instances of that model
  User.find({}, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
});

// Finds first document matching username parameter and deletes
app.delete('/delete-one-user/:username', (req, res) => {
  User.findOneAndDelete(
    { name: req.params.username },
    (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
      }
    }
  );
});

// THOUGHT ROUTES
// Creates a new thought
app.post('/new-thought/:thoughtText', (req, res) => {
    const newThought = new Thought({ thoughtText: req.params.thoughtText });
    newThought.save();
    if (newThought) {
      res.status(201).json(newThought);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ error: 'Something went wrong' });
    }
  });
  
  // Finds all thoughts
  app.get('/all-thoughts', (req, res) => {
    // Using model in route to find all documents that are instances of that model
    Thought.find({}, (err, result) => {
      if (result) {
        res.status(200).json(result);
      } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ error: 'Something went wrong' });
      }
    });
  });
  
  // Finds first document matching thought parameter and deletes
  app.delete('/delete-one-user/:thoughtText', (req, res) => {
    Thought.findOneAndDelete(
      { thoughtText: req.params.thoughtText },
      (err, result) => {
        if (result) {
          res.status(200).json(result);
          console.log(`Deleted: ${result}`);
        } else {
          console.log('Uh Oh, something went wrong');
          res.status(500).json({ error: 'Something went wrong' });
        }
      }
    );
  });

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
