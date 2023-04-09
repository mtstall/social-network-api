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

// Delete a friend
// app.delete("/api/users/:userId/friends/:friendId", (req, res) => {
//   User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId  } }, (err, result) => {
//     if (result) {
//       res.status(200).json(result);
//       console.log(`Deleted: ${result}`);
//     } else {
//       console.log('Uh Oh, something went wrong');
//       res.status(500).json({ message: 'something went wrong' });
//     }
//   });
// });


db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
