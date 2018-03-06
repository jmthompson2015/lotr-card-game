import JSONFileLoader from "../../common/js/JSONFileLoader.js";
import Logger from "../../common/js/Logger.js";

import DataTable from "../../view/js/DataTable.js";
import Select from "../../view/js/Select.js";

import Lexicon from "./Lexicon.js";
import Parser from "./Parser.js";

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
let allCards = [];
let selectedLevel = "text";
let rowDataMap = {};

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
      if (![undefined, ""].includes(card.text))
      {
         allCards.push(
         {
            pack_code: card.pack_code,
            type_code: card.type_code,
            name: card.name,
            text: card.text,
            blocks: Parser.parse(card),
         });
      }
   });
}

TextInfo.renderSelect = function()
{
   let values = ["text", "block", "sentence", "clause", "phrase", "word"];

   let select = React.createElement(Select,
   {
      values: values,
      onChange: TextInfo.handleLevelChanged,
   });

   ReactDOM.render(select, document.getElementById("selectPanel"));
};

TextInfo.handleLevelChanged = function(event)
{
   var selected = event.target.value;
   LOGGER.debug("handleLevelChanged() selected = " + selected + " " + (typeof selected));
   selectedLevel = selected;
   TextInfo.renderTable();
};

TextInfo.renderTable = function()
{
   document.getElementById("countPanel").innerHTML = "Card count: " + cardCount + "<br/><br/>";

   const TableColumns = [
      {
         key: "item",
         label: "Item",
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

   let myRowData2 = rowDataMap[selectedLevel];

   if (myRowData2 === undefined)
   {
      const myRowData = TextInfo.createRowData();
      const myRowDataMap = TextInfo.countItems(myRowData);
      myRowData2 = Object.values(myRowDataMap);
      rowDataMap[selectedLevel] = myRowData2;
   }

   const table = React.createElement(DataTable,
   {
      columns: TableColumns,
      rowData: myRowData2,
   });

   ReactDOM.render(table, document.getElementById("mainPanel"));
};

TextInfo.countItems = function(myRowData)
{
   const answer = {};

   myRowData.forEach(data =>
   {
      if (answer[data.item] === undefined)
      {
         answer[data.item] = TextInfo.createRow(data.item, data.type);
      }

      answer[data.item].count += 1;
   });

   return answer;
};

TextInfo.createRowData = function()
{
   let answer;

   switch (selectedLevel)
   {
      case "text":
         answer = allCards.reduce((accumulator, card) =>
         {
            accumulator.push(TextInfo.createRow(card.text));
            return accumulator;
         }, []);
         break;
      case "block":
         answer = allCards.reduce((accumulator, card) =>
         {
            card.blocks.forEach(block =>
            {
               accumulator.push(TextInfo.createRow(block.text));
            });
            return accumulator;
         }, []);
         break;
      case "sentence":
         answer = allCards.reduce((accumulator, card) =>
         {
            card.blocks.forEach(block =>
               block.sentences.forEach(sentence =>
               {
                  accumulator.push(TextInfo.createRow(sentence.text));
               }));
            return accumulator;
         }, []);
         break;
      case "clause":
         answer = allCards.reduce((accumulator, card) =>
         {
            card.blocks.forEach(block =>
               block.sentences.forEach(sentence =>
                  sentence.clauses.forEach(clause =>
                  {
                     accumulator.push(TextInfo.createRow(clause.text));
                  })));
            return accumulator;
         }, []);
         break;
      case "phrase":
         answer = allCards.reduce((accumulator, card) =>
         {
            card.blocks.forEach(block =>
               block.sentences.forEach(sentence =>
                  sentence.clauses.forEach(clause =>
                     clause.phrases.forEach(phrase =>
                     {
                        accumulator.push(TextInfo.createRow(phrase.text, Lexicon.determinePhraseType(phrase)));
                     }))));
            return accumulator;
         }, []);
         break;
      case "word":
         answer = allCards.reduce((accumulator, card) =>
         {
            card.blocks.forEach(block =>
               block.sentences.forEach(sentence =>
                  sentence.clauses.forEach(clause =>
                     clause.phrases.forEach(phrase =>
                        phrase.words.forEach(word =>
                        {
                           // if (["dûv", "dûm"].includes(word.text))
                           // {
                           //    console.log("word = " + word.text);
                           //    console.log(card.type_code);
                           //    console.log(card.name);
                           //    console.log(card.text);
                           // }
                           accumulator.push(TextInfo.createRow(word.text, Lexicon.determineWordType(word.text)));
                        })))));
            return accumulator;
         }, []);
         break;
   }

   return answer;
};

TextInfo.createRow = function(item, type)
{
   return (
   {
      item: item,
      count: 0,
      type: type,
   });
};

TextInfo.renderSelect();
TextInfo.loadFile(function()
{
   TextInfo.renderTable();
});