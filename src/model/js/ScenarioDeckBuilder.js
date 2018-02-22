import ArrayAugments from "../../common/js/ArrayAugments.js";
import InputValidator from "../../common/js/InputValidator.js";
import CardResolver from "../../artifact/js/CardResolver.js";
import CardType from "../../artifact/js/CardType.js";
import EnemyCard from "../../artifact/js/EnemyCard.js";
import GameMode from "../../artifact/js/GameMode.js";
import LocationCard from "../../artifact/js/LocationCard.js";
import ObjectiveCard from "../../artifact/js/ObjectiveCard.js";
import QuestCard from "../../artifact/js/QuestCard.js";
import Scenario from "../../artifact/js/Scenario.js";
import TreacheryCard from "../../artifact/js/TreacheryCard.js";
import CardInstance from "./CardInstance.js";

var DeckBuilders = [];

var PassageThroughMirkwoodDeckBuilder = new ScenarioDeckBuilder(Scenario.PASSAGE_THROUGH_MIRKWOOD, "Passage Through Mirkwood (Core #1)", 2011, "Passage Through Mirkwood",
   function(store)
   {
      var questKeys = QuestCard.keysByScenario(Scenario.PASSAGE_THROUGH_MIRKWOOD);

      // Choose one of the 3B paths randomly.
      var removeMe = [QuestCard.PTM3B1_BEORNS_PATH, QuestCard.PTM3B2_DONT_LEAVE_THE_PATH].lotrRandomElement();
      questKeys.lotrRemove(removeMe);

      return questKeys.map(function(cardKey)
      {
         var card = QuestCard.properties[cardKey];
         return new CardInstance(store, card);
      });
   },
   function(store, gameModeKey)
   {
      return encounterBuildFunction(store, gameModeKey, Scenario.PASSAGE_THROUGH_MIRKWOOD);
   });
DeckBuilders.push(PassageThroughMirkwoodDeckBuilder);

var JourneyAlongTheAnduinDeckBuilder = new ScenarioDeckBuilder(Scenario.JOURNEY_ALONG_THE_ANDUIN, "Journey Along the Anduin (Core #2)", 2011, "Journey Along the Anduin",
   function(store)
   {
      return questBuildFunction(store, Scenario.JOURNEY_ALONG_THE_ANDUIN);
   },
   function(store, gameModeKey)
   {
      return encounterBuildFunction(store, gameModeKey, Scenario.JOURNEY_ALONG_THE_ANDUIN);
   });
DeckBuilders.push(JourneyAlongTheAnduinDeckBuilder);

var EscapeFromDolGuldurDeckBuilder = new ScenarioDeckBuilder(Scenario.ESCAPE_FROM_DOL_GULDUR, "Escape from Dol Guldur (Core #3)", 2011, "Escape from Dol Guldur",
   function(store)
   {
      return questBuildFunction(store, Scenario.ESCAPE_FROM_DOL_GULDUR);
   },
   function(store, gameModeKey)
   {
      return encounterBuildFunction(store, gameModeKey, Scenario.ESCAPE_FROM_DOL_GULDUR);
   });
DeckBuilders.push(EscapeFromDolGuldurDeckBuilder);

var ReturnToMirkwoodDeckBuilder = new ScenarioDeckBuilder(Scenario.RETURN_TO_MIRKWOOD, "Return to Mirkwood (Shadows of Mirkwood #6)", 2011, "Return to Mirkwood",
   function(store)
   {
      return questBuildFunction(store, Scenario.RETURN_TO_MIRKWOOD);
   },
   function(store, gameModeKey)
   {
      return encounterBuildFunction(store, gameModeKey, Scenario.RETURN_TO_MIRKWOOD);
   });
DeckBuilders.push(ReturnToMirkwoodDeckBuilder);

var TheDeadMarshesDeckBuilder = new ScenarioDeckBuilder(Scenario.THE_DEAD_MARSHES, "The Dead Marshes (Shadows of Mirkwood #5)", 2011, "The Dead Marshes",
   function(store)
   {
      return questBuildFunction(store, Scenario.THE_DEAD_MARSHES);
   },
   function(store, gameModeKey)
   {
      return encounterBuildFunction(store, gameModeKey, Scenario.THE_DEAD_MARSHES);
   });
