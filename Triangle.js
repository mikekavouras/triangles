function Triangle(p1, p2, p3) {
  this.numberOfSides = 3;
  this.numberOfPoints = 3;
  this.numberOfAngles = 3;
  this.hypotenuse = {};

  this.sides = [];
  this.angles = [];
  this.points = [];

  this.erros = [];
}

Triangle.prototype.radiansToDegrees = function(rad) {
  return rad * (180 / Math.PI);
}

function RightTriangle(p1, p2, p3) {

  // lots of validation that could happen

  Triangle.call(this);

  // points
  this.points = [p1, p2, p3];

  if (!(this.isValid())) {
    throw "Invalid right triangle";
  }

  if (!p3) this.points[2] = new Point(p1.x, p2.y);

  // sides
  this.sides[0] = Math.abs(this.points[0].y - this.points[2].y);
  this.sides[1] = Math.abs(this.points[2].x - this.points[1].x);
  this.sides[2] = Math.sqrt(Math.pow(this.sides[0], 2) + Math.pow(this.sides[1], 2));
  this.hypotenuse = this.sides[2];

  // angles
  this.angles[0] = this.radiansToDegrees(Math.asin(this.sides[0] / this.hypotenuse));
  this.angles[1] = this.radiansToDegrees(Math.asin(this.sides[1] / this.hypotenuse));
  this.angles[2] = 90;
}

RightTriangle.prototype = new Triangle();
RightTriangle.prototype.constructor = RightTriangle;

RightTriangle.prototype.isValid = function(triangle) {
  var t = triangle || this;
  var p = new Point(0, 0);

  if (t.points[0] == null || t.points[1] == null) {
    console.error('A right triangle needs at least 2 angles');
    return false;
  }

  p.isValid(t.points[0]);
  p.isValid(t.points[1]);

  return true;
}
