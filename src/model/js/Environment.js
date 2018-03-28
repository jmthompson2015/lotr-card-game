import ArrayUtilities from "../../common/js/ArrayUtilities.js";
import InputValidator from "../../common/js/InputValidator.js";
import CardType from "../../artifact/js/CardType.js";
import GameEvent from "../../artifact/js/GameEvent.js";
import Action from "./Action.js";
import Agent from "./Agent.js";
import AgentAction from "./AgentAction.js";
import CardInstance from "./CardInstance.js";

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
   scenarioDeck.encounterInstances = ArrayUtilities.shuffle(scenarioDeck.encounterInstances);
   store.dispatch(Action.setEncounterDeck(scenarioDeck.encounterInstances));

   playerData.forEach(function(player)
   {
      var agent = player.agent;
      store.dispatch(AgentAction.setTableau(agent, player.playerDeck.heroInstances));
      player.playerDeck.playerInstances = ArrayUtilities.shuffle(player.playerDeck.playerInstances);
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

   var firstAgentId = (store.getState().firstAgentId ? store.getState().firstAgentId : agents[0].id());
   var index = agentIds.indexOf(firstAgentId);

   return ArrayUtilities.rotate(agents, index);
};

Environment.prototype.agentWhoControls = function(cardInstance)
{
   var answer;
   var store = this.store();
   var agents = this.agentQueue();

   for (var i = 0; i < agents.length && answer === undefined; i++)
   {
      var agent = agents[i];
      var tableau = store.getState().agentTableau[agent.id()];

      if (tableau.includes(cardInstance.id()))
      {
         answer = agent;
         break;
      }

      if (answer === undefined)
      {
         var engagementArea = store.getState().agentEngagementArea[agent.id()];

         if (engagementArea && engagementArea.includes(cardInstance.id()))
         {
            answer = agent;
            break;
         }
      }
   }
   return answer;
};

Environment.prototype.agents = function()
{
   var store = this.store();
   var agentValues = store.getState().agents;

   return Object.values(agentValues).map(function(values)
   {
      var id = parseInt(values.id);

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

   answer = answer.concat(this.stagingArea());

   var agents = this.agents();

   agents.forEach(function(agent)
   {
      answer = answer.concat(agent.tableau());
      answer = answer.concat(agent.engagementArea());
   });

   return answer;
};

Environment.prototype.charactersInPlay = function()
{
   var answer = [];
   var agents = this.agents();

   agents.forEach(function(agent)
   {
      answer = answer.concat(agent.tableauCharacters());
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

Environment.prototype.engagedEnemies = function()
{
   var answer = [];
   var agents = this.agents();

   agents.forEach(function(agent)
   {
      answer = answer.concat(agent.engagementArea());
   });

   return answer;
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
   var keys = Object.keys(cardInstances);
   var cardCount = keys.length;

   for (var i = 0; i < cardCount; i++)
   {
      var key = keys[i];
      var values = cardInstances[key];

      if (values.cardKey === cardKey)
      {
         answer = CardInstance.get(store, values.id);
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
   var allIds = Object.keys(store.getState().cardIsQuesting).map(id => parseInt(id));

   var ids = allIds.filter(function(id)
   {
      return store.getState().cardIsQuesting[id] === true;
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
   LOGGER.debug("Environment.advanceTheQuest() questInstance = " + questInstance);
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
   var cardKeys = CardInstance.cardInstancesToKeys(encounterDeck);
   var index = cardKeys.indexOf(cardKey);

   if (index >= 0)
   {
      var cardInstance = encounterDeck[index];
      store.dispatch(Action.drawEncounterCard(index));
      store.dispatch(Action.enqueueEvent(GameEvent.CARD_PLAYED,
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
   var cardKeys = CardInstance.cardInstancesToKeys(encounterDeck);
   var index = cardKeys.indexOf(cardKey);
   LOGGER.info("Environment.encounterToAgentTableau() index = " + index);

   if (index >= 0)
   {
      var cardInstance = encounterDeck[index];
      store.dispatch(Action.encounterToAgentTableau(agent, cardInstance));
   }
};

Environment.prototype.encounterToSetAside = function(cardKey)
{
   InputValidator.validateIsString("cardKey", cardKey);

   var store = this.store();
   var encounterDeck = this.encounterDeck();
   var cardKeys = CardInstance.cardInstancesToKeys(encounterDeck);
   var index = cardKeys.indexOf(cardKey);

   if (index >= 0)
   {
      var cardInstance = encounterDeck[index];
      store.dispatch(Action.encounterToSetAside(cardInstance));
   }
};

Environment.prototype.setAsideToEncounterDeck = function(cardKey)
{
   InputValidator.validateIsString("cardKey", cardKey);

   var store = this.store();
   var encounterSetAside = this.encounterSetAside();
   var cardKeys = CardInstance.cardInstancesToKeys(encounterSetAside);
   var index = cardKeys.indexOf(cardKey);

   if (index >= 0)
   {
      var cardInstance = encounterSetAside[index];
      store.dispatch(Action.setAsideToEncounterDeck(cardInstance));
   }
};

Environment.prototype.shuffleEncounterDeck = function()
{
   var encounterDeck = this.encounterDeck();
   encounterDeck = ArrayUtilities.shuffle(encounterDeck);
   var store = this.store();
   store.dispatch(Action.setEncounterDeck(encounterDeck));
};

export default Environment;