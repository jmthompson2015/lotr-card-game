"use strict";

define(["qunit", "redux", "artifact/js/CardType", "artifact/js/GameMode",
  "model/js/Action", "model/js/Environment", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/TravelTask", "model/js/ScenarioDeckBuilder", "model/js/Agent"],
   function(QUnit, Redux, CardType, GameMode, Action, Environment, PlayerDeckBuilder, Reducer, TravelTask, ScenarioDeckBuilder, Agent)
   {
      QUnit.module("TravelTask");

      QUnit.test("doIt()", function(assert)
      {
         // Setup.
         var environment = createEnvironment();
         var store = environment.store();
         store.dispatch(Action.drawEncounterCard());
         store.dispatch(Action.drawEncounterCard());
         store.dispatch(Action.drawEncounterCard());
         var locationCount = environment.stagingArea(CardType.LOCATION).size;
         var task = new TravelTask(store);
         var callback = function()
         {
            // Verify.
            if (locationCount === 0)
            {
               assert.equal(store.getState().activeLocationId, undefined);
            }
            else
            {
               assert.ok(Number.isInteger(store.getState().activeLocationId));
            }
         };

         // Run.
         task.doIt(callback);
      });

      function createEnvironment()
      {
         var store = Redux.createStore(Reducer.root);
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store, GameMode.EASY);
         var agent = new Agent(store, "agent");
         var playerData = [
            {
               agent: agent,
               playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
            },
         ];

         return new Environment(store, scenarioDeck, playerData);
      }
   });
