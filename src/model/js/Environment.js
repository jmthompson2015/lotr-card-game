"use strict";

define(["immutable", "common/js/ArrayAugments", "common/js/InputValidator", "artifact/js/CardType", "artifact/js/GameEvent",
  "model/js/Action", "model/js/Agent", "model/js/AgentAction", "model/js/CardInstance"],
   function(Immutable, ArrayAugments, InputValidator, CardType, GameEvent, Action, Agent, AgentAction, CardInstance)
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
            store.dispatch(AgentAction.setTableau(agent, player.playerDeck.heroInstances));
            player.playerDeck.playerInstances.lotrShuffle();
            store.dispatch(AgentAction.setPlayerDeck(agent, player.playerDeck.playerInstances));
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

      Environment.prototype.activeQuest = function()
      {
         var store = this.store();
         var activeQuestId = store.getState().activeQuestId;

         return (activeQuestId !== undefined ? CardInstance.get(store, activeQuestId) : undefined);
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

      Environment.prototype.cardsInPlay = function()
      {
         var answer = [];

         var activeQuest = this.activeQuest();

         if (activeQuest)
         {
            answer.push(activeQuest);
         }

         var activeLocation = this.activeLocation();

         if (activeLocation)
         {
            answer.push(activeLocation);
         }

         answer = answer.concat(this.stagingArea().toJS());

         var agents = this.agents();

         agents.forEach(function(agent)
         {
            answer = answer.concat(agent.tableau().toJS());
            answer = answer.concat(agent.engagementArea().toJS());
         });

         return answer;
      };

      Environment.prototype.encounterDeck = function()
      {
         var store = this.store();
         var ids = store.getState().encounterDeck;

         return CardInstance.idsToCardInstances(store, ids);
      };

      Environment.prototype.encounterSetAside = function()
      {
         var store = this.store();
         var ids = store.getState().encounterSetAside;

         return CardInstance.idsToCardInstances(store, ids);
      };

      Environment.prototype.firstAgent = function()
      {
         var store = this.store();
         var firstAgentId = store.getState().firstAgentId;

         return Agent.get(store, firstAgentId);
      };

      Environment.prototype.firstCardInstance = function(cardKey)
      {
         InputValidator.validateIsString("cardKey", cardKey);

         var answer;
         var store = this.store();
         var cardInstances = store.getState().cardInstances;
         var keys = cardInstances.keySeq().toArray();
         var cardCount = keys.length;

         for (var i = 0; i < cardCount; i++)
         {
            var key = keys[i];
            var values = cardInstances.get(key);

            if (values.get("cardKey") === cardKey)
            {
               answer = CardInstance.get(store, values.get("id"));
               break;
            }
         }

         return answer;
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

      Environment.prototype.stagingThreat = function()
      {
         return this.stagingArea().reduce(function(accumulator, cardInstance)
         {
            return accumulator + cardInstance.threat();
         }, 0);
      };

      //////////////////////////////////////////////////////////////////////////
      // Mutator methods.

      Environment.prototype.advanceTheQuest = function(callback)
      {
         InputValidator.validateIsFunction("callback", callback);

         var store = this.store();
         var questInstance = this.activeQuest();

         if (questInstance)
         {
            store.dispatch(Action.discardActiveQuest());
         }

         store.dispatch(Action.drawQuestCard());
         questInstance = this.activeQuest();
         store.dispatch(Action.enqueueEvent(GameEvent.QUEST_CARD_DRAWN,
         {
            cardInstance: questInstance,
         }, callback));
      };

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
            var cardInstance = encounterDeck.get(index);
            store.dispatch(Action.drawEncounterCard(index));
            store.dispatch(Action.enqueueEvent(GameEvent.CARD_DRAWN,
            {
               cardInstance: cardInstance,
            }));
         }
      };

      Environment.prototype.encounterToAgentTableau = function(agent, cardKey)
      {
         InputValidator.validateNotNull("agent", agent);
         InputValidator.validateIsString("cardKey", cardKey);
         LOGGER.info("Environment.encounterToAgentTableau() agent = " + agent);
         LOGGER.info("Environment.encounterToAgentTableau() cardKey = " + cardKey);

         var store = this.store();
         var encounterDeck = this.encounterDeck();
         var cardKeys = encounterDeck.map(function(cardInstance)
         {
            return cardInstance.card().key;
         });
         var index = cardKeys.indexOf(cardKey);
         LOGGER.info("Environment.encounterToAgentTableau() index = " + index);

         if (index >= 0)
         {
            var cardInstance = encounterDeck.get(index);
            store.dispatch(Action.encounterToAgentTableau(agent, cardInstance));
         }
      };

      Environment.prototype.encounterToSetAside = function(cardKey)
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
            var cardInstance = encounterDeck.get(index);
            store.dispatch(Action.encounterToSetAside(cardInstance));
         }
      };

      Environment.prototype.setAsideToEncounterDeck = function(cardKey)
      {
         InputValidator.validateIsString("cardKey", cardKey);

         var store = this.store();
         var encounterSetAside = this.encounterSetAside();
         var cardKeys = encounterSetAside.map(function(cardInstance)
         {
            return cardInstance.card().key;
         });
         var index = cardKeys.indexOf(cardKey);

         if (index >= 0)
         {
            var cardInstance = encounterSetAside.get(index);
            store.dispatch(Action.setAsideToEncounterDeck(cardInstance));
         }
      };

      Environment.prototype.shuffleEncounterDeck = function()
      {
         var encounterDeck = this.encounterDeck().toJS();
         encounterDeck.lotrShuffle();
         var store = this.store();
         store.dispatch(Action.setEncounterDeck(encounterDeck));
      };

      return Environment;
   });
