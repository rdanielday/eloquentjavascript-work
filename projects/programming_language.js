// Parsing
// =======

// A parser is a program that reads a text file written in the languages syntax
// and turns that text into the appropriate data structures.

// Everything in our language is a simple expression. Strings, numbers, functions
// are all expressions. 

// These expressions will be defined in the parser as expression objects with
// different 'type properties such as 'value' (the string literal or number), 
// 'name' or 'apply' is the expression is an application (function.).

// Here is an example of such a structure, which would be written as '>(x, 5)'
// in our basic language:

/*
{
  type: "apply",
  operator: {type: "word", name: ">"},
  args: [
    {type: "word", name: "x"},
    {type: "value", value: 5}
  ]
}
*/
// This is known as a "syntax tree." Here's another representation:

/*

*do
|-->* define
|   |-->* x
|   |-->* 10
|
|-->* if
    |-->* >
    |   |-->* x
    |   |-->* 5
    |
    |-->* print
    |   |-->* "large"
    |
    |-->* print
        |-->* "small"
        
*/

// Unlike our ISI parser, this parser must be more complex. In this language,
// expressions can exist within other expressions. It is recursive. The parser
// should itself be recursive to solve this problem.

function parseExpression(program) {
  program = skipSpace(program);
  var match, expr;
  if (match = /^"([^"]*)"/.exec(program))
    expr = {type: "value", value: match[1]};
  else if (match = /^\d+\b/.exec(program))
    expr = {type: "value", value: Number(match[0])};
  else if (match = /^[^\s(),"]+/.exec(program))
    expr = {type: "word", name: match[0]};
  else
    throw new SyntaxError("Unexpected syntax: " + program);
    
  return parseApply(expr, program.slice(match[0].length));
}

// function skipSpace(string) {
//   var first = string.search(/\S/);
//   if (first == -1) return "";
//   return string.slice(first);
// }

function skipSpace(string) {
  var nocomment = string.replace(/#.*\n/g, '')
  var first = nocomment.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
}

// After checking expression for type and creating a type object, this object is
// then handed to parseApply, which is a function that checks if the object is
// an application.

function parseApply(expr, program) {
  program = skipSpace(program);
  if (program[0] != "(")
    return {expr: expr, rest: program};
    
  program = skipSpace(program.slice(1));
  expr = {type: "apply", operator: expr, args: []};
  while (program[0] != ")") {
    var arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] == ",")
      program = skipSpace(program.slice(1));
    else if (program[0] != ")")
    throw new SyntaxError("Expected ',' or ')'");
  }
  return parseApply(expr, program.slice(1));
}

function parse(program) {
  var result = parseExpression(program);
  if (skipSpace(result.rest).length > 0)
    throw new SyntaxError("Unexpected text after program");
  return result.expr;
}
console.log(parse("+(a, 10)"));

// The evaluator
// =============

// The evaluator is the program that when given the syntax tree, runs the program.
// It takes a syntax tree and an environment object.

function evaluate(expr, env) {
  switch(expr.type) {
    case "value":
      return expr.value;
      
    case "word":
      if (expr.name in env)
        return env[expr.name];
      else
        throw new ReferenceError("Undefined variable: " + expr.name);
        
    case "apply":
      if (expr.operator.type == "word" && expr.operator.name in specialForms)
        return specialForms[expr.operator.name](expr.args, env);
      var op = evaluate(expr.operator, env);
      if (typeof op != "function")
        throw new TypeError(("Applying a non-function."));
      return op.apply(null, expr.args.map(function(arg) {
        return evaluate(arg, env);
      }));
  }
}

var specialForms = Object.create(null);

// Here, the type is checked. Values are returned, and variables are looked up
// then returned. Functions are handled one to two ways: special forms
// are simply called, while other functions are verified as functions and then
// called.

// Special Forms
// =============

specialForms["if"] = function(args, env) {
  if (args.length != 3)
    throw new SyntaxError("Bad number of args to if");
  
  if (evaluate(args[0], env) !== false)
    return evaluate(args[1], env);
  else
    return evaluate(args[2], env);
};

