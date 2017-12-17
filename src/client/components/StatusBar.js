const React = require('react');
const PropTypes = require('prop-types');


class StatusBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="statusBar">
                <div id="connection">Status: {this.props.connection}</div>
                <div id="user">{this.props.user ? `User: ${this.props.user}` : "Log in"}</div>
            </div>
        )
    }
}


StatusBar.proptypes = {
    getConnectionRef: PropTypes.func
};


module.exports = StatusBar;
