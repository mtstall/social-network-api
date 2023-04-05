const { Schema, model } = require('mongoose');

/// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: 'Username is required',
            unique: true,
            // validate: [validateEmail, 'Please fill a valid email address'],
            // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        }, // need to make this required, unique, and valid email address
        // is this right? how to do email?
        email: String,
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
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

// var validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };

// virtual to return a user's friend count
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

// initialize user model
const User = model('user', userSchema);

module.exports = User;