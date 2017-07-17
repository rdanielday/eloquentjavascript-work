
var re1 = new RegExp("abc");
var re2 = /abc/;

var eighteenPlus = /eighteen\+/;

console.log(/abc/.test("abcde"));
console.log(/abc/.test("abxce"));

console.log(/[0123456789]/.test("in 1992"));
console.log(/[0-9]/.test("in 1992"));

/* Regex Shortcuts
==================
\d Any digit character
\w Any alphanumeric character
\s Any whitespace character
\D A character that is NOT a digit
\W A nonalphanumeric character
\S A nonwhitespace character
. Any character except for newline
=================== */

// Datetime format matching - 30-01-2003 15:20

var dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test("30-01-2003 15:20"));
console.log(dateTime.test("30-jan-2003 15:20"));

// Inversion with a carat (^)

var notBinary = /[^01]/;
console.log(notBinary.test("1100100010100110"));
console.log(notBinary.test("1100100010200110"));

// A plus sign (+) indicates an element may repeat more than once

console.log(/'\d+'/.test("'123'"));
console.log(/'\d+'/.test("''"));
console.log(/'\d*'/.test("'123'"));
console.log(/'\d*'/.test("''"));

// Asterisks (*) is similar to plus but it also allows 0 matches

// Question mark means a character is optional (0 or 1 times)

var neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour"));
console.log(neighbor.test("neighbor"));

// Precise matches indicated by brackets: {4}
// At least, but not more than: {2,4}

var dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime.test("30-1-2003 8:45"));

// At least, but open-ended: {5,}

// Parentheses allow grouping characters

var cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohoo"));

// Flag 'i' makes regex case insensitive

// 'exec' method returns null or an object with match info

var match = /\d+/.exec("one two 100");
console.log(match);
console.log(match.index);

// index property states where the match begins

// strings have a 'match' method similarly to 'exec'

console.log("one two 100".match(/\d+/));

// exec also includes information about when patterns contained within
// parentheses are matched in the returned array

var quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'"));

// if a group is not matched, its place in the array will be 'undefined'

console.log(/bad(ly)?/.exec("bad"));
console.log(/(\d)+/.exec("123"));

// ============= //
// The date type //
// ============= //

// creating a new date object gives the current date

console.log(new Date());

// an object can also be created for a specific date/time

console.log(new Date(2009, 11, 9));
console.log(new Date(2009, 11, 9, 12, 59, 59, 999));

// month is zero-index while day is one-index

// 'getDate' method on date object returns Unix time

console.log(new Date(2013, 11, 19).getTime());
console.log(new Date(1387407600000));

/* Other date object methods
============================
getFullYear
getMonth
getDate
getHours
getMinutes
getSeconds
============================*/

function findDate(string) {
  var dateTime = /(\d{1,2})-(\d{1,2})-(\d{4})/;
  var match = dateTime.exec(string);
  return new Date(Number(match[3]),
                  Number(match[2]),
                  Number(match[1]));
}
console.log(findDate("30-1-2003"));

// ========================== //
// Word and string boundaries //
// ========================== //

// Carat (^) matches the start of a string, dollar sign ($) matches the end
// \b matches a word boundary

console.log(/cat/.test("concatenate"));
console.log(/\bcat\b/.test("concatenate"));

// =============== //
// Choice patterns //
// =============== //

// the pipe character (|) denotes a choice

var animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test("15 pigs"));
console.log(animalCount.test("15 pigchickens"));

// ========================= //
// The mechanics of matching //
// ========================= //

// a regex pattern will match a string so long as the string can continue
// the flow of the pattern from left to right

// A flow chart of the 'animalCount' regex pattern:

//                           |--"pig"------|  |---|
// |--boundary--|digit|--" "-|--"cow"------|--|"s"|--boundary--|>
//              |-----|      |--"chicken"--|

// ============ //
// Backtracking //
// ============ //

// a regex pattern to match a binary, decimal or hexidecimal number

var numberMatch = /\b([01]+b|\d+|[\da-f]+h)\b/;

// matching stops as soon as a match as found
// this means that if a string matches multiple branches,
// only the first branch matched is returned

// ================== //
// The replace method //
// ================== //

// string values have a 'replace' method

console.log("papa".replace("p", "m"));

// a 'g' flag (global) ensures all matches in the string are replaced

