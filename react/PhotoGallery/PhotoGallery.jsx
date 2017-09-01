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
        console.log(this.props.photos);
    }

    render() {
        return (
            <h2>Photo Gallery</h2>
        );
    }
}

let mapStateToProps = (store) => {
    return {
        photos: store.photos,
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
