const React = require('react');
const ReactDOM = require('react-dom');
const {connect} = require('react-redux');

const actions = require('../PhotoGallery/photoGalleryActions.js');

class PhotoGalleryMobile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    renderPhoto(photo, i) {
        console.log("rendering photo");
        return (
            <div key={i}>
                <span>{photo.title}</span>
                <img className="gallery-mobile__img" src={photo.imageUrl} />
            </div>
        )
    }

    render() {
        return (
            <div id="gallery-mobile" className=''>
                <h2>Photo Gallery</h2>
                {
                    this.props.gallery.photos.map(this.renderPhoto)
                }
            </div>
        );
    }
}

let mapStateToProps = (store) => {
    return {
        gallery: store.gallery,
    };
};

let mapDispatchToProps = (dispatch, ownProps) => {
    return {
        nextPhoto: () => {
            dispatch( actions.nextPhoto() );
        },
        previousPhoto: () => {
            dispatch( actions.previousPhoto());
        },
        closeGallery: () => {
            dispatch( actions.closeGallery());
        },
    }
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(PhotoGalleryMobile);
