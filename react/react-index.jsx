const React = require('react');
const ReactDOM = require('react-dom');
const Provider = require('react-redux').Provider;
const {createStore, applyMiddleware} = require('redux');

const thunk = require('redux-thunk').default;
const logger = require('redux-logger').default;

const reducers = require('./reducers.js');

const PhotoGallery = require('./PhotoGallery/PhotoGallery');
const Collage = require('./Collage/Collage');

const reactState = {
    gallery: {
        isVisible: false,
        currentPhotoIndex: 0,
        photos: [
            {
                title: "photo1",
                imageUrl: "http://www.dobedo.co.uk/wp-content/uploads/2012/10/Frank-in-Belly-T.jpg",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
            {
                title: "photo2",
                imageUrl: "http://dazedimg.dazedgroup.netdna-cdn.com/700/azure/dazed-prod/1100/3/1103574.JPG",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
            {
                title: "photo3",
                imageUrl: "http://dazedimg.dazedgroup.netdna-cdn.com/700/azure/dazed-prod/1090/9/1099010.jpg",
                description: "Frank Lebon - DoBeDo Photographer Series",
            },
        ],
    }
};

// const store = createStore(reducers, reactState, applyMiddleware(thunk));
const store = createStore(reducers, reactState, applyMiddleware(logger, thunk));

class App extends React.Component {
    render() {
        return (
            <Provider store={store} >
                <div>
                    <PhotoGallery></PhotoGallery>
                    <Collage></Collage>
                </div>
            </Provider>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));