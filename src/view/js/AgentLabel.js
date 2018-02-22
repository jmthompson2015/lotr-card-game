var AgentLabel = createReactClass(
{
   render: function()
   {
      var firstAgentToken = ReactDOMFactories.div(
      {
         className: (this.props.isFirstAgent ? "" : "dn"),
         title: "First Player",
      }, ReactDOMFactories.img(
      {
         className: "dtc tc",
         src: this.props.resourceBase + "token/FirstPlayerToken32.png",
      }));
      var label = ReactDOMFactories.div(
      {
         key: "agentLabel",
         className: "b dtc f5 tc v-mid",
      }, "Agent: " + this.props.agentName);
      var threat = ReactDOMFactories.div(
      {
         key: "agentThreat",
         className: "b dtc f5 tc v-mid",
      }, "Threat Level: " + this.props.threatLevel);

      var panel = ReactDOMFactories.div(
      {
         key: "panel",
         className: "bg-lotr-dark dt lotr-light w-100",
      }, firstAgentToken, label, threat);

      return ReactDOMFactories.div(
      {
         key: "agentLabel",
      }, panel);
   },
});

AgentLabel.propTypes = {
   agentName: PropTypes.string.isRequired,
   isFirstAgent: PropTypes.bool.isRequired,
   resourceBase: PropTypes.string.isRequired,
   threatLevel: PropTypes.number.isRequired,
};

export default AgentLabel;