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
}