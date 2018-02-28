import InputValidator from "../../common/js/InputValidator.js";

var CodeGenerator = {};

CodeGenerator.generate = function(interpretation)
{
   InputValidator.validateNotNull("interpretation", interpretation);

   let answer = "";

   if (interpretation.abilityClassName !== undefined && interpretation.eventOrPhaseKeyName !== undefined && interpretation.cardKeyName !== undefined)
   {
      answer += interpretation.abilityClassName;
      answer += "[";
      answer += interpretation.eventOrPhaseKeyName;
      answer += "][";
      answer += interpretation.cardKeyName;
      answer += "] = {\n";
      answer += "condition: function(store, context) {";

      // Insert condition code here.

      answer += "},\n";
      answer += "consequent: function(store, context, callback) {";

      // Insert consequent code here.

      answer += "},\n";
      answer += "},\n";
   }

   return answer;
};

export default CodeGenerator;