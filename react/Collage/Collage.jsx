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

    componentWillUnmount() {
        this.canvas.clear();
        window.removeEventListener('resize', this.resizeCanvas);
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
                transform: `rotate(${randomRotation})`,
            };
            return (
                <div key={i} className="collage__photo" style={positioning}
                     onClick={() => that.props.openGallery(i)}>
                    <img className="collage__photo__img" src={photo.imageUrl} />
                </div>
            );
        });
    }

    renderCanvasImages() {
        let that = this;

        function randomLeft() {
            // between -6% & 80%
            let max = 0.8;
            let min = -0.06;

            let widthPercentage = Math.random() * (max - min) + min;
            return that.canvas.width * widthPercentage;
        }

        function randomTop() {
            // between 0% & 40%
            let max = 0.6;
            let min = -0.1;
            let widthPercentage = Math.random() * (max - min) + min;
            return that.canvas.width * widthPercentage;
        }

        function randomWidth() {
            // between 20% & 35%
            let max = 0.35;
            let min = 0.2;
            let widthPercentage = Math.random() * (max - min) + min;

            return that.canvas.width * widthPercentage;
        }

        function randomRotate() {
            // between -11% and 11%
            return (Math.floor(Math.random() * 90) - 45) / 10;
        }

        for (let i=0; i < this.props.gallery.photos.length; i++) {
            let photo = this.props.gallery.photos[i];

            fabric.Image.fromURL(photo.imageUrl, function(oImg) {
                let properties = {
                    top: randomTop(),
                    left: randomLeft(),
                    angle: randomRotate(),
                    hasControls: false,
                    hasBorders: false,
                    hoverCursor: 'pointer',
                    galleryIndex: i,
                };
                oImg.set(properties);
                oImg.scaleToWidth( randomWidth());

                that.canvas.add(oImg);
            });
        }
    }

    handleCanvasEvents() {
        let that = this;

        let lastClickedLeft;

        this.canvas.on('mouse:down', function(options) {
            if (options.target) {
                lastClickedLeft = options.target.left;
            }
        });
        this.canvas.on('mouse:up', function(options) {
            if (options.target) {
                if (lastClickedLeft === options.target.left) {
                    that.props.openGallery(options.target.galleryIndex);
                }
            }
        });
    }

    renderCanvas() {
        let that = this;
        this.canvas = new fabric.Canvas('collage-canvas');

        /** Handle canvas Resizing **/
        window.addEventListener('resize', resizeCanvas, false);

        function resizeCanvas() {
            that.canvas.setHeight(window.innerHeight);
            that.canvas.setWidth(window.innerWidth);
            that.canvas.renderAll();
        }

        // resize on init
        resizeCanvas();

        this.renderCanvasImages();
        this.handleCanvasEvents();
    }

    render() {
        return (
            <div id="collage">
                {this.renderCanvas()}
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
