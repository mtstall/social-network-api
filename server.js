const express = require("express");
const db = require("./config/connection");
// Require model
const { User, Thought } = require("./models");

const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// USER ROUTES
// Creates a new user
app.post("/api/users", (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
  });
  newUser.save();
  if (newUser) {
    res.status(201).json(newUser);
  } else {
    console.log("Uh Oh, something went wrong");
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Finds all users
app.get("/api/users", (req, res) => {
  // Using model in route to find all documents that are instances of that model
  User.find({}, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log("Uh Oh, something went wrong");
      res.status(500).json({ error: "Something went wrong" });
    }
  });
});

// Finds user by id
app.get("/api/users/:id", (req, res) => {
  // Using model in route to find all documents that are instances of that model
  User.find({_id: req.params.id}, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log("Uh Oh, something went wrong");
      res.status(500).json({ error: "Something went wrong" });
    }
  });
});

// Finds first document matching username parameter and deletes
app.delete("/api/users/:id", (req, res) => {
  User.findOneAndDelete({ _id: req.params.id }, (err, result) => {
    if (result) {
      res.status(200).json(result);
      console.log(`Deleted: ${result}`);
    } else {
      console.log("Uh Oh, something went wrong");
      res.status(500).json({ error: "Something went wrong" });
    }
  });
});

// Update user
app.put("/api/users/:id", async (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, (err, result) => {
    if (result) {
      res.status(200).json(result);
      console.log(`Updated: ${result}`);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  });
});

// Add a new friend
app.post("/api/users/:userId/friends/:friendId", (req, res) => {
  User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId  } }, (err, result) => {
    if (result) {
      res.status(200).json(result);
      console.log(`Added: ${result}`);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  });
});

// Delete a friend
app.delete("/api/users/:userId/friends/:friendId", (req, res) => {
  User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId  } }, (err, result) => {
    if (result) {
      res.status(200).json(result);
      console.log(`Deleted: ${result}`);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  });
});

// THOUGHT ROUTES
// Creates a new thought
app.post("/api/thoughts", (req, res) => {
  const newThought = new Thought({
    thoughtText: req.body.thoughtText,
    username: req.body.username,
  });
  newThought.save();
  if (newThought) {
    res.status(201).json(newThought);
  } else {
    console.log("Uh Oh, something went wrong");
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Finds all thoughts
app.get("/api/thoughts", (req, res) => {
  // Using model in route to find all documents that are instances of that model
  Thought.find({}, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log("Uh Oh, something went wrong");
      res.status(500).json({ error: "Something went wrong" });
    }
  });
});

// Get a thought by its id
app.get("/api/thoughts/:id", (req, res) => {
  // Using model in route to find all documents that are instances of that model
  Thought.find({_id: req.params.id }, (err, result) => {
    if (result) {
      res.status(200).json(result);
    } else {
      console.log("Uh Oh, something went wrong");
      res.status(500).json({ error: "Something went wrong" });
    }
  });
});

// Finds first document matching thought parameter and deletes
app.delete("/api/thoughts/:id", (req, res) => {
  Thought.findOneAndDelete(
    { id: req.params.id },
    (err, result) => {
      if (result) {
        res.status(200).json(result);
        console.log(`Deleted: ${result}`);
      } else {
        console.log("Uh Oh, something went wrong");
        res.status(500).json({ error: "Something went wrong" });
      }
    }
  );
});

// Update thought
app.put("/api/thoughts/:id", async (req, res) => {
  Thought.findOneAndUpdate({ id: req.params.id }, req.body, (err, result) => {
    if (result) {
      res.status(200).json(result);
      console.log(`Updated: ${result}`);
    } else {
      console.log('Uh Oh, something went wrong');
      res.status(500).json({ message: 'something went wrong' });
    }
  });
});

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
