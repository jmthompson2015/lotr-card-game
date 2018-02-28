import InputValidator from "../../common/js/InputValidator.js";

import AllyCard from "../../artifact/js/AllyCard.js";
import AttachmentCard from "../../artifact/js/AttachmentCard.js";
import EnemyCard from "../../artifact/js/EnemyCard.js";
import EventCard from "../../artifact/js/EventCard.js";
import GameEvent from "../../artifact/js/GameEvent.js";
import HeroCard from "../../artifact/js/HeroCard.js";
import LocationCard from "../../artifact/js/LocationCard.js";
import ObjectiveCard from "../../artifact/js/ObjectiveCard.js";
import QuestCard from "../../artifact/js/QuestCard.js";
import TreacheryCard from "../../artifact/js/TreacheryCard.js";

import AllyAbility from "../../model/js/AllyAbility.js";
import AttachmentAbility from "../../model/js/AttachmentAbility.js";
import EnemyAbility from "../../model/js/EnemyAbility.js";
import EventAbility from "../../model/js/EventAbility.js";
import HeroAbility from "../../model/js/HeroAbility.js";
import LocationAbility from "../../model/js/LocationAbility.js";
import ObjectiveAbility from "../../model/js/ObjectiveAbility.js";
import QuestAbility from "../../model/js/QuestAbility.js";
import TreacheryAbility from "../../model/js/TreacheryAbility.js";

import EnumGenerator from "./EnumGenerator.js";

var Interpreter = {};

Interpreter.interpret = function(card, parts)
{
   InputValidator.validateNotNull("card", card);
   InputValidator.validateIsArray("parts", parts);

   let
   {
      // abilityClass,
      abilityClassName
   } = this.determineAbilityClass(card);

   let
   {
      // cardClass,
      cardClassName
   } = this.determineCardClass(card);

   let
   {
      eventOrPhaseKey,
      eventOrPhaseKeyName
   } = this.determineEventOrPhaseKey(card, parts);

   let
   {
      cardKey,
      cardKeyName
   } = this.determineCardKey(card, cardClassName);

   let condition;
   let consequent;

   return (
   {
      // cardClass: cardClass,
      cardClassName: cardClassName,
      // abilityClass: abilityClass,
      abilityClassName: abilityClassName,
      eventOrPhaseKey: eventOrPhaseKey,
      eventOrPhaseKeyName: eventOrPhaseKeyName,
      cardKey: cardKey,
      cardKeyName: cardKeyName,
      condition: condition,
      consequent: consequent,
   });
};

Interpreter.determineAbilityClass = function(card)
{
   InputValidator.validateNotNull("card", card);

   let abilityClass, abilityClassName;

   switch (card.type_code)
   {
      case "ally":
         abilityClass = AllyAbility;
         abilityClassName = "AllyAbility";
         break;
      case "attachment":
         abilityClass = AttachmentAbility;
         abilityClassName = "AttachmentAbility";
         break;
      case "enemy":
         abilityClass = EnemyAbility;
         abilityClassName = "EnemyAbility";
         break;
      case "event":
         abilityClass = EventAbility;
         abilityClassName = "EventAbility";
         break;
      case "hero":
         abilityClass = HeroAbility;
         abilityClassName = "HeroAbility";
         break;
      case "location":
         abilityClass = LocationAbility;
         abilityClassName = "LocationAbility";
         break;
      case "objective":
         abilityClass = ObjectiveAbility;
         abilityClassName = "ObjectiveAbility";
         break;
      case "quest":
         abilityClass = QuestAbility;
         abilityClassName = "QuestAbility";
         break;
      case "treachery":
         abilityClass = TreacheryAbility;
         abilityClassName = "TreacheryAbility";
         break;
      default:
         throw "Unknown card.type_code: " + card.type_code;
   }

   return (
   {
      abilityClass: abilityClass,
      abilityClassName: abilityClassName,
   });
};

