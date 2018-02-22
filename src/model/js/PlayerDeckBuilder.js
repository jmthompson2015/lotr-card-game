import InputValidator from "../../common/js/InputValidator.js";
import AllyCard from "../../artifact/js/AllyCard.js";
import AttachmentCard from "../../artifact/js/AttachmentCard.js";
import CardSet from "../../artifact/js/CardSet.js";
import EventCard from "../../artifact/js/EventCard.js";
import HeroCard from "../../artifact/js/HeroCard.js";
import Sphere from "../../artifact/js/Sphere.js";
import CardInstance from "./CardInstance.js";

var DeckBuilders = [];

var BeornsPath1DeckBuilder = new PlayerDeckBuilder("Beorn's Path #1", 2013, "Leadership/Lore",
   function(store)
   {
      // https://hallofbeorn.wordpress.com/2013/01/31/beorns-path-part-3-deck-tuning/
      var heroInstances = [];
      addCard(heroInstances, store, HeroCard, HeroCard.ARAGORN_CORE, 1);
      addCard(heroInstances, store, HeroCard, HeroCard.THEODRED, 1);
      addCard(heroInstances, store, HeroCard, HeroCard.DENETHOR, 1);

      return heroInstances;
   },
   function(store)
   {
      // https://hallofbeorn.wordpress.com/2013/01/31/beorns-path-part-3-deck-tuning/
      var playerInstances = [];
      addCard(playerInstances, store, AllyCard, AllyCard.HENAMARTH_RIVERSONG, 1);
      addCard(playerInstances, store, AllyCard, AllyCard.SNOWBOURN_SCOUT, 3);
      addCard(playerInstances, store, AllyCard, AllyCard.GUARD_OF_THE_CITADEL, 3);
      addCard(playerInstances, store, AllyCard, AllyCard.EREBOR_HAMMERSMITH, 2);
      addCard(playerInstances, store, AllyCard, AllyCard.MINER_OF_THE_IRON_HILLS, 2);
      addCard(playerInstances, store, AllyCard, AllyCard.GLEOWINE, 2);
      addCard(playerInstances, store, AllyCard, AllyCard.SON_OF_ARNOR, 2);
      addCard(playerInstances, store, AllyCard, AllyCard.DAUGHTER_OF_THE_NIMRODEL, 3);
      addCard(playerInstances, store, AllyCard, AllyCard.FARAMIR, 2);
      addCard(playerInstances, store, AllyCard, AllyCard.GANDALF_CORE, 3);

      addCard(playerInstances, store, AttachmentCard, AttachmentCard.STEWARD_OF_GONDOR, 2);
      addCard(playerInstances, store, AttachmentCard, AttachmentCard.PROTECTOR_OF_LORIEN, 2);
      addCard(playerInstances, store, AttachmentCard, AttachmentCard.FOREST_SNARE, 2);
      addCard(playerInstances, store, AttachmentCard, AttachmentCard.SELF_PRESERVATION, 2);
      addCard(playerInstances, store, AttachmentCard, AttachmentCard.CELEBRIANS_STONE, 1);

      addCard(playerInstances, store, EventCard, EventCard.VALIANT_SACRIFICE, 2);
      addCard(playerInstances, store, EventCard, EventCard.SNEAK_ATTACK, 2);
      addCard(playerInstances, store, EventCard, EventCard.FOR_GONDOR, 2);
      addCard(playerInstances, store, EventCard, EventCard.SECRET_PATHS, 2);

      return playerInstances;
   });
DeckBuilders.push(BeornsPath1DeckBuilder);

