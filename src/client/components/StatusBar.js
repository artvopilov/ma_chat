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
                    <li className={this.props.location.pathname === '/' ? 'on' : ''}><Link to="/"><i className="fa fa-home" aria-hidden="true"/> Main</Link></li>
                    <li className={this.props.location.pathname === '/chat' ? 'on' : ''}><Link to="/chat"><i className="fa fa-comments" aria-hidden="true"/> Chat</Link></li>
                    <li className={this.props.location.pathname === '/auth' ? 'on' : ''} onClick={() => {
                        if (this.props.user !== "") {
                            this.props.handleLogOut();
                        }
                    }}><Link to="/auth"><i className="fa fa-user" aria-hidden="true"/> {this.props.user === "" ? "Login" : "Logout"}</Link></li>
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
