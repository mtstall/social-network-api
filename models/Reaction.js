const { Schema, Types } = require('mongoose');

// schema to create Reaction model
const reactionSchema = new Schema(
    {
        reactionId: {
         type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // use getter method to format the timestamp
        }
    }
)

// creating reaction data

module.exports = reactionSchema;