var BeornsPath2DeckBuilder = new PlayerDeckBuilder("Beorn's Path #2", 2013, "Spirit/Tactics",
   function(store)
   {
      // https://hallofbeorn.wordpress.com/2013/02/06/beorns-path-part-5-building-a-second-core-set-deck/
      var heroInstances = [];
      addCard(heroInstances, store, HeroCard, HeroCard.EOWYN, 1);
      addCard(heroInstances, store, HeroCard, HeroCard.GIMLI, 1);
      addCard(heroInstances, store, HeroCard, HeroCard.THALIN, 1);

      return heroInstances;
   },
   function(store)
   {
      // https://hallofbeorn.wordpress.com/2013/02/06/beorns-path-part-5-building-a-second-core-set-deck/
      var playerInstances = [];
      addCard(playerInstances, store, AllyCard, AllyCard.GONDORIAN_SPEARMAN, 3);
      addCard(playerInstances, store, AllyCard, AllyCard.VETERAN_AXEHAND, 3);
      addCard(playerInstances, store, AllyCard, AllyCard.HORSEBACK_ARCHER, 2);
      addCard(playerInstances, store, AllyCard, AllyCard.LORIEN_GUIDE, 1);
      addCard(playerInstances, store, AllyCard, AllyCard.NORTHERN_TRACKER, 2);
      addCard(playerInstances, store, AllyCard, AllyCard.GANDALF_CORE, 1);
      addCard(playerInstances, store, AllyCard, AllyCard.BEORN, 1);

      addCard(playerInstances, store, AttachmentCard, AttachmentCard.HORN_OF_GONDOR, 1);
      addCard(playerInstances, store, AttachmentCard, AttachmentCard.BLADE_OF_GONDOLIN, 2);
      addCard(playerInstances, store, AttachmentCard, AttachmentCard.DWARVEN_AXE, 2);
      addCard(playerInstances, store, AttachmentCard, AttachmentCard.CITADEL_PLATE, 2);
      addCard(playerInstances, store, AttachmentCard, AttachmentCard.THE_FAVOR_OF_THE_LADY, 2);
      addCard(playerInstances, store, AttachmentCard, AttachmentCard.UNEXPECTED_COURAGE, 1);

      addCard(playerInstances, store, EventCard, EventCard.FEINT, 2);
      addCard(playerInstances, store, EventCard, EventCard.QUICK_STRIKE, 2);
      addCard(playerInstances, store, EventCard, EventCard.SWIFT_STRIKE, 1);
      addCard(playerInstances, store, EventCard, EventCard.A_TEST_OF_WILL, 2);
      addCard(playerInstances, store, EventCard, EventCard.HASTY_STROKE, 2);
      addCard(playerInstances, store, EventCard, EventCard.THE_GALADHRIMS_GREETING, 2);
      addCard(playerInstances, store, EventCard, EventCard.DWARVEN_TOMB, 1);
      addCard(playerInstances, store, EventCard, EventCard.A_LIGHT_IN_THE_DARK, 2);
      addCard(playerInstances, store, EventCard, EventCard.STAND_AND_FIGHT, 3);

      return playerInstances;
   });
DeckBuilders.push(BeornsPath2DeckBuilder);

var CoreLeadershipDeckBuilder = new PlayerDeckBuilder("Core Leadership", 2011, "Leadership",
   function(store)
   {
      return createHeroSphereDeck(store, CardSet.CORE, Sphere.LEADERSHIP);
   },
   function(store)
   {
      return createPlayerSphereDeck(store, CardSet.CORE, Sphere.LEADERSHIP);
   });
DeckBuilders.push(CoreLeadershipDeckBuilder);

var CoreLoreDeckBuilder = new PlayerDeckBuilder("Core Lore", 2011, "Lore",
   function(store)
   {
      return createHeroSphereDeck(store, CardSet.CORE, Sphere.LORE);
   },
   function(store)
   {
      return createPlayerSphereDeck(store, CardSet.CORE, Sphere.LORE);
   });
DeckBuilders.push(CoreLoreDeckBuilder);

var CoreSpiritDeckBuilder = new PlayerDeckBuilder("Core Spirit", 2011, "Spirit",
   function(store)
   {
      return createHeroSphereDeck(store, CardSet.CORE, Sphere.SPIRIT);
   },
   function(store)
   {
      return createPlayerSphereDeck(store, CardSet.CORE, Sphere.SPIRIT);
   });
DeckBuilders.push(CoreSpiritDeckBuilder);

