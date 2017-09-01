const combineReducers = require('redux').combineReducers;

const photoGalleryReducers = require('./PhotoGallery/photoGalleryReducers.js');

const reducers = combineReducers({
    photos: photoGalleryReducers,
});

module.exports = reducers;