DeckBuilders.push(TheDeadMarshesDeckBuilder);

var TheHillsOfEmynMuilDeckBuilder = new ScenarioDeckBuilder(Scenario.THE_HILLS_OF_EMYN_MUIL, "The Hills of Emyn Muil (Shadows of Mirkwood #4)", 2011, "The Hills of Emyn Muil",
   function(store)
   {
      return questBuildFunction(store, Scenario.THE_HILLS_OF_EMYN_MUIL);
   },
   function(store, gameModeKey)
   {
      return encounterBuildFunction(store, gameModeKey, Scenario.THE_HILLS_OF_EMYN_MUIL);
   });
DeckBuilders.push(TheHillsOfEmynMuilDeckBuilder);

var TheHuntForGollumDeckBuilder = new ScenarioDeckBuilder(Scenario.THE_HUNT_FOR_GOLLUM, "The Hunt for Gollum (Shadows of Mirkwood #1)", 2011, "The Hunt for Gollum",
   function(store)
   {
      return questBuildFunction(store, Scenario.THE_HUNT_FOR_GOLLUM);
   },
   function(store, gameModeKey)
   {
      return encounterBuildFunction(store, gameModeKey, Scenario.THE_HUNT_FOR_GOLLUM);
   });
DeckBuilders.push(TheHuntForGollumDeckBuilder);

var ConflictAtTheCarrockDeckBuilder = new ScenarioDeckBuilder(Scenario.CONFLICT_AT_THE_CARROCK, "Conflict at the Carrock (Shadows of Mirkwood #2)", 2011, "Conflict at the Carrock",
   function(store)
   {
      return questBuildFunction(store, Scenario.CONFLICT_AT_THE_CARROCK);
   },
   function(store, gameModeKey)
   {
      return encounterBuildFunction(store, gameModeKey, Scenario.CONFLICT_AT_THE_CARROCK);
   });
DeckBuilders.push(ConflictAtTheCarrockDeckBuilder);

var AJourneyToRhosgobelDeckBuilder = new ScenarioDeckBuilder(Scenario.A_JOURNEY_TO_RHOSGOBEL, "A Journey to Rhosgobel (Shadows of Mirkwood #3)", 2011, "A Journey to Rhosgobel",
   function(store)
   {
      return questBuildFunction(store, Scenario.A_JOURNEY_TO_RHOSGOBEL);
   },
   function(store, gameModeKey)
   {
      return encounterBuildFunction(store, gameModeKey, Scenario.A_JOURNEY_TO_RHOSGOBEL);
   });
DeckBuilders.push(AJourneyToRhosgobelDeckBuilder);

function ScenarioDeckBuilder(scenarioKey, name, year, description, questBuildFunction, encounterBuildFunction)
{
   InputValidator.validateIsString("scenarioKey", scenarioKey);
   InputValidator.validateIsString("name", name);
   InputValidator.validateIsNumber("year", year);
   InputValidator.validateIsString("description", description);
   InputValidator.validateIsFunction("questBuildFunction", questBuildFunction);
   InputValidator.validateIsFunction("encounterBuildFunction", encounterBuildFunction);

   this.scenarioKey = function()
   {
      return scenarioKey;
   };

   this.name = function()
   {
      return name;
   };

   this.year = function()
   {
      return year;
   };

   this.description = function()
   {
      return description;
   };

   this.buildDeck = function(store, gameModeKeyIn)
   {
      InputValidator.validateNotNull("store", store);
      // gameModeKeyIn optional. default: GameMode.STANDARD

      var gameModeKey = (gameModeKeyIn !== undefined ? gameModeKeyIn : GameMode.STANDARD);

      var questInstances = questBuildFunction(store);
      var encounterInstances = encounterBuildFunction(store, gameModeKey);

      return (
      {
         scenarioKey: scenarioKey,
         gameModeKey: gameModeKey,
         questInstances: questInstances,
         encounterInstances: encounterInstances
      });
   };
}

