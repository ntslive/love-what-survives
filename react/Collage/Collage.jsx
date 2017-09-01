const React = require('react');
const ReactDOM = require('react-dom');
const {connect} = require('react-redux');

const actions = require('../PhotoGallery/photoGalleryActions.js');

class Collage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        console.log(this.props.gallery);
    }

    renderPhotos() {
        let that = this;

        return this.props.gallery.photos.map(function(photo, i) {
            return (
                <div key={i} className="collage__photo"
                     onClick={() => that.props.openGallery(i)}>
                    <span>{photo.title}</span>
                    <img className="collage__photo__img" src={photo.imageUrl} />
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <h2>Collage</h2>
                {this.renderPhotos()}
            </div>
        )
    }
}

let mapStateToProps = (store) => {
    return {
        gallery: store.gallery,
    };
};

let mapDispatchToProps = (dispatch, ownProps) => {
    return {
        openGallery: (newPhotoIndex) => {
            dispatch( actions.openGallery(newPhotoIndex) );
        },
        closeGallery: () => {
            dispatch( actions.closeGallery());
        },
    }
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Collage);
