  "use strict";

  define(["common/js/ArrayAugments", "common/js/InputValidator", "artifact/js/GameEvent", "artifact/js/HeroCard", "model/js/AgentAction", "model/js/CardAction"],
     function(ArrayAugments, InputValidator, GameEvent, HeroCard, AgentAction, CardAction)
     {
        var HeroAbility = {};

        ////////////////////////////////////////////////////////////////////////
        HeroAbility[GameEvent.WOUNDED] = {};

        // CardSet.CORE
        HeroAbility[GameEvent.WOUNDED][HeroCard.GLOIN] = {
           condition: function(store, context)
           {
              InputValidator.validateNotNull("store", store);
              InputValidator.validateNotNull("context", context);

              return context.cardInstance !== undefined && context.cardInstance.card().key === HeroCard.GLOIN && !context.cardInstance.isUsed();
           },
           consequent: function(store, context, callback)
           {
              InputValidator.validateNotNull("store", store);
              InputValidator.validateNotNull("context", context);
              InputValidator.validateIsFunction("callback", callback);

              // Response: After Glóin suffers damage, add 1 resource to his resource
              // pool for each point of damage he just suffered.
              var cardInstance = context.cardInstance;
              var sphereKey = cardInstance.card().sphereKey;
              var woundCount = context.woundCount;
              store.dispatch(CardAction.addResource(cardInstance, sphereKey, woundCount));
              store.dispatch(CardAction.setUsed(cardInstance, true));

              callback();
           },
        };

        HeroAbility.toString = function()
        {
           return "HeroAbility";
        };

        if (HeroAbility.freeze)
        {
           Object.freeze(HeroAbility);
        }

        return HeroAbility;
     });
