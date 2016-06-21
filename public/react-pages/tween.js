"use strict";

var Box = React.createClass({
  displayName: "Box",

  render: function render() {
    return React.createElement("div", { className: "box" });
  }
});

var Container = React.createClass({
  displayName: "Container",

  componentDidMount: function componentDidMount(){
    var top = this.refs.top.getDOMNode();
    var right = this.refs.right.getDOMNode();
    var bottom = this.refs.bottom.getDOMNode();
    var left = this.refs.left.getDOMNode();

    var t = new TimelineMax({ repeat: -1, yoyo: true });
    t.to(top, .5, { y: "-=100" }).to(right, .5, { x: "+=100" }).to(bottom, .5, { y: "+=100" }).to(left, .5, { x: "-=100" });
  },

  render: function render() {
    return React.createElement("div", { className: "cont" }, React.createElement(Box, { ref: "top" }), React.createElement(Box, { ref: "right" }), React.createElement(Box, { ref: "bottom" }), React.createElement(Box, { ref: "left" }));
  }
});


ReactDOM.render(React.createElement(Container, null), document.getElementById('content2'));
