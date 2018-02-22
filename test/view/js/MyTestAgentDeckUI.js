import Logger from "../../../src/common/js/Logger.js";
import PlayerDeckBuilder from "../../../src/model/js/PlayerDeckBuilder.js";
import SimpleAgentStrategy from "../../../src/model/js/SimpleAgentStrategy.js";
import AgentDeckUI from "../../../src/view/js/AgentDeckUI.js";
import HumanAgentStrategy from "../../../src/controller/js/HumanAgentStrategy.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var agentNameChanged = function(agentId, agentName)
{
   LOGGER.info(agentId + " agentName = " + agentName + " " + (typeof agentName));
   renderAgentDeckUI();
};
var agentTypeChanged = function(agentId, agentType)
{
   LOGGER.info(agentId + " agentType = " + agentType.shortName + " " + (typeof agentType));
   renderAgentDeckUI();
};
var deckBuilderChanged = function(agentId, deckBuilder)
{
   LOGGER.info(agentId + " deckBuilder = " + deckBuilder + " " + (typeof deckBuilder));
   renderAgentDeckUI();
};
var deckBuilderTypeChanged = function(agentId, deckBuilderType)
{
   LOGGER.info(agentId + " deckBuilderType = " + deckBuilderType + " " + (typeof deckBuilderType));
   renderAgentDeckUI();
};

function renderAgentDeckUI()
{
   var element = React.createElement(AgentDeckUI,
   {
      agentName: "Adam",
      agentNumber: 1,
      agentType: SimpleAgentStrategy,
      agentTypes: [SimpleAgentStrategy, HumanAgentStrategy],
      deckBuilder: PlayerDeckBuilder.CoreLeadershipDeckBuilder,
      deckBuilders: PlayerDeckBuilder.DeckBuilders,
      deckBuilderType: AgentDeckUI.PREFABRICATED,
      inputAreaId: "inputArea",

      agentNameChanged: agentNameChanged,
      agentTypeChanged: agentTypeChanged,
      deckBuilderChanged: deckBuilderChanged,
      deckBuilderTypeChanged: deckBuilderTypeChanged,
   });
   ReactDOM.render(element, document.getElementById("inputArea"));
}

renderAgentDeckUI();