import InputValidator from "../../common/js/InputValidator.js";
import EnemyCard from "../../artifact/js/EnemyCard.js";
import GameEvent from "../../artifact/js/GameEvent.js";
import LocationCard from "../../artifact/js/LocationCard.js";
import ObjectiveCard from "../../artifact/js/ObjectiveCard.js";
import QuestCard from "../../artifact/js/QuestCard.js";
import TreacheryCard from "../../artifact/js/TreacheryCard.js";
import Action from "./Action.js";

var QuestAbility = {};

////////////////////////////////////////////////////////////////////////
QuestAbility[GameEvent.QUEST_CARD_DRAWN] = {};

// Scenario.A_JOURNEY_TO_RHOSGOBEL
QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.AJTR1A_THE_WOUNDED_EAGLE] = {
   condition: function(store /*, context*/ )
   {
      InputValidator.validateNotNull("store", store);

      return isActiveQuest(store, QuestCard.AJTR1A_THE_WOUNDED_EAGLE);
   },
   consequent: function(store, context, callback)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateIsFunction("callback", callback);

      // Setup: Search the encounter deck for Rhosgobel and Wilyador, and add
      // them to the staging area with 2 damage tokens on Wilyador. Then, shuffle
      // the encounter deck.
      var environment = store.getState().environment;
      environment.drawEncounterCard(LocationCard.RHOSGOBEL);
      environment.drawEncounterCard(ObjectiveCard.WILYADOR);
      var wilyador = environment.firstCardInstance(ObjectiveCard.WILYADOR);
      wilyador.addWounds(2);

      environment.shuffleEncounterDeck(store);

      // Advance the quest.
      environment.advanceTheQuest(callback);
   },
};

// Scenario.A_JOURNEY_TO_RHOSGOBEL
QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.AJTR2A_RADAGASTS_REQUEST] = {
   condition: function(store /*, context*/ )
   {
      InputValidator.validateNotNull("store", store);

      return isActiveQuest(store, QuestCard.AJTR2A_RADAGASTS_REQUEST);
   },
   consequent: function(store, context, callback)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateIsFunction("callback", callback);

      // Advance the quest.
      var environment = store.getState().environment;
      environment.advanceTheQuest(callback);
   },
};

// Scenario.A_JOURNEY_TO_RHOSGOBEL
QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.AJTR3A_RETURN_TO_RHOSGOBEL] = {
   condition: function(store /*, context*/ )
   {
      InputValidator.validateNotNull("store", store);

      return isActiveQuest(store, QuestCard.AJTR3A_RETURN_TO_RHOSGOBEL);
   },
   consequent: function(store, context, callback)
   {
      InputValidator.validateNotNull("store", store);
      InputValidator.validateIsFunction("callback", callback);

      // Advance the quest.
      var environment = store.getState().environment;
      environment.advanceTheQuest(callback);
   },
};

// Scenario.CONFLICT_AT_THE_CARROCK
QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.CATC1A_GRIMBEORNS_QUEST] = {
   condition: function(store /*, context*/ )
   {
      return isActiveQuest(store, QuestCard.CATC1A_GRIMBEORNS_QUEST);
   },
   consequent: function(store, context, callback)
   {
      // Setup: Add The Carrock to the staging area. Remove 4 unique Troll cards
      // and 4 copies of the 'Sacked!' card from the encounter deck and set them
      // aside, out of play. Then shuffle 1 'Sacked!' card per player back into
      // the encounter deck.
      var environment = store.getState().environment;
      environment.drawEncounterCard(LocationCard.THE_CARROCK);

      // Handle Troll cards.
      environment.encounterToSetAside(EnemyCard.LOUIS);
      environment.encounterToSetAside(EnemyCard.MORRIS);
      environment.encounterToSetAside(EnemyCard.RUPERT);
      environment.encounterToSetAside(EnemyCard.STUART);

      // Handle Sacked! cards.
      for (var i = 0; i < 4; i++)
      {
         environment.encounterToSetAside(TreacheryCard.SACKED);
      }

      var agentCount = environment.agents().size;

      for (var j = 0; j < agentCount; j++)
      {
         environment.setAsideToEncounterDeck(TreacheryCard.SACKED);
      }

      environment.shuffleEncounterDeck(store);

      // Advance the quest.
      environment.advanceTheQuest(callback);
   },
};

