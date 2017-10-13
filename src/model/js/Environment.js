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

      Environment.prototype.agentHeroDeck = function(agent)
      {
         var store = this.store();

         return store.getState().agentHeroDeck.get(agent.id());
      };

      Environment.prototype.agentPlayerDeck = function(agent)
      {
         var store = this.store();

         return store.getState().agentPlayerDeck.get(agent.id());
      };

      Environment.prototype.encounterDeck = function()
      {
         var store = this.store();

         return store.getState().encounterDeck;
      };

      Environment.prototype.questDeck = function()
      {
         var store = this.store();

         return store.getState().questDeck;
      };

      return Environment;
   });
