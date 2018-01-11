const React = require('react');
const StatusBar = require('./StatusBar');
const Chat = require('./Chat');
const Auth = require('./Auth');

import {
    BrowserRouter,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentInput: "",
            messages: [],
            user: "",
            connectionStatus: "disconnected",
        };
    }

    componentDidMount() {
        this.ws = new WebSocket('ws://localhost:1921');


        this.ws.onopen = () => {
            this.state.connectionStatus = "connected";
            this.forceUpdate();
        };

        this.ws.onmessage = (event) => {
            const mess = JSON.parse(event.data);
            if (mess.message === "Authorization") {
                this.state.user = String(mess.user);
                this.forceUpdate();
            }
            else if (mess.message === "UnAuthorization") {
                this.setState({
                    user: "",
                    messages: []
                })
            }
            else {
                this.state.messages.push(mess);
                this.forceUpdate();
            }
        };

        this.ws.onerror = (err) => {
            this.state.connectionStatus = err.data;
            this.forceUpdate();
        };

        this.ws.onclose = () => {
            this.state.connectionStatus = "disconnected";
            this.forceUpdate();
        };
    }

    componentWillUnmount() {
        if (this.state.user !== "") {
            const logoutData = {
                type: "logout",
                data: this.state.user
            };
            this.ws.send(JSON.stringify(logoutData));
        }
        this.ws.close()
    }

    handleMessageSend(event) {
        event.preventDefault();
        const sendData = {
            type: "message",
            data: this.state.currentInput
        };

        this.ws.send(JSON.stringify(sendData));
        event.target.firstElementChild.value = "";
        this.state.currentInput = "";
    }

    onChange(event) {
        this.setState({
            currentInput: event.target.value
        })
    }

    logIn() {
        const username = prompt("Enter username: ", "SomeUser");
        const loginData = {
            type: "login",
            data: username
        };
        this.ws.send(JSON.stringify(loginData))
    }

    handleLogIn(username) {
        const loginData = {
            type: "login",
            data: username
        };
        this.ws.send(JSON.stringify(loginData));
    }

    handleLogOut(username) {
        const logoutData = {
            type: "logout",
            data: username
        };
        this.ws.send(JSON.stringify(logoutData));
    }


    render() {

        return(
            <BrowserRouter>
                <div id="main">
                    <StatusBar
                        onClickLogIn={this.logIn.bind(this)}
                        user={this.state.user}
                        connection={this.state.connectionStatus}
                        handleLogOut={this.handleLogOut.bind(this)}
                    />
                    <Route path="/auth" render={() =>
                        <Auth
                            handleLogIn={this.handleLogIn.bind(this)}
                            user={this.state.user}
                        />
                    }/>
                    <Route path="/chat" render={() => (
                        this.state.user !== "" ? (
                            <Chat onChangeInput={this.onChange.bind(this)}
                                  handleMessageSend={this.handleMessageSend.bind(this)}
                                  messages={this.state.messages}
                            />
                        ) : (
                            <Redirect to="/auth"/>
                        )
                    )}/>
                </div>
            </BrowserRouter>
        )
    }

}


module.exports = App;