// Scenario.ESCAPE_FROM_DOL_GULDUR
QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.EFDG1A_THE_NECROMANCERS_TOWER] = {
   condition: function(store /*, context*/ )
   {
      return isActiveQuest(store, QuestCard.EFDG1A_THE_NECROMANCERS_TOWER);
   },
   consequent: function(store, context, callback)
   {
      // Setup: Search the encounter deck for the 3 objective cards, reveal and
      // place them in the staging area. Also, place the Nazgûl of Dol Guldur
      // face up but out of play, alongside the quest deck. Then, shuffle the
      // encounter deck, and attach 1 encounter to each objective card.
      var environment = store.getState().environment;
      environment.drawEncounterCard(ObjectiveCard.DUNGEON_TORCH);
      environment.drawEncounterCard(ObjectiveCard.GANDALFS_MAP);
      environment.drawEncounterCard(ObjectiveCard.SHADOW_KEY);

      // Handle Nazgûl of Dol Guldur.
      environment.encounterToSetAside(EnemyCard.NAZGUL_OF_DOL_GULDUR);

      environment.shuffleEncounterDeck(store);
      var stagingArea = environment.stagingArea();
      var dungeonTorchInstance = stagingArea.first();
      var gandalfsMapInstance = stagingArea.get(1);
      var shadowKeyInstance = stagingArea.last();
      store.dispatch(Action.encounterToCardAttachment(dungeonTorchInstance));
      store.dispatch(Action.encounterToCardAttachment(gandalfsMapInstance));
      store.dispatch(Action.encounterToCardAttachment(shadowKeyInstance));

      // Advance the quest.
      environment.advanceTheQuest(callback);
   },
};

// Scenario.JOURNEY_ALONG_THE_ANDUIN
QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.JATA1A_TO_THE_RIVER] = {
   condition: function(store /*, context*/ )
   {
      return isActiveQuest(store, QuestCard.JATA1A_TO_THE_RIVER);
   },
   consequent: function(store, context, callback)
   {
      // Setup: Each player reveals 1 card from the top of the encounter deck,
      // and adds it to the staging area.
      encounterToStagingPerPlayer(store);

      // Advance the quest.
      var environment = store.getState().environment;
      environment.advanceTheQuest(callback);
   },
};

// Scenario.PASSAGE_THROUGH_MIRKWOOD
QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.PTM1A_FLIES_AND_SPIDERS] = {
   condition: function(store /*, context*/ )
   {
      return isActiveQuest(store, QuestCard.PTM1A_FLIES_AND_SPIDERS);
   },
   consequent: function(store, context, callback)
   {
      // Setup: Search the encounter deck for 1 copy of the Forest Spider
      // and 1 copy of the Old Forest Road, and add them to the staging area.
      // Then Shuffle the encounter deck.
      var environment = store.getState().environment;
      environment.drawEncounterCard(EnemyCard.FOREST_SPIDER);
      environment.drawEncounterCard(LocationCard.OLD_FOREST_ROAD);
      environment.shuffleEncounterDeck(store);

      // Advance the quest.
      environment.advanceTheQuest(callback);
   },
};

// Scenario.PASSAGE_THROUGH_MIRKWOOD
QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.PTM2A_A_FORK_IN_THE_ROAD] = {
   condition: function(store /*, context*/ )
   {
      return isActiveQuest(store, QuestCard.PTM2A_A_FORK_IN_THE_ROAD);
   },
   consequent: function(store, context, callback)
   {
      // Advance the quest.
      var environment = store.getState().environment;
      environment.advanceTheQuest(callback);
   },
};

// Scenario.PASSAGE_THROUGH_MIRKWOOD
QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.PTM3A_A_CHOSEN_PATH] = {
   condition: function(store /*, context*/ )
   {
      return isActiveQuest(store, QuestCard.PTM3A_A_CHOSEN_PATH);
   },
   consequent: function(store, context, callback)
   {
      // Advance the quest.
      var environment = store.getState().environment;
      environment.advanceTheQuest(callback);
   },
};

