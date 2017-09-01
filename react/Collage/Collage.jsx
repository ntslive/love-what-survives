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
        console.log(this.props.photos);
    }

    renderPhotos() {
        return this.props.photos.map(function(photo, i) {
            return (
                <span key={i}>{photo.title}</span>
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
        photos: store.photos,
    };
};

let mapDispatchToProps = (dispatch, ownProps) => {
    return {
        openGallery: () => {
            dispatch( actions.openGallery() );
        },
        closeGallery: () => {
            dispatch( actions.closeGallery());
        },
    }
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Collage);
