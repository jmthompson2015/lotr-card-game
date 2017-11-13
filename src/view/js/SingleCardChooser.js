"use strict";

define(["create-react-class", "prop-types", "react", "react-dom-factories", "view/js/Button", "view/js/InputPanel", "view/js/OptionPane"],
   function(createReactClass, PropTypes, React, DOM, Button, InputPanel, OptionPane)
   {
      var SingleCardChooser = createReactClass(
      {
         render: function()
         {
            var cardInstances = this.props.cardInstances;

            if (this.props.comparator)
            {
               cardInstances.sort(this.props.comparator);
            }

            var inputPanel = this.createInputPanel(cardInstances);
            var buttons = this.createButtons();

            return React.createElement(OptionPane,
            {
               panelClass: "bg-lotr-light",
               title: this.props.title,
               titleClass: "bg-lotr-dark",
               message: this.props.message,
               messageClass: "ma2 pa2",
               initialInput: inputPanel,
               buttons: buttons,
               buttonsClass: "pa2 tr",
            });
         },
      });

      SingleCardChooser.prototype.createButtons = function()
      {
         var passButton = this.createPassButton();
         var answer;

         if (this.props.hasButtons)
         {
            answer = DOM.span(
            {}, [passButton]);
         }
         else
         {
            answer = DOM.span();
         }

         return answer;
      };

      SingleCardChooser.prototype.createInputPanel = function(cardInstances)
      {
         return React.createElement(InputPanel,
         {
            type: InputPanel.Type.RADIO,
            values: cardInstances,
            name: "selectCard",
            labelFunction: this.props.labelFunction,
            onChange: this.handleChange.bind(this),
            panelClass: "f6 tl",
         });
      };

      SingleCardChooser.prototype.createPassButton = function()
      {
         return React.createElement(Button,
         {
            key: 0,
            name: "Pass",
            onClick: this.pass.bind(this),
         });
      };

      SingleCardChooser.prototype.handleChange = function(event, selected)
      {
         var isAccepted = (selected !== undefined);
         this.props.onChange(selected, isAccepted);
      };

      SingleCardChooser.prototype.pass = function()
      {
         var isAccepted = false;
         this.props.onChange(undefined, isAccepted);
      };

      function defaultComparator(a, b)
      {
         var aa = a.card().name;
         var bb = b.card().name;

         return (aa === bb ? 0 : (aa > bb ? 1 : -1));
      }

      function defaultLabelFunction(value)
      {
         var card = value.card();

         return card.name + " (" + card.cardType.name + ")";
      }

      SingleCardChooser.propTypes = {
         cardInstances: PropTypes.array.isRequired,
         onChange: PropTypes.func.isRequired,
         title: PropTypes.string.isRequired,

         comparator: PropTypes.func,
         hasButtons: PropTypes.bool,
         labelFunction: PropTypes.func,
         message: PropTypes.string,
         myKey: PropTypes.string,
      };

      SingleCardChooser.defaultProps = {
         comparator: defaultComparator,
         hasButtons: true,
         labelFunction: defaultLabelFunction,
         message: "",
         myKey: "singleCardChooser",
      };

      return SingleCardChooser;
   });
