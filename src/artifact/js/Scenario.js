import InputValidator from "../../common/js/InputValidator.js";
import CardSet from "./CardSet.js";
import CardSubset from "./CardSubset.js";
import EncounterSet from "./EncounterSet.js";

var Scenario = {
   A_JOURNEY_TO_RHOSGOBEL: "aJourneyToRhosgobel",
   CONFLICT_AT_THE_CARROCK: "conflictAtTheCarrock",
   ESCAPE_FROM_DOL_GULDUR: "escapeFromDolGuldur",
   JOURNEY_ALONG_THE_ANDUIN: "journeyAlongTheAnduin",
   PASSAGE_THROUGH_MIRKWOOD: "passageThroughMirkwood",
   RETURN_TO_MIRKWOOD: "returnToMirkwood",
   THE_DEAD_MARSHES: "theDeadMarshes",
   THE_HILLS_OF_EMYN_MUIL: "theHillsOfEmynMuil",
   THE_HUNT_FOR_GOLLUM: "theHuntForGollum",

   properties:
   {
      "aJourneyToRhosgobel":
      {
         name: "A Journey to Rhosgobel",
         cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
         cardSubsetKey: CardSubset.SOM3_A_JOURNEY_TO_RHOSGOBEL,
         encounterSetKeys: [EncounterSet.A_JOURNEY_TO_RHOSGOBEL],
         number: 3,
         key: "aJourneyToRhosgobel",
      },
      "conflictAtTheCarrock":
      {
         name: "Conflict at the Carrock",
         cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
         cardSubsetKey: CardSubset.SOM2_CONFLICT_AT_THE_CARROCK,
         encounterSetKeys: [EncounterSet.CONFLICT_AT_THE_CARROCK, EncounterSet.JOURNEY_ALONG_THE_ANDUIN, EncounterSet.WILDERLANDS],
         number: 2,
         key: "conflictAtTheCarrock",
      },
      "escapeFromDolGuldur":
      {
         name: "Escape from Dol Guldur",
         cardSetKey: CardSet.CORE,
         encounterSetKeys: [EncounterSet.ESCAPE_FROM_DOL_GULDUR, EncounterSet.SPIDERS_OF_MIRKWOOD, EncounterSet.DOL_GULDUR_ORCS],
         number: 3,
         key: "escapeFromDolGuldur",
      },
      "journeyAlongTheAnduin":
      {
         name: "Journey Along the Anduin",
         cardSetKey: CardSet.CORE,
         encounterSetKeys: [EncounterSet.JOURNEY_ALONG_THE_ANDUIN, EncounterSet.SAURONS_REACH, EncounterSet.DOL_GULDUR_ORCS, EncounterSet.WILDERLANDS],
         number: 2,
         key: "journeyAlongTheAnduin",
      },
      "passageThroughMirkwood":
      {
         name: "Passage Through Mirkwood",
         cardSetKey: CardSet.CORE,
         encounterSetKeys: [EncounterSet.PASSAGE_THROUGH_MIRKWOOD, EncounterSet.SPIDERS_OF_MIRKWOOD, EncounterSet.DOL_GULDUR_ORCS],
         number: 1,
         key: "passageThroughMirkwood",
      },
      "returnToMirkwood":
      {
         name: "Return to Mirkwood",
         cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
         cardSubsetKey: CardSubset.SOM6_RETURN_TO_MIRKWOOD,
         encounterSetKeys: [EncounterSet.RETURN_TO_MIRKWOOD, EncounterSet.SPIDERS_OF_MIRKWOOD, EncounterSet.WILDERLANDS],
         number: 6,
         key: "returnToMirkwood",
      },
      "theDeadMarshes":
      {
         name: "The Dead Marshes",
         cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
         cardSubsetKey: CardSubset.SOM5_THE_DEAD_MARSHES,
         encounterSetKeys: [EncounterSet.THE_DEAD_MARSHES, EncounterSet.SAURONS_REACH, EncounterSet.WILDERLANDS],
         number: 5,
         key: "theDeadMarshes",
      },
      "theHillsOfEmynMuil":
      {
         name: "The Hills of Emyn Muil",
         cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
         cardSubsetKey: CardSubset.SOM4_THE_HILLS_OF_EMYN_MUIL,
         encounterSetKeys: [EncounterSet.THE_HILLS_OF_EMYN_MUIL, EncounterSet.DOL_GULDUR_ORCS, EncounterSet.SAURONS_REACH],
         number: 4,
         key: "theHillsOfEmynMuil",
      },
      "theHuntForGollum":
      {
         name: "The Hunt for Gollum",
         cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
         cardSubsetKey: CardSubset.SOM2_CONFLICT_AT_THE_CARROCK,
         encounterSetKeys: [EncounterSet.THE_HUNT_FOR_GOLLUM, EncounterSet.JOURNEY_ALONG_THE_ANDUIN, EncounterSet.SAURONS_REACH],
         number: 1,
         key: "theHuntForGollum",
      },
   },

   keys: function()
   {
      return Object.getOwnPropertyNames(Scenario.properties);
   },
};

Scenario.keys().forEach(function(scenarioKey)
{
   var scenario = Scenario.properties[scenarioKey];
   scenario.cardSet = CardSet.properties[scenario.cardSetKey];
   scenario.cardSubset = CardSubset.properties[scenario.cardSubsetKey];
});

Scenario.findByCardSet = function(cardSetKey)
{
   InputValidator.validateIsString("cardSetKey", cardSetKey);

   return Scenario.keys().filter(function(scenarioKey)
   {
      var scenario = Scenario.properties[scenarioKey];

      return scenario.cardSetKey === cardSetKey;
   });
};

if (Object.freeze)
{
   Object.freeze(Scenario);
}

export default Scenario;