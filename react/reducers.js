const combineReducers = require('redux').combineReducers;

const photoGalleryReducers = require('./PhotoGallery/photoGalleryReducers.js');

const reducers = combineReducers({
    gallery: photoGalleryReducers,
});

module.exports = reducers;
