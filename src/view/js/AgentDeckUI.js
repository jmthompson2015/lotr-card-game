"use strict";

define(["create-react-class", "prop-types", "react", "react-dom-factories", "view/js/Select"],
   function(createReactClass, PropTypes, React, DOM, Select)
   {
      var AgentDeckUI = createReactClass(
      {
         render: function()
         {
            var agentNameUI = this.createAgentNameUI();
            var agentTypeUI = this.createAgentTypeSelect();
            var deckBuilderTypeUI = this.createDeckBuilderTypeSelect();
            var deckChooserPanel = this.createDeckChooserPanel();

            var topCell = createRow(createCell("Agent " + this.props.agentNumber, "agentCell", "b tc"), "agentRow");

            var rows = [];
            var cells = [];
            cells.push(createCell("Agent Name: ", "agentNameLabel"));
            cells.push(createCell(agentNameUI, "agentNameValue"));
            rows.push(createRow(cells, "agentNameRow"));
            cells = [];
            cells.push(createCell("Agent Type: ", "agentTypeLabel"));
            cells.push(createCell(agentTypeUI, "agentTypeValue"));
            rows.push(createRow(cells, "agentTypeRow"));
            cells = [];
            cells.push(createCell("Deck Type: ", "deckTypeLabel"));
            cells.push(createCell(deckBuilderTypeUI, "deckTypeValue"));
            rows.push(createRow(cells, "deckTypeRow"));
            var middleCells = DOM.div(
            {
               key: "middleCells" + this.props.agentNumber + this.props.isHidden,
               className: "dt",
            }, rows);

            var bottomCell = createRow(createCell(deckChooserPanel), "deckChooserRow");

            var mainPanel = DOM.div(
            {
               key: "mainPanel" + this.props.agentNumber + this.props.hidden,
               className: "bg-lotr-green dt f6 tl",
            }, topCell, middleCells, bottomCell);

            return DOM.div(
            {
               key: "agentDeckUI" + this.props.agentNumber + this.props.hidden,
               className: (this.props.isHidden ? "dn" : undefined),
            }, mainPanel);
         },
      });

      AgentDeckUI.prototype.createAgentNameUI = function()
      {
         var agentName = this.props.agentName;

         return DOM.input(
         {
            type: "text",
            defaultValue: agentName,
            onChange: this.handleAgentNameChanged.bind(this),
         });
      };

      AgentDeckUI.prototype.createAgentTypeSelect = function()
      {
         var typeNames = this.props.agentTypes.map(function(agentType)
         {
            return agentType.shortName;
         });
         var typeName = this.props.agentType.shortName;

         return React.createElement(Select,
         {
            values: typeNames,
            initialSelectedValue: typeName,
            onChange: this.handleAgentTypeChanged.bind(this),
         });
      };

      AgentDeckUI.prototype.createDeckChooserPanel = function()
      {
         var deckChooserPanel;
         var deckType = this.props.deckBuilderType;

         if (deckType === AgentDeckUI.PREFABRICATED)
         {
            var deckBuilders = this.props.deckBuilders;
            var labelFunction = function(value)
            {
               return value.toString();
            };
            deckChooserPanel = React.createElement(Select,
            {
               values: deckBuilders,
               initialSelectedValue: this.props.deckBuilder,
               labelFunction: labelFunction,
               onChange: this.handleDeckBuilderChanged.bind(this),
            });
         }
         else if (deckType === AgentDeckUI.CUSTOM)
         {
            // TODO
         }
         else
         {
            throw "Unknown deckType: " + deckType;
         }

         return deckChooserPanel;
      };

      AgentDeckUI.prototype.createDeckBuilderTypeSelect = function()
      {
         return React.createElement(Select,
         {
            values: AgentDeckUI.deckBuilderTypes,
            disabled: true,
            initialSelectedValue: this.props.deckBuilderType,
            onChange: this.handleDeckBuilderTypeChanged.bind(this),
         });
      };

      AgentDeckUI.prototype.handleAgentNameChanged = function(event)
      {
         var name = event.target.value;
         LOGGER.debug("AgentDeckUI.handleAgentNameChanged() name = " + name);
         this.props.agentNameChanged(this.props.agentNumber, name);
      };

      AgentDeckUI.prototype.handleAgentTypeChanged = function(event)
      {
         var selected = event.target.value;
         LOGGER.debug("AgentDeckUI.handleAgentTypeChanged() selected = " + selected + " " + (typeof selected));
         var agentType = this.props.agentTypes.reduce(function(accumulator, agentType)
         {
            if (agentType.shortName === selected)
            {
               accumulator = agentType;
            }
            return accumulator;
         });

         LOGGER.debug("AgentDeckUI.handleAgentTypeChanged() agentType = " + agentType + " " + (typeof agentType));
         this.props.agentTypeChanged(this.props.agentNumber, agentType);
      };

      AgentDeckUI.prototype.handleDeckBuilderChanged = function(event)
      {
         var selected = event.target.value;
         var deckBuilder = this.props.deckBuilders.reduce(function(accumulator, builder)
         {
            if (builder.toString() === selected)
            {
               accumulator = builder;
            }
            return accumulator;
         });

         LOGGER.debug("AgentDeckUI.handleBuilderSquadChanged() deckBuilder = " + deckBuilder + " " + (typeof deckBuilder));
         this.props.deckBuilderChanged(this.props.agentNumber, deckBuilder);
      };

      AgentDeckUI.prototype.handleDeckBuilderTypeChanged = function(event)
      {
         var selected = event.target.value;
         LOGGER.debug("AgentDeckUI.handleDeckBuilderTypeChanged() selected = " + selected);
         this.props.deckBuilderTypeChanged(this.props.agentNumber, selected);
      };

      AgentDeckUI.CUSTOM = "Custom";
      AgentDeckUI.PREFABRICATED = "Prefabricated";
      AgentDeckUI.deckBuilderTypes = [AgentDeckUI.PREFABRICATED, AgentDeckUI.CUSTOM];

      function createCell(element, key, className)
      {
         return DOM.div(
         {
            key: key,
            className: "dtc pa1" + (className ? " " + className : ""),
         }, element);
      }

      function createRow(cells, key, className)
      {
         return DOM.div(
         {
            key: key,
            className: "dt-row" + (className ? " " + className : ""),
         }, cells);
      }

      AgentDeckUI.propTypes = {
         agentName: PropTypes.string.isRequired,
         agentNumber: PropTypes.number.isRequired,
         agentType: PropTypes.object.isRequired,
         agentTypes: PropTypes.array.isRequired,
         deckBuilder: PropTypes.object.isRequired,
         deckBuilders: PropTypes.array.isRequired,

         // callbacks
         agentNameChanged: PropTypes.func.isRequired,
         agentTypeChanged: PropTypes.func.isRequired,
         deckBuilderChanged: PropTypes.func.isRequired,
         deckBuilderTypeChanged: PropTypes.func.isRequired,

         inputAreaId: PropTypes.string,
         isHidden: PropTypes.bool,
      };

      AgentDeckUI.defaultProps = {
         inputAreaId: "inputArea",
         isHidden: false,
      };

      return AgentDeckUI;
   });
