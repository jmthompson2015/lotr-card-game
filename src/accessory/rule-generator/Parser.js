import InputValidator from "../../common/js/InputValidator.js";

import Lexicon from "./Lexicon.js";

var Parser = {};

Parser.parse = function(card)
{
   InputValidator.validateNotNull("card", card);

   let text = card.text;
   text = text.replace(/<b>/g, "");
   text = text.replace(/<\/b>/g, "");
   text = text.replace(/<i>/g, "");
   text = text.replace(/<\/i>/g, "");
   text = text.replace(/[\(\)]/g, "");
   text = text.toLowerCase();

   return this.parseBlocks(text);
};

Parser.parseBlocks = function(text)
{
   InputValidator.validateNotNull("text", text);

   let blocks = text.split(/\n/);
   blocks = blocks.map(block => block.trim());
   let answer = [];

   blocks.forEach(block =>
   {
      let sentenceObjects = this.parseSentences(block);

      answer.push(
      {
         text: block,
         sentences: sentenceObjects,
      });
   });

   return answer;
};

Parser.parseSentences = function(block)
{
   InputValidator.validateNotNull("block", block);

   let sentences = block.trim().split(/[\.\!\?]/);
   sentences = sentences.filter(sentence => sentence !== "");
   sentences = sentences.map(sentence => sentence.trim());
   let answer = [];

   sentences.forEach(sentence =>
   {
      let clauses = this.parseClauses(sentence);

      answer.push(
      {
         text: sentence,
         clauses: clauses,
      });
   });

   return answer;
};

Parser.parseClauses = function(sentence)
{
   InputValidator.validateNotNull("sentence", sentence);

   let clauses = sentence.trim().split(/[\:\,]/);
   clauses = clauses.map(clause => clause.trim());
   let answer = [];

   clauses.forEach(clause =>
   {
      let phrases = this.parsePhrases(clause);

      answer.push(
      {
         text: clause,
         phrases: phrases,
      });
   });

   return answer;
};

Parser.parsePhrases = function(clause)
{
   InputValidator.validateNotNull("clause", clause);

   let phrases = [];
   let start = 0;
   let myWords = clause.trim().split(/ /);
   myWords.forEach((word, i) =>
   {
      if (Lexicon.prepositions.includes(word))
      {
         let phrase = myWords.slice(start, i).join(" ");
         phrases.push(phrase);
         start = i;
      }
   });

   if (start < myWords.length)
   {
      let phrase = myWords.slice(start).join(" ");
      phrases.push(phrase);
   }

   phrases = phrases.map(phrase => phrase.trim());
   let answer = [];

   phrases.forEach(phrase =>
   {
      let words = this.parseWords(phrase);

      answer.push(
      {
         text: phrase,
         words: words,
      });
   });

   return answer;
};

Parser.parseWords = function(phrase)
{
   InputValidator.validateNotNull("phrase", phrase);

   let words = phrase.trim().split(/ /);
   words = words.map(word => word.trim());
   let answer = [];

   words.forEach(word =>
   {
      answer.push(
      {
         text: word,
      });
   });

   return answer;
};

Parser.print = function(parts)
{
   InputValidator.validateNotNull("parts", parts);

   let content = "";

   parts.forEach((block, i) =>
   {
      content += i + " block: " + block.text + "\n";

      block.sentences.forEach((sentence, j) =>
      {
         content += j + " sentence: " + sentence.text + "\n";

         sentence.clauses.forEach((clause, k) =>
         {
            content += k + " clause: " + clause.text + "\n";

            clause.phrases.forEach((phrase, k) =>
            {
               content += k + " phrase: " + phrase.text + "\n";

               phrase.words.forEach((word, l) =>
               {
                  content += l + " word: " + word.text + "\n";
               });
            });
         });
      });
   });

   console.log("Parts:\n" + content);
   return content;
};

export default Parser;