"use strict";

define(["create-react-class", "prop-types", "react", "react-dom-factories", "view/js/Button", "view/js/InputPanel", "view/js/OptionPane"],
   function(createReactClass, PropTypes, React, DOM, Button, InputPanel, OptionPane)
   {
      var CharacterAttackersChooser = createReactClass(
      {
         getInitialState: function()
         {
            return (
            {
               selected: [],
            });
         },

         render: function()
         {
            var defenderInstance = this.props.defenderInstance;
            var cardInstances = this.props.cardInstances;
            cardInstances.sort(CardComparator);

            var labelFunction = function(value)
            {
               return value.card().name + " (attack " + value.card().attack + ")";
            };

            var initialInput = React.createElement(InputPanel,
            {
               type: InputPanel.Type.CHECKBOX,
               values: cardInstances,
               name: "selectAttackers",
               labelFunction: labelFunction,
               onChange: this.handleChange,
               panelClass: "f6 tl",
            });

            var title = "Select Attackers";
            var remainingPoints = defenderInstance.remainingHitPoints();
            var message = "Defender: " + defenderInstance.card().name + " (hit points " + remainingPoints + ")";
            var cancelButton = React.createElement(Button,
            {
               key: "cancelButton",
               name: "Cancel",
               onClick: this.cancel,
            });
            var okButton = React.createElement(Button,
            {
               key: "okButton",
               name: "OK",
               onClick: this.ok,
            });
            var buttons = DOM.span(
            {}, [cancelButton, okButton]);

            return React.createElement(OptionPane,
            {
               panelClass: "bg-lotr-light",
               title: title,
               titleClass: "bg-lotr-dark",
               message: message,
               messageClass: "ma2 pa2",
               initialInput: initialInput,
               buttons: buttons,
               buttonsClass: "pa2 tr",
            });
         },

         cancel: function()
         {
            var selected;
            var isAccepted = false;
            LOGGER.debug("CharacterAttackersChooser.cancel() selected = " + selected + " isAccepted ? " + isAccepted);

            this.props.onChange(selected, isAccepted);
         },

         handleChange: function(event, selected)
         {
            LOGGER.debug("CharacterAttackersChooser.handleChange() selected = " + selected);

            this.setState(
            {
               selected: selected,
            });
         },

         ok: function()
         {
            var selected = this.state.selected;
            var isAccepted = (selected !== undefined);
            LOGGER.debug("CharacterAttackersChooser.ok() selected = " + selected + " isAccepted ? " + isAccepted);

            this.props.onChange(selected, isAccepted);
         },
      });

      var CardComparator = function(a, b)
      {
         var cardA = a.card();
         var cardB = b.card();

         var answer = compare(cardB.attack, cardA.attack); // descending

         if (answer === 0)
         {
            answer = compare(cardA.name, cardB.name);
         }

         return answer;
      };

      function compare(a, b)
      {
         return (a === b ? 0 : (a > b ? 1 : -1));
      }

      CharacterAttackersChooser.propTypes = {
         defenderInstance: PropTypes.object.isRequired,
         cardInstances: PropTypes.array.isRequired,
      };

      return CharacterAttackersChooser;
   });
