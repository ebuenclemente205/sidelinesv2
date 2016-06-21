"use strict";

var APP2 = React.createClass({
    displayName: "APP2",

    getInitialState: function getInitialState() {
        var num = '50';
		return { num, id: 0 };
    },
    updateNum: function updateNum(e) {
        this.setState({ num: e.target.value });
    },
    render: function render() {
        return React.createElement(
            "div",
            {className: null, id: null },
            React.createElement(Widget2, { num: this.state.num, update: this.updateNum })
        );
    }
});

var Widget2 = React.createClass({
    displayName: "Widget2",

    render: function render() {
		if(this.props.num > 100){
			return React.createElement(
            "div",
            null,
			React.createElement("input", {className:"center-item width-long", type: "range", min:"0", max:"100", value: this.props.num, onChange: this.props.update}),
            React.createElement("input",{className:"numbox", id:null, type: "number", min:"0", max:"100", value:this.props.num, onChange: this.props.update}),
            React.createElement(
                "h6",
                {className:"error align-center", id:null},
                "Maximum of 100 only!"
            ));
		}
		if(this.props.num < 0){
			return React.createElement(
            "div",
            null,
			React.createElement("input", {className:"center-item width-long", type: "range", min:"0", max:"100", value: this.props.num, onChange: this.props.update}),
            React.createElement("input",{className:"numbox", id:null, type: "number", min:"0", max:"100", value:this.props.num, onChange: this.props.update}),
            React.createElement(
                "h6",
                {className:"error align-center", id:null},
                "Minimum of 0 only!"
            ));
		}
		else{
			return React.createElement(
            "div",
            null,
            React.createElement("input", {className:"center-item width-long", type: "range", min:"0", max:"100", value: this.props.num, onChange: this.props.update}),
            React.createElement("input",{className:"numbox", id:null, type: "number", min:"0", max:"100", value:this.props.num, onChange: this.props.update})
			);
		}
    }
});

ReactDOM.render(React.createElement(
    "div",
    { "className": null, id: null },
    React.createElement(APP2, null)
	), 
	document.getElementById('content2'));