"use strict";

define(["common/js/InputValidator", "artifact/js/AllyCard", "artifact/js/AttachmentCard", "artifact/js/CardType", "artifact/js/EnemyCard", "artifact/js/EventCard", "artifact/js/HeroCard", "artifact/js/LocationCard", "artifact/js/ObjectiveCard", "artifact/js/QuestCard", "artifact/js/TreacheryCard"],
   function(InputValidator, AllyCard, AttachmentCard, CardType, EnemyCard, EventCard, HeroCard, LocationCard, ObjectiveCard, QuestCard, TreacheryCard)
   {
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

      return CardResolver;
   });
