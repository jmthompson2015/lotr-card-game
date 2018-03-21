var NameGenerator = {};

NameGenerator.cleanUpSpecialChars = function(string)
{
   let answer = string;

   answer = answer.replace(/[ÁÂÄ]/g, "A");
   answer = answer.replace(/[áâä]/g, "a");
   answer = answer.replace(/[ÉÊË]/g, "E");
   answer = answer.replace(/[éêë]/g, "e");
   answer = answer.replace(/[íîï]/g, "i");
   answer = answer.replace(/[ÓÔÖ]/g, "O");
   answer = answer.replace(/[óôö]/g, "o");
   answer = answer.replace(/[úûü]/g, "u");

   return answer;
};

NameGenerator.createEnumName = function(card)
{
   let name = createName(card);
   let answer = name;

   answer = answer.replace(/ /g, "_");
   answer = answer.replace(/-/g, "_");
   answer = answer.replace(/\//g, "_");

   answer = answer.replace(/[,!'"()]/g, "");

   answer = this.cleanUpSpecialChars(answer);

   answer = answer.toUpperCase();

   return answer;
};

NameGenerator.createEnumValue = function(card)
{
   let name = createName(card);
   let answer = name;

   answer = answer.replace(/[-/]/g, " ");

   answer = answer.replace(/[,!'"()]/g, "");

   answer = this.cleanUpSpecialChars(answer);

   answer = toCamelCase(answer);

   return answer;
};

function createName(card)
{
   let positionString = card.position.toString().padStart(3, "0");
   let name = card.name;
   name += (card.sequence !== undefined ? `_${card.sequence}` : "");
   name += `_${card.pack_code}`;
   name += `_${positionString}`;

   return name;
}

function toCamelCase(str)
{
   return str.split(' ').map((word, index) =>
   {
      // If it is the first word make sure to lowercase all the chars.
      if (index == 0)
      {
         return word.toLowerCase();
      }

      // If it is not the first word only upper case the first char and lowercase the rest.
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
   }).join('');
}

export default NameGenerator;