// A vector type

require('../chapter_work/06_table_project')

function Vector(x, y) {
  this.x = x;
  this.y = y;
}
Vector.prototype.plus = function(v) {
  this.x += v.x;
  this.y += v.y;
  return this;
};
Vector.prototype.minus = function(v) {
  this.x -= v.x;
  this.y -= v.y;
  return this;
};
v1 = new Vector(2,3);
console.log(v1);
v2 = new Vector(1,2);
console.log(v1.minus(v2));
console.log(v1.plus(v2));

// Another cell

function StretchCell(inner, width, height) {
  this.inner = inner;
  this.width = width;
  this.height = height;
}
StretchCell.prototype.minWidth = function() {
  return this.inner.minWidth() >= this.width ? this.inner.minWidth() : this.width;
};
StretchCell.prototype.minHeight = function() {
  return this.inner.minHeight() >= this.height ? this.inner.minHeight() : this.height;
};
StretchCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, height);
};

var sc = new StretchCell(new TextCell("abc"), 1, 2);
console.log(sc.minWidth());

// Sequence Interface
