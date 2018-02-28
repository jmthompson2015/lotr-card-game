var EnumGenerator = {};

EnumGenerator.cleanUpSpecialChars = function(string)
{
   let answer = string;

   answer = answer.replace(/Á/g, "A");
   answer = answer.replace(/á/g, "a");
   answer = answer.replace(/É/g, "E");
   answer = answer.replace(/é/g, "e");
   answer = answer.replace(/í/g, "i");
   answer = answer.replace(/ó/g, "o");
   answer = answer.replace(/ú/g, "u");

   return answer;
};

EnumGenerator.createEnumName = function(name)
{
   let answer = name;

   answer = answer.replace(/ /g, "_");
   answer = answer.replace(/-/g, "_");
   answer = answer.replace(/\//g, "_");

   answer = answer.replace(/!/g, "");
   answer = answer.replace(/'/g, "");
   answer = answer.replace(/"/g, "");
   answer = answer.replace(/\(/g, "");
   answer = answer.replace(/\)/g, "");

   answer = this.cleanUpSpecialChars(answer);

   answer = answer.toUpperCase();

   return answer;
};

EnumGenerator.createEnumValue = function(name)
{
   let answer = name;

   answer = answer.replace(/-/g, " ");
   answer = answer.replace(/\//g, " ");

   answer = answer.replace(/!/g, "");
   answer = answer.replace(/'/g, "");
   answer = answer.replace(/"/g, "");
   answer = answer.replace(/\(/g, "");
   answer = answer.replace(/\)/g, "");

   answer = this.cleanUpSpecialChars(answer);

   answer = toCamelCase(answer);

   return answer;
};

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

export default EnumGenerator;