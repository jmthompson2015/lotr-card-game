import JSONFileLoader from "../../common/js/JSONFileLoader.js";
import Logger from "../../common/js/Logger.js";

import Parser from "./Parser.js";
import Interpreter from "./Interpreter.js";
import InterpretationComparator from "./InterpretationComparator.js";
import CodeGenerator from "./CodeGenerator.js";

window.LOGGER = new Logger();
LOGGER.setTraceEnabled(false);
LOGGER.setDebugEnabled(false);

var App = {};

App.loadFile = function(callback)
{
   // let filepath = "../../../../lotr-lcg-data/data/ally.js";
   let filepath = "../../../../lotr-lcg-data/data/hero.js";

   let myCallback = (data) =>
   {
      console.log("data.length = " + data.length);
      callback(data);
   };

   JSONFileLoader.loadFile(filepath, myCallback);
};

App.loadFile(function(data)
{
   let interpretations = [];

   // for (let i = 0; i < 50; i++)
   for (let i = 0; i < data.length; i++)
   {
      let card = data[i];
      let parts = Parser.parse(card);
      // Parser.print(parts);

      let interpretation = Interpreter.interpret(card, parts);
      // Interpreter.print(interpretation);
      if (interpretation.eventOrPhaseKeyName === undefined)
      {
         console.log(i + " " + card.name + " " + card.pack_code + " card.text = " + card.text);
      }
      interpretations.push(interpretation);
   }

   interpretations.sort(InterpretationComparator);
   // interpretations.forEach((interpretation, i) =>
   // {
   //    console.log(i + " " + interpretation.abilityClassName + " " + interpretation.eventOrPhaseKeyName + " " + interpretation.cardKeyName);
   // });

   let allCode = interpretations.reduce((accumulator, interpretation) => accumulator + CodeGenerator.generate(interpretation), "");
   console.log(allCode);
});