// ================== //
// Document Structure //
// ================== //

// HTML is like a nested set of boxes:

// <!doctype html>
// <html>
//   <head>
//     <title>My Home Page</title>
//   </head>
//   <body>
//     <h1>My Home Page</h1>
//     <p>Hello, I am Marijn and this is my home page.</p>
//     <p>I also wrote a book! Read it
//       <a href="http://eloquentjavascript.net">here.</a>.</p>
//   </body>
// </html>

// -----------------------------
// |html                       |
// |---------------------------|
// ||head                     ||
// ||-------------------------||
// |||title                  |||
// |||My Home Page           |||
// ||-------------------------||
// |---------------------------|
// |---------------------------|
// ||body                     ||
// ||-------------------------||
// |||h1                     |||
// |||My Home Page           |||
// ||-------------------------||
// ||-------------------------||
// |||p                      |||
// |||Hello, my name...      |||
// ||-------------------------||
// ||-------------------------||
// |||p                      |||
// |||I also wrote a book!   |||
// |||Read it |a   |         |||
// |||        |here|         |||
// ||-------------------------||
// |---------------------------|
// -----------------------------

// It is perhaps even easier to visual as a tree...

// html --> head --> title --> My Home Page
//     |--> body --> h1 -----> My Home Page
//              |--> p ------> Hello, I am...
//              |--> p ------> I also wrote...
//                    |------> a --> here
//                    |------> .

// document.documentElement serves as the root of this tree. Each node has a numeric
// code that identifies which type of node it is. Regular elements have the value 1,
// text nodes have the value 3, and comments have the value 8. These can also be
// represented as document.ELEMENT_NODE, document.TEXT_NODE and document.COMMENT_NODE
// respectively.

// Moving through the tree
// =======================
//
// ---------childNodes         |-- firstChild
// |      |---------------------|-----|
// |      ||body                |    ||
// V      ||--------------------|----||
// 0 ---> |||h1                 V   |||
//        |||My Home Page           |||
//        ||--^----------------------||
//        ||  | previousSibling      ||
//        ||--|----------------------||<-|
// 1 ---> |||p                      |||  |
//        |||Hello, my name...      ---- | parentNode
//        ||--|----------------------||
//        ||  | nextSibling          ||
//        ||--V----------------------||
// 2 ---> |||p                      |||
//        |||I also wrote a book!   |||
//        |||Read it |a   |         |||
//        |||        |here|     ^   |||
//        ||--------------------|----||
//        |---------------------|-----|
//                              |-- lastChild

// Each node has a parent node. All element nodes have an array at the property 
// childNodes. 

// Nested data structures often benefit from recursive code...

function talksAbout(node, string) {
  if (node.nodeType == document.ELEMENT_NODE) {        // if node is an element
    for (var i = 0; i < node.childNodes.length; i++) { // loop through children
      if (talksAbout(node.childNodes[i], string))      // recursively running function
        return true;
    }
    return false;
  } else if (node.nodeType == document.TEXT_NODE) {   // if a TEXT_NODE is found
    return node.nodeValue.indexOf(string) > -1;       // check node for string
  }
}

// Finding elements
// ================

// Though it is possible to run through the entire document in this way, jumping 
// from node to node, it is inconvenient and a bad practice. More specific nodes
// can be found.

var link = document.body.getElementsByTagName("a")[0];

// The variable above will always point to the first link in an HTML document.

// To get even more specific, nodes can be tagged with an id and hooked as such:

// <p>My ostrich Gertrude:</p>
// <p>img id="gertrude" src="img/ostrich.png"></p>

// <script>
//   var ostrich = document.getElementById("gertrude");
//   console.log(ostrich.src);
// </script>

// getElementByClassName can also be used.

// Changing the Document
// =====================

// Element nodes have methods like removeChild, appendChild and insertBefore.

// <p>One</p>
// <p>Two</p>
// <p>Three</p>

// <script>
//   var paragraphs = document.body.getElementsByTagName("p");
//   document.body.insertBefore(paragraphs[2], paragraph[0]);
// </script>

// All functions that insert a node will have the side effect of also removing a node.

// Creating Nodes
// ==============

function replaceImages() {
  var images = document.body.getElementsByTagName("img");
  for (var i = images.length = 1; i >= 0; i--) {
    var image = images[i];
    if (image.alt) {
      var text = document.createTextNode(image.alt);
      image.parentNode.replaceChild(text, image);
    }
  }
}

// The above code loops through the img nodes backwards because the DOM is live
// when it is manipulated, meaning that if you started at the beginning, it would
// mess with the count.

// Regular element nodes can be created with createElement

// <blockquote id="quote">
//   No book can ever be finished. While working on it we learn just enough to find it
//   immature the moment we turn away from it.
// </blockquote>

// <script>
//   function elt(type) {
//     var node = document.createElement(type);
//     for (var i = 1; i < arguments.length; i++) {
//       var child = arguments[i];
//       if (typeof child == "string")
//         child = document.createTextNode(child);
//       node.appendChild(child);
//     }
//     return node;
//   }

//   document.getElementById("quote").appendChild(
//     elt("footer", "-",
//         elt("strong", "Karl Popper"),
//         ", preface to the second edition of ",
//         elt("em", "The Open Society and Its Enemies"),
//         ", 1950"));
// </script>

// Attributes 
// ==========

