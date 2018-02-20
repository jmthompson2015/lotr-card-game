"use strict";

require(["react", "react-dom", "common/js/Logger", "model/js/PlayerDeckBuilder", "model/js/SimpleAgentStrategy", "view/js/AgentDeckUI",
        "controller/js/HumanAgentStrategy",
      ],
   function(React, ReactDOM, Logger, PlayerDeckBuilder, SimpleAgentStrategy, AgentDeckUI, HumanAgentStrategy)
   {
      window.LOGGER = new Logger();
      LOGGER.setTraceEnabled(false);
      LOGGER.setDebugEnabled(false);

      var resourceBase = "../../../src/view/resource/";

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
   });