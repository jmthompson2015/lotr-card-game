/*
 * see http://hallofbeorn.com/LotR/Scenarios/
 * see http://ringsdb.com/search
 */
import CardSetType from "./CardSetType.js";

var CardSet = {
   // Main line.
   CORE: "core",
   SHADOWS_OF_MIRKWOOD: "shadowsOfMirkwood",
   KHAZAD_DUM: "khazadDum",
   DWARROWDELF: "dwarrowdelf",
   HEIRS_OF_NUMENOR: "heirsOfNumenor",
   AGAINST_THE_SHADOW: "againstTheShadow",
   THE_VOICE_OF_ISENGARD: "theVoiceOfIsengard",
   THE_RING_MAKER: "theRingMaker",
   THE_LOST_REALM: "theLostRealm",
   ANGMAR_AWAKENED: "angmarAwakened",
   THE_GREY_HAVENS: "theGreyHavens",
   DREAM_CHASER: "dreamChaser",
   THE_SANDS_OF_HARAD: "theSandsOfHarad",
   HARADRIM: "haradrim",

   // Saga.
   OVER_HILL_AND_UNDER_HILL: "overHillAndUnderHill",
   ON_THE_DOORSTEP: "onTheDoorstep",
   THE_BLACK_RIDERS: "theBlackRiders",
   THE_ROAD_DARKENS: "theRoadDarkens",
   THE_TREASON_OF_SARUMAN: "theTreasonOfSaruman",
   THE_LAND_OF_SHADOW: "theLandOfShadow",
   THE_FLAME_OF_THE_WEST: "theFlameOfTheWest",
   THE_MOUNTAIN_OF_FIRE: "theMountainOfFire",

   properties:
   {
      // Main line.
      "core":
      {
         name: "Core Set",
         number: 1,
         typeKey: CardSetType.CORE,
         key: "core",
      },
      "shadowsOfMirkwood":
      {
         name: "Shadows of Mirkwood",
         number: 2,
         shortName: "SoM",
         typeKey: CardSetType.CYCLE,
         key: "shadowsOfMirkwood",
      },
      "khazadDum":
      {
         name: "Khazad-Dûm",
         number: 3,
         shortName: "KD",
         typeKey: CardSetType.DELUXE,
         key: "khazadDum",
      },
      "dwarrowdelf":
      {
         name: "Dwarrowdelf",
         number: 4,
         typeKey: CardSetType.CYCLE,
         key: "dwarrowdelf",
      },
      "heirsOfNumenor":
      {
         name: "Heirs of Númenor",
         number: 5,
         shortName: "HoN",
         typeKey: CardSetType.DELUXE,
         key: "heirsOfNumenor",
      },
      "againstTheShadow":
      {
         name: "Against the Shadow",
         number: 6,
         typeKey: CardSetType.CYCLE,
         key: "againstTheShadow",
      },
      "theVoiceOfIsengard":
      {
         name: "The Voice of Isengard",
         number: 7,
         shortName: "VoI",
         typeKey: CardSetType.DELUXE,
         key: "theVoiceOfIsengard",
      },
      "theRingMaker":
      {
         name: "The Ring-Maker",
         number: 8,
         typeKey: CardSetType.CYCLE,
         key: "theRingMaker",
      },
      "theLostRealm":
      {
         name: "The Lost Realm",
         number: 9,
         shortName: "MEC38",
         typeKey: CardSetType.DELUXE,
         key: "theLostRealm",
      },
      "angmarAwakened":
      {
         name: "Angmar Awakened",
         number: 10,
         typeKey: CardSetType.CYCLE,
         key: "angmarAwakened",
      },
      "theGreyHavens":
      {
         name: "The Grey Havens",
         number: 11,
         shortName: "MEC47",
         typeKey: CardSetType.DELUXE,
         key: "theGreyHavens",
      },
      "dreamChaser":
      {
         name: "Dream-chaser",
         number: 12,
         typeKey: CardSetType.CYCLE,
         key: "dreamChaser",
      },
      "theSandsOfHarad":
      {
         name: "The Sands of Harad",
         number: 13,
         typeKey: CardSetType.DELUXE,
         key: "theSandsOfHarad",
      },
      "haradrim":
      {
         name: "Haradrim",
         number: 14,
         typeKey: CardSetType.CYCLE,
         key: "haradrim",
      },

      // Saga.
      "overHillAndUnderHill":
      {
         name: "Over Hill and Under Hill",
         number: 101,
         shortName: "OHaUH",
         typeKey: CardSetType.SAGA,
         key: "overHillAndUnderHill",
      },
      "onTheDoorstep":
      {
         name: "On the Doorstep",
         number: 102,
         shortName: "OtD",
         typeKey: CardSetType.SAGA,
         key: "onTheDoorstep",
      },
      "theBlackRiders":
      {
         name: "The Black Riders",
         number: 103,
         shortName: "TBR",
         typeKey: CardSetType.SAGA,
         key: "theBlackRiders",
      },
      "theRoadDarkens":
      {
         name: "The Road Darkens",
         number: 104,
         shortName: "MEC34",
         typeKey: CardSetType.SAGA,
         key: "theRoadDarkens",
      },
      "theTreasonOfSaruman":
      {
         name: "The Treason of Saruman",
         number: 105,
         shortName: "MEC45",
         typeKey: CardSetType.SAGA,
         key: "theTreasonOfSaruman",
      },
      "theLandOfShadow":
      {
         name: "The Land of Shadow",
         number: 106,
         shortName: "MEC46",
         typeKey: CardSetType.SAGA,
         key: "theLandOfShadow",
      },
      "theFlameOfTheWest":
      {
         name: "The Flame of the West",
         number: 107,
         typeKey: CardSetType.SAGA,
         key: "theFlameOfTheWest",
      },
      "theMountainOfFire":
      {
         name: "The Mountain of Fire",
         number: 108,
         typeKey: CardSetType.SAGA,
         key: "theMountainOfFire",
      },
   },

   keys: function()
   {
      return Object.getOwnPropertyNames(CardSet.properties);
   },
};

CardSet.keys().forEach(function(cardKey)
{
   var card = CardSet.properties[cardKey];
   card.type = CardSetType.properties[card.typeKey];

   var imagePath;

   switch (cardKey)
   {
      case CardSet.CORE:
         imagePath = "Core-Set/";
         break;
      case CardSet.KHAZAD_DUM:
         imagePath = "Khazad-dum/";
         break;
      case CardSet.ON_THE_DOORSTEP:
         imagePath = "The-Hobbit-On-the-Doorstep/";
         break;
      case CardSet.OVER_HILL_AND_UNDER_HILL:
         imagePath = "The-Hobbit-Over-Hill-and-Under-Hill/";
         break;
      default:
         imagePath = card.name + "/";
         imagePath = imagePath.replace(/ /g, "-");
         imagePath = imagePath.replace(/ú/g, "u");
   }

   card.imagePath = imagePath;
});

if (Object.freeze)
{
   Object.freeze(CardSet);
}

export default CardSet;