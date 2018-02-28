var Comparator = {};

Comparator.Interpretation = function(a, b)
{
   let answer = compare(a.abilityClassName, b.abilityClassName);

   if (answer === 0)
   {
      answer = compare(a.eventOrPhaseKeyName, b.eventOrPhaseKeyName);
   }

   if (answer === 0)
   {
      answer = compare(a.cardKeyName, b.cardKeyName);
   }

   return answer;
};

function compare(a, b)
{
   let answer;

   if (a === b)
   {
      answer = 0;
   }
   else if (a === undefined)
   {
      answer = -1;
   }
   else if (b === undefined)
   {
      answer = 1;
   }
   else if (a > b)
   {
      answer = 1;
   }
   else
   {
      answer = -1;
   }

   return answer;
}

export default Comparator;