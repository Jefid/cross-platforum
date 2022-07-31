const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const gamePostSchema = new Schema(
    {
        gamePlayed: {
            type: String,
            required: "You had to have played something!",
            minlength: 1,
            maxlength: 50
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        comments: [commentSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

gamePostSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

const GamePost = model('GamePost', gamePostSchema);

module.exports = GamePost;