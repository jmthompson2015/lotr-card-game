import Sphere from "../../../src/artifact/js/Sphere.js";
import Action from "../../../src/model/js/Action.js";
import Agent from "../../../src/model/js/Agent.js";
import CardAction from "../../../src/model/js/CardAction.js";
import Game from "../../../src/model/js/Game.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import PlanningTask from "../../../src/model/js/PlanningTask.js";
import Reducer from "../../../src/model/js/Reducer.js";
import ScenarioDeckBuilder from "../../../src/model/js/ScenarioDeckBuilder.js";

QUnit.module("PlanningTask");

QUnit.test("doIt()", function(assert)
{
   // Setup.
   var game = createGame();
   var environment = game.engine().environment();
   var store = environment.store();
   var agent1 = environment.agents()[0];
   var agent2 = environment.agents()[1];
   store.dispatch(CardAction.addResources(agent1.tableauHeroes()[0], 2));
   var agent1BeforeHandSize = store.getState().agentHand[agent1.id()].length;
   assert.equal(store.getState().agentHand[agent1.id()].length, 6);
   assert.equal(store.getState().agentTableau[agent1.id()].length, 3);
   assert.equal(store.getState().agentHand[agent2.id()].length, 6);
   assert.equal(store.getState().agentTableau[agent2.id()].length, 3);
   var task = new PlanningTask(store);
   var callback = function()
   {
      // Verify.
      assert.ok(true, "test resumed from async operation");
      var agent1AfterHandSize = store.getState().agentHand[agent1.id()].length;
      var cardPlayed0, cardPlayed1, expected;
      console.log("agent1BeforeHandSize - agent1AfterHandSize = " + (agent1BeforeHandSize - agent1AfterHandSize));
      console.log("agent1.tableau() = " + agent1.tableau());
      if (agent1BeforeHandSize - agent1AfterHandSize === 1)
      {
         assert.equal(agent1BeforeHandSize - agent1AfterHandSize, 1, "one card");
         let agentPlayerDiscard = store.getState().agentPlayerDiscard;
         let cardAttachments = store.getState().cardAttachments;
         let agentTableau = agent1.tableau();
         if (agentPlayerDiscard[agent1.id()] !== undefined && agentPlayerDiscard[agent1.id()].length === 1)
         {
            // Played an event with an implemented ability.
         }
         else if ((cardAttachments[agentTableau[0].id()] !== undefined && cardAttachments[agentTableau[0].id()].length === 1) ||
            (cardAttachments[agentTableau[1].id()] !== undefined && cardAttachments[agentTableau[1].id()].length === 1) ||
            (cardAttachments[agentTableau[2].id()] !== undefined && cardAttachments[agentTableau[2].id()].length === 1))
         {
            // Played an attachment with an implemented ability.
         }
         else
         {
            cardPlayed1 = agent1.tableau()[agent1.tableau().length - 1];
            console.log("cardPlayed1 = " + cardPlayed1);
            console.log("cardPlayed1.card().cost = " + cardPlayed1.card().cost);
            console.log("cardPlayed1.card().threatCost = " + cardPlayed1.card().threatCost);
            assert.equal(store.getState().agentHand[agent1.id()].length, 5, "agent1 hand size === 5 (one card)");
            assert.equal(store.getState().agentTableau[agent1.id()].length, 4, "agent1 tableau size === 4 (one card)");
            let cost1 = (cardPlayed1.card().cost !== undefined ? cardPlayed1.card().cost : cardPlayed1.card().threatCost);
            expected = (2 - cost1);
            assert.equal(agent1.resourceMap()[Sphere.LEADERSHIP], expected, "agent1.resourceMap()[Sphere.LEADERSHIP] === " + expected);
         }
      }
      else if (agent1BeforeHandSize - agent1AfterHandSize === 2)
      {
         assert.equal(agent1BeforeHandSize - agent1AfterHandSize, 2, "two cards");
         let agentPlayerDiscard = store.getState().agentPlayerDiscard;
         if (agentPlayerDiscard[agent1.id()] !== undefined && agentPlayerDiscard[agent1.id()].length === 1)
         {
            // Played an event with an implemented ability.
         }
         else
         {
            cardPlayed0 = agent1.tableau()[agent1.tableau().length - 2];
            cardPlayed1 = agent1.tableau()[agent1.tableau().length - 1];
            assert.equal(store.getState().agentHand[agent1.id()].length, 4, "agent1 hand size === 4 (two cards)");
            assert.equal(store.getState().agentTableau[agent1.id()].length, 5, "agent1 tableau size === 5 (two cards)");
            expected = (2 - cardPlayed0.card().cost - cardPlayed1.card().cost);
            assert.equal(agent1.resourceMap()[Sphere.LEADERSHIP], expected, "agent1.resourceMap()[Sphere.LEADERSHIP] === " + expected);
         }
      }
      else
      {
         assert.equal(agent1BeforeHandSize - agent1AfterHandSize, 3, "three cards");
         let agentPlayerDiscard = store.getState().agentPlayerDiscard;
         if (agentPlayerDiscard[agent1.id()] !== undefined && agentPlayerDiscard[agent1.id()].length === 1)
         {
            // Played an event with an implemented ability.
         }
         else
         {
            cardPlayed0 = agent1.tableau()[agent1.tableau().length - 3];
            cardPlayed1 = agent1.tableau()[agent1.tableau().length - 2];
            var cardPlayed2 = agent1.tableau()[agent1.tableau().length - 1];
            assert.equal(store.getState().agentHand[agent1.id()].length, 3, "agent1 hand size === 3 (three cards)");
            assert.equal(store.getState().agentTableau[agent1.id()].length, 6, "agent1 tableau size === 6 (three cards)");
            expected = (2 - cardPlayed0.card().cost - cardPlayed1.card().cost - cardPlayed2.card().cost);
            assert.equal(agent1.resourceMap()[Sphere.LEADERSHIP], expected, "agent1.resourceMap()[Sphere.LEADERSHIP] === " + expected);
         }
      }

      assert.equal(store.getState().agentHand[agent2.id()].length, 6); // no resources to spend
      assert.equal(store.getState().agentTableau[agent2.id()].length, 3); // no resources to spend
      done();
   };

   // Run.
   var done = assert.async();
   task.doIt(callback);
});

function createGame()
{
   var store = Redux.createStore(Reducer.root);
   store.dispatch(Action.setDelay(10));
   var scenarioDeck = ScenarioDeckBuilder.PassageThroughMirkwoodDeckBuilder.buildDeck(store);
   var agent1 = new Agent(store, "agent1");
   var agent2 = new Agent(store, "agent2");
   var playerData = [
      {
         agent: agent1,
         playerDeck: PlayerDeckBuilder.CoreLeadershipDeckBuilder.buildDeck(store),
    },
      {
         agent: agent2,
         playerDeck: PlayerDeckBuilder.CoreLoreDeckBuilder.buildDeck(store),
    }, ];

   return new Game(store, scenarioDeck, playerData);
}

var PlanningTaskTest = {};
export default PlanningTaskTest;