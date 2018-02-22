/*
 * @param source One of [AllyCard, AttachmentCard, EnemyCard, ...].
 * @param sourceKey for ally, attachment, enemy, or ...
 * @param abilityType One of [AllyAbility, AttachmentAbility, EnemyAbility, ...].
 * @param abilityKey Ability key.
 */

import InputValidator from "../../common/js/InputValidator.js";
import AllyCard from "../../artifact/js/AllyCard.js";
import AttachmentCard from "../../artifact/js/AttachmentCard.js";
import EnemyCard from "../../artifact/js/EnemyCard.js";
import EventCard from "../../artifact/js/EventCard.js";
import HeroCard from "../../artifact/js/HeroCard.js";
import LocationCard from "../../artifact/js/LocationCard.js";
import ObjectiveCard from "../../artifact/js/ObjectiveCard.js";
import QuestCard from "../../artifact/js/QuestCard.js";
import TreacheryCard from "../../artifact/js/TreacheryCard.js";

function Ability(source, sourceKey, abilityType, abilityKey, context)
{
   InputValidator.validateNotNull("source", source);
   InputValidator.validateNotNull("sourceKey", sourceKey);
   InputValidator.validateNotNull("abilityType", abilityType);
   InputValidator.validateNotNull("abilityKey", abilityKey);
   // context optional.

   this.source = function()
   {
      return source;
   };

   this.sourceKey = function()
   {
      return sourceKey;
   };

   this.abilityType = function()
   {
      return abilityType;
   };

   this.abilityKey = function()
   {
      return abilityKey;
   };

   this.context = function()
   {
      return context;
   };

   var sourceObject = source.properties[sourceKey];

   this.sourceObject = function()
   {
      return sourceObject;
   };

   var myAbility = (abilityType[abilityKey] !== undefined ? abilityType[abilityKey][sourceKey] : undefined);

   this.ability = function()
   {
      return myAbility;
   };
}

Ability.prototype.condition = function()
{
   var myAbility = this.ability();

   return (myAbility !== undefined ? myAbility.condition : undefined);
};

Ability.prototype.conditionPasses = function(store)
{
   InputValidator.validateNotNull("store", store);

   var condition = this.condition();

   return condition(store, this.context());
};

Ability.prototype.consequent = function()
{
   var myAbility = this.ability();
   var myConsequent = (myAbility !== undefined ? myAbility.consequent : undefined);

   return (myConsequent !== undefined ? myConsequent.bind(myAbility) : undefined);
};

Ability.prototype.executeConsequent = function(store, callback)
{
   InputValidator.validateNotNull("store", store);
   // callback optional.

   var consequent = this.consequent();

   return consequent(store, this.context(), callback);
};

Ability.prototype.isAlly = function()
{
   return this.source() === AllyCard;
};

Ability.prototype.isAttachment = function()
{
   return this.source() === AttachmentCard;
};

Ability.prototype.isEnemy = function()
{
   return this.source() === EnemyCard;
};

Ability.prototype.isEvent = function()
{
   return this.source() === EventCard;
};

Ability.prototype.isHero = function()
{
   return this.source() === HeroCard;
};

Ability.prototype.isLocation = function()
{
   return this.source() === LocationCard;
};

Ability.prototype.isObjective = function()
{
   return this.source() === ObjectiveCard;
};

Ability.prototype.isQuest = function()
{
   return this.source() === QuestCard;
};

Ability.prototype.isTreachery = function()
{
   return this.source() === TreacheryCard;
};

Ability.prototype.toString = function()
{
   var answer = "Ability ";

   answer += "source=" + this.source().toString();
   answer += ",sourceKey=" + this.sourceKey();
   answer += ",abilityType=" + this.abilityType().toString();
   answer += ",abilityKey=" + this.abilityKey();
   answer += ",context=" + JSON.stringify(this.context());

   return answer;
};

export default Ability;