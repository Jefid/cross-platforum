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
        rating: {
            type: Number,
            required: "You played it, you rate it",
            min: 0,
            max: 5,
        },
        review: {
            type: String,
            minlength: 1,
            maxlength: 280
        },
        platform: {
            type: String,
            minlength: 1,
            maxlength: 20
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