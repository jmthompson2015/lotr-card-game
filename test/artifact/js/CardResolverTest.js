"use strict";

define(["qunit", "common/js/InputValidator", "artifact/js/AllyCard", "artifact/js/AttachmentCard", "artifact/js/CardResolver", "artifact/js/CardType", "artifact/js/EnemyCard", "artifact/js/EventCard", "artifact/js/HeroCard", "artifact/js/LocationCard", "artifact/js/ObjectiveCard", "artifact/js/QuestCard", "artifact/js/TreacheryCard"],
   function(QUnit, InputValidator, AllyCard, AttachmentCard, CardResolver, CardType, EnemyCard, EventCard, HeroCard, LocationCard, ObjectiveCard, QuestCard, TreacheryCard)
   {
      QUnit.module("CardResolver");

      QUnit.test("card() AllyCard", function(assert)
      {
         // Setup.
         var cardTypeKey = CardType.ALLY;
         var cardKey = AllyCard.ANFALAS_HERDSMAN;

         // Run.
         var result = CardResolver.get(cardTypeKey, cardKey);

         // Verify.
         assert.ok(result);
         assert.equal(result.key, cardKey);
         assert.equal(result.name, "Anfalas Herdsman");
      });

      QUnit.test("card() AttachmentCard", function(assert)
      {
         // Setup.
         var cardTypeKey = CardType.ATTACHMENT;
         var cardKey = AttachmentCard.A_BURNING_BRAND;

         // Run.
         var result = CardResolver.get(cardTypeKey, cardKey);

         // Verify.
         assert.ok(result);
         assert.equal(result.key, cardKey);
      });

      QUnit.test("card() EnemyCard", function(assert)
      {
         // Setup.
         var cardTypeKey = CardType.ENEMY;
         var cardKey = EnemyCard.BLACK_FOREST_BATS;

         // Run.
         var result = CardResolver.get(cardTypeKey, cardKey);

         // Verify.
         assert.ok(result);
         assert.equal(result.key, cardKey);
      });

      QUnit.test("card() EventCard", function(assert)
      {
         // Setup.
         var cardTypeKey = CardType.EVENT;
         var cardKey = EventCard.A_ELBERETH_GILTHONIEL;

         // Run.
         var result = CardResolver.get(cardTypeKey, cardKey);

         // Verify.
         assert.ok(result);
         assert.equal(result.key, cardKey);
      });

      QUnit.test("card() HeroCard", function(assert)
      {
         // Setup.
         var cardTypeKey = CardType.HERO;
         var cardKey = HeroCard.ARAGORN_CORE;

         // Run.
         var result = CardResolver.get(cardTypeKey, cardKey);

         // Verify.
         assert.ok(result);
         assert.equal(result.key, cardKey);
         assert.equal(result.name, "Aragorn");
         assert.equal(result.threatCost, 12);
         assert.equal(result.willpower, 2);
         assert.equal(result.attack, 3);
         assert.equal(result.defense, 2);
         assert.equal(result.hitPoints, 5);
      });

      QUnit.test("card() LocationCard", function(assert)
      {
         // Setup.
         var cardTypeKey = CardType.LOCATION;
         var cardKey = LocationCard.BANKS_OF_THE_ANDUIN;

         // Run.
         var result = CardResolver.get(cardTypeKey, cardKey);

         // Verify.
         assert.ok(result);
         assert.equal(result.key, cardKey);
      });

      QUnit.test("card() ObjectiveCard", function(assert)
      {
         // Setup.
         var cardTypeKey = CardType.OBJECTIVE;
         var cardKey = ObjectiveCard.SIGNS_OF_GOLLUM;

         // Run.
         var result = CardResolver.get(cardTypeKey, cardKey);

         // Verify.
         assert.ok(result);
         assert.equal(result.key, cardKey);
      });

      QUnit.test("card() QuestCard", function(assert)
      {
         // Setup.
         var cardTypeKey = CardType.QUEST;
         var cardKey = QuestCard.PTM1A_FLIES_AND_SPIDERS;

         // Run.
         var result = CardResolver.get(cardTypeKey, cardKey);

         // Verify.
         assert.ok(result);
         assert.equal(result.key, cardKey);
      });

      QUnit.test("card() TreacheryCard", function(assert)
      {
         // Setup.
         var cardTypeKey = CardType.TREACHERY;
         var cardKey = TreacheryCard.CAUGHT_IN_A_WEB;

         // Run.
         var result = CardResolver.get(cardTypeKey, cardKey);

         // Verify.
         assert.ok(result);
         assert.equal(result.key, cardKey);
      });
   });
