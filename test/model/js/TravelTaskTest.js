"use strict";

define(["qunit", "redux", "artifact/js/CardType",
  "model/js/Action", "model/js/Agent", "model/js/Environment", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/TravelTask", "model/js/ScenarioDeckBuilder"],
   function(QUnit, Redux, CardType, Action, Agent, Environment, PlayerDeckBuilder, Reducer, TravelTask, ScenarioDeckBuilder)
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
         var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
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
