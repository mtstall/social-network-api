const { Schema, model } = require('mongoose');

/// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            // validate: [validateEmail, 'Please fill a valid email address'],
            // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        }, // need to make this required, unique, and valid email address
        // is this right? how to do email?
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please fill a valid email address",
              ],
        },
        thoughts: [       
            {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
          } 
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ] 
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// virtual to return a user's friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

// initialize user model
const User = model('user', userSchema);

// create User data
User.find({}).exec((err, collection) => {
    if (collection.length === 0) {
      User.insertMany(
        [
          { username: 'harrypotter', email: 'harrypotter@hogwarts.edu' ,thoughts: [
            {thoughtText: 'I have a scar on my forehead', username: 'harrypotter'},
            {thoughtText: 'I hate Draco Malfoy', username: 'harrypotter'},
          ],
          //friends:
        },
          { username: 'ronweasley', email: 'ronweasley@hogwarts.edu' ,thoughts: [
            {thoughtText: 'I have red hair', username: 'ronweasley'},
            {thoughtText: 'I love quidditch', username: 'ronweasley'},
          ],
          //friends:
          },
          { username: 'hermionegranger', email: 'hermionegranger@hogwarts.edu' ,thoughts: [
            {thoughtText: 'I love school and studying', username: 'hermionegranger'},
          ],
          //friends: 
         },
        ],
        (insertErr) => {
          if (insertErr) {
            handleError(insertErr);
          }
        }
      );
    }
  });

module.exports = User;