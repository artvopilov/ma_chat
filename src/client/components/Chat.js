const React = require('react');
const PropTypes = require('prop-types');
const InputMessage = require('./InputMessage');
const Messages = require('./Messages');



class Chat extends React.Component {
    constructor (props) {
        super(props)
    }

    render() {
        return (
            <div id="chat">
                <InputMessage onChangeInput={this.props.onChangeInput} handleMessageSend={this.props.handleMessageSend}/>
                <Messages messages={this.props.messages}/>
            </div>
        )
    }
}


Chat.proptypes = {
    onChangeInput: PropTypes.func,
    handleMessageSend: PropTypes.func,
    messages: PropTypes.array
};


module.exports = Chat;
