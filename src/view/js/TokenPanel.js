import Sphere from "../../artifact/js/Sphere.js";
import LabeledImage from "./LabeledImage.js";
import ReactUtilities from "./ReactUtilities.js";

var TokenPanel = createReactClass(
{
   render: function()
   {
      var cells = [];

      this.maybeAddAttribute(cells, this.props.bonusWillpower, "token/Willpower20.png", "Willpower Bonus");
      this.maybeAddAttribute(cells, this.props.bonusThreat, "token/Threat20.png", "Threat Bonus");
      this.maybeAddAttribute(cells, this.props.bonusAttack, "token/Attack20.png", "Attack Bonus");
      this.maybeAddAttribute(cells, this.props.bonusDefense, "token/Defense20.png", "Defense Bonus");
      this.maybeAddAttribute(cells, this.props.bonusHitPoints, "token/HitPoints20.png", "Hit Points Bonus");

      var sphereKey = this.props.sphereKey;
      var sphereKeys = this.props.sphereKeys;

      if (sphereKey && sphereKeys && sphereKeys.length > 1)
      {
         sphereKeys.forEach(function(key)
         {
            if (key !== sphereKey)
            {
               var sphere = Sphere.properties[key];
               this.maybeAddToken(cells, 1, sphere.image, sphere.name);
            }
         }, this);
      }

      this.maybeAddToken(cells, this.props.resourceCount, "token/Resource32.png", "Resource");
      this.maybeAddToken(cells, this.props.progressCount, "token/Progress32.png", "Progress");
      this.maybeAddToken(cells, this.props.woundCount, "token/Wound32.png", "Wound");

      var row = ReactUtilities.createRow(cells, "tokenRow");
      var centerCell = ReactUtilities.createTable(row, "tokenPanel", "center tc v-mid");
      var keySuffix = "" + this.props.bonusAttack + this.props.bonusDefense + this.props.bonusHitPoints + this.props.bonusThreat + this.props.bonusWillpower;

      return ReactDOMFactories.div(
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
      var prefix = (count > 0 ? "+" : "");
      var image = ReactDOMFactories.img(
      {
         className: "v-mid",
         src: this.props.resourceBase + src,
         title: title,
      });

      var cell0 = ReactDOMFactories.div(
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

   bonusAttack: PropTypes.number,
   bonusDefense: PropTypes.number,
   bonusHitPoints: PropTypes.number,
   bonusThreat: PropTypes.number,
   bonusWillpower: PropTypes.number,
   myKey: PropTypes.string,
   progressCount: PropTypes.number,
   resourceCount: PropTypes.number,
   sphereKey: PropTypes.string,
   sphereKeys: PropTypes.array,
   woundCount: PropTypes.number,
};

TokenPanel.defaultProps = {
   myKey: "tokenPanel",
};

export default TokenPanel;