const React = require('react');
const InputMessage = require('./InputMessage');
const Messages = require('./Messages');
const Connection = require('./Connection');


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentInput: "",
            messages: []
        };
    }

    componentDidMount() {
        this.showStatus("Disconnected");

        this.ws = new WebSocket('ws://localhost:1920');


        this.ws.onopen = () => {
            this.showStatus("Connected");
        };

        this.ws.onmessage = (event) => {
            const mess = JSON.parse(event.data);
            this.state.messages.push(mess);
            this.forceUpdate();
        };

        this.ws.onerror = (err) => {
            this.showStatus(err);
        };

        this.ws.onclose = () => {
            this.showStatus("Disconnected")
        };
    }

    componentWillUnmount() {
        this.ws.close()
    }

    handleMessageSend(event) {
        event.preventDefault();
        this.ws.send(this.state.currentInput);
    }

    onChange(event) {
        this.setState({
            currentInput: event.target.value
        })
    }

    showStatus(text) {
        this.connectionRef.innerHTML = text
    }

    getConnectionRef(node) {
        this.connectionRef = node
    }

    render() {
        return(
            <div>
                <Connection getConnectionRef={this.getConnectionRef.bind(this)}/>
                <InputMessage onChangeInput={this.onChange.bind(this)} handleMessageSend={this.handleMessageSend.bind(this)}/>
                <Messages messages={this.state.messages}/>
            </div>
        )
    }

}


module.exports = App;
