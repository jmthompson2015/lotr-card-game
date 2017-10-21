"use strict";

define(["create-react-class", "prop-types", "react", "react-dom-factories", "view/js/Button", "view/js/InputPanel", "view/js/OptionPane"],
   function(createReactClass, PropTypes, React, DOM, Button, InputPanel, OptionPane)
   {
      var QuestersChooser = createReactClass(
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
            var questInstance = this.props.questInstance;
            var cardInstances = this.props.cardInstances;
            cardInstances.sort(CardComparator);

            var labelFunction = function(value)
            {
               return value.card().name + " (willpower " + value.card().willpower + ")";
            };

            var initialInput = React.createElement(InputPanel,
            {
               type: InputPanel.Type.CHECKBOX,
               values: cardInstances,
               name: "selectQuesters",
               labelFunction: labelFunction,
               onChange: this.handleChange,
               panelClass: "f6 tl",
            });

            var title = "Select Questers";
            var remainingPoints = questInstance.card().questPoints - questInstance.progress();
            var message = "Quest: " + questInstance.card().name + " (points " + remainingPoints + ")";
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
            LOGGER.debug("QuestersChooser.cancel() selected = " + selected + " isAccepted ? " + isAccepted);

            this.props.onChange(selected, isAccepted);
         },

         handleChange: function(event, selected)
         {
            LOGGER.debug("QuestersChooser.handleChange() selected = " + selected);

            this.setState(
            {
               selected: selected,
            });
         },

         ok: function()
         {
            var selected = this.state.selected;
            var isAccepted = (selected !== undefined);
            LOGGER.debug("QuestersChooser.ok() selected = " + selected + " isAccepted ? " + isAccepted);

            this.props.onChange(selected, isAccepted);
         },
      });

      var CardComparator = function(a, b)
      {
         var answer = -1;
         var willpowerA = a.card().willpower;
         var willpowerB = b.card().willpower;

         if (willpowerA === willpowerB)
         {
            answer = 0;
         }
         else if (willpowerA < willpowerB)
         {
            answer = 1;
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

      QuestersChooser.propTypes = {
         questInstance: PropTypes.object.isRequired,
         cardInstances: PropTypes.array.isRequired,
      };

      return QuestersChooser;
   });