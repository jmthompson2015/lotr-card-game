/*
 * @param source One of [AllyCard, AttachmentCard, EnemyCard, ...].
 * @param sourceKey for ally, attachment, enemy, or ...
 * @param abilityType One of [AllyAbility, AttachmentAbility, EnemyAbility, ...].
 * @param abilityKey Ability key.
 */
"use strict";

define(["common/js/InputValidator", "artifact/js/AllyCard", "artifact/js/AttachmentCard", "artifact/js/EnemyCard", "artifact/js/EventCard", "artifact/js/HeroCard", "artifact/js/LocationCard", "artifact/js/ObjectiveCard", "artifact/js/QuestCard", "artifact/js/TreacheryCard"],
   function(InputValidator, AllyCard, AttachmentCard, EnemyCard, EventCard, HeroCard, LocationCard, ObjectiveCard, QuestCard, TreacheryCard)
   {
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

      Ability.prototype.executeConsequent = function(store)
      {
         InputValidator.validateNotNull("store", store);

         var consequent = this.consequent();

         return consequent(store, this.context());
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

      return Ability;
   });
