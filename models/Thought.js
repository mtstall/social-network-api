const { Schema, model } = require("mongoose");

// schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true, // is this right?
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // use getter method to format the timestamp
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "reaction",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// virtual to return number of reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// initialize Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