// 'if' in this case functions like JS &&. If arg A does not evaluate to false,
// arg B is evaluated. 

specialForms["while"] = function(args, env) {
  if (args.length != 2) 
    throw new SyntaxError("Bad number of args to while");
    
  while (evaluate(args[0], env) !== false)
    evaluate(args[1], env);
    
  // Since undefined does not exist in Egg, we return false
  // for lack of a meaningful result.
  return false;
};

specialForms["do"] = function(args, env) {
  var value = false;
  args.forEach(function(arg) {
    value = evaluate(arg, env);
  });
  return value;
};

// Define takes a word and an expression to assign values to variables. It returns
// the assigned value.

specialForms["define"] = function(args, env) {
  if (args.length != 2 || args[0].type != "word")
    throw new SyntaxError("Bad use of define");
  var value = evaluate(args[1], env);
  env[args[0].name] = value;
  return value;
};

// The Environment
// ===============

// The environment is an object with properties that are the variables that have
// been assigned and the values are the values assigned to those variables.

// To start, we need booleans.

var topEnv = Object.create(null);

topEnv["true"] = true;
topEnv["false"] = false;

var prog = parse("if(true, false, true)");
console.log(evaluate(prog, topEnv));

// Arithmetic and comparisons

["+", "-", "*", "/", "==", "<", ">"].forEach(function(op) {
  topEnv[op] = new Function("a, b", "return a " + op + " b;");
});

topEnv["print"] = function(value) {
  console.log(value);
  return value;
};

function run() {
  var env = Object.create(topEnv);
  var program = Array.prototype.slice
    .call(arguments, 0).join("\n");
  return evaluate(parse(program), env);
}

run("do(define(total, 0),",
    " define(count, 1),",
    " while(<(count, 11),",
    "   do(define(total, +(total, count)),",
    "     define(count, +(count, 1)))),",
    "   print(total))");
    
// ========= //
// Functions //
// ========= //

// Functions are a special form that uses the last argument as the function body
// and all other args as the function arguments. Like in JS, it creates it's own
// sub-environment.

specialForms["fun"] = function(args, env) {
  if (!args.length)
    throw new SyntaxError("Functions need a body");
  function name(expr) {
    if (expr.type != "word")
      throw new SyntaxError("Arg names must be words");
    return expr.name;
  }
  var argNames = args.slice(0, args.length - 1).map(name);
  var body = args[args.length - 1];
  
  return function() {
    if (arguments.length != argNames.length)
      throw new TypeError("Wrong number of arguments");
    var localEnv = Object.create(env);
    for (var i = 0; i < arguments.length; i++)
      localEnv[argNames[i]] = arguments[i];
    return evaluate(body, localEnv);
  };
};

// The function is evaluated in the local environment created.

run("do(define(plusOne, fun(a, +(a, 1))),",
    " print(plusOne(10)))");
    
run("do(define(pow, fun(base, exp,",
    " if(==(exp, 0),",
    "   1,",
    "   *(base, pow(base, -(exp, 1)))))),",
    " print(pow(2, 10)))");

// ======== //
// Exercies //
// ======== //

// Arrays

topEnv["array"] = function(vals) {
  return Array.prototype.slice.call(arguments);
};

topEnv["length"] = function(arr) {
  return arr.length;
};

topEnv["element"] = function(arr, n) {
  return arr[n];
};

run("do(define(anArray, array(4,3,5)),",
    "print(length(anArray)))");
    
run("do(define(sum, fun(array,",
    "     do(define(i, 0),",
    "        define(sum, 0),",
    "        while(<(i, length(array)),",
    "          do(define(sum, +(sum, element(array, i))),",
    "             define(i, +(i, 1)))),",
    "        sum))),",
    "   print(sum(array(1, 2, 3))))");
    
console.log(parse("# hello\nx"));


console.log(parse("a # one\n   # two\n()"));