const types = {
    NEXT_PHOTO: "PhotoGallery/NEXT_PHOTO",
    PREVIOUS_PHOTO: "PhotoGallery/PREVIOUS_PHOTO",
    OPEN_GALLERY: "PhotoGallery/OPEN_GALLERY",
    CLOSE_GALLERY: "PhotoGallery/CLOSE_GALLERY",
};

module.exports = {
    types: types,

    nextPhoto: () => {
        return {
            type: types.NEXT_PHOTO,
        };
    },

    previousPhoto: () => {
        return {
            type: types.PREVIOUS_PHOTO,
        };
    },

    openGallery: (newPhotoIndex) => {
        return {
            type: types.OPEN_GALLERY,
            newPhotoIndex: newPhotoIndex,
        };
    },

    closeGallery: () => {
        return {
            type: types.CLOSE_GALLERY,
        };
    },
};
