const React = require('react');
const ReactDOM = require('react-dom');
const {connect} = require('react-redux');

const actions = require('../PhotoGallery/photoGalleryActions.js');

class Collage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.gallery.photos.length !== this.props.gallery.photos.length;
    }

    componentDidMount() {
        console.log(this.props.gallery);
    }

    renderPhotos() {
        let that = this;

        function randomLeft() {
            // between -6 & 90
            return Math.floor(Math.random() * 90) + '%';
        }

        function randomTop() {
            // between 0 & 70
            return Math.floor(Math.random() * 70) + '%';
        }

        function randomWidth() {
            // between 35% and 50%
            return Math.floor(Math.random() * 50) + 35 + "%";
        }

        function randomRotate() {
            // between -11% and 11%
            return Math.floor(Math.random() * 22) - 11 + 'deg';
        }

        return this.props.gallery.photos.map(function(photo, i) {
            let randomRotation = randomRotate();
            let positioning = {
                top: randomTop(),
                left: randomLeft(),
                width: randomWidth(),

                '-ms-transform': `rotate(${randomRotation})`,
                '-webkit-transform': `rotate(${randomRotation})`,
                'transform': `rotate(${randomRotation})`,
            };
            return (
                <div key={i} className="collage__photo" style={positioning}
                     onClick={() => that.props.openGallery(i)}>
                    <img className="collage__photo__img" src={photo.imageUrl} />
                </div>
            );
        });
    }

    render() {
        return (
            <div id="collage">
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
