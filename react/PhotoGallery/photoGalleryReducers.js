const actions = require('./photoGalleryActions.js').types;

const DEFAULT_STATE = {
    photos: [],
};

const reducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case actions.NEXT_PHOTO: {
            return {
                ...state,
            };
        }
        case actions.PREVIOUS_PHOTO: {
            return {
                ...state,
            };
        }
        case actions.OPEN_GALLERY: {
            return {
                ...state,
            };
        }
        case actions.CLOSE_GALLERY: {
            return {
                ...state,
            };
        }
        default:
            return state;
    }
};

module.exports = reducer;
