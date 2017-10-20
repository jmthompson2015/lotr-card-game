"use strict";

define(["create-react-class", "prop-types", "react-dom-factories"],
   function(createReactClass, PropTypes, DOM)
   {
      var AgentLabel = createReactClass(
      {
         render: function()
         {
            var label = DOM.div(
            {
               key: "agentLabel",
               className: "b dtc f5 tc",
            }, "Agent: " + this.props.agentName);
            var threat = DOM.div(
            {
               key: "agentThreat",
               className: "b dtc f5 tc",
            }, "Threat Level: " + this.props.threatLevel);

            var panel = DOM.div(
            {
               key: "panel",
               className: "bg-lotr-dark dt lotr-light w-100",
            }, label, threat);

            return DOM.div(
            {
               key: "agentLabel",
            }, panel);
         },
      });

      AgentLabel.propTypes = {
         agentName: PropTypes.string.isRequired,
         threatLevel: PropTypes.number.isRequired,
      };

      return AgentLabel;
   });
