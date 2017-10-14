"use strict";

define(["common/js/ArrayAugments", "common/js/InputValidator", "model/js/Action"],
   function(ArrayAugments, InputValidator, Action)
   {
      function Environment(store, scenarioDeck, playerData)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("scenarioDeck", scenarioDeck);
         InputValidator.validateIsArray("playerData", playerData);

         this.store = function()
         {
            return store;
         };

         store.dispatch(Action.setEnvironment(this));

         // Save the decks.
         store.dispatch(Action.setQuestDeck(scenarioDeck.questInstances));
         scenarioDeck.encounterInstances.lotrShuffle();
         store.dispatch(Action.setEncounterDeck(scenarioDeck.encounterInstances));

         playerData.forEach(function(player)
         {
            var agent = player.agent;
            store.dispatch(Action.setAgentHeroDeck(agent, player.playerDeck.heroInstances));
            player.playerDeck.playerInstances.lotrShuffle();
            store.dispatch(Action.setAgentPlayerDeck(agent, player.playerDeck.playerInstances));
         });
      }

      //////////////////////////////////////////////////////////////////////////
      // Accessor methods.

      Environment.prototype.agents = function()
      {
         var store = this.store();
         var agentValues = store.getState().agents;

         return agentValues.valueSeq().map(function(values)
         {
            var id = values.get("id");
            var agentClass = values.get("agentClass");
            return agentClass.get(store, id);
         });
      };

      Environment.prototype.encounterDeck = function()
      {
         var store = this.store();

         return store.getState().encounterDeck;
      };

      Environment.prototype.stagingArea = function(cardTypeKey)
      {
         // cardTypeKey optional.

         var store = this.store();
         var stagingArea = store.getState().stagingArea;
         var answer = [];

         if (cardTypeKey === undefined)
         {
            answer = stagingArea;
         }
         else
         {
            answer = stagingArea.filter(function(cardInstance)
            {
               return cardInstance.card().cardTypeKey === cardTypeKey;
            });
         }

         return answer;
      };

      Environment.prototype.questDeck = function()
      {
         var store = this.store();

         return store.getState().questDeck;
      };

      //////////////////////////////////////////////////////////////////////////
      // Mutator methods.

      Environment.prototype.drawEncounterCard = function(cardKey)
      {
         InputValidator.validateIsString("cardKey", cardKey);

         var store = this.store();
         var encounterDeck = store.getState().encounterDeck.toJS();
         var cardKeys = encounterDeck.map(function(cardInstance)
         {
            return cardInstance.card().key;
         });
         var index = cardKeys.indexOf(cardKey);

         if (index >= 0)
         {
            store.dispatch(Action.drawEncounterCard(index));
         }
      };

      return Environment;
   });
