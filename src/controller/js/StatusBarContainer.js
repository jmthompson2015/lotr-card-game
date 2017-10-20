"use strict";

define(["react-redux", "artifact/js/Phase", "view/js/StatusBarUI"],
   function(ReactRedux, Phase, StatusBarUI)
   {
      function mapStateToProps(state)
      {
         var environment = state.environment;
         var activeAgent = environment.activeAgent();
         var activeAgentName = (activeAgent ? activeAgent.name() : "");

         return (
         {
            round: state.round,
            phase: Phase.properties[state.phaseKey],
            activeAgentName: activeAgentName,
            userMessage: state.userMessage,
         });
      }

      return ReactRedux.connect(mapStateToProps)(StatusBarUI);
   });
