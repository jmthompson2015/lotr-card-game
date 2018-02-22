/*
 * Provides utility methods for Math.
 */

var MathAugments = {};

/*
 * @param number The number to format.
 * @param digits The number of digits to appear after the decimal point. (optional)
 */
if (!Math.lotrFormat)
{
   Math.lotrFormat = function(number, digits)
   {
      var answer = number;

      if (number !== undefined && typeof number === "number" && !isNaN(number))
      {
         answer = number.toFixed(digits);
      }

      return answer;
   };
}

/*
 * @param number The number to round.
 * @param digits The number of digits to appear after the decimal point.
 */
if (!Math.lotrRound)
{
   Math.lotrRound = function(number, digits)
   {
      var factor = Math.pow(10.0, digits);

      return Math.round(factor * number) / factor;
   };
}

export default MathAugments;