"use strict";

define(["immutable", "common/js/ArrayAugments", "common/js/InputValidator", "artifact/js/CardType",
  "model/js/Action", "model/js/Agent", "model/js/CardInstance"],
   function(Immutable, ArrayAugments, InputValidator, CardType, Action, Agent, CardInstance)
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
            store.dispatch(Action.setAgentTableau(agent, player.playerDeck.heroInstances));
            player.playerDeck.playerInstances.lotrShuffle();
            store.dispatch(Action.setAgentPlayerDeck(agent, player.playerDeck.playerInstances));
         });
      }

      //////////////////////////////////////////////////////////////////////////
      // Accessor methods.

      Environment.prototype.activeAgent = function()
      {
         var store = this.store();
         var activeAgentId = store.getState().activeAgentId;

         return (activeAgentId !== undefined ? Agent.get(store, activeAgentId) : undefined);
      };

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

      Environment.prototype.questers = function()
      {
         var store = this.store();
         var allIds = Immutable.List(store.getState().cardIsQuesting.keySeq().toArray());

         var ids = allIds.filter(function(id)
         {
            return store.getState().cardIsQuesting.get(id) === true;
         });

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

      Environment.prototype.stagingEnemies = function()
      {
         var enemies = this.stagingArea(CardType.ENEMY);

         return enemies.sort(function(a, b)
         {
            return b.card().engagementCost - a.card().engagementCost;
         });
      };

      Environment.prototype.stagingLocations = function()
      {
         return this.stagingArea(CardType.LOCATION);
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
