const React = require('react');
const ReactDOM = require('react-dom');
const Provider = require('react-redux').Provider;
const {createStore, applyMiddleware} = require('redux');

const thunk = require('redux-thunk').default;
const logger = require('redux-logger').default;

const reducers = require('./reducers.js');

const PhotoGallery = require('./PhotoGallery/PhotoGallery');
const PhotoGalleryMobile = require('./PhotoGalleryMobile/PhotoGalleryMobile');
const RadioPlayerMobile = require('./RadioPlayerMobile/RadioPlayerMobile');
const Collage = require('./Collage/Collage');

const reactState = {
    gallery: {
        isVisible: false,
        currentPhotoIndex: 0,
        photos: [
            {
                title: "Four Years And One Day",
                imageUrl: "public/img/frank/1four_years_and_one_day.jpg",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
            {
                title: "Blue Train Lines (feat. King Krule)",
                imageUrl: "public/img/frank/2blue_train_lines_feat_king_krule.jpg",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
            {
                title: "Audition",
                imageUrl: "public/img/frank/3audition.jpg",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
            {
                title: "Marilyn (feat. Micachu)",
                imageUrl: "public/img/frank/4marilyn_feat_micachu.jpg",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
            {
                title: "SP12 Beat",
                imageUrl: "public/img/frank/5SP12_beat.jpg",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
            {
                title: "You Look Certain (I'm Not So Sure) (feat. Andrea Balency)",
                imageUrl: "public/img/frank/6you_look_certain.jpg",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
            {
                title: "Poison",
                imageUrl: "public/img/frank/7poison.jpg",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
            {
                title: "We Go Home Together",
                imageUrl: "public/img/frank/8we_go_home_together.jpg",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
            {
                title: "Delta",
                imageUrl: "public/img/frank/9delta.jpg",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
            {
                title: "T.A.M.E.D",
                imageUrl: "public/img/frank/10T.A.M.E.D.jpg",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
            {
                title: "How We Got By",
                imageUrl: "public/img/frank/11how_we_got_by.jpg",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
            // {
            //     title: "Love What Survives",
            //     imageUrl: "public/img/frank/love_what_survives.jpg",
            //     description: "Frank Lebon - DoBeDo Photographer Series",
            // },
            {
                title: "Love What Survives",
                imageUrl: "public/img/frank/love_what_survives_2.jpg",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
            {
                title: "",
                imageUrl: "public/img/frank/extra11.jpg",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
            {
                title: "",
                imageUrl: "public/img/frank/extra12.jpg",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
            {
                title: "",
                imageUrl: "public/img/frank/extra13.jpg",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
            {
                title: "",
                imageUrl: "public/img/frank/extra14.jpg",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
            {
                title: "",
                imageUrl: "public/img/frank/extra15.jpg",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
            {
                title: "",
                imageUrl: "public/img/frank/extra21.jpg",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
            {
                title: "",
                imageUrl: "public/img/frank/untitled4.png",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
        ],
    }
};

// const store = createStore(reducers, reactState, applyMiddleware(thunk));
const store = createStore(reducers, reactState, applyMiddleware(logger, thunk));

class DesktopApp extends React.Component {
    componentWillMount() {
        $('body').append('<canvas id="collage-canvas"></canvas>');
    }

    render() {
        return (
            <div>
                <PhotoGallery></PhotoGallery>
                {/*<Collage></Collage>*/}
            </div>
        );
    }
}

class MobileApp extends React.Component {
    render() {
        return (
            <div>
                <RadioPlayerMobile> </RadioPlayerMobile>
                <PhotoGalleryMobile> </PhotoGalleryMobile>
            </div>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            windowWidth: window.innerWidth,
        }
    }

    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange.bind(this));
    }

    handleWindowSizeChange() {
        this.setState({
            windowWidth: window.innerWidth
        });
    };

    render() {
        const width = this.state.windowWidth;
        const isMobile = width <= 767;

        if (isMobile) {
            console.log("isMobile");
            return (
                <Provider store={store} >
                    <MobileApp> </MobileApp>
                </Provider>
            )
        } else {
            console.log("isDesktop");
            return (
                <Provider store={store} >
                    <DesktopApp> </DesktopApp>
                </Provider>
            )
        }
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
