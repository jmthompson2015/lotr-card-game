"use strict";

define(["create-react-class", "prop-types", "react", "react-dom-factories", "view/js/LabeledImage", "view/js/ReactUtilities"],
   function(createReactClass, PropTypes, React, DOM, LabeledImage, ReactUtilities)
   {
      var TokenPanel = createReactClass(
      {
         render: function()
         {
            var cells = [];

            this.maybeAddAttribute(cells, this.props.bonusAttack, "token/Attack20.png", "Attack Bonus");
            this.maybeAddAttribute(cells, this.props.bonusDefense, "token/Defense20.png", "Defense Bonus");
            this.maybeAddAttribute(cells, this.props.bonusHitPoints, "token/HitPoints20.png", "Hit Points Bonus");
            this.maybeAddAttribute(cells, this.props.bonusThreat, "token/Threat20.png", "Threat Bonus");
            this.maybeAddAttribute(cells, this.props.bonusWillpower, "token/Willpower20.png", "Willpower Bonus");
            this.maybeAddToken(cells, this.props.progressCount, "token/Progress32.png", "Progress");
            this.maybeAddToken(cells, this.props.neutralCount, "token/Resource32.png", "Neutral Resource");
            this.maybeAddToken(cells, this.props.leadershipCount, "token/LeadershipResource32.png", "Leadership Resource");
            this.maybeAddToken(cells, this.props.loreCount, "token/LoreResource32.png", "Lore Resource");
            this.maybeAddToken(cells, this.props.spiritCount, "token/SpiritResource32.png", "Spirit Resource");
            this.maybeAddToken(cells, this.props.tacticsCount, "token/TacticsResource32.png", "Tactics Resource");
            this.maybeAddToken(cells, this.props.bagginsCount, "token/Resource32.png", "Baggins Resource");
            this.maybeAddToken(cells, this.props.fellowshipCount, "token/Resource32.png", "Fellowship Resource");
            this.maybeAddToken(cells, this.props.woundCount, "token/Wound32.png", "Wound");

            var row = ReactUtilities.createRow(cells, "tokenRow");
            var centerCell = ReactUtilities.createTable(row, "tokenPanel", "center tc v-mid");
            var keySuffix = "" + this.props.bonusAttack + this.props.bonusDefense + this.props.bonusHitPoints + this.props.bonusThreat + this.props.bonusWillpower;

            return DOM.div(
            {
               key: this.props.myKey + keySuffix,
               className: "w-100",
            }, centerCell);
         },
      });

      TokenPanel.prototype.maybeAddAttribute = function(cells, count, src, title)
      {
         if (count !== undefined && count !== 0)
         {
            var prefix = (count > 0 ? "+" : "-");
            var image = DOM.img(
            {
               className: "v-mid",
               src: this.props.resourceBase + src,
               title: title,
            });

            var cell0 = DOM.div(
            {
               key: "countCell",
               className: "dtc v-mid",
               title: title,
            }, prefix + count);
            var cell1 = ReactUtilities.createCell(image, "imageCell", "v-mid");
            var row = ReactUtilities.createRow([cell0, cell1], "countImageRow");
            var table = ReactUtilities.createTable(row, "countImageTable");

            cells.push(ReactUtilities.createCell(table, "tokenCell" + title + cells.length, "v-mid"));
         }
      };

      TokenPanel.prototype.maybeAddToken = function(cells, count, src, title)
      {
         if (count !== undefined && count !== 0)
         {
            var cell = React.createElement(LabeledImage,
            {
               src: src,
               label: "" + count,
               labelClass: "b white",
               resourceBase: this.props.resourceBase,
               title: title,
            });

            cells.push(ReactUtilities.createCell(cell, "tokenCell" + title + cells.length));
         }
      };

      TokenPanel.propTypes = {
         resourceBase: PropTypes.string.isRequired,

         bagginsCount: PropTypes.number,
         bonusAttack: PropTypes.number,
         bonusDefense: PropTypes.number,
         bonusHitPoints: PropTypes.number,
         bonusThreat: PropTypes.number,
         bonusWillpower: PropTypes.number,
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