// Scenario.RETURN_TO_MIRKWOOD
QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.RTM1A_THROUGH_THE_FOREST] = {
   condition: function(store /*, context*/ )
   {
      return isActiveQuest(store, QuestCard.RTM1A_THROUGH_THE_FOREST);
   },
   consequent: function(store, context, callback)
   {
      // Setup: Search the encounter deck for Gollum. Choose a player to
      // guard Gollum at the start of the game, and place Gollum in front
      // of that player. Then shuffle the encounter deck. Reveal 1 card
      // per player from the encounter deck, and add it to the staging area.
      var environment = store.getState().environment;

      // FIXME: how to guard Gollum?
      var agent1 = environment.agents().get(0);
      environment.encounterToAgentTableau(agent1, ObjectiveCard.GOLLUM_RTM);

      environment.shuffleEncounterDeck(store);
      encounterToStagingPerPlayer(store);

      // Advance the quest.
      environment.advanceTheQuest(callback);
   },
};

// Scenario.THE_DEAD_MARSHES
QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.TDM1A_INTO_THE_MARSHES] = {
   condition: function(store /*, context*/ )
   {
      return isActiveQuest(store, QuestCard.TDM1A_INTO_THE_MARSHES);
   },
   consequent: function(store, context, callback)
   {
      // Setup: Search the encounter deck for Gollum, and add it to the
      // staging area. Shuffle the encounter deck, then reveal 1 card per
      // player from the encounter deck and add it to the staging area.
      var environment = store.getState().environment;
      environment.drawEncounterCard(ObjectiveCard.GOLLUM_TDM);
      environment.shuffleEncounterDeck(store);
      encounterToStagingPerPlayer(store);

      // Advance the quest.
      environment.advanceTheQuest(callback);
   },
};

// Scenario.THE_HILLS_OF_EMYN_MUIL
QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.THOEM1A_THE_HILLS_OF_EMYN_MUIL] = {
   condition: function(store /*, context*/ )
   {
      return isActiveQuest(store, QuestCard.THOEM1A_THE_HILLS_OF_EMYN_MUIL);
   },
   consequent: function(store, context, callback)
   {
      // Setup: Search the encounter deck for Amon Hen and Amon Lhaw, and
      // add them to the staging area. Then shuffle the encounter deck.
      var environment = store.getState().environment;
      environment.drawEncounterCard(LocationCard.AMON_HEN);
      environment.drawEncounterCard(LocationCard.AMON_LHAW);
      environment.shuffleEncounterDeck(store);

      // Advance the quest.
      environment.advanceTheQuest(callback);
   },
};

// Scenario.THE_HUNT_FOR_GOLLUM
QuestAbility[GameEvent.QUEST_CARD_DRAWN][QuestCard.THFG1A_THE_HUNT_BEGINS] = {
   condition: function(store /*, context*/ )
   {
      return isActiveQuest(store, QuestCard.THFG1A_THE_HUNT_BEGINS);
   },
   consequent: function(store, context, callback)
   {
      // Setup: Reveal 1 card per player from the encounter deck, and add it
      // to the staging area.
      encounterToStagingPerPlayer(store);

      // Advance the quest.
      var environment = store.getState().environment;
      environment.advanceTheQuest(callback);
   },
};

function encounterToStagingPerPlayer(store)
{
   var environment = store.getState().environment;
   var agentCount = environment.agents().size;

   for (var i = 0; i < agentCount; i++)
   {
      store.dispatch(Action.drawEncounterCard());
   }
}

function isActiveQuest(store, cardKey)
{
   InputValidator.validateNotNull("store", store);
   InputValidator.validateIsString("cardKey", cardKey);

   var environment = store.getState().environment;
   var activeQuest = environment.activeQuest();

   return activeQuest.card().key === cardKey;
}

QuestAbility.toString = function()
{
   return "QuestAbility";
};

if (QuestAbility.freeze)
{
   Object.freeze(QuestAbility);
}

export default QuestAbility;