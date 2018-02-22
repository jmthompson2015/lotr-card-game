import InputValidator from "../../common/js/InputValidator.js";
import AllyCard from "./AllyCard.js";
import AttachmentCard from "./AttachmentCard.js";
import CardType from "./CardType.js";
import EnemyCard from "./EnemyCard.js";
import EventCard from "./EventCard.js";
import HeroCard from "./HeroCard.js";
import LocationCard from "./LocationCard.js";
import ObjectiveCard from "./ObjectiveCard.js";
import QuestCard from "./QuestCard.js";
import TreacheryCard from "./TreacheryCard.js";

var CardResolver = {};

CardResolver.get = function(cardTypeKey, cardKey)
{
   InputValidator.validateNotNull("cardTypeKey", cardTypeKey);
   InputValidator.validateNotNull("cardKey", cardKey);

   var cardClass;

   switch (cardTypeKey)
   {
      case CardType.ALLY:
         cardClass = AllyCard;
         break;
      case CardType.ATTACHMENT:
         cardClass = AttachmentCard;
         break;
      case CardType.ENEMY:
         cardClass = EnemyCard;
         break;
      case CardType.EVENT:
         cardClass = EventCard;
         break;
      case CardType.HERO:
         cardClass = HeroCard;
         break;
      case CardType.LOCATION:
         cardClass = LocationCard;
         break;
      case CardType.OBJECTIVE:
         cardClass = ObjectiveCard;
         break;
      case CardType.QUEST:
         cardClass = QuestCard;
         break;
      case CardType.TREACHERY:
         cardClass = TreacheryCard;
         break;
      default:
         throw "Unknown cardTypeKey: " + cardTypeKey;
   }

   return cardClass.properties[cardKey];
};

if (Object.freeze)
{
   Object.freeze(CardResolver);
}

export default CardResolver;