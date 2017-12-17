const React = require('react');
const InputMessage = require('./InputMessage');
const Messages = require('./Messages');
const StatusBar = require('./StatusBar');


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentInput: "",
            messages: [],
            user: "",
            connection: "disconnected"
        };
    }

    componentDidMount() {

        this.ws = new WebSocket('ws://localhost:1920');


        this.ws.onopen = () => {
            this.state.connection = "connected";
            this.forceUpdate();
        };

        this.ws.onmessage = (event) => {
            const mess = JSON.parse(event.data);
            if (mess.message === "Authorization") {
                this.state.user = String(mess.user);
                this.forceUpdate();
            }
            else {
                this.state.messages.push(mess);
                this.forceUpdate();
            }
        };

        this.ws.onerror = (err) => {
            this.showStatus(err);
        };

        this.ws.onclose = () => {
            this.state.connection = "disconnected";
            this.forceUpdate();
        };
    }

    componentWillUnmount() {
        this.ws.close()
    }

    handleMessageSend(event) {
        event.preventDefault();
        this.ws.send(this.state.currentInput);
        event.target.firstElementChild.value = ""
    }

    onChange(event) {
        this.setState({
            currentInput: event.target.value
        })
    }

    render() {
        return(
            <div id="main">
                <StatusBar user={this.state.user} connection={this.state.connection}/>
                <InputMessage onChangeInput={this.onChange.bind(this)} handleMessageSend={this.handleMessageSend.bind(this)}/>
                <Messages messages={this.state.messages}/>
            </div>
        )
    }

}


module.exports = App;
