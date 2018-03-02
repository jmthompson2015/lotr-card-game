import JSONFileLoader from "../../common/js/JSONFileLoader.js";
import Logger from "../../common/js/Logger.js";

import DataTable from "../../view/js/DataTable.js";

import Lexicon from "./Lexicon.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var TextInfo = {};
let files = [
  "../../../../lotr-lcg-data/data/ally.js",
  "../../../../lotr-lcg-data/data/attachment.js",
  "../../../../lotr-lcg-data/data/encounter-side-quest.js",
  "../../../../lotr-lcg-data/data/enemy.js",
  "../../../../lotr-lcg-data/data/event.js",
  "../../../../lotr-lcg-data/data/hero.js",
  "../../../../lotr-lcg-data/data/location.js",
  "../../../../lotr-lcg-data/data/objective.js",
  "../../../../lotr-lcg-data/data/player-side-quest.js",
  "../../../../lotr-lcg-data/data/quest.js",
  "../../../../lotr-lcg-data/data/treachery.js"
];
let fileIndex = 0;
let cardCount = 0;
let words = {};

TextInfo.loadFile = function(callback)
{
   let myCallback = (data) =>
   {
      console.log(data[0].type_code + " data.length = " + data.length);
      cardCount += data.length;
      processWords(data);

      if (fileIndex < files.length)
      {
         JSONFileLoader.loadFile(files[fileIndex++], myCallback);
      }
      else
      {
         callback();
      }
   };

   JSONFileLoader.loadFile(files[fileIndex++], myCallback);
};

function processWords(data)
{
   data.forEach(card =>
   {
      if (card.text !== undefined)
      {
         let text = card.text;
         text = text.replace(new RegExp(card.name, "g"), "this-card-name");

         // Cleanup.
         text = text.replace(/\u00A0/g, " "); // non-breaking space
         text = text.replace(/\u2013/g, "-"); // en-dash
         text = text.replace(/\u2022/g, ""); // bullet
         text = text.replace(/\u2019/g, "'"); // right single quotation mark
         text = text.replace(/&#39;/g, "'"); // html apostrophe
         text = text.replace("snow-an Elf.\"\n-Legolas,", "snow an elf. legolas,");
         text = text.replace(/non-<b>/g, "non-");
         text = text.replace("<b><i>Heale</i>r</b>", "healer");
         text = text.replace("D\u00FAnadan", "d\u00FAnedain");
         text = text.replace("Dunedain", "d\u00FAnedain");
         text = text.replace("Resonse:", "response");
         text = text.replace(/resouce/g, "resource");
         text = text.replace(/Suffle/g, "shuffle");

         // Reformat.
         text = text.replace(/<(?:.|\n)*?>/gm, " "); // html
         text = text.replace(/\[/g, " ");
         text = text.replace(/\r/g, " ");
         text = text.replace(/\n/g, " ");
         text = text.replace(/\./g, " ");
         text = text.replace(/[,\/#!$%\^&\*;:{}=_`~\"\[\]]/g, " "); // punctuation
         text = text.replace(/[()]/g, "");
         text = text.replace(/'s/g, "");
         text = text.replace(/[']/g, "");
         text = text.replace(/\s{2,}/g, " "); // extra spaces
         text = text.trim().toLowerCase();
         // console.log("text = " + text);

         let myWords = text.split(/ /);
         myWords.forEach(word =>
         {
            word = word.trim();
            if (word !== "")
            {
               if (words[word] === undefined)
               {
                  words[word] = {
                     word: word,
                     count: 0,
                     type: Lexicon.determineType(word),
                  };
               }
               words[word].count = words[word].count + 1;
            }
         });
      }
   });
}

TextInfo.loadFile(function()
{
   document.getElementById("countPanel").innerHTML = "Card count: " + cardCount + "<br/><br/>";

   let keys = Object.keys(words);
   keys.sort();
   keys.sort((a, b) => words[b].count - words[a].count);

   const TableColumns = [
      {
         key: "word",
         label: "Word",
         className: "tl",
      },
      {
         key: "count",
         label: "Count",
         className: "tr",
      },
      {
         key: "type",
         label: "Type",
         className: "tl",
      }
   ];
   const myRowData = keys.map(word => words[word]);

   let table = React.createElement(DataTable,
   {
      columns: TableColumns,
      rowData: myRowData,
   });

   ReactDOM.render(table, document.getElementById("mainPanel"));
});