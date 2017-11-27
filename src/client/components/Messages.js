const React = require('react');
const PropTypes = require('prop-types');


class Messages extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul>
                {this.props.messages.map(mess => {
                    return (
                        <li>
                            {`From ${mess.user}: ${mess.message}`}
                        </li>
                    )
                })}
            </ul>
        )
    }
}


Messages.proptypes = {
    messages: PropTypes.array
};


module.exports = Messages;
