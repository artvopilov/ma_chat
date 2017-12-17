const React = require('react');
const Proptypes = require('prop-types');


class InputMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <form id="inputForm" onSubmit={event => this.props.handleMessageSend(event)}>
                <input id="mess" type="text" placeholder="Type here..." onChange={(event) => {this.props.onChangeInput(event)}}/>
                <button id="sendMess">Send</button>
            </form>
        )
    }
}


InputMessage.proptypes = {
    handleMessageSend: Proptypes.func,
    onChangeInput: Proptypes.func
};


module.exports = InputMessage;