var CoreTacticsDeckBuilder = new PlayerDeckBuilder("Core Tactics", 2011, "Tactics",
   function(store)
   {
      return createHeroSphereDeck(store, CardSet.CORE, Sphere.TACTICS);
   },
   function(store)
   {
      return createPlayerSphereDeck(store, CardSet.CORE, Sphere.TACTICS);
   });
DeckBuilders.push(CoreTacticsDeckBuilder);

function PlayerDeckBuilder(name, year, description, heroBuildFunction, playerBuildFunction)
{
   InputValidator.validateNotNull("name", name);
   InputValidator.validateNotNull("year", year);
   InputValidator.validateNotNull("description", description);
   InputValidator.validateNotNull("heroBuildFunction", heroBuildFunction);
   InputValidator.validateNotNull("playerBuildFunction", playerBuildFunction);

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

   this.buildDeck = function(store)
   {
      InputValidator.validateNotNull("store", store);

      var heroInstances = heroBuildFunction(store);
      var playerInstances = playerBuildFunction(store);

      return (
      {
         heroInstances: heroInstances,
         playerInstances: playerInstances,
      });
   };
}

PlayerDeckBuilder.prototype.toString = function()
{
   return this.year() + " " + this.name() + " (" + this.description() + ")";
};

function addCard(array, store, cardClass, cardKey, count)
{
   InputValidator.validateNotNull("store", store);
   InputValidator.validateNotNull("cardClass", cardClass);
   InputValidator.validateNotNull("cardKey", cardKey);
   InputValidator.validateIsNumber("count", count);

   var card = cardClass.properties[cardKey];

   for (var i = 0; i < count; i++)
   {
      array.push(new CardInstance(store, card));
   }
}

function createHeroSphereDeck(store, cardSetKey, sphereKey)
{
   InputValidator.validateNotNull("store", store);
   InputValidator.validateNotNull("cardSetKey", cardSetKey);
   InputValidator.validateNotNull("sphereKey", sphereKey);

   var heroKeys = HeroCard.keysByCardSetSphere(cardSetKey, sphereKey);
   var heroInstances = heroKeys.map(function(cardKey)
   {
      var card = HeroCard.properties[cardKey];
      return new CardInstance(store, card);
   });

   return heroInstances;
}

function createPlayerSphereDeck(store, cardSetKey, sphereKey)
{
   InputValidator.validateNotNull("store", store);
   InputValidator.validateNotNull("cardSetKey", cardSetKey);
   InputValidator.validateNotNull("sphereKey", sphereKey);

   var allyKeys = AllyCard.keysByCardSetSphere(cardSetKey, sphereKey);
   var allyInstances = allyKeys.reduce(function(accumulator, cardKey)
   {
      addCard(accumulator, store, AllyCard, cardKey, 3);
      return accumulator;
   }, []);

   var attachmentKeys = AttachmentCard.keysByCardSetSphere(cardSetKey, sphereKey);
   var attachmentInstances = attachmentKeys.reduce(function(accumulator, cardKey)
   {
      addCard(accumulator, store, AttachmentCard, cardKey, 3);
      return accumulator;
   }, []);

   var eventKeys = EventCard.keysByCardSetSphere(cardSetKey, sphereKey);
   var eventInstances = eventKeys.reduce(function(accumulator, cardKey)
   {
      addCard(accumulator, store, EventCard, cardKey, 3);
      return accumulator;
   }, []);

   return allyInstances.concat(attachmentInstances.concat(eventInstances));
}

export default (
{
   BeornsPath1DeckBuilder: BeornsPath1DeckBuilder,
   BeornsPath2DeckBuilder: BeornsPath2DeckBuilder,
   CoreLeadershipDeckBuilder: CoreLeadershipDeckBuilder,
   CoreLoreDeckBuilder: CoreLoreDeckBuilder,
   CoreSpiritDeckBuilder: CoreSpiritDeckBuilder,
   CoreTacticsDeckBuilder: CoreTacticsDeckBuilder,
   DeckBuilders: DeckBuilders,
   PlayerDeckBuilder: PlayerDeckBuilder,
});