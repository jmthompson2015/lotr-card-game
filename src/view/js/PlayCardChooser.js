"use strict";

define(["create-react-class", "prop-types", "react", "react-dom-factories", "view/js/Button", "view/js/InputPanel", "view/js/OptionPane"],
   function(createReactClass, PropTypes, React, DOM, Button, InputPanel, OptionPane)
   {
      var PlayCardChooser = createReactClass(
      {
         render: function()
         {
            var cardInstances = this.props.cardInstances;
            cardInstances.sort(CardComparator);

            var labelFunction = function(value)
            {
               var card = value.card();
               return card.name + " (" + card.cardType.name + ", " + card.sphere.name + " " + card.cost + ")";
            };

            var initialInput = React.createElement(InputPanel,
            {
               type: InputPanel.Type.RADIO,
               values: cardInstances,
               name: "selectCards",
               labelFunction: labelFunction,
               onChange: this.myOnChange,
               panelClass: "f6 tl",
            });

            var title = "Select Card to Play";
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

      var CardComparator = function(a, b)
      {
         var answer = -1;
         var sphereKeyA = a.card().sphereKey;
         var sphereKeyB = b.card().sphereKey;

         if (sphereKeyA === sphereKeyB)
         {
            answer = 0;
         }
         else if (sphereKeyA > sphereKeyB)
         {
            answer = 1;
         }

         if (answer === 0)
         {
            var cardTypeKeyA = a.card().cardTypeKey;
            var cardTypeKeyB = b.card().cardTypeKey;
            if (cardTypeKeyA === cardTypeKeyB)
            {
               answer = 0;
            }
            else if (cardTypeKeyA > cardTypeKeyB)
            {
               answer = 1;
            }
            else
            {
               answer = -1;
            }
         }

         if (answer === 0)
         {
            var costA = a.card().cost;
            var costB = b.card().cost;
            if (costA === costB)
            {
               answer = 0;
            }
            else if (costA > costB)
            {
               answer = 1;
            }
            else
            {
               answer = -1;
            }
         }

         if (answer === 0)
         {
            var nameA = a.card().name;
            var nameB = b.card().name;
            if (nameA === nameB)
            {
               answer = 0;
            }
            else if (nameA > nameB)
            {
               answer = 1;
            }
            else
            {
               answer = -1;
            }
         }

         return answer;
      };

      PlayCardChooser.propTypes = {
         cardInstances: PropTypes.array.isRequired,
      };

      return PlayCardChooser;
   });
