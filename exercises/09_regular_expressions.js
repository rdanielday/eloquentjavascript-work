function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  yes.forEach(function(s) {
    if (!regexp.test(s))
      console.log("Failure to match '" + s + "'");
    else console.log("Good");
  });
  no.forEach(function(s) {
    if (regexp.test(s))
      console.log("Unexpected match for '" + s + "'");
    else
      console.log("Good");
  });
}

// Fill in the regular expressions

verify(/ca[tr]/,
       ["my car", "bad cats"],
       ["camper", "high art"]);

verify(/pr?op/,
       ["pop culture", "mad props"],
       ["plop"]);

verify(/^ferr[aey]/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);

verify(/ious\b/,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);

verify(/\s[.,:;]/,
       ["bad punctuation ."],
       ["escape the dot"]);

verify(/\b\w[^\s]{6,}$/,
       ["hottentottententen"],
       ["no", "hotten totten tenten"]);

verify(/(\b[^e\s]+\b)/gi,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape"]);

console.log(/(\b[^e\s]+\b)/gi.test("wobbling nest"));