Interpreter.determineCardClass = function(card)
{
   InputValidator.validateNotNull("card", card);

   let cardClass, cardClassName;

   switch (card.type_code)
   {
      case "ally":
         cardClass = AllyCard;
         cardClassName = "AllyCard";
         break;
      case "attachment":
         cardClass = AttachmentCard;
         cardClassName = "AttachmentCard";
         break;
      case "enemy":
         cardClass = EnemyCard;
         cardClassName = "EnemyCard";
         break;
      case "event":
         cardClass = EventCard;
         cardClassName = "EventCard";
         break;
      case "hero":
         cardClass = HeroCard;
         cardClassName = "HeroCard";
         break;
      case "location":
         cardClass = LocationCard;
         cardClassName = "LocationCard";
         break;
      case "objective":
         cardClass = ObjectiveCard;
         cardClassName = "ObjectiveCard";
         break;
      case "quest":
         cardClass = QuestCard;
         cardClassName = "QuestCard";
         break;
      case "treachery":
         cardClass = TreacheryCard;
         cardClassName = "TreacheryCard";
         break;
      default:
         throw "Unknown card.type_code: " + card.type_code;
   }

   return (
   {
      cardClass: cardClass,
      cardClassName: cardClassName,
   });
};

Interpreter.determineCardKey = function(card, cardClassName)
{
   InputValidator.validateNotNull("card", card);
   InputValidator.validateNotNull("cardClassName", cardClassName);

   const cardKey = EnumGenerator.createEnumValue(card.name + " " + card.pack_code);
   const cardKeyName = cardClassName + "." + EnumGenerator.createEnumName(card.name + "_" + card.pack_code);

   return (
   {
      cardKey: cardKey,
      cardKeyName: cardKeyName,
   });
};

Interpreter.determineEventOrPhaseKey = function(card, parts)
{
   InputValidator.validateNotNull("card", card);
   InputValidator.validateIsArray("parts", parts);

   let eventOrPhaseKey, eventOrPhaseKeyName;

   parts.some(block =>
   {
      // Breadth-first.

      return eventOrPhaseKeyName !== undefined;
   });

   if (eventOrPhaseKeyName === undefined)
   {
      parts.some(block =>
      {
         // Next level.
         let result = this.determineEventOrPhaseKeyForSentences(card, block);
         eventOrPhaseKey = result.eventOrPhaseKey;
         eventOrPhaseKeyName = result.eventOrPhaseKeyName;

         return eventOrPhaseKeyName !== undefined;
      });
   }

   return (
   {
      eventOrPhaseKey: eventOrPhaseKey,
      eventOrPhaseKeyName: eventOrPhaseKeyName
   });
};

Interpreter.determineEventOrPhaseKeyForSentences = function(card, block)
{
   InputValidator.validateNotNull("card", card);
   InputValidator.validateNotNull("block", block);

   let eventOrPhaseKey, eventOrPhaseKeyName;

   block.sentences.some(sentence =>
   {
      // Breadth-first.

      return eventOrPhaseKeyName !== undefined;
   });

   if (eventOrPhaseKeyName === undefined)
   {
      block.sentences.some(sentence =>
      {
         // Next level.
         let result = this.determineEventOrPhaseKeyForClauses(card, sentence);
         eventOrPhaseKey = result.eventOrPhaseKey;
         eventOrPhaseKeyName = result.eventOrPhaseKeyName;

         return eventOrPhaseKeyName !== undefined;
      });
   }

   return (
   {
      eventOrPhaseKey: eventOrPhaseKey,
      eventOrPhaseKeyName: eventOrPhaseKeyName
   });
};

