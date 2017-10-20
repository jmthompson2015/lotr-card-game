"use strict";

define(["react-redux", "common/js/InputValidator", "view/js/AgentArea"],
   function(ReactRedux, InputValidator, AgentArea)
   {
      function mapStateToProps(state, ownProps)
      {
         InputValidator.validateNotNull("ownProps.agent", ownProps.agent);
         InputValidator.validateNotNull("ownProps.resourceBase", ownProps.resourceBase);

         return (
         {
            agent: ownProps.agent,
            resourceBase: ownProps.resourceBase,
         });
      }

      return ReactRedux.connect(mapStateToProps)(AgentArea);
   });
