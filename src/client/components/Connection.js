const React = require('react');
const PropTypes = require('prop-types');


class Connection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="connection" ref={(node) => this.props.getConnectionRef(node)}/>
        )
    }
}


Connection.proptypes = {
    getConnectionRef: PropTypes.func
};


module.exports = Connection;
