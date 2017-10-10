"use strict";

define(["artifact/js/CardSet", "artifact/js/CardSubset", "artifact/js/CardType", "artifact/js/ImageNameCreator", "artifact/js/Sphere", "artifact/js/Trait"],
   function(CardSet, CardSubset, CardType, ImageNameCreator, Sphere, Trait)
   {
      var EventCard = {
         A_ELBERETH_GILTHONIEL: "aElberethGilthoniel",
         A_GOOD_HARVEST: "aGoodHarvest",
         A_LIGHT_IN_THE_DARK: "aLightInTheDark",
         A_TEST_OF_WILL: "aTestOfWill",
         A_WATCHFUL_PEACE: "aWatchfulPeace",
         ADVANCE_WARNING: "advanceWarning",
         AGAINST_THE_SHADOW: "againstTheShadow",
         ASTONISHING_SPEED: "astonishingSpeed",
         BEHIND_STRONG_WALLS: "behindStrongWalls",
         BOOMED_AND_TRUMPETED: "boomedAndTrumpeted",
         CAMPFIRE_TALES: "campfireTales",
         CHARGE_OF_THE_ROHIRRIM: "chargeOfTheRohirrim",
         CHILDREN_OF_THE_SEA: "childrenOfTheSea",
         CLOSE_CALL: "closeCall",
         COURAGE_AWAKENED: "courageAwakened",
         DAERONS_RUNES: "daeronsRunes",
         DAWN_TAKE_YOU_ALL: "dawnTakeYouAll",
         DEEP_KNOWLEDGE: "deepKnowledge",
         DESCENDANTS_OF_KINGS: "descendantsOfKings",
         DESPERATE_ALLIANCE: "desperateAlliance",
         DISTANT_STARS: "distantStars",
         DONT_BE_HASTY: "dontBeHasty",
         DOOM_HANGS_STILL: "doomHangsStill",
         DUNEDAIN_MESSAGE: "dunedainMessage",
         DWARVEN_TOMB: "dwarvenTomb",
         ELRONDS_COUNSEL: "elrondsCounsel",
         ELVEN_LIGHT: "elvenLight",
         EXPERT_TRACKERS: "expertTrackers",
         FAIR_AND_PERILOUS: "fairAndPerilous",
         FEIGNED_VOICES: "feignedVoices",
         FEINT: "feint",
         FLAME_OF_ANOR: "flameOfAnor",
         FOLLOW_ME: "followMe",
         FOR_GONDOR: "forGondor",
         FOREST_PATROL: "forestPatrol",
         FORTH_EORLINGAS: "forthEorlingas",
         FREE_TO_CHOOSE: "freeToChoose",
         FRESH_TRACKS: "freshTracks",
         FRODOS_INTUITION: "frodosIntuition",
         GAINING_STRENGTH: "gainingStrength",
         GILDORS_COUNSEL: "gildorsCounsel",
         GONDORIAN_DISCIPLINE: "gondorianDiscipline",
         GRAVE_CAIRN: "graveCairn",
         HAIL_OF_STONES: "hailOfStones",
         HALFLING_DETERMINATION: "halflingDetermination",
         HANDS_UPON_THE_BOW: "handsUponTheBow",
         HASTY_STROKE: "hastyStroke",
         HEAVY_STROKE: "heavyStroke",
         HIDDEN_CACHE: "hiddenCache",
         HOBBIT_SENSE: "hobbitSense",
         HOLD_YOUR_GROUND: "holdYourGround",
         HOPE_REKINDLED: "hopeRekindled",
         HORNS_CRY: "hornsCry",
         HOUR_OF_WRATH: "hourOfWrath",
         IN_THE_SHADOWS: "inTheShadows",
         INFIGHTING: "infighting",
         ISLAND_AMID_PERILS: "islandAmidPerils",
         KEEN_AS_LANCES: "keenAsLances",
         LAY_OF_NIMRODEL: "layOfNimrodel",
         LEAVE_NO_TRACE: "leaveNoTrace",
         LEGACY_OF_NUMENOR: "legacyOfNumenor",
         LIGHT_THE_BEACONS: "lightTheBeacons",
         LORDS_OF_THE_ELDAR: "lordsOfTheEldar",
         LURE_OF_MORIA: "lureOfMoria",
         MEN_OF_THE_WEST: "menOfTheWest",
         MENELDORS_FLIGHT: "meneldorsFlight",
         MESSAGE_FROM_ELROND: "messageFromElrond",
         MITHRANDIRS_ADVICE: "mithrandirsAdvice",
         MUSTERING_THE_ROHIRRIM: "musteringTheRohirrim",
         MUTUAL_ACCORD: "mutualAccord",
         NEEDFUL_TO_KNOW: "needfulToKnow",
         NOISELESS_MOVEMENT: "noiselessMovement",
         NONE_RETURN: "noneReturn",
         OUT_OF_SIGHT: "outOfSight",
         OUT_OF_THE_WILD: "outOfTheWild",
         PARTING_GIFTS: "partingGifts",
         PEACE_AND_THOUGHT: "peaceAndThought",
         POWER_OF_ORTHANC: "powerOfOrthanc",
         PURSUING_THE_ENEMY: "pursuingTheEnemy",
         QUICK_EARS: "quickEars",
         QUICK_STRIKE: "quickStrike",
         RADAGASTS_CUNNING: "radagastsCunning",
         RALLYING_CRY: "rallyingCry",
         RANGER_SUMMONS: "rangerSummons",
         RAVENS_OF_THE_MOUNTAIN: "ravensOfTheMountain",
         REAR_GUARD: "rearGuard",
         RENEWED_FRIENDSHIP: "renewedFriendship",
         RIDE_THEM_DOWN: "rideThemDown",
         RIDE_TO_RUIN: "rideToRuin",
         REINFORCEMENTS: "reinforcements",
         RISK_SOME_LIGHT: "riskSomeLight",
         RUMOUR_FROM_THE_EARTH: "rumourFromTheEarth",
         SECOND_BREAKFAST: "secondBreakfast",
         SHADOW_OF_THE_PAST: "shadowOfThePast",
         SHADOWS_GIVE_WAY: "shadowsGiveWay",
         SHORT_CUT: "shortCut",
         SMALL_TARGET: "smallTarget",
         SMOKE_RINGS: "smokeRings",
         SNEAK_ATTACK: "sneakAttack",
         SPEAK_YOUR_PROMISE: "speakYourPromise",
         STAND_AND_FIGHT: "standAndFight",
         STRAIGHT_SHOT: "straightShot",
         STRENGTH_OF_ARMS: "strengthOfArms",
         STRIDERS_PATH: "stridersPath",
         SWIFT_AND_SILENT: "swiftAndSilent",
         SWIFT_STRIKE: "swiftStrike",
         TAKE_NO_NOTICE: "takeNoNotice",
         TAKING_INITIATIVE: "takingInitiative",
         TALE_OF_TINUVIEL: "taleOfTinuviel",
         TASTE_IT_AGAIN: "tasteItAgain",
         THE_DOOR_IS_CLOSED: "theDoorIsClosed",
         THE_EAGLES_ARE_COMING: "theEaglesAreComing",
         THE_END_COMES: "theEndComes",
         THE_GALADHRIMS_GREETING: "theGaladhrimsGreeting",
         THE_HAMMER_STROKE: "theHammerStroke",
         THE_LUCKY_NUMBER: "theLuckyNumber",
         THE_SEEING_STONE: "theSeeingStone",
         THE_TREE_PEOPLE: "theTreePeople",
         THE_WHITE_COUNCIL: "theWhiteCouncil",
         THE_WIZARDS_VOICE: "theWizardsVoice",
         TIGHTEN_OUR_BELTS: "tightenOurBelts",
         TIMELY_AID: "timelyAid",
         TIRELESS_HUNTERS: "tirelessHunters",
         TO_ME_O_MY_KINSFOLK: "toMeOMyKinsfolk",
         TO_THE_EYRIE: "toTheEyrie",
         TRAINED_FOR_WAR: "trainedForWar",
         UNSEEN_STRIKE: "unseenStrike",
         VALIANT_SACRIFICE: "valiantSacrifice",
         WATERS_OF_NIMRODEL: "watersOfNimrodel",
         WE_ARE_NOT_IDLE: "weAreNotIdle",
         WE_DO_NOT_SLEEP: "weDoNotSleep",
         WEALTH_OF_GONDOR: "wealthOfGondor",
         WELL_EQUIPPED: "wellEquipped",
         WORD_OF_COMMAND: "wordOfCommand",

         properties:
         {
            "aElberethGilthoniel":
            {
               name: "A Elbereth! Gilthoniel!",
               cost: 4,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
               // This is spelled wrong at cardgamedb.com
               image: "http://www.cardgamedb.com/forums/uploads/lotr/ffg_o-elbereth-gilthonial-saf.jpg",
               key: "aElberethGilthoniel",
            },
            "aGoodHarvest":
            {
               name: "A Good Harvest",
               cost: 0,
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS1_THE_STEWARDS_FEAR,
               key: "aGoodHarvest",
            },
            "aLightInTheDark":
            {
               name: "A Light in the Dark",
               cost: 2,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.CORE,
               key: "aLightInTheDark",
            },
            "aTestOfWill":
            {
               name: "A Test of Will",
               cost: 1,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.CORE,
               key: "aTestOfWill",
            },
            "aWatchfulPeace":
            {
               name: "A Watchful Peace",
               cost: 1,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.HEIRS_OF_NUMENOR,
               key: "aWatchfulPeace",
            },
            "advanceWarning":
            {
               name: "Advance Warning",
               cost: 2,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS2_THE_DRUADAN_FOREST,
               key: "advanceWarning",
            },
            "againstTheShadow":
            {
               name: "Against the Shadow",
               cost: 2,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS2_THE_DRUADAN_FOREST,
               key: "againstTheShadow",
            },
            "astonishingSpeed":
            {
               name: "Astonishing Speed",
               cost: 3,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM6_RETURN_TO_MIRKWOOD,
               key: "astonishingSpeed",
            },
            "behindStrongWalls":
            {
               name: "Behind Strong Walls",
               cost: 1,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.HEIRS_OF_NUMENOR,
               key: "behindStrongWalls",
            },
            "boomedAndTrumpeted":
            {
               name: "Boomed and Trumpeted",
               cost: 1,
               traitKeys: [Trait.ENT],
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA2_ESCAPE_FROM_MOUNT_GRAM,
               cardSetNumber: 32,
               key: "boomedAndTrumpeted",
            },
            "campfireTales":
            {
               name: "Campfire Tales",
               cost: 1,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM1_THE_HUNT_FOR_GOLLUM,
               key: "campfireTales",
            },
            "chargeOfTheRohirrim":
            {
               name: "Charge of the Rohirrim",
               cost: 2,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM5_CELEBRIMBORS_SECRET,
               cardSetNumber: 116,
               key: "chargeOfTheRohirrim",
            },
            "childrenOfTheSea":
            {
               name: "Children of the Sea",
               cost: 0,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS5_THE_BLOOD_OF_GONDOR,
               key: "childrenOfTheSea",
            },
            "closeCall":
            {
               name: "Close Call",
               cost: 0,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM1_THE_DUNLAND_TRAP,
               cardSetNumber: 5,
               key: "closeCall",
            },
            "courageAwakened":
            {
               name: "Courage Awakened",
               cost: 1,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM3_TROUBLE_IN_THARBAD,
               cardSetNumber: 61,
               key: "courageAwakened",
            },
            "daeronsRunes":
            {
               name: "Daeron's Runes",
               cost: 0,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D5_FOUNDATIONS_OF_STONE,
               key: "daeronsRunes",
            },
            "dawnTakeYouAll":
            {
               name: "Dawn Take You All",
               cost: 2,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM6_RETURN_TO_MIRKWOOD,
               key: "dawnTakeYouAll",
            },
            "deepKnowledge":
            {
               name: "Deep Knowledge",
               cost: 0,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.THE_VOICE_OF_ISENGARD,
               key: "deepKnowledge",
            },
            "descendantsOfKings":
            {
               name: "Descendants of Kings",
               cost: 1,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA2_ESCAPE_FROM_MOUNT_GRAM,
               cardSetNumber: 30,
               key: "descendantsOfKings",
            },
            "desperateAlliance":
            {
               name: "Desperate Alliance",
               cost: 0,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.ON_THE_DOORSTEP,
               key: "desperateAlliance",
            },
            "distantStars":
            {
               name: "Distant Stars",
               cost: 0,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA2_ESCAPE_FROM_MOUNT_GRAM,
               cardSetNumber: 36,
               key: "distantStars",
            },
            "dontBeHasty":
            {
               name: "Don't Be Hasty!",
               cost: 0,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM6_THE_ANTLERED_CROWN,
               cardSetNumber: 144,
               key: "dontBeHasty",
            },
            "doomHangsStill":
            {
               name: "Doom Hangs Still",
               cost: 5,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA5_THE_BATTLE_OF_CARN_DUM,
               cardSetNumber: 117,
               key: "doomHangsStill",
            },
            "dunedainMessage":
            {
               name: "Dúnedain Message",
               cost: 1,
               traitKeys: [Trait.SIGNAL],
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA3_ACROSS_THE_ETTENMOORS,
               cardSetNumber: 56,
               key: "dunedainMessage",
            },
            "dwarvenTomb":
            {
               name: "Dwarven Tomb",
               cost: 1,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.CORE,
               key: "dwarvenTomb",
            },
            "elrondsCounsel":
            {
               name: "Elrond's Counsel",
               cost: 0,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D3_THE_WATCHER_IN_THE_WATER,
               key: "elrondsCounsel",
            },
            "elvenLight":
            {
               name: "Elven-light",
               cost: 1,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA6_THE_DREAD_REALM,
               key: "elvenLight",
            },
            "expertTrackers":
            {
               name: "Expert Trackers",
               cost: 0,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.THE_LOST_REALM,
               cardSetNumber: 9,
               key: "expertTrackers",
            },
            "fairAndPerilous":
            {
               name: "Fair and Perilous",
               cost: 1,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA3_ACROSS_THE_ETTENMOORS,
               cardSetNumber: 60,
               key: "fairAndPerilous",
            },
            "feignedVoices":
            {
               name: "Feigned Voices",
               cost: 0,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM2_THE_THREE_TRIALS,
               cardSetNumber: 27,
               key: "feignedVoices",
            },
            "feint":
            {
               name: "Feint",
               cost: 1,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.CORE,
               key: "feint",
            },
            "flameOfAnor":
            {
               name: "Flame of Anor",
               cost: 1,
               traitKeys: [Trait.SPELL],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.THE_ROAD_DARKENS,
               cardSetNumber: "007",
               key: "flameOfAnor",
            },
            "followMe":
            {
               name: "Follow Me!",
               cost: 1,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM4_THE_NIN_IN_EILPH,
               cardSetNumber: 85,
               key: "followMe",
            },
            "forGondor":
            {
               name: "For Gondor!",
               cost: 2,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.CORE,
               key: "forGondor",
            },
            "forestPatrol":
            {
               name: "Forest Patrol",
               cost: 1,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS4_ASSAULT_ON_OSGILIATH,
               key: "forestPatrol",
            },
            "forthEorlingas":
            {
               name: "Forth Eorlingas!",
               cost: 2,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS6_THE_MORGUL_VALE,
               key: "forthEorlingas",
            },
            "freeToChoose":
            {
               name: "Free to Choose",
               cost: 0,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM3_TROUBLE_IN_THARBAD,
               cardSetNumber: 62,
               key: "freeToChoose",
            },
            "freshTracks":
            {
               name: "Fresh Tracks",
               cost: 1,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D4_THE_LONG_DARK,
               key: "freshTracks",
            },
            "frodosIntuition":
            {
               name: "Frodo's Intuition",
               cost: 2,
               sphereKey: Sphere.FELLOWSHIP,
               cardSetKey: CardSet.THE_BLACK_RIDERS,
               key: "frodosIntuition",
            },
            "gainingStrength":
            {
               name: "Gaining Strength",
               cost: 0,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS1_THE_STEWARDS_FEAR,
               key: "gainingStrength",
            },
            "gildorsCounsel":
            {
               name: "Gildor's Counsel",
               cost: 3,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM4_THE_HILLS_OF_EMYN_MUIL,
               key: "gildorsCounsel",
            },
            "gondorianDiscipline":
            {
               name: "Gondorian Discipline",
               cost: 0,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS3_ENCOUNTER_AT_AMON_DIN,
               key: "gondorianDiscipline",
            },
            "graveCairn":
            {
               name: "Grave Cairn",
               cost: 1,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D3_THE_WATCHER_IN_THE_WATER,
               key: "graveCairn",
            },
            "hailOfStones":
            {
               name: "Hail of Stones",
               cost: 1,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D2_ROAD_TO_RIVENDELL,
               key: "hailOfStones",
            },
            "halflingDetermination":
            {
               name: "Halfling Determination",
               cost: 1,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.THE_BLACK_RIDERS,
               key: "halflingDetermination",
            },
            "handsUponTheBow":
            {
               name: "Hands Upon the Bow",
               cost: 1,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
               key: "handsUponTheBow",
            },
            "hastyStroke":
            {
               name: "Hasty Stroke",
               cost: 1,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.CORE,
               key: "hastyStroke",
            },
            "heavyStroke":
            {
               name: "Heavy Stroke",
               cost: 1,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D5_FOUNDATIONS_OF_STONE,
               key: "heavyStroke",
            },
            "hiddenCache":
            {
               name: "Hidden Cache",
               cost: 0,
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS6_THE_MORGUL_VALE,
               key: "hiddenCache",
            },
            "hobbitSense":
            {
               name: "Hobbit-Sense",
               cost: 2,
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS3_ENCOUNTER_AT_AMON_DIN,
               key: "hobbitSense",
            },
            "holdYourGround":
            {
               name: "Hold Your Ground!",
               cost: 1,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA5_THE_BATTLE_OF_CARN_DUM,
               cardSetNumber: 119,
               key: "holdYourGround",
            },
            "hopeRekindled":
            {
               name: "Hope Rekindled",
               cost: 0,
               traitKeys: [Trait.SONG],
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA3_ACROSS_THE_ETTENMOORS,
               cardSetNumber: 63,
               key: "hopeRekindled",
            },
            "hornsCry":
            {
               name: "Horn's Cry",
               cost: 2,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA4_THE_TREACHERY_OF_RHUDAUR,
               cardSetNumber: 88,
               key: "hornsCry",
            },
            "hourOfWrath":
            {
               name: "Hour of Wrath",
               cost: 4,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA6_THE_DREAD_REALM,
               key: "hourOfWrath",
            },
            "inTheShadows":
            {
               name: "In the Shadows",
               cost: 3,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.THE_LAND_OF_SHADOW,
               cardSetNumber: 12,
               key: "inTheShadows",
            },
            "infighting":
            {
               name: "Infighting",
               cost: 1,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM3_A_JOURNEY_TO_RHOSGOBEL,
               key: "infighting",
            },
            "islandAmidPerils":
            {
               name: "Island Amid Perils",
               cost: 0,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM4_THE_NIN_IN_EILPH,
               cardSetNumber: 90,
               key: "islandAmidPerils",
            },
            "keenAsLances":
            {
               name: "Keen as Lances",
               cost: 5,
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA2_ESCAPE_FROM_MOUNT_GRAM,
               cardSetNumber: 37,
               key: "keenAsLances",
            },
            "layOfNimrodel":
            {
               name: "Lay of Nimrodel",
               cost: 1,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS6_THE_MORGUL_VALE,
               key: "layOfNimrodel",
            },
            "leaveNoTrace":
            {
               name: "Leave No Trace",
               cost: 1,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA2_ESCAPE_FROM_MOUNT_GRAM,
               cardSetNumber: 35,
               key: "leaveNoTrace",
            },
            "legacyOfNumenor":
            {
               name: "Legacy of Numenor",
               cost: 0,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.THE_VOICE_OF_ISENGARD,
               key: "legacyOfNumenor",
            },
            "lightTheBeacons":
            {
               name: "Light the Beacons",
               cost: 5,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.HEIRS_OF_NUMENOR,
               key: "lightTheBeacons",
            },
            "lordsOfTheEldar":
            {
               name: "Lords of the Eldar",
               cost: 3,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA5_THE_BATTLE_OF_CARN_DUM,
               cardSetNumber: 121,
               key: "lordsOfTheEldar",
            },
            "lureOfMoria":
            {
               name: "Lure of Moria",
               cost: 3,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D2_ROAD_TO_RIVENDELL,
               key: "lureOfMoria",
            },
            "menOfTheWest":
            {
               name: "Men of the West",
               cost: undefined,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS4_ASSAULT_ON_OSGILIATH,
               key: "menOfTheWest",
            },
            "meneldorsFlight":
            {
               name: "Meneldor's Flight",
               cost: 0,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM4_THE_HILLS_OF_EMYN_MUIL,
               key: "meneldorsFlight",
            },
            "messageFromElrond":
            {
               name: "Message from Elrond",
               cost: 0,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM2_THE_THREE_TRIALS,
               cardSetNumber: 32,
               key: "messageFromElrond",
            },
            "mithrandirsAdvice":
            {
               name: "Mithrandir's Advice",
               cost: 0,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS1_THE_STEWARDS_FEAR,
               key: "mithrandirsAdvice",
            },
            "musteringTheRohirrim":
            {
               name: "Mustering the Rohirrim",
               cost: 1,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM1_THE_HUNT_FOR_GOLLUM,
               key: "musteringTheRohirrim",
            },
            "mutualAccord":
            {
               name: "Mutual Accord",
               cost: 0,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.HEIRS_OF_NUMENOR,
               key: "mutualAccord",
            },
            "needfulToKnow":
            {
               name: "Needful to Know",
               cost: 2,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D1_THE_REDHORN_GATE,
               key: "needfulToKnow",
            },
            "noiselessMovement":
            {
               name: "Noiseless Movement",
               cost: 1,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM2_THE_THREE_TRIALS,
               cardSetNumber: 33,
               key: "noiselessMovement",
            },
            "noneReturn":
            {
               name: "None Return",
               cost: 1,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA3_ACROSS_THE_ETTENMOORS,
               cardSetNumber: 62,
               key: "noneReturn",
            },
            "outOfSight":
            {
               name: "Out of Sight",
               cost: 5,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D4_THE_LONG_DARK,
               key: "outOfSight",
            },
            "outOfTheWild":
            {
               name: "Out of the Wild",
               cost: 3,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D2_ROAD_TO_RIVENDELL,
               key: "outOfTheWild",
            },
            "partingGifts":
            {
               name: "Parting Gifts",
               cost: 0,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM3_A_JOURNEY_TO_RHOSGOBEL,
               key: "partingGifts",
            },
            "peaceAndThought":
            {
               name: "Peace, and Thought",
               cost: 1,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
               key: "peaceAndThought",
            },
            "powerOfOrthanc":
            {
               name: "Power of Orthanc",
               cost: 0,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.THE_VOICE_OF_ISENGARD,
               key: "powerOfOrthanc",
            },
            "pursuingTheEnemy":
            {
               name: "Pursuing the Enemy",
               cost: 0,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM3_TROUBLE_IN_THARBAD,
               cardSetNumber: 60,
               key: "pursuingTheEnemy",
            },
            "quickEars":
            {
               name: "Quick Ears",
               cost: 1,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA5_THE_BATTLE_OF_CARN_DUM,
               cardSetNumber: 123,
               key: "quickEars",
            },
            "quickStrike":
            {
               name: "Quick Strike",
               cost: 1,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.CORE,
               key: "quickStrike",
            },
            "radagastsCunning":
            {
               name: "Radagast's Cunning",
               cost: 1,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.CORE,
               key: "radagastsCunning",
            },
            "rallyingCry":
            {
               name: "Rallying Cry",
               cost: 2,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA1_THE_WASTES_OF_ERIADOR,
               cardSetNumber: 3,
               key: "rallyingCry",
            },
            "rangerSummons":
            {
               name: "Ranger Summons",
               cost: 1,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.THE_LOST_REALM,
               cardSetNumber: 7,
               key: "rangerSummons",
            },
            "ravensOfTheMountain":
            {
               name: "Ravens of the Mountain",
               cost: 1,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.ON_THE_DOORSTEP,
               key: "ravensOfTheMountain",
            },
            "rearGuard":
            {
               name: "Rear Guard",
               cost: 1,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM4_THE_HILLS_OF_EMYN_MUIL,
               key: "rearGuard",
            },
            "reinforcements":
            {
               name: "Reinforcements",
               cost: 3,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA4_THE_TREACHERY_OF_RHUDAUR,
               cardSetNumber: 85,
               key: "reinforcements",
            },
            "renewedFriendship":
            {
               name: "Renewed Friendship",
               cost: 0,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D1_THE_REDHORN_GATE,
               key: "renewedFriendship",
            },
            "rideThemDown":
            {
               name: "Ride Them Down",
               cost: 2,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM6_THE_ANTLERED_CROWN,
               cardSetNumber: 142,
               key: "rideThemDown",
            },
            "rideToRuin":
            {
               name: "Ride to Ruin",
               cost: 1,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM4_THE_HILLS_OF_EMYN_MUIL,
               key: "rideToRuin",
            },
            "riskSomeLight":
            {
               name: "Risk Some Light",
               cost: 3,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
               key: "riskSomeLight",
            },
            "rumourFromTheEarth":
            {
               name: "Rumour from the Earth",
               cost: 0,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM6_RETURN_TO_MIRKWOOD,
               key: "rumourFromTheEarth",
            },
            "secondBreakfast":
            {
               name: "Second Breakfast",
               cost: 1,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM2_CONFLICT_AT_THE_CARROCK,
               key: "secondBreakfast",
            },
            "shadowOfThePast":
            {
               name: "Shadow of the Past",
               cost: 2,
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM6_RETURN_TO_MIRKWOOD,
               key: "shadowOfThePast",
            },
            "shadowsGiveWay":
            {
               name: "Shadows Give Way",
               cost: 3,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM6_THE_ANTLERED_CROWN,
               cardSetNumber: 143,
               key: "shadowsGiveWay",
            },
            "shortCut":
            {
               name: "Short Cut",
               cost: 1,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D3_THE_WATCHER_IN_THE_WATER,
               key: "shortCut",
            },
            "smallTarget":
            {
               name: "Small Target",
               cost: 1,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS3_ENCOUNTER_AT_AMON_DIN,
               key: "smallTarget",
            },
            "smokeRings":
            {
               name: "Smoke Rings",
               cost: 2,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.THE_BLACK_RIDERS,
               key: "smokeRings",
            },
            "sneakAttack":
            {
               name: "Sneak Attack",
               cost: 1,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.CORE,
               key: "sneakAttack",
            },
            "speakYourPromise":
            {
               name: "Speak Your Promise!",
               cost: 1,
               sphereKey: Sphere.FELLOWSHIP,
               cardSetKey: CardSet.THE_LAND_OF_SHADOW,
               cardSetNumber: 13,
               key: "speakYourPromise",
            },
            "standAndFight":
            {
               name: "Stand and Fight",
               // cost: 1,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.CORE,
               key: "standAndFight",
            },
            "straightShot":
            {
               name: "Straight Shot",
               cost: 0,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.ON_THE_DOORSTEP,
               key: "straightShot",
            },
            "strengthOfArms":
            {
               name: "Strength of Arms",
               cost: 2,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS2_THE_DRUADAN_FOREST,
               key: "strengthOfArms",
            },
            "stridersPath":
            {
               name: "Strider's Path",
               cost: 1,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM1_THE_HUNT_FOR_GOLLUM,
               key: "stridersPath",
            },
            "swiftAndSilent":
            {
               name: "Swift and Silent",
               cost: 1,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM1_THE_DUNLAND_TRAP,
               cardSetNumber: 3,
               key: "swiftAndSilent",
            },
            "swiftStrike":
            {
               name: "Swift Strike",
               cost: 2,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.CORE,
               key: "swiftStrike",
            },
            "takeNoNotice":
            {
               name: "Take No Notice",
               cost: 3,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.THE_BLACK_RIDERS,
               key: "takeNoNotice",
            },
            "takingInitiative":
            {
               name: "Taking Initiative",
               cost: 0,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D1_THE_REDHORN_GATE,
               key: "takingInitiative",
            },
            "taleOfTinuviel":
            {
               name: "Tale of Tinúviel",
               cost: 1,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA6_THE_DREAD_REALM,
               key: "taleOfTinuviel",
            },
            "tasteItAgain":
            {
               name: "Taste It Again!",
               cost: 1,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.THE_LAND_OF_SHADOW,
               cardSetNumber: 11,
               key: "tasteItAgain",
            },
            "theDoorIsClosed":
            {
               name: "The Door is Closed!",
               cost: 1,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.ANGMAR_AWAKENED,
               cardSubsetKey: CardSubset.AA4_THE_TREACHERY_OF_RHUDAUR,
               cardSetNumber: 92,
               key: "theDoorIsClosed",
            },
            "theEaglesAreComing":
            {
               name: "The Eagles Are Coming!",
               cost: 0,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM1_THE_HUNT_FOR_GOLLUM,
               key: "theEaglesAreComing",
            },
            "theEndComes":
            {
               name: "The End Comes",
               cost: 0,
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D2_ROAD_TO_RIVENDELL,
               key: "theEndComes",
            },
            "theGaladhrimsGreeting":
            {
               name: "The Galadhrim's Greeting",
               cost: 3,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.CORE,
               key: "theGaladhrimsGreeting",
            },
            "theHammerStroke":
            {
               name: "The Hammer-Stroke",
               cost: 2,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS5_THE_BLOOD_OF_GONDOR,
               key: "theHammerStroke",
            },
            "theLuckyNumber":
            {
               name: "The Lucky Number",
               cost: 1,
               sphereKey: Sphere.BAGGINS,
               cardSetKey: CardSet.ON_THE_DOORSTEP,
               key: "theLuckyNumber",
            },
            "theSeeingStone":
            {
               name: "The Seeing-Stone",
               cost: 0,
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.THE_VOICE_OF_ISENGARD,
               key: "theSeeingStone",
            },
            "theTreePeople":
            {
               name: "The Tree People",
               cost: 0,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM1_THE_DUNLAND_TRAP,
               cardSetNumber: 9,
               key: "theTreePeople",
            },
            "theWhiteCouncil":
            {
               name: "The White Council",
               cost: undefined,
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM1_THE_DUNLAND_TRAP,
               cardSetNumber: 10,
               key: "theWhiteCouncil",
            },
            "theWizardsVoice":
            {
               name: "The Wizard's Voice",
               cost: 0,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.THE_VOICE_OF_ISENGARD,
               cardSetNumber: 13,
               // This is spelled wrong at cardgamedb.com
               image: "http://www.cardgamedb.com/forums/uploads/lotr/ffg_the-wizardss-voice-voi.jpg",
               key: "theWizardsVoice",
            },
            "tightenOurBelts":
            {
               name: "Tighten Our Belts",
               cost: 0,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM4_THE_NIN_IN_EILPH,
               cardSetNumber: 86,
               key: "tightenOurBelts",
            },
            "timelyAid":
            {
               name: "Timely Aid",
               cost: 4,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D1_THE_REDHORN_GATE,
               key: "timelyAid",
            },
            "tirelessHunters":
            {
               name: "Tireless Hunters",
               cost: 1,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.THE_LOST_REALM,
               cardSetNumber: 8,
               key: "tirelessHunters",
            },
            "toMeOMyKinsfolk":
            {
               name: "To Me! O My Kinsfolk!",
               cost: 1,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.ON_THE_DOORSTEP,
               key: "toMeOMyKinsfolk",
            },
            "toTheEyrie":
            {
               name: "To the Eyrie",
               cost: 2,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM3_A_JOURNEY_TO_RHOSGOBEL,
               key: "toTheEyrie",
            },
            "trainedForWar":
            {
               name: "Trained for War",
               cost: 2,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS2_THE_DRUADAN_FOREST,
               key: "trainedForWar",
            },
            "unseenStrike":
            {
               name: "Unseen Strike",
               cost: 0,
               sphereKey: Sphere.TACTICS,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D1_THE_REDHORN_GATE,
               key: "unseenStrike",
            },
            "valiantSacrifice":
            {
               name: "Valiant Sacrifice",
               cost: 1,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.CORE,
               key: "valiantSacrifice",
            },
            "watersOfNimrodel":
            {
               name: "Waters of Nimrodel",
               cost: 3,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.THE_RING_MAKER,
               cardSubsetKey: CardSubset.TRM6_THE_ANTLERED_CROWN,
               cardSetNumber: 145,
               key: "watersOfNimrodel",
            },
            "weAreNotIdle":
            {
               name: "We Are Not Idle",
               cost: 0,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D6_SHADOW_AND_FLAME,
               key: "weAreNotIdle",
            },
            "weDoNotSleep":
            {
               name: "We Do Not Sleep",
               cost: 5,
               sphereKey: Sphere.SPIRIT,
               cardSetKey: CardSet.SHADOWS_OF_MIRKWOOD,
               cardSubsetKey: CardSubset.SOM5_THE_DEAD_MARSHES,
               key: "weDoNotSleep",
            },
            "wealthOfGondor":
            {
               name: "Wealth of Gondor",
               cost: 0,
               sphereKey: Sphere.LEADERSHIP,
               cardSetKey: CardSet.HEIRS_OF_NUMENOR,
               key: "wealthOfGondor",
            },
            "wellEquipped":
            {
               name: "Well-Equipped",
               cost: 0,
               sphereKey: Sphere.NEUTRAL,
               cardSetKey: CardSet.AGAINST_THE_SHADOW,
               cardSubsetKey: CardSubset.ATS5_THE_BLOOD_OF_GONDOR,
               key: "wellEquipped",
            },
            "wordOfCommand":
            {
               name: "Word of Command",
               cost: 1,
               sphereKey: Sphere.LORE,
               cardSetKey: CardSet.DWARROWDELF,
               cardSubsetKey: CardSubset.D4_THE_LONG_DARK,
               key: "wordOfCommand",
            },
         },

         keys: function()
         {
            return Object.getOwnPropertyNames(EventCard.properties);
         },
      };

      EventCard.keys().forEach(function(cardKey)
      {
         var card = EventCard.properties[cardKey];
         card.cardSet = CardSet.properties[card.cardSetKey];
         if (card.cardSubsetKey)
         {
            card.cardSubset = CardSubset.properties[card.cardSubsetKey];
         }
         card.cardTypeKey = CardType.EVENT;
         card.cardType = CardType.properties[card.cardTypeKey];
         card.sphere = Sphere.properties[card.sphereKey];

         if (!card.image)
         {
            card.image = ImageNameCreator.create(card);
         }
      });

      if (Object.freeze)
      {
         Object.freeze(EventCard);
      }

      return EventCard;
   });
