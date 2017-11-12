  "use strict";

  define(["common/js/InputValidator", "artifact/js/Phase", "model/js/CardAction"],
     function(InputValidator, Phase, CardAction)
     {
        var PhaseAbility = {};

        ////////////////////////////////////////////////////////////////////////
        PhaseAbility[Phase.RESOURCE_END] = {};

        PhaseAbility[Phase.RESOURCE_END][Phase.RESOURCE_END] = {
           condition: function( /*store, context*/ )
           {
              return true;
           },
           consequent: function(store, context, callback)
           {
              phaseEndConsequent(store, context, callback);
           },
        };

        ////////////////////////////////////////////////////////////////////////
        PhaseAbility[Phase.PLANNING_END] = {};

        PhaseAbility[Phase.PLANNING_END][Phase.PLANNING_END] = {
           condition: function( /*store, context*/ )
           {
              return true;
           },
           consequent: function(store, context, callback)
           {
              phaseEndConsequent(store, context, callback);
           },
        };

        ////////////////////////////////////////////////////////////////////////
        PhaseAbility[Phase.QUEST_END] = {};

        PhaseAbility[Phase.QUEST_END][Phase.QUEST_END] = {
           condition: function( /*store, context*/ )
           {
              return true;
           },
           consequent: function(store, context, callback)
           {
              phaseEndConsequent(store, context, callback);
           },
        };

        ////////////////////////////////////////////////////////////////////////
        PhaseAbility[Phase.TRAVEL_END] = {};

        PhaseAbility[Phase.TRAVEL_END][Phase.TRAVEL_END] = {
           condition: function( /*store, context*/ )
           {
              return true;
           },
           consequent: function(store, context, callback)
           {
              phaseEndConsequent(store, context, callback);
           },
        };

        ////////////////////////////////////////////////////////////////////////
        PhaseAbility[Phase.ENCOUNTER_END] = {};

        PhaseAbility[Phase.ENCOUNTER_END][Phase.ENCOUNTER_END] = {
           condition: function( /*store, context*/ )
           {
              return true;
           },
           consequent: function(store, context, callback)
           {
              phaseEndConsequent(store, context, callback);
           },
        };

        ////////////////////////////////////////////////////////////////////////
        PhaseAbility[Phase.COMBAT_END] = {};

        PhaseAbility[Phase.COMBAT_END][Phase.COMBAT_END] = {
           condition: function( /*store, context*/ )
           {
              return true;
           },
           consequent: function(store, context, callback)
           {
              phaseEndConsequent(store, context, callback);
           },
        };

        ////////////////////////////////////////////////////////////////////////
        PhaseAbility[Phase.REFRESH_END] = {};

        PhaseAbility[Phase.REFRESH_END][Phase.REFRESH_END] = {
           condition: function( /*store, context*/ )
           {
              return true;
           },
           consequent: function(store, context, callback)
           {
              InputValidator.validateNotNull("store", store);
              // context optional.
              InputValidator.validateIsFunction("callback", callback);

              store.dispatch(CardAction.clearPhaseBonuses());
              store.dispatch(CardAction.clearRoundBonuses());
              callback();
           },
        };

        PhaseAbility.toString = function()
        {
           return "PhaseAbility";
        };

        function phaseEndConsequent(store, context, callback)
        {
           InputValidator.validateNotNull("store", store);
           // context optional.
           InputValidator.validateIsFunction("callback", callback);

           store.dispatch(CardAction.clearPhaseBonuses());
           callback();
        }

        if (PhaseAbility.freeze)
        {
           Object.freeze(PhaseAbility);
        }

        return PhaseAbility;
     });
