"use strict";

define(["immutable", "common/js/ArrayAugments", "common/js/InputValidator", "model/js/Action", "model/js/Agent", "model/js/CardInstance"],
   function(Immutable, ArrayAugments, InputValidator, Action, Agent, CardInstance)
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

      Environment.prototype.activeLocation = function()
      {
         var store = this.store();
         var activeLocationId = store.getState().activeLocationId;

         return (activeLocationId !== undefined ? CardInstance.get(store, activeLocationId) : undefined);
      };

      Environment.prototype.agentQueue = function()
      {
         var store = this.store();
         var agents = this.agents();
         var agentIds = agents.map(function(agent)
         {
            return agent.id();
         });

         var firstAgentId = (store.getState().firstAgentId ? store.getState().firstAgentId : agents.get(0).id());
         var index = agentIds.indexOf(firstAgentId);

         return agents.toJS().lotrRotate(index);
      };

      Environment.prototype.agents = function()
      {
         var store = this.store();
         var agentValues = store.getState().agents;

         return agentValues.valueSeq().map(function(values)
         {
            var id = values.get("id");

            return Agent.get(store, id);
         });
      };

      Environment.prototype.encounterDeck = function()
      {
         var store = this.store();
         var ids = store.getState().encounterDeck;

         return CardInstance.idsToCardInstances(store, ids);
      };

      Environment.prototype.questDeck = function()
      {
         var store = this.store();
         var ids = store.getState().questDeck;

         return CardInstance.idsToCardInstances(store, ids);
      };

      Environment.prototype.stagingArea = function(cardTypeKey)
      {
         // cardTypeKey optional.

         var store = this.store();
         var ids = store.getState().stagingArea;
         var answer = CardInstance.idsToCardInstances(store, ids);
         LOGGER.debug("0 Environment.stagingArea() answer = " + answer);

         if (cardTypeKey !== undefined)
         {
            answer = answer.filter(function(cardInstance)
            {
               return cardInstance.card().cardTypeKey === cardTypeKey;
            });
         }
         LOGGER.debug("1 Environment.stagingArea() answer = " + answer);

         return answer;
      };

      Environment.prototype.questDeck = function()
      {
         var store = this.store();
         var ids = store.getState().questDeck;

         return CardInstance.idsToCardInstances(store, ids);
      };

      //////////////////////////////////////////////////////////////////////////
      // Mutator methods.

      Environment.prototype.drawEncounterCard = function(cardKey)
      {
         InputValidator.validateIsString("cardKey", cardKey);

         var store = this.store();
         var encounterDeck = this.encounterDeck();
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