Interpreter.determineEventOrPhaseKeyForClauses = function(card, sentence)
{
   InputValidator.validateNotNull("card", card);
   InputValidator.validateNotNull("sentence", sentence);

   let cardName = card.name.toLowerCase();
   let eventOrPhaseKey, eventOrPhaseKeyName;

   sentence.clauses.some(clause =>
   {
      // Breadth-first.
      switch (clause.text)
      {
         case `after ${cardName} is declared as an attacker`:
            eventOrPhaseKey = GameEvent.ATTACKERS_DECLARED;
            eventOrPhaseKeyName = "GameEvent.ATTACKERS_DECLARED";
            break;
         case `after ${cardName} enters play`:
         case `after you play ${cardName}`:
         case `after you play ${cardName} from your hand`:
            eventOrPhaseKey = GameEvent.CARD_PLAYED;
            eventOrPhaseKeyName = "GameEvent.CARD_PLAYED";
            break;
         case `after ${cardName} changes control`:
            eventOrPhaseKey = GameEvent.CHARACTER_CHANGES_CONTROL;
            eventOrPhaseKeyName = "GameEvent.CHARACTER_CHANGES_CONTROL";
            break;
         case "after a hero card is destroyed":
            eventOrPhaseKey = GameEvent.CHARACTER_DESTROYED;
            eventOrPhaseKeyName = "GameEvent.CHARACTER_DESTROYED";
            break;
         case "after a character is healed by another card effect":
            eventOrPhaseKey = GameEvent.CHARACTER_HEALED;
            eventOrPhaseKeyName = "GameEvent.CHARACTER_HEALED";
            break;
         case "after a character leaves play":
         case "after a dwarf hero you control leaves play":
         case "after another eagle character leaves play":
         case `after ${cardName} leaves play`:
            eventOrPhaseKey = GameEvent.CHARACTER_LEAVES_PLAY;
            eventOrPhaseKeyName = "GameEvent.CHARACTER_LEAVES_PLAY";
            break;
         case "after a silvan character readies during the refresh phase":
            eventOrPhaseKey = GameEvent.CHARACTER_READIES;
            eventOrPhaseKeyName = "GameEvent.CHARACTER_READIES";
            break;
         case `after ${cardName} is declared as a defender`:
            eventOrPhaseKey = GameEvent.DEFENDER_DECLARED;
            eventOrPhaseKeyName = "GameEvent.DEFENDER_DECLARED";
            break;
         case `after ${cardName} attacks and defeats an enemy engaged with another player`:
         case `after ${cardName} attacks and destroys an orc enemy`:
         case `after ${cardName} participates in an attack that destroys an enemy`:
            eventOrPhaseKey = GameEvent.ENEMY_DESTROYED;
            eventOrPhaseKeyName = "GameEvent.ENEMY_DESTROYED";
            break;
         case `after ${cardName} commits to a quest`:
         case `after ${cardName} exhausts to commit to a quest`:
            eventOrPhaseKey = GameEvent.QUEST_COMMITTED;
            eventOrPhaseKeyName = "GameEvent.QUEST_COMMITTED";
            break;
         case `after ${cardName} is damaged`:
         case `after ${cardName} suffers damage`:
            eventOrPhaseKey = GameEvent.WOUNDED;
            eventOrPhaseKeyName = "GameEvent.WOUNDED";
            break;
      }

      return eventOrPhaseKeyName !== undefined;
   });

   if (eventOrPhaseKeyName === undefined)
   {
      sentence.clauses.some(clause =>
      {
         // Next level.
         let result = this.determineEventOrPhaseKeyForPhrases(card, clause);
         eventOrPhaseKey = result.eventOrPhaseKey;
         eventOrPhaseKeyName = result.eventOrPhaseKeyName;

         return eventOrPhaseKeyName !== undefined;
      });
   }

   return (
   {
      eventOrPhaseKey: eventOrPhaseKey,
      eventOrPhaseKeyName: eventOrPhaseKeyName
   });
};

Interpreter.determineEventOrPhaseKeyForPhrases = function(card, clause)
{
   InputValidator.validateNotNull("card", card);
   InputValidator.validateNotNull("clause", clause);

   let eventOrPhaseKey, eventOrPhaseKeyName;

   clause.phrases.some(phrase =>
   {
      // Breadth-first.
      switch (phrase.text)
      {
         case "after your threat is raised":
            eventOrPhaseKey = GameEvent.THREAT_RAISED;
            eventOrPhaseKeyName = "GameEvent.THREAT_RAISED";
            break;
      }

      return eventOrPhaseKeyName !== undefined;
   });

   return (
   {
      eventOrPhaseKey: eventOrPhaseKey,
      eventOrPhaseKeyName: eventOrPhaseKeyName
   });
};

Interpreter.print = function(interpretation)
{
   InputValidator.validateNotNull("interpretation", interpretation);

   let content = JSON.stringify(interpretation, null, "  ");
   console.log("Interpretation:\n" + content);

   return content;
};

export default Interpreter;