function Point(x, y) {
  this.x = x;
  this.y = y;

  if (!this.isValid()) {
    console.error('This point is not a valid point (' + JSON.stringify({x: this.x, y: this.y}) + ')');
    return false;
  }
}

Point.prototype.isValid = function(point) {
  var p = point || this;
  var valid = true;

  if (!(typeof(p.x) == "number") || (p.x == null || typeof(p.x) == "undefined")) {
    console.error(JSON.stringify(p.x) + ' is not a valid x coordinate');
    valid = false;
  }

  if (!(typeof(p.y) == "number") || (p.y == null || typeof(p.y) == "undefined")) {
    console.error(p.y + ' is not a valid y coordinate');
    valid = false;
  }

  return valid;
}
