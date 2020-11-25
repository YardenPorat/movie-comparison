const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema({
    movieName: String,
    movieRating: Number,
    movieUrl: String,
    likedBy: [String],
    likesCount: { type: Number, default: 0 },
    creationTime: { type: Date, default: Date.now() },
    _user: { type: Schema.Types.ObjectId, ref: 'User' }, // foreign key
});

module.exports = mongoose.model('movies', movieSchema);
