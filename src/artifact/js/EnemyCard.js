import InputValidator from "../../common/js/InputValidator.js";
import CardType from "./CardType.js";
import EncounterSet from "./EncounterSet.js";
import GameHeader from "./GameHeader.js";
import GameMode from "./GameMode.js";
import Scenario from "./Scenario.js";
import Trait from "./Trait.js";

var EnemyCard = {
   ATTERCOP_ATTERCOP: "attercopAttercop",
   BLACK_FOREST_BATS_AJTR: "blackForestBatsAjtr",
   BLACK_FOREST_BATS_PTM: "blackForestBatsPtm",
   CAVERN_GUARDIAN: "cavernGuardian",
   CHIEFTAN_UFTHAK: "chieftanUfthak",
   DOL_GULDUR_BEASTMASTER: "dolGuldurBeastmaster",
   DOL_GULDUR_ORCS: "dolGuldurOrcs",
   DUNGEON_JAILOR: "dungeonJailor",
   EAST_BIGHT_PATROL: "eastBightPatrol",
   EASTERN_CROWS: "easternCrows",
   FOREST_SPIDER: "forestSpider",
   GIANT_MARSH_WORM: "giantMarshWorm",
   GOBLIN_SNIPER: "goblinSniper",
   GOBLINTOWN_SCAVENGERS: "goblintownScavengers",
   HILL_TROLL: "hillTroll",
   HUMMERHORNS: "hummerhorns",
   HUNTERS_FROM_MORDOR: "huntersFromMordor",
   KING_SPIDER: "kingSpider",
   LOUIS: "louis",
   MARSH_ADDER: "marshAdder",
   MIRKWOOD_BATS: "mirkwoodBats",
   MIRKWOOD_FLOCK: "mirkwoodFlock",
   MISTY_MOUNTAIN_GOBLINS: "mistyMountainGoblins",
   MORRIS: "morris",
   MUCK_ADDER: "muckAdder",
   NAZGUL_OF_DOL_GULDUR: "nazgulOfDolGuldur",
   ORC_HORSE_THIEVES: "orcHorseThieves",
   RUPERT: "rupert",
   STUART: "stuart",
   UNGOLIANTS_SPAWN: "ungoliantsSpawn",
   WARGS: "wargs",
   WOLF_RIDER: "wolfRider",

   properties:
   {
      "attercopAttercop":
      {
         name: "Attercop, Attercop",
         engagementCost: 44,
         threat: 2,
         attack: 8,
         defense: 4,
         hitPoints: 6,
         traitKeys: [Trait.CREATURE, Trait.SPIDER],
         encounterSetKey: EncounterSet.RETURN_TO_MIRKWOOD,
         gameModeMap: GameMode.createMap(0, 3),
         key: "attercopAttercop",
      },
      "blackForestBatsAjtr":
      {
         name: "Black Forest Bats",
         engagementCost: 26,
         threat: 1,
         attack: 1,
         defense: 0,
         hitPoints: 2,
         traitKeys: [Trait.CREATURE],
         encounterSetKey: EncounterSet.A_JOURNEY_TO_RHOSGOBEL,
         gameModeMap: GameMode.createMap(5),
         key: "blackForestBatsAjtr",
      },
      "blackForestBatsPtm":
      {
         name: "Black Forest Bats",
         engagementCost: 15,
         threat: 1,
         attack: 1,
         defense: 0,
         hitPoints: 2,
         traitKeys: [Trait.CREATURE],
         encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
         gameModeMap: GameMode.createMap(1),
         gameText: [
            {
               headerKey: GameHeader.WHEN_REVEALED,
               text: "Each player must choose 1 character currently committed to a quest, and remove that character from the quest. (The chosen character does not ready.)",
            }],
         key: "blackForestBatsPtm",
      },
      "cavernGuardian":
      {
         name: "Cavern Guardian",
         engagementCost: 8,
         threat: 2,
         attack: 2,
         defense: 1,
         hitPoints: 2,
         traitKeys: [Trait.UNDEAD],
         encounterSetKey: EncounterSet.ESCAPE_FROM_DOL_GULDUR,
         gameModeMap: GameMode.createMap(2),
         key: "cavernGuardian",
      },
      "chieftanUfthak":
      {
         name: "Chieftan Ufthak",
         engagementCost: 35,
         threat: 2,
         attack: 3,
         defense: 3,
         hitPoints: 6,
         victory: 4,
         traitKeys: [Trait.DOL_GULDUR, Trait.ORC],
         encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
         gameModeMap: GameMode.createMap(0, 1),
         gameText: [
            {
               text: "Chieftan Ufthak gets +2 Attack for each resource token on him.",
            },
            {
               headerKey: GameHeader.FORCED,
               text: "After Chieftan Ufthak attacks, place 1 resource token on him.",
            }],
         key: "chieftanUfthak",
      },
      "dolGuldurBeastmaster":
      {
         name: "Dol Guldur Beastmaster",
         engagementCost: 35,
         threat: 2,
         attack: 3,
         defense: 1,
         hitPoints: 5,
         traitKeys: [Trait.DOL_GULDUR, Trait.ORC],
         encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
         gameModeMap: GameMode.createMap(1, 1),
         gameText: [
            {
               headerKey: GameHeader.FORCED,
               text: "When Dol Guldur Beastmaster attacks, deal it 1 additional shadow card.",
            }],
         key: "dolGuldurBeastmaster",
      },
      "dolGuldurOrcs":
      {
         name: "Dol Guldur Orcs",
         engagementCost: 10,
         threat: 2,
         attack: 2,
         defense: 0,
         hitPoints: 3,
         traitKeys: [Trait.DOL_GULDUR, Trait.ORC],
         encounterSetKey: EncounterSet.DOL_GULDUR_ORCS,
         gameModeMap: GameMode.createMap(3),
         gameText: [
            {
               headerKey: GameHeader.WHEN_REVEALED,
               text: "The first player chooses 1 character currently committed to a quest. Deal 2 damage to that character.",
            },
            {
               headerKey: GameHeader.SHADOW,
               text: "Attacking enemy gets +1 Attack. (+3 Attack instead if this attack is undefended.)",
            }],
         key: "dolGuldurOrcs",
      },
      "dungeonJailor":
      {
         name: "Dungeon Jailor",
         engagementCost: 38,
         threat: 1,
         attack: 2,
         defense: 3,
         hitPoints: 5,
         victory: 5,
         traitKeys: [Trait.DOL_GULDUR, Trait.ORC],
         encounterSetKey: EncounterSet.ESCAPE_FROM_DOL_GULDUR,
         gameModeMap: GameMode.createMap(0, 2),
         key: "dungeonJailor",
      },
      "eastBightPatrol":
      {
         name: "East Bight Patrol",
         engagementCost: 5,
         threat: 3,
         attack: 3,
         defense: 1,
         hitPoints: 2,
         traitKeys: [Trait.GOBLIN, Trait.ORC],
         encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
         gameModeMap: GameMode.createMap(1),
         gameText: [
            {
               headerKey: GameHeader.SHADOW,
               text: "Attacking enemy gets +1 Attack. (If this attack is undefended, also raise your threat by 3.)",
            }],
         key: "eastBightPatrol",
      },
      "easternCrows":
      {
         name: "Eastern Crows",
         engagementCost: 30,
         threat: 1,
         attack: 1,
         defense: 0,
         hitPoints: 1,
         traitKeys: [Trait.CREATURE],
         encounterSetKey: EncounterSet.SAURONS_REACH,
         gameModeMap: GameMode.createMap(1, 2),
         gameText: [
            {
               headerKey: GameHeader.FORCED,
               text: "After Eastern Crows is defeated, shuffle it back into the encounter deck.",
            },
            {
               headerKey: GameHeader.SHADOW,
               text: "Attacking enemy gets +1 Attack. (+2 Attack instead if defending player's threat is 35 or higher.)",
            }],
         key: "easternCrows",
      },
      "forestSpider":
      {
         name: "Forest Spider",
         engagementCost: 25,
         threat: 2,
         attack: 2,
         defense: 1,
         hitPoints: 4,
         traitKeys: [Trait.CREATURE, Trait.SPIDER],
         encounterSetKey: EncounterSet.PASSAGE_THROUGH_MIRKWOOD,
         gameModeMap: GameMode.createMap(4),
         gameText: [
            {
               headerKey: GameHeader.FORCED,
               text: "After Forest Spider engages a player, it gets +1 Attack until the end of the round.",
            },
            {
               headerKey: GameHeader.SHADOW,
               text: "Defending player must choose and discard 1 attachment he controls.",
            }],
         key: "forestSpider",
      },
      "giantMarshWorm":
      {
         name: "Giant Marsh Worm",
         engagementCost: 36,
         threat: 1,
         attack: 3,
         defense: 2,
         hitPoints: 6,
         escape: 2,
         traitKeys: [Trait.CREATURE],
         encounterSetKey: EncounterSet.THE_DEAD_MARSHES,
         gameModeMap: GameMode.createMap(2, 2),
         key: "giantMarshWorm",
      },
      "goblinSniper":
      {
         name: "Goblin Sniper",
         engagementCost: 48,
         threat: 2,
         attack: 2,
         defense: 0,
         hitPoints: 2,
         traitKeys: [Trait.GOBLIN, Trait.ORC],
         encounterSetKey: EncounterSet.WILDERLANDS,
         gameModeMap: GameMode.createMap(2),
         key: "goblinSniper",
      },
      "goblintownScavengers":
      {
         name: "Goblintown Scavengers",
         engagementCost: 12,
         threat: 1,
         attack: 1,
         defense: 0,
         hitPoints: 3,
         traitKeys: [Trait.GOBLIN, Trait.ORC],
         encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
         gameModeMap: GameMode.createMap(1, 1),
         gameText: [
            {
               headerKey: GameHeader.WHEN_REVEALED,
               text: "Discard the top card of each player's deck. Until the end of the phase, increase Goblintown Scavenger's Threat by the total printed cost of all cards discarded in this way.",
            }],
         key: "goblintownScavengers",
      },
      "hillTroll":
      {
         name: "Hill Troll",
         engagementCost: 30,
         threat: 1,
         attack: 6,
         defense: 3,
         hitPoints: 9,
         traitKeys: [Trait.TROLL],
         encounterSetKey: EncounterSet.WILDERLANDS,
         gameModeMap: GameMode.createMap(1, 1),
         key: "hillTroll",
      },
      "hummerhorns":
      {
         name: "Hummerhorns",
         engagementCost: 40,
         threat: 1,
         attack: 2,
         defense: 0,
         hitPoints: 3,
         traitKeys: [Trait.CREATURE, Trait.INSECT],
         encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
         gameModeMap: GameMode.createMap(0, 1),
         gameText: [
            {
               headerKey: GameHeader.FORCED,
               text: "After Hummerhorns engages you, deal 5 damage to a single hero you control.",
            },
            {
               gameHeaderKey: GameHeader.SHADOW,
               shadowEffect: "Deal 1 damage to each character the defending player controls. (2 damage instead if this attack is undefended.)",
            }],
         key: "hummerhorns",
      },
      "huntersFromMordor":
      {
         name: "Hunters from Mordor",
         engagementCost: 34,
         threat: 2,
         attack: 2,
         defense: 2,
         hitPoints: 6,
         traitKeys: [Trait.MORDOR],
         encounterSetKey: EncounterSet.THE_HUNT_FOR_GOLLUM,
         gameModeMap: GameMode.createMap(2, 3),
         gameText: [
            {
               text: "Hunters from Mordor get +2 Attack and +2 Threat for each Clue card in play.",
            },
            {
               headerKey: GameHeader.SHADOW,
               text: "Deal 1 damage to each hero with a Clue card attached. (3 damage instead if this attack is undefended.)",
            }],
         key: "huntersFromMordor",
      },
      "kingSpider":
      {
         name: "King Spider",
         engagementCost: 20,
         threat: 2,
         attack: 3,
         defense: 1,
         hitPoints: 3,
         traitKeys: [Trait.CREATURE, Trait.SPIDER],
         encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
         gameModeMap: GameMode.createMap(2),
         gameText: [
            {
               headerKey: GameHeader.WHEN_REVEALED,
               text: "Each player must choose and exhaust 1 character he controls.",
            },
            {
               headerKey: GameHeader.SHADOW,
               text: "Defending player must choose and exhaust 1 character he controls. (2 characters instead if this attack is undefended.)",
            }],
         key: "kingSpider",
      },
      "louis":
      {
         name: "Louis",
         isUnique: true,
         engagementCost: 34,
         threat: 2,
         attack: 4,
         defense: 2,
         hitPoints: 10,
         traitKeys: [Trait.TROLL],
         encounterSetKey: EncounterSet.CONFLICT_AT_THE_CARROCK,
         gameModeMap: GameMode.createMap(1),
         key: "louis",
      },
      "marshAdder":
      {
         name: "Marsh Adder",
         engagementCost: 40,
         threat: 3,
         attack: 4,
         defense: 1,
         hitPoints: 7,
         traitKeys: [Trait.CREATURE],
         encounterSetKey: EncounterSet.WILDERLANDS,
         gameModeMap: GameMode.createMap(0, 1),
         key: "marshAdder",
      },
      "mirkwoodBats":
      {
         name: "Mirkwood Bats",
         engagementCost: 22,
         threat: 1,
         attack: 1,
         defense: 1,
         hitPoints: 1,
         traitKeys: [Trait.CREATURE],
         encounterSetKey: EncounterSet.RETURN_TO_MIRKWOOD,
         gameModeMap: GameMode.createMap(2, 2),
         key: "mirkwoodBats",
      },
      "mirkwoodFlock":
      {
         name: "Mirkwood Flock",
         engagementCost: 32,
         threat: 1,
         attack: 2,
         defense: 1,
         hitPoints: 3,
         traitKeys: [Trait.CREATURE],
         encounterSetKey: EncounterSet.A_JOURNEY_TO_RHOSGOBEL,
         gameModeMap: GameMode.createMap(4),
         key: "mirkwoodFlock",
      },
      "mistyMountainGoblins":
      {
         name: "Misty Mountain Goblins",
         engagementCost: 15,
         threat: 2,
         attack: 2,
         defense: 1,
         hitPoints: 3,
         traitKeys: [Trait.GOBLIN, Trait.ORC],
         encounterSetKey: EncounterSet.JOURNEY_ALONG_THE_ANDUIN,
         gameModeMap: GameMode.createMap(3),
         gameText: [
            {
               headerKey: GameHeader.FORCED,
               text: "After Misty Mountain Goblins attacks, remove 1 progress token from the current quest.",
            },
            {
               headerKey: GameHeader.SHADOW,
               text: "Remove 1 progress token from the current quest. (3 progress tokens instead if this attack is undefended.)",
            }],
         key: "mistyMountainGoblins",
      },
      "morris":
      {
         name: "Morris",
         isUnique: true,
         engagementCost: 34,
         threat: 2,
         attack: 4,
         defense: 2,
         hitPoints: 10,
         traitKeys: [Trait.TROLL],
         encounterSetKey: EncounterSet.CONFLICT_AT_THE_CARROCK,
         gameModeMap: GameMode.createMap(1),
         key: "morris",
      },
      "muckAdder":
      {
         name: "Muck Adder",
         engagementCost: 20,
         threat: 1,
         attack: 2,
         defense: 0,
         hitPoints: 4,
         traitKeys: [Trait.CREATURE],
         encounterSetKey: EncounterSet.CONFLICT_AT_THE_CARROCK,
         gameModeMap: GameMode.createMap(2, 2),
         key: "muckAdder",
      },
      "nazgulOfDolGuldur":
      {
         name: "Nazgûl of Dol Guldur",
         engagementCost: 40,
         threat: 5,
         attack: 4,
         defense: 3,
         hitPoints: 9,
         traitKeys: [Trait.NAZGUL],
         encounterSetKey: EncounterSet.ESCAPE_FROM_DOL_GULDUR,
         gameModeMap: GameMode.createMap(1),
         key: "nazgulOfDolGuldur",
      },
      "orcHorseThieves":
      {
         name: "Orc Horse Thieves",
         engagementCost: 35,
         threat: 3,
         attack: 1,
         defense: 2,
         hitPoints: 6,
         traitKeys: [Trait.MORDOR, Trait.ORC],
         encounterSetKey: EncounterSet.THE_HILLS_OF_EMYN_MUIL,
         gameModeMap: GameMode.createMap(2, 1),
         key: "orcHorseThieves",
      },
      "rupert":
      {
         name: "Rupert",
         isUnique: true,
         engagementCost: 34,
         threat: 2,
         attack: 4,
         defense: 2,
         hitPoints: 10,
         traitKeys: [Trait.TROLL],
         encounterSetKey: EncounterSet.CONFLICT_AT_THE_CARROCK,
         gameModeMap: GameMode.createMap(1),
         key: "rupert",
      },
      "stuart":
      {
         name: "Stuart",
         isUnique: true,
         engagementCost: 34,
         threat: 2,
         attack: 4,
         defense: 2,
         hitPoints: 10,
         traitKeys: [Trait.TROLL],
         encounterSetKey: EncounterSet.CONFLICT_AT_THE_CARROCK,
         gameModeMap: GameMode.createMap(1),
         key: "stuart",
      },
      "ungoliantsSpawn":
      {
         name: "Ungoliant's Spawn",
         engagementCost: 32,
         threat: 3,
         attack: 5,
         defense: 2,
         hitPoints: 9,
         traitKeys: [Trait.CREATURE, Trait.SPIDER],
         encounterSetKey: EncounterSet.SPIDERS_OF_MIRKWOOD,
         gameModeMap: GameMode.createMap(1),
         gameText: [
            {
               headerKey: GameHeader.WHEN_REVEALED,
               text: "Each character currently committed to a quest gets -1 Willpower until the end of the phase.",
            },
            {
               headerKey: GameHeader.SHADOW,
               text: "Raise defending player's threat by 4. (Raise defending player's threat by 8 instead if this attack is undefended.)",
            }],
         key: "ungoliantsSpawn",
      },
      "wargs":
      {
         name: "Wargs",
         engagementCost: 20,
         threat: 2,
         attack: 3,
         defense: 1,
         hitPoints: 3,
         traitKeys: [Trait.CREATURE],
         encounterSetKey: EncounterSet.WILDERLANDS,
         gameModeMap: GameMode.createMap(2),
         key: "wargs",
      },
      "wolfRider":
      {
         name: "Wolf Rider",
         engagementCost: 10,
         threat: 1,
         attack: 2,
         defense: 0,
         hitPoints: 2,
         traitKeys: [Trait.GOBLIN, Trait.ORC],
         encounterSetKey: EncounterSet.WILDERLANDS,
         gameModeMap: GameMode.createMap(1),
         key: "wolfRider",
      },
   },
};

