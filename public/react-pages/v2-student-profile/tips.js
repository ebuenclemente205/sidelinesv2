"use strict";
var Getskills = React.createClass({
    displayName: "Getskills",
    render: function render() {
        return React.createElement(
             "div",
             {className:"show-div"},
             React.createElement(
               'div',
               { role: 'tabpanel', className: 'tab-pane fade active in', id: 'tab_content1', 'aria-labelledby': 'home-tab' },
               React.createElement(
                 'div',
                 { className: 'message_wrapper' },
                 React.createElement(
                   'div',
                   { className: 'message msg-content' },
                   React.createElement(
                     'ul',
                     { className: 'list-unstyled scroll-view' }
                   )
                 )
               )
             )
        );
    }
});

ReactDOM.render(React.createElement(
   "div",
   null,
   React.createElement(Getskills, null)),
   document.getElementById('tips')
);