ScenarioDeckBuilder.findByScenario = function(scenarioKey)
{
   InputValidator.validateIsString("scenarioKey", scenarioKey);

   var answer;
   var deckBuilders = DeckBuilders;

   for (var i = 0; i < deckBuilders.length; i++)
   {
      var deckBuilder = deckBuilders[i];

      if (deckBuilder.scenarioKey() === scenarioKey)
      {
         answer = deckBuilder;
         break;
      }
   }

   return answer;
};

function createCards(store, cardTypeKey, cardKey, gameModeKey)
{
   InputValidator.validateNotNull("store", store);
   InputValidator.validateNotNull("cardTypeKey", cardTypeKey);
   InputValidator.validateNotNull("cardKey", cardKey);
   InputValidator.validateNotNull("gameModeKey", gameModeKey);

   var card = CardResolver.get(cardTypeKey, cardKey);
   var gameModeMap = card.gameModeMap;
   var count = determineCount(gameModeMap, gameModeKey);
   var answer = [];

   for (var i = 0; i < count; i++)
   {
      answer.push(new CardInstance(store, card));
   }

   return answer;
}

function determineCount(gameModeMap, gameModeKey)
{
   InputValidator.validateNotNull("gameModeMap", gameModeMap);
   InputValidator.validateNotNull("gameModeKey", gameModeKey);

   var count = gameModeMap.get(GameMode.EASY);

   if (gameModeKey === GameMode.STANDARD || gameModeKey === GameMode.NIGHTMARE)
   {
      count += gameModeMap.get(GameMode.STANDARD);
   }

   if (gameModeKey === GameMode.NIGHTMARE)
   {
      count += gameModeMap.get(GameMode.NIGHTMARE);
   }

   return count;
}

function encounterBuildFunction(store, gameModeKey, scenarioKey)
{
   InputValidator.validateNotNull("store", store);
   InputValidator.validateNotNull("gameModeKey", gameModeKey);
   InputValidator.validateNotNull("scenarioKey", scenarioKey);

   var enemyKeys = EnemyCard.keysByScenario(scenarioKey);
   var enemyTokens = enemyKeys.reduce(function(accumulator, cardKey)
   {
      return accumulator.concat(createCards(store, CardType.ENEMY, cardKey, gameModeKey));
   }, []);

   var locationKeys = LocationCard.keysByScenario(scenarioKey);
   var locationTokens = locationKeys.reduce(function(accumulator, cardKey)
   {
      return accumulator.concat(createCards(store, CardType.LOCATION, cardKey, gameModeKey));
   }, []);

   var objectiveKeys = ObjectiveCard.keysByScenario(scenarioKey);
   var objectiveTokens = objectiveKeys.reduce(function(accumulator, cardKey)
   {
      return accumulator.concat(createCards(store, CardType.OBJECTIVE, cardKey, gameModeKey));
   }, []);

   var treacheryKeys = TreacheryCard.keysByScenario(scenarioKey);
   var treacheryTokens = treacheryKeys.reduce(function(accumulator, cardKey)
   {
      return accumulator.concat(createCards(store, CardType.TREACHERY, cardKey, gameModeKey));
   }, []);

   return enemyTokens.concat(locationTokens.concat(objectiveTokens.concat(treacheryTokens)));
}

function questBuildFunction(store, scenarioKey)
{
   var questKeys = QuestCard.keysByScenario(scenarioKey);

   return questKeys.map(function(cardKey)
   {
      var card = QuestCard.properties[cardKey];
      return new CardInstance(store, card);
   });
}

export default (
{
   PassageThroughMirkwoodDeckBuilder: PassageThroughMirkwoodDeckBuilder,
   TheHuntForGollumDeckBuilder: TheHuntForGollumDeckBuilder,
   DeckBuilders: DeckBuilders,
   ScenarioDeckBuilder: ScenarioDeckBuilder,
});