const React = require('react');
const PropTypes = require('prop-types');


class StatusBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const userField = this.props.user === "" ?
            <a id="user" className="login" onClick={this.props.onClickLogIn}>Log in</a> :
            <div id="user">{`User: ${this.props.user}`}</div>;

        return (
            <div id="statusBar">
                <div id="connection">Status: {this.props.connection}</div>
                {userField}
            </div>
        )
    }
}


StatusBar.proptypes = {
    connection: PropTypes.string,
    user: PropTypes.string,
    onClickLogIn: PropTypes.func
};


module.exports = StatusBar;
