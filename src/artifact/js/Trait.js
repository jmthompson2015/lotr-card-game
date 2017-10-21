"use strict";

define(function()
{
   var Trait = {
      ARCHER: "archer",
      ARMOR: "armor",
      ARTIFACT: "artifact",
      BEORNING: "beorning",
      BOON: "boon",
      BREE: "bree",
      BURGLAR: "burglar",
      CLUE: "clue",
      CONDITION: "condition",
      CRAFTSMAN: "craftsman",
      CREATURE: "creature",
      DALE: "dale",
      DISASTER: "disaster",
      DOL_GULDUR: "dolGuldur",
      DUNEDAIN: "dunedain",
      DUNGEON: "dungeon",
      DWARF: "dwarf",
      EAGLE: "eagle",
      ENT: "ent",
      ESGAROTH: "esgaroth",
      FOREST: "forest",
      GOBLIN: "goblin",
      GONDOR: "gondor",
      GOSSIP: "gossip",
      HEALER: "healer",
      HOBBIT: "hobbit",
      INSECT: "insect",
      INSTRUMENT: "instrument",
      ISENGARD: "isengard",
      ISTARI: "istari",
      ITEM: "item",
      MARSHLAND: "marshland",
      MATHOM: "mathom",
      MEARAS: "mearas",
      MINSTREL: "minstrel",
      MORDOR: "mordor",
      MOUNT: "mount",
      MOUNTAIN: "mountain",
      NAZGUL: "nazgul",
      NOBLE: "noble",
      NOLDOR: "noldor",
      ORC: "orc",
      OUTLANDS: "outlands",
      PIPE: "pipe",
      PONY: "pony",
      RANGER: "ranger",
      RECORD: "record",
      RING: "ring",
      RING_BEARER: "ringBearer",
      RIVERLAND: "riverland",
      ROHAN: "rohan",
      SCOUT: "scout",
      SIGNAL: "signal",
      SILVAN: "silvan",
      SKILL: "skill",
      SONG: "song",
      SPIDER: "spider",
      STAFF: "staff",
      STEWARD: "steward",
      STRONGHOLD: "stronghold",
      TITLE: "title",
      TRAP: "trap",
      TROLL: "troll",
      UNDEAD: "undead",
      WARRIOR: "warrior",
      WASTELAND: "wasteland",
      WEAPON: "weapon",
      WOODMAN: "woodman",

      properties:
      {
         "archer":
         {
            name: "Archer",
            key: "archer",
         },
         "armor":
         {
            name: "Armor",
            key: "armor",
         },
         "artifact":
         {
            name: "Artifact",
            key: "artifact",
         },
         "beorning":
         {
            name: "Beorning",
            key: "beorning",
         },
         "boon":
         {
            name: "Boon",
            key: "boon",
         },
         "bree":
         {
            name: "Bree",
            key: "bree",
         },
         "burglar":
         {
            name: "Burglar",
            key: "burglar",
         },
         "clue":
         {
            name: "Clue",
            key: "clue",
         },
         "condition":
         {
            name: "Condition",
            key: "condition",
         },
         "craftsman":
         {
            name: "Craftsman",
            key: "craftsman",
         },
         "creature":
         {
            name: "Creature",
            key: "creature",
         },
         "dale":
         {
            name: "Dale",
            key: "dale",
         },
         "disaster":
         {
            name: "Disaster",
            key: "disaster",
         },
         "dolGuldur":
         {
            name: "Dol Guldur",
            key: "dolGuldur",
         },
         "dunedain":
         {
            name: "Dúnedain",
            key: "dunedain",
         },
         "dungeon":
         {
            name: "Dungeon",
            key: "dungeon",
         },
         "dwarf":
         {
            name: "Dwarf",
            key: "dwarf",
         },
         "eagle":
         {
            name: "Eagle",
            key: "eagle",
         },
         "ent":
         {
            name: "Ent",
            key: "ent",
         },
         "esgaroth":
         {
            name: "Esgaroth",
            key: "esgaroth",
         },
         "forest":
         {
            name: "Forest",
            key: "forest",
         },
         "goblin":
         {
            name: "Goblin",
            key: "goblin",
         },
         "gondor":
         {
            name: "Gondor",
            key: "gondor",
         },
         "gossip":
         {
            name: "Gossip",
            key: "gossip",
         },
         "healer":
         {
            name: "Healer",
            key: "healer",
         },
         "hobbit":
         {
            name: "Hobbit",
            key: "hobbit",
         },
         "insect":
         {
            name: "Insect",
            key: "insect",
         },
         "instrument":
         {
            name: "Instrument",
            key: "instrument",
         },
         "isengard":
         {
            name: "Isengard",
            key: "isengard",
         },
         "istari":
         {
            name: "Istari",
            key: "istari",
         },
         "item":
         {
            name: "Item",
            key: "item",
         },
         "marshland":
         {
            name: "Marshland",
            key: "marshland",
         },
         "mathom":
         {
            name: "Mathom",
            key: "mathom",
         },
         "mearas":
         {
            name: "Mearas",
            key: "mearas",
         },
         "minstrel":
         {
            name: "Minstrel",
            key: "minstrel",
         },
         "mordor":
         {
            name: "Mordor",
            key: "mordor",
         },
         "mount":
         {
            name: "Mount",
            key: "mount",
         },
         "mountain":
         {
            name: "Mountain",
            key: "mountain",
         },
         "nazgul":
         {
            name: "Nazgûl",
            key: "nazgul",
         },
         "noble":
         {
            name: "Noble",
            key: "noble",
         },
         "noldor":
         {
            name: "Noldor",
            key: "noldor",
         },
         "orc":
         {
            name: "Orc",
            key: "orc",
         },
         "outlands":
         {
            name: "Outlands",
            key: "outlands",
         },
         "pipe":
         {
            name: "Pipe",
            key: "pipe",
         },
         "pony":
         {
            name: "Pony",
            key: "pony",
         },
         "ranger":
         {
            name: "Ranger",
            key: "ranger",
         },
         "record":
         {
            name: "Record",
            key: "record",
         },
         "ring":
         {
            name: "Ring",
            key: "ring",
         },
         "ringBearer":
         {
            name: "Ring Bearer",
            key: "ringBearer",
         },
         "riverland":
         {
            name: "Riverland",
            key: "riverland",
         },
         "rohan":
         {
            name: "Rohan",
            key: "rohan",
         },
         "scout":
         {
            name: "Scout",
            key: "scout",
         },
         "signal":
         {
            name: "Signal",
            key: "signal",
         },
         "silvan":
         {
            name: "Silvan",
            key: "silvan",
         },
         "skill":
         {
            name: "Skill",
            key: "skill",
         },
         "song":
         {
            name: "Song",
            key: "song",
         },
         "spider":
         {
            name: "Spider",
            key: "spider",
         },
         "staff":
         {
            name: "Staff",
            key: "staff",
         },
         "steward":
         {
            name: "Steward",
            key: "steward",
         },
         "stronghold":
         {
            name: "Stronghold",
            key: "stronghold",
         },
         "title":
         {
            name: "Title",
            key: "title",
         },
         "trap":
         {
            name: "Trap",
            key: "trap",
         },
         "troll":
         {
            name: "Troll",
            key: "troll",
         },
         "undead":
         {
            name: "Undead",
            key: "undead",
         },
         "warrior":
         {
            name: "Warrior",
            key: "warrior",
         },
         "wasteland":
         {
            name: "Wasteland",
            key: "wasteland",
         },
         "weapon":
         {
            name: "Weapon",
            key: "weapon",
         },
         "woodman":
         {
            name: "Woodman",
            key: "woodman",
         },
      },

      keys: function()
      {
         return Object.getOwnPropertyNames(Trait.properties);
      },
   };

   if (Object.freeze)
   {
      Object.freeze(Trait);
   }

   return Trait;
});
