const React = require('react');


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

    /*
    Button.addEventListener('click', () => {
    const mess = Input.value;
    ws.send(mess);
    });*/

    render() {
        return(
            <div>
                <form onSubmit={event => this.handleMessageSend(event)}>
                    <input id="mess" type="text" placeholder="Type here..." onChange={(event) => {this.onChange(event)}}/>
                    <button id="sendMess">Send</button>
                </form>
                <div id="connection" ref={(node) => {this.connectionRef = node}}/>
                <ul>
                    {this.state.messages.map(mess => {
                        return (
                            <li>
                                {`From ${mess.user}: ${mess.message}`}
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

}


module.exports = App;
