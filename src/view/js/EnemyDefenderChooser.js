"use strict";

define(["create-react-class", "prop-types", "react", "react-dom-factories", "view/js/Button", "view/js/InputPanel", "view/js/OptionPane"],
   function(createReactClass, PropTypes, React, DOM, Button, InputPanel, OptionPane)
   {
      var EnemyDefenderChooser = createReactClass(
      {
         render: function()
         {
            // var attackerInstance = this.props.attackerInstance;
            var cardInstances = this.props.cardInstances;

            var labelFunction = function(value)
            {
               return value.card().name + " (defense " + value.card().defense + ")";
            };

            var initialInput = React.createElement(InputPanel,
            {
               type: InputPanel.Type.RADIO,
               values: cardInstances,
               name: "selectDefender",
               labelFunction: labelFunction,
               onChange: this.myOnChange,
               panelClass: "f6 tl",
            });

            var title = "Select Enemy Defender";
            // var message = "Attacker: " + attackerInstance.card().name + " (attack " + attackerInstance.card().attack + ")";
            var passButton = React.createElement(Button,
            {
               key: 0,
               name: "Pass",
               onClick: this.pass,
            });
            var buttons = DOM.span(
            {}, [passButton]);

            return React.createElement(OptionPane,
            {
               panelClass: "bg-lotr-light",
               title: title,
               titleClass: "bg-lotr-dark",
               message: "",
               messageClass: "ma2 pa2",
               initialInput: initialInput,
               buttons: buttons,
               buttonsClass: "pa2 tr",
            });
         },

         myOnChange: function(event, selected)
         {
            var isAccepted = (selected !== undefined);
            this.props.onChange(selected, isAccepted);
         },

         pass: function()
         {
            var isAccepted = false;
            this.props.onChange(undefined, isAccepted);
         },
      });

      EnemyDefenderChooser.propTypes = {
         //  attackerInstance: PropTypes.object.isRequired,
         cardInstances: PropTypes.array.isRequired,
      };

      return EnemyDefenderChooser;
   });
