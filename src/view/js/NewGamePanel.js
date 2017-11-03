"use strict";

define(["create-react-class", "immutable", "prop-types", "react", "react-dom-factories", "redux", "common/js/InputValidator", "artifact/js/CardSet", "artifact/js/GameMode", "artifact/js/Scenario",
  "model/js/Agent", "model/js/PlayerDeckBuilder", "model/js/Reducer", "model/js/ScenarioDeckBuilder", "model/js/SimpleAgentStrategy",
   "view/js/AgentDeckUI", "view/js/Button", "view/js/OptionPane", "view/js/ReactUtilities", "view/js/Select", "controller/js/HumanAgentStrategy"],
   function(createReactClass, Immutable, PropTypes, React, DOM, Redux, InputValidator, CardSet, GameMode, Scenario,
      Agent, PlayerDeckBuilder, Reducer, ScenarioDeckBuilder, SimpleAgentStrategy,
      AgentDeckUI, Button, OptionPane, ReactUtilities, Select, HumanAgentStrategy)
   {
      var NewGamePanel = createReactClass(
      {
         getInitialState: function()
         {
            var agentNames = Immutable.Map(
            {
               1: "Bilbo",
               2: "Frodo",
               3: "Merry",
               4: "Pippin",
            });
            var agentTypes = Immutable.Map(
            {
               1: HumanAgentStrategy,
               2: SimpleAgentStrategy,
               3: SimpleAgentStrategy,
               4: SimpleAgentStrategy,
            });
            var playerDeckBuilderTypes = Immutable.Map(
            {
               1: AgentDeckUI.PREFABRICATED,
               2: AgentDeckUI.PREFABRICATED,
               3: AgentDeckUI.PREFABRICATED,
               4: AgentDeckUI.PREFABRICATED,
            });
            var playerDeckBuilders = Immutable.Map(
            {
               1: PlayerDeckBuilder.CoreLeadershipDeckBuilder,
               2: PlayerDeckBuilder.CoreLoreDeckBuilder,
               3: PlayerDeckBuilder.CoreSpiritDeckBuilder,
               4: PlayerDeckBuilder.CoreTacticsDeckBuilder,
            });
            var scenarioDeckBuilders = getScenarioDeckBuilders(this.props.cardSetKey);
            LOGGER.debug("NewGamePanel.getInitialState() scenarioDeckBuilders = " + scenarioDeckBuilders);

            return (
            {
               agentCount: this.props.agentCount,
               agentNames: agentNames,
               agentTypes: agentTypes,
               cardSetKey: this.props.cardSetKey,
               gameModeKey: this.props.gameModeKey,
               playerDeckBuilderTypes: playerDeckBuilderTypes,
               playerDeckBuilders: playerDeckBuilders,
               scenarioKey: this.props.scenarioKey,
               scenarioDeckBuilders: scenarioDeckBuilders,
            });
         },

         render: function()
         {
            var rows = [];
            var cells = [];
            cells.push(ReactUtilities.createCell("Card Set: ", "cardSetLabel", "pa1 tl"));
            cells.push(ReactUtilities.createCell(this.createCardSetSelect(), "cardSetSelect", "pa1 tl"));
            rows.push(ReactUtilities.createRow(cells, "row" + rows.length));

            cells = [];
            cells.push(ReactUtilities.createCell("Scenario: ", "scenarioLabel", "pa1 tl"));
            cells.push(ReactUtilities.createCell(this.createScenarioSelect(), "scenarioSelect", "pa1 tl"));
            rows.push(ReactUtilities.createRow(cells, "row" + rows.length));

            cells = [];
            cells.push(ReactUtilities.createCell("Game Mode: ", "gameModeLabel", "pa1 tl"));
            cells.push(ReactUtilities.createCell(this.createGameModeSelect(), "gameModeSelect", "pa1 tl"));
            rows.push(ReactUtilities.createRow(cells, "row" + rows.length));

            cells = [];
            cells.push(ReactUtilities.createCell("Agent Count: ", "agentCountLabel", "pa1 tl"));
            cells.push(ReactUtilities.createCell(this.createAgentCountSelect(), "agentCountSelect", "pa1 tl"));
            rows.push(ReactUtilities.createRow(cells, "row" + rows.length));

            var topCell = ReactUtilities.createRow(rows, "topCell");
            rows = [];

            for (var agentId = 1; agentId <= 4; agentId++)
            {
               var isHidden = (agentId - 1 >= this.state.agentCount);
               rows.push(ReactUtilities.createRow(this.createAgentDeckUI(agentId, isHidden), "agentDeck" + agentId));
            }

            var message = DOM.div(
            {
               className: "dt f6",
            }, topCell, rows);
            var buttons = this.createButtons();

            return React.createElement(OptionPane,
            {
               buttons: buttons,
               message: message,
               title: "New Game",
            });
         },
      });

      NewGamePanel.prototype.createAgentCountSelect = function()
      {
         return React.createElement(Select,
         {
            initialSelectedValue: "" + this.props.agentCount,
            onChange: this.handleAgentCountChanged.bind(this),
            values: [1, 2, 3, 4],
         });
      };

      NewGamePanel.prototype.createAgentDeckUI = function(agentId, isHidden)
      {
         var element = React.createElement(AgentDeckUI,
         {
            agentName: this.state.agentNames.get("" + agentId),
            agentNumber: agentId,
            agentType: this.state.agentTypes.get("" + agentId),
            agentTypes: [SimpleAgentStrategy, HumanAgentStrategy],
            deckBuilder: this.state.playerDeckBuilders.get("" + agentId),
            deckBuilderType: this.state.playerDeckBuilderTypes.get("" + agentId),
            deckBuilders: PlayerDeckBuilder.DeckBuilders,
            inputAreaId: "inputArea",
            isHidden: isHidden,

            agentNameChanged: this.handleAgentNameChanged.bind(this),
            agentTypeChanged: this.handleAgentTypeChanged.bind(this),
            deckBuilderChanged: this.handleDeckBuilderChanged.bind(this),
            deckBuilderTypeChanged: this.handleDeckBuilderTypeChanged.bind(this),
         });

         return DOM.div(
         {
            key: "agentDeckUI" + agentId,
            className: "ma1",
         }, element);
      };

      NewGamePanel.prototype.createButtons = function()
      {
         var okButton = React.createElement(Button,
         {
            key: "okButton",
            name: "OK",
            onClick: this.ok.bind(this),
         });

         return DOM.span(
         {}, [okButton]);
      };

      NewGamePanel.prototype.createCardSetSelect = function()
      {
         var labelFunction = function(value)
         {
            var cardSet = CardSet.properties[value];
            return cardSet.number + " " + cardSet.name;
         };

         return React.createElement(Select,
         {
            initialSelectedValue: this.props.cardSetKey,
            labelFunction: labelFunction,
            onChange: this.handleCardSetChanged.bind(this),
            values: [CardSet.CORE, CardSet.SHADOWS_OF_MIRKWOOD],
         });
      };

      NewGamePanel.prototype.createGameModeSelect = function()
      {
         var labelFunction = function(value)
         {
            return GameMode.properties[value].name;
         };

         return React.createElement(Select,
         {
            initialSelectedValue: this.props.gameModeKey,
            labelFunction: labelFunction,
            onChange: this.handleGameModeChanged.bind(this),
            values: [GameMode.EASY, GameMode.STANDARD],
         });
      };

      NewGamePanel.prototype.createScenarioSelect = function()
      {
         var labelFunction = function(value)
         {
            var scenario = Scenario.properties[value];
            return scenario.number + " " + scenario.name;
         };

         return React.createElement(Select,
         {
            initialSelectedValue: this.props.scenarioKey,
            labelFunction: labelFunction,
            onChange: this.handleScenarioChanged.bind(this),
            values: this.state.scenarioDeckBuilders,
         });
      };

      NewGamePanel.prototype.handleAgentCountChanged = function(event)
      {
         var selected = event.target.value;
         LOGGER.debug("NewGamePanel.handleAgentCountChange() selected = " + selected + " " + (typeof selected));
         var agentCount = parseInt(selected);

         this.setState(
         {
            agentCount: agentCount,
         });
      };

      NewGamePanel.prototype.handleAgentNameChanged = function(agentId, name)
      {
         InputValidator.validateIsNumber("agentId", agentId);
         InputValidator.validateIsString("name", name);

         this.setState(
         {
            agentNames: this.state.agentNames.set("" + agentId, name),
         });
      };

      NewGamePanel.prototype.handleAgentTypeChanged = function(agentId, type)
      {
         InputValidator.validateIsNumber("agentId", agentId);
         InputValidator.validateNotNull("type", type);
         LOGGER.debug("NewGamePanel.handleDeckBuilderChanged() agentId = " + agentId + " " + (typeof agentId));
         LOGGER.debug("NewGamePanel.handleDeckBuilderChanged() type = " + type + " " + (typeof type));

         this.setState(
         {
            agentTypes: this.state.agentTypes.set("" + agentId, type),
         });
      };

      NewGamePanel.prototype.handleCardSetChanged = function(event)
      {
         var selected = event.target.value;
         LOGGER.debug("NewGamePanel.handleCardSetChanged() selected = " + selected + " " + (typeof selected));
         var scenarioDeckBuilders = getScenarioDeckBuilders(selected);
         LOGGER.debug("NewGamePanel.handleCardSetChanged() scenarioDeckBuilders = " + scenarioDeckBuilders);
         var scenarioKey = scenarioDeckBuilders[0];

         this.setState(
         {
            cardSetKey: selected,
            scenarioDeckBuilders: scenarioDeckBuilders,
            scenarioKey: scenarioKey,
         });
      };

      NewGamePanel.prototype.handleDeckBuilderTypeChanged = function(agentId, type)
      {
         InputValidator.validateIsNumber("agentId", agentId);
         InputValidator.validateIsString("type", type);

         this.setState(
         {
            playerDeckBuilderTypes: this.state.playerDeckBuilderTypes.set("" + agentId, type),
         });
      };

      NewGamePanel.prototype.handleDeckBuilderChanged = function(agentId, deckBuilder)
      {
         InputValidator.validateIsNumber("agentId", agentId);
         InputValidator.validateNotNull("deckBuilder", deckBuilder);
         LOGGER.debug("NewGamePanel.handleDeckBuilderChanged() agentId = " + agentId + " " + (typeof agentId));
         LOGGER.debug("NewGamePanel.handleDeckBuilderChanged() deckBuilder = " + deckBuilder + " " + (typeof deckBuilder));

         this.setState(
         {
            playerDeckBuilders: this.state.playerDeckBuilders.set("" + agentId, deckBuilder),
         });
      };

      NewGamePanel.prototype.handleGameModeChanged = function(event)
      {
         var selected = event.target.value;
         LOGGER.debug("NewGamePanel.handleGameModeChanged() selected = " + selected + " " + (typeof selected));

         this.setState(
         {
            gameModeKey: selected,
         });
      };

      NewGamePanel.prototype.handleScenarioChanged = function(event)
      {
         var selected = event.target.value;
         LOGGER.debug("NewGamePanel.handleScenarioChange() selected = " + selected + " " + (typeof selected));

         this.setState(
         {
            scenarioKey: selected,
         });
      };

      NewGamePanel.prototype.ok = function()
      {
         var store = Redux.createStore(Reducer.root);
         var scenarioDeckBuilder = ScenarioDeckBuilder.ScenarioDeckBuilder.findByScenario(this.state.scenarioKey);
         var scenarioDeck = scenarioDeckBuilder.buildDeck(store, this.state.gameModeKey);
         var playerData = [];

         for (var agentId = 1; agentId <= this.state.agentCount; agentId++)
         {
            var agentName = this.state.agentNames.get("" + agentId);
            var agentType = this.state.agentTypes.get("" + agentId);
            var agent = new Agent(store, agentName, undefined, agentType);
            LOGGER.debug(agentId + " agent = " + agent + " " + (typeof agent));
            var playerDeckBuilder = this.state.playerDeckBuilders.get("" + agentId);
            LOGGER.debug(agentId + " playerDeckBuilder = " + playerDeckBuilder + " " + (typeof playerDeckBuilder));
            var playerDeck = playerDeckBuilder.buildDeck(store);
            playerData.push(
            {
               agent: agent,
               playerDeck: playerDeck,
            });
         }

         this.props.callback(scenarioDeck, playerData);
      };

      function getScenarioDeckBuilders(cardSetKey)
      {
         var answer = Scenario.findByCardSet(cardSetKey);

         answer.sort(function(a, b)
         {
            var scenarioA = Scenario.properties[a];
            var scenarioB = Scenario.properties[b];
            return scenarioA.number - scenarioB.number;
         });

         return answer;
      }

      NewGamePanel.propTypes = {
         callback: PropTypes.func.isRequired,

         agentCount: PropTypes.number,
         cardSetKey: PropTypes.string,
         gameModeKey: PropTypes.string,
         scenarioKey: PropTypes.string,
      };

      NewGamePanel.defaultProps = {
         agentCount: 2,
         cardSetKey: CardSet.CORE,
         gameModeKey: GameMode.EASY,
         scenarioKey: Scenario.PASSAGE_THROUGH_MIRKWOOD,
      };

      return NewGamePanel;
   });
