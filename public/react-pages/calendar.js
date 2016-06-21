"use strict";

var APP3 = React.createClass({
    displayName: "APP3",

    getInitialState: function getInitialState() {
		var date = '';
		return { date, id: 0 };
    },
    updateTxt: function updateTxt(e) {
        this.setState({ date: e.target.value });
    },
    render: function render() {
        return React.createElement(
            "div",
            {className: null, id: null },
            React.createElement("input",{ type:"text", onChange: this.props.update, date: this.state.date, update: this.updateTxt })
        );
    }
});

ReactDOM.render(React.createElement(
    "div",
    { "className": null, id: null },
    React.createElement(APP3, null)
	),
	document.getElementById('content3'));
