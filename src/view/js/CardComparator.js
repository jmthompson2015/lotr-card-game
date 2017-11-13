"use strict";

define(function()
{
   var CardComparator = {};

   CardComparator.AttackName = function(a, b)
   {
      var answer = compare(b.attack(), a.attack()); // descending

      if (answer === 0)
      {
         answer = compare(a.card().name, b.card().name);
      }

      return answer;
   };

   CardComparator.DefenseAttackName = function(a, b)
   {
      var answer = compare(b.defense(), a.defense()); // descending

      if (answer === 0)
      {
         answer = compare(a.attack(), b.attack());
      }

      if (answer === 0)
      {
         answer = compare(a.card().name, b.card().name);
      }

      return answer;
   };

   CardComparator.DefenseName = function(a, b)
   {
      var answer = compare(a.defense(), b.defense());

      if (answer === 0)
      {
         answer = compare(a.card().name, b.card().name);
      }

      return answer;
   };

   CardComparator.HitPointsName = function(a, b)
   {
      var answer = compare(b.remainingHitPoints(), a.remainingHitPoints()); // descending

      if (answer === 0)
      {
         answer = compare(a.card().name, b.card().name);
      }

      return answer;
   };

   CardComparator.ThreatQuestName = function(a, b)
   {
      var answer = compare(b.threat(), a.threat());

      if (answer === 0)
      {
         answer = compare(a.questPoints(), b.questPoints());
      }

      if (answer === 0)
      {
         answer = compare(a.card().name, b.card().name);
      }

      return answer;
   };

   CardComparator.TypeCostSphereName = function(a, b)
   {
      var cardA = a.card();
      var cardB = b.card();

      var answer = compare(cardA.cardTypeKey, cardB.cardTypeKey);

      if (answer === 0)
      {
         answer = compare(cardB.cost, cardA.cost); // descending
      }

      if (answer === 0)
      {
         answer = compare(cardA.sphereKey, cardB.sphereKey);
      }

      if (answer === 0)
      {
         answer = compare(cardA.name, cardB.name);
      }

      return answer;
   };

   CardComparator.TypeHitPointsName = function(a, b)
   {
      var cardA = a.card();
      var cardB = b.card();

      var answer = compare(cardA.cardTypeKey, cardB.cardTypeKey);

      if (answer === 0)
      {
         answer = compare(b.remainingHitPoints(), a.remainingHitPoints()); // descending
      }

      if (answer === 0)
      {
         answer = compare(cardA.name, cardB.name);
      }

      return answer;
   };

   CardComparator.WillpowerDefenseAttackName = function(a, b)
   {
      var answer = compare(b.willpower(), a.willpower()); // descending

      if (answer === 0)
      {
         answer = compare(a.defense(), b.defense());
      }

      if (answer === 0)
      {
         answer = compare(a.attack(), b.attack());
      }

      if (answer === 0)
      {
         answer = compare(a.card().name, b.card().name);
      }

      return answer;
   };

   function compare(a, b)
   {
      return (a === b ? 0 : (a > b ? 1 : -1));
   }

   return CardComparator;
});
