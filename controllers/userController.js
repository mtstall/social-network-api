const { User, Thought } = require("../models");

module.exports = {
    // find all users
    getUsers(req, res) {
        User.find()
          .then((users) => res.json(users))
          .catch((err) => res.status(500).json(err));
      },
      // find user by id
      getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
          .select('-__v')
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
      // create a new user
      createUser(req, res) {
        User.create(req.body)
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.status(500).json(err));
      },
      // delete user and user's thoughts
      deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : Thought.deleteMany({ _id: { $in: user.thoughts } })
          )
          .then(() => res.json({ message: 'User and associated thoughts deleted' }))
          .catch((err) => res.status(500).json(err));
      },
      // update user
      updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.id },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: "No User with this ID!" })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
      // add friend
      addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId  } }, (err, result) => {
          if (result) {
            res.status(200).json(result);
            console.log(`Added: ${result}`);
          } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ message: 'something went wrong' });
          }
        });
      }
}