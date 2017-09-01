let React = require('react');
let ReactDOM = require('react-dom');
let Provider = require('react-redux').Provider;
let thunk = require('redux-thunk').default;
let {createStore, applyMiddleware} = require('redux');

let reducers = require('./reducers.js');

let PhotoGallery = require('./PhotoGallery/PhotoGallery');
let Collage = require('./Collage/Collage');

let reactState = {
    photos: [
        {title:"photo1"},
        {title:"photo2"},
        {title:"photo3"},
    ],
};
let store = createStore(reducers, reactState, applyMiddleware(thunk));

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