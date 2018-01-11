const React = require('react');
const PropTypes = require('prop-types');


class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentLogin: ""
        };
    }

    onChangeLogin(event) {
        this.setState({
            currentLogin: event.target.value
        });
    }

    logIn(event) {
        event.preventDefault();
        event.target.firstChild.value = "";
        this.setState({
            currentLogin: ""
        });
        this.props.handleLogIn(this.state.currentLogin);
    }

    render() {
        if (this.props.user !== "") {
            return (
                <h1>Logged in</h1>
            )
        }

        return (
            <form id="authForm" onSubmit={event => this.logIn(event)}>
                <input id="" type="text" placeholder="Tony" onChange={event => this.onChangeLogin(event)}/>
                <button id="">Log in</button>
            </form>
        )
    }
}

Auth.proptupes = {
    handleLogIn: PropTypes.func,
    user: PropTypes.string
};

module.exports = Auth;