console.log("Borobudur".replace(/[ou]/, "a"));
console.log("Borobudur".replace(/[ou]/g, "a"));

// we can refer back to matches in the replacement string

console.log(
  "Hopper, Grace\nMcCarthy, John\nRitchie, Dennis"
    .replace(/([\w ]+), ([\w ]+)/g, "$2 $1"));

// the second argument of 'replace' can be a function

var s = "the cia and fbi";
console.log(s.replace(/\b(fbi|cia)\b/g, function(str) {
  return str.toUpperCase();
}));

var stock = "1 lemon, 1 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) // only 1 left, remove the 's'
    unit = unit.slice(0, unit.length - 1);
  else if (amount == 0)
    amount = "no";
  return amount + " " + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne));

// ===== //
// Greed //
// ===== //

// using replace to strip all comments from some JS code

function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
}
console.log(stripComments("1 + /* 2 */3"));
console.log(stripComments("x = 10;// ten!"));
console.log(stripComments("1 /* a */+/* b */ 1"));

// last example fails because +, *, ? and {} are greedy
// they match as much as they can and then go back from there
// adding ? after will make these operators nongreedy meaning
// they will match and little as possible and then go back

function stripComments1(code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
console.log(stripComments1("1 /* a */+/* b */ 1"));

// =================================== //
// Dynamically creating RegExp objects //
// =================================== //

// if you need to dynamically create a regex operator, you cannot
// use the / notation. But you can build up an object.

var name = "harry";
var text = "Harry is a suspicious character.";
var regexp = new RegExp("\\b(" + name + ")\\b", "gi");
console.log(text.replace(regexp, "_$1_"));

// manuevering around edge cases

var name = "dea+hl[]rd";
var text = "This dea+hl[]rd guy is super annoying.";
var escaped = name.replace(/[^\w\s]/g, "\\$&");
var regexp = new RegExp("\\b(" + escaped + ")\\b", "gi");
console.log(text.replace(regexp, "_$1_"));

// ================= //
// The search method //
// ================= //

// indexOf does not accept regex, but search works the same with regex

console.log("  word".search(/\S/));
console.log("    ".search(/\S/));

// ====================== //
// The lastIndex property //
// ====================== //

// the RegExp object has a lastIndex property that can be used to
// control the index where the match starts if 'exec' is used and
// the 'g' flag is invoked

var pattern = /y/g;
pattern.lastIndex = 3;
var match = pattern.exec("xyzzy");
console.log(match.index);
console.log(pattern.lastIndex);

// using exec with global flag can cause unexpected side effects
// when used multiple times

var digit = /\d/g;
console.log(digit.exec("here it is: 1"));
console.log(digit.exec("and now: 1"));

// 'match' creates an array of all matches when called with global

console.log("Banana".match(/an/g));

// You can loop over matches using lastIndex and 'exec'

var input = "A string with 3 numbers in it... 42 and 88.";
var number = /\b(\d+)\b/g;
var match;
while (match = number.exec(input))
  console.log("Found", match[1], "at", match.index);

// =================== //
// Parsing an INI file //
// =================== //

// file format:
/*
searchengine=http://www.google.com/search?q=$1
spitefulness=9.7

; comments are preceded by a semicolon...
; each section concerns an individual enemy
[larry]
fullname=Larry Doe
type=kindergarten bully
website=http://www.geocities.com/CapeCanaveral/11451

[gargamel]
fullname=Gargamel
type=evil sorcerer
outputdir=/home/marijn/enemies/gargamel
*/

function parseINI(string) {
  // Start with an object to hold the top-level fields
  var currentSection = {name: null, fields: []};
  var categories = [currentSection];

  string.split(/\r?\n/).forEach(function(line) {
    var match;
    if (/^\s*(;.*)?$/.test(line)) {
      return;
    } else if (match = line.match(/^\[(.*)\]$/)) {
      currentSection = {name: match[1], fields: []};
      categories.push(currentSection);
    } else if (match = line.match(/^(\w+)=(.*)$/)) {
      currentSection.fields.push({name: match[1],
                                  value: match[2]});
    } else {
      throw new Error("Line '" + line + "' is invalid.");
    }
  });

  return categories;
}

// ======================== //
// International characters //
// ======================== //

// \w only matches the 26 letters of the Latin alphabet
