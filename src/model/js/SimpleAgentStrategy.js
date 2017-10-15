"use strict";

define(["common/js/InputValidator"],
   function(InputValidator)
   {
      var SimpleAgentStrategy = {

         //////////////////////////////////////////////////////////////////////////
         // Behavior methods.

         chooseOptionalEngagementEnemy: function(enemies, callback)
         {
            InputValidator.validateNotNull("enemies", enemies);
            InputValidator.validateIsFunction("callback", callback);

            // SimpleAgentStrategy does not optionally engage.
            callback();
         },
      };

      return SimpleAgentStrategy;
   });
