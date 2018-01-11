const React = require('react');
const PropTypes = require('prop-types');
import {
    Redirect,
    withRouter,
    BrowserRouter,
    Link
} from 'react-router-dom'


class StatusBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="statusBar">
                <div id="connection">Status: {this.props.connection}</div>
                <ul id="nav">
                    <li><Link to="/">Main</Link></li>
                    <li><Link to="/chat">Chat</Link></li>
                    <li id="liAuth" onClick={() => {
                        if (this.props.user !== "") {
                            this.props.handleLogOut();
                        }
                    }}><Link to="/auth">{this.props.user === "" ? "Login" : "Logout"}</Link></li>
                </ul>
                <div id="user">{`User: ${this.props.user === "" ? "Anonymous" : this.props.user}`}</div>
            </div>
        )
    }
}


StatusBar.proptypes = {
    connection: PropTypes.string,
    user: PropTypes.string,
    onClickLogIn: PropTypes.func,
    handleLogOut: PropTypes.func
};


module.exports = withRouter(StatusBar);
