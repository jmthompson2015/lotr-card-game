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
         var cardA = a.card();
         var cardB = b.card();

         var answer = compare(cardA.cardTypeKey, cardB.cardTypeKey);

         if (answer === 0)
         {
            answer = compare(cardB.cost, cardA.cost); // descending
         }

         if (answer === 0)
         {
            answer = compare(cardA.sphereKey, cardB.sphereKey);
         }

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

      PlayCardChooser.propTypes = {
         cardInstances: PropTypes.array.isRequired,
      };

      return PlayCardChooser;
   });
