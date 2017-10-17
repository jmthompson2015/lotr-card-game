"use strict";

define(["create-react-class", "prop-types", "react", "react-dom-factories", "view/js/LabeledImage"],
   function(createReactClass, PropTypes, React, DOM, LabeledImage)
   {
      var TokenPanel = createReactClass(
      {
         render: function()
         {
            var cells = [];

            this.maybeAddToken(cells, this.props.progressCount, "token/Progress32.png", "Progress");
            this.maybeAddToken(cells, this.props.neutralCount, "token/Resource32.png", "Neutral Resource");
            this.maybeAddToken(cells, this.props.leadershipCount, "token/LeadershipResource32.png", "Leadership Resource");
            this.maybeAddToken(cells, this.props.loreCount, "token/LoreResource32.png", "Lore Resource");
            this.maybeAddToken(cells, this.props.spiritCount, "token/SpiritResource32.png", "Spirit Resource");
            this.maybeAddToken(cells, this.props.tacticsCount, "token/TacticsResource32.png", "Tactics Resource");
            this.maybeAddToken(cells, this.props.bagginsCount, "token/Resource32.png", "Baggins Resource");
            this.maybeAddToken(cells, this.props.fellowshipCount, "token/Resource32.png", "Fellowship Resource");
            this.maybeAddToken(cells, this.props.woundCount, "token/Wound32.png", "Wound");

            var centerCell = DOM.div(
            {
               className: "center dt tc v-mid",
            }, cells);

            return DOM.div(
            {
               key: this.props.myKey,
               className: "bg-near-white w-100",
            }, centerCell);
         },
      });

      TokenPanel.prototype.maybeAddToken = function(cells, count, src, title)
      {
         if (count !== undefined)
         {
            var cell = React.createElement(LabeledImage,
            {
               src: src,
               label: "" + count,
               labelClass: "b white",
               resourceBase: this.props.resourceBase,
               title: title,
            });
            cells.push(DOM.div(
            {
               key: "tokenCell" + title + cells.length,
               className: "dtc",
            }, cell));
         }
      };

      TokenPanel.propTypes = {
         resourceBase: PropTypes.string.isRequired,

         bagginsCount: PropTypes.number,
         fellowshipCount: PropTypes.number,
         leadershipCount: PropTypes.number,
         loreCount: PropTypes.number,
         myKey: PropTypes.string,
         neutralCount: PropTypes.number,
         progressCount: PropTypes.number,
         spiritCount: PropTypes.number,
         tacticsCount: PropTypes.number,
         woundCount: PropTypes.number,
      };

      TokenPanel.defaultProps = {
         myKey: "tokenPanel",
      };

      return TokenPanel;
   });
