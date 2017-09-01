const types = {
    NEXT_PHOTO: "PhotoGallery/NEXT_PHOTO",
    PREVIOUS_PHOTO: "PhotoGallery/PREVIOUS_PHOTO",
    OPEN_GALLERY: "PhotoGallery/OPEN_GALLERY",
    CLOSE_GALLERY: "PhotoGallery/CLOSE_GALLERY",
};

module.exports = {
    types: types,

    nextPhoto: (channelToPlay) => {
        return {
            type: types.PREVIOUS_PHOTO,
        };
    },

    previousPhoto: () => {
        return {
            type: types.PREVIOUS_PHOTO,
        };
    },

    openGallery: () => {
        return {
            type: types.OPEN_GALLERY,
        };
    },

    closeGallery: () => {
        return {
            type: types.CLOSE_GALLERY,
        };
    },

};
