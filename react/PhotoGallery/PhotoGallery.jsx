const React = require('react');
const ReactDOM = require('react-dom');
const {connect} = require('react-redux');

const actions = require('./photoGalleryActions.js');

class PhotoGallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        console.log(this.props.gallery);
    }

    render() {
        let currentPhoto = this.props.gallery.photos[this.props.gallery.currentPhotoIndex];

        return (
            <div id="gallery" className={`${this.props.gallery.isVisible ? 'gallery--open' : 'gallery--closed'}`}>
                <h2>Photo Gallery</h2>
                <span>{currentPhoto.title}</span>
                <img className="gallery__img" src={currentPhoto.imageUrl} />
                <button onClick={this.props.previousPhoto}>previous photo</button>
                <button onClick={this.props.nextPhoto}>next photo</button>
                <button onClick={this.props.closeGallery} style={{display: 'block'}}>close gallery</button>
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(PhotoGallery);
