const React = require('react');
const ReactDOM = require('react-dom');
const {connect} = require('react-redux');

const actions = require('../PhotoGallery/photoGalleryActions.js');

class RadioPlayerMobile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {
        console.log("Mounting mobile radio player.");
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div id="radio-player-mobile" className=''>
                <div id="radio-player-handler-mobile">
                    <div className="radio-player-mobile__logo">
                        <a id="nts-logo" href="http://www.nts.live" target="_blank"> </a>
                    </div>

                    <div className="radio-player-mobile__links">
                        <div>
                            <a id="pre-save-link" className="primary-font" href="http://s.warp.net/lws-presave" target="_blank">
                                <span className="header-fuzzy-text">Pre-Save</span>
                            </a>
                            <a id="pre-order-link" className="primary-font" href="http://s.warp.net/mk-survives" target="_blank">
                                <span className="header-fuzzy-text">Pre-Order</span>
                            </a>
                        </div>
                    </div>

                    <div id="mobile-radio-player" className="header__radio-player ">
                        <div id="header__radio-player__handler--mobile" className="header__radio-player__handler hidden">
                            <i id="radio-handler-icon-mobile" className="radio-handler-icon fa fa-play header-fuzzy-text header-fuzzy-text--dark"
                               aria-hidden="true"> </i>
                            {/*<span style={{display: 'none', visibility: 'hidden'}}>*/}
                                {/*<audio id="nts-player-audio"*/}
                                       {/*controls preload="none" type="audio/mpeg"*/}
                                       {/*src=""*/}
                                {/*> </audio>*/}
                            {/*</span>*/}
                        </div>

                        <div className="header__radio-player__text primary-font">
                            <span id="before-text-mobile" className="hidden">
                                <div className="header-fuzzy-text header-fuzzy-text--dark">Live Radio Broadcast</div>
                                <div className="header-fuzzy-text header-fuzzy-text--dark" style={{'marginTop': '0px'}}>Mount Kimbie</div>
                                <div className="header-fuzzy-text header-fuzzy-text--dark" style={{'marginBottom': '8px'}}>Love What Survives</div>
                                <div className="header-fuzzy-text header-fuzzy-text--dark">7th October 18:00 BST</div>
                            </span>
                            <span id="during-text-mobile" className="hidden">
                                <div className="live-now-label header-fuzzy-text header-fuzzy-text--dark">
                                    LIVE NOW
                                    <i id="live-now-circle" className="fa fa-circle header-fuzzy-text header-fuzzy-text--red"
                                       aria-hidden="true"> </i>
                                </div>
                                <div className="header-fuzzy-text header-fuzzy-text--dark">Mount Kimbie</div>
                                <div className="header-fuzzy-text header-fuzzy-text--dark">Love What Survives</div>
                            </span>
                            <span id="after-text-mobile" className="hidden">
                                <div className="header-fuzzy-text header-fuzzy-text--dark">Listen Back Available Here</div>
                                <div className="header-fuzzy-text header-fuzzy-text--dark">8th September</div>
                            </span>
                        </div>
                    </div>
                </div>
                <div id="radio-player-mobile__down-arrow">
                    <i className="header-fuzzy-text header-fuzzy-text--dark fa fa-long-arrow-down" aria-hidden="true"> </i>
                </div>
            </div>
        );
    }
}

module.exports = RadioPlayerMobile;
