"use strict";

define(["create-react-class", "prop-types", "react-dom-factories"],
   function(createReactClass, PropTypes, DOM)
   {
      var StatusBarUI = createReactClass(
      {
         propTypes:
         {
            activeAgentName: PropTypes.string.isRequired,
            phase: PropTypes.object.isRequired,
            round: PropTypes.number.isRequired,
            userMessage: PropTypes.string.isRequired,
         },

         render: function()
         {
            var round = this.props.round;
            var phase = this.props.phase;
            var phaseName = (phase ? phase.name : " ");
            var activeAgentName = (this.props.activeAgentName ? this.props.activeAgentName : " ");
            var userMessage = this.props.userMessage;

            var roundUI = DOM.span(
            {}, "Round: ", round);
            var phaseUI = DOM.span(
            {}, "Phase: ", phaseName);
            var activePilotUI = DOM.span(
            {}, "Active Agent: ", activeAgentName);
            var messageAreaUI = DOM.span(
            {}, userMessage);
            var helpLinkUI = DOM.a(
            {
               href: "view/html/help.html",
               target: "_blank",
            }, "Help");

            var cells = [];

            cells.push(DOM.td(
            {
               key: cells.length,
               className: "ba",
            }, roundUI));
            cells.push(DOM.td(
            {
               key: cells.length,
               className: "ba",
            }, phaseUI));
            cells.push(DOM.td(
            {
               key: cells.length,
               className: "ba",
            }, activePilotUI));
            cells.push(DOM.td(
            {
               key: cells.length,
               className: "ba",
            }, messageAreaUI));
            cells.push(DOM.td(
            {
               key: cells.length,
               className: "ba",
            }, helpLinkUI));

            var row = DOM.tr(
            {}, cells);

            return DOM.table(
            {
               className: "bg-lotr-light w-100",
            }, DOM.tbody(
            {}, row));
         },
      });

      return StatusBarUI;
   });
