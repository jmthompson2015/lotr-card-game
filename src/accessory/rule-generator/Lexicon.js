var Lexicon = {};

Lexicon.nouns = ["area", "card", "character", "deck", "east", "enemy", "hero", "location", "pit", "player", "quest", "resource", "you"];

Lexicon.verbs = ["go", "is", "see", "turn"];

Lexicon.adjectives = ["back", "dead", "east", "left", "right"];

Lexicon.adverbs = ["back", "east", "here", "left", "right", "south", "there"];

Lexicon.pronouns = ["it", "you"];

Lexicon.names = ["aragorn", "glóin", "théodred"];

Lexicon.articles = ["a", "an", "the"];

Lexicon.prepositions = ["as", "by", "during", "from", "in", "of", "on", "to", "with"];

Lexicon.conjunctions = ["and", "but", "or"];

Lexicon.digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

Lexicon.determineType = function(word)
{
   let type;

   // FIXME: how to handle multiple types?

   if (Lexicon.nouns.includes(word))
   {
      type = "noun";
   }
   else if (Lexicon.verbs.includes(word))
   {
      type = "verb";
   }
   else if (Lexicon.adjectives.includes(word))
   {
      type = "adjective";
   }
   else if (Lexicon.adverbs.includes(word))
   {
      type = "adverb";
   }
   else if (Lexicon.pronouns.includes(word))
   {
      type = "pronoun";
   }
   else if (Lexicon.names.includes(word))
   {
      type = "name";
   }
   else if (Lexicon.articles.includes(word))
   {
      type = "article";
   }
   else if (Lexicon.prepositions.includes(word))
   {
      type = "preposition";
   }
   else if (Lexicon.conjunctions.includes(word))
   {
      type = "conjunction";
   }
   else if (Lexicon.digits.includes(word))
   {
      type = "digit";
   }

   return type;
};

export default Lexicon;