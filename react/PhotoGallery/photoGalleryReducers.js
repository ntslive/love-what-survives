const actions = require('./photoGalleryActions.js').types;

const DEFAULT_STATE = {
    photos: [],
    currentPhotoIndex: 0,
    isVisible: false,
};

const reducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case actions.PREVIOUS_PHOTO: {
            let newIndex = state.currentPhotoIndex - 1;

            if (newIndex < 0) {
                return {
                    ...state,
                }
            }

            return {
                ...state,
                currentPhotoIndex: newIndex,
            };
        }
        case actions.NEXT_PHOTO: {
            let numPhotos = state.photos.length;
            let newIndex = state.currentPhotoIndex + 1;

            if (newIndex >= numPhotos) {
                return {
                    ...state,
                }
            }

            return {
                ...state,
                currentPhotoIndex: newIndex,
            };
        }
        case actions.OPEN_GALLERY: {
            let photoIndex = typeof action.newPhotoIndex !== "undefined" ? action.newPhotoIndex : state.currentPhotoIndex;
            return {
                ...state,
                isVisible: true,
                currentPhotoIndex: photoIndex,
            };
        }
        case actions.CLOSE_GALLERY: {
            return {
                ...state,
                isVisible: false,
            };
        }
        default:
            return state;
    }
};

module.exports = reducer;
