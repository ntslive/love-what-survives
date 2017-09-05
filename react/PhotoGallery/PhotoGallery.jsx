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
        let isFirst = this.props.gallery.currentPhotoIndex === 0;
        let isLast = this.props.gallery.currentPhotoIndex === this.props.gallery.photos.length-1;

        return (
            <div id="gallery" className={`${this.props.gallery.isVisible ? 'gallery--open' : 'gallery--closed'}`}>

                <div className="gallery__img-container noselect">
                    <img className="gallery__img" src={currentPhoto.imageUrl} />
                    <h2 className="gallery__title primary-font header-fuzzy-text header-fuzzy-text--dark">{currentPhoto.title}</h2>
                </div>

                <div id="next-photo-icon" onClick={this.props.nextPhoto} className={'noselect ' + (isLast ? 'hidden' : '')}>
                    <i className="fa fa-caret-right header-fuzzy-text header-fuzzy-text--dark" aria-hidden="true"> </i>
                </div>
                <div id="prev-photo-icon" onClick={this.props.previousPhoto} className={'noselect ' + (isFirst ? 'hidden' : '')}>
                    <i className="fa fa-caret-left header-fuzzy-text header-fuzzy-text--dark" aria-hidden="true"> </i>
                </div>

                <div id="close-gallery-icon" onClick={this.props.closeGallery} className="noselect">
                    <i className="fa fa-times header-fuzzy-text header-fuzzy-text--dark" aria-hidden="true"> </i>
                </div>
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