EnemyCard.keys = function()
{
   return Object.keys(EnemyCard.properties);
};

EnemyCard.values = function()
{
   return Object.values(EnemyCard.properties);
};

EnemyCard.keys().forEach(function(cardKey)
{
   var card = EnemyCard.properties[cardKey];
   card.cardTypeKey = CardType.ENEMY;
   card.cardType = CardType.properties[card.cardTypeKey];
   card.encounterSet = EncounterSet.properties[card.encounterSetKey];
   card.gameMode = GameMode.properties[card.gameModeKey];
   card.lotrType = EnemyCard;

   var imagePath = card.name;
   imagePath = imagePath.replace(/,/g, "");
   imagePath = imagePath.replace(/ /g, "-");

   switch (cardKey)
   {
      case EnemyCard.DOL_GULDUR_ORCS:
         imagePath += "-Enemy";
         break;
   }

   card.imagePath = imagePath;
});

EnemyCard.keysByEncounterSet = function(encounterSetKey)
{
   InputValidator.validateNotNull("encounterSetKey", encounterSetKey);

   var keys = EnemyCard.keys();

   return keys.filter(function(cardKey)
   {
      var card = EnemyCard.properties[cardKey];

      return card.encounterSetKey === encounterSetKey;
   });
};

EnemyCard.keysByScenario = function(scenarioKey)
{
   InputValidator.validateNotNull("scenarioKey", scenarioKey);

   var scenario = Scenario.properties[scenarioKey];
   var encounterSetKeys = scenario.encounterSetKeys;
   var keys = EnemyCard.keys();

   return keys.filter(function(cardKey)
   {
      var card = EnemyCard.properties[cardKey];

      return encounterSetKeys.includes(card.encounterSetKey);
   });
};

EnemyCard.toString = function()
{
   return "EnemyCard";
};

if (Object.freeze)
{
   Object.freeze(EnemyCard);
}

export default EnemyCard;