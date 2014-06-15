function Point(x, y) {
  this.x = x;
  this.y = y;

  if ( ! this.isValid()) {
    console.error('This point is not a valid point (' + JSON.stringify({x: this.x, y: this.y}) + ')');
    return false;
  }
}

Point.prototype.isValid = function(point) {
  var p = point || this;

  if (!(typeof(p.x) == "number") || (p.x == null || typeof(p.x) == "undefined")) {
    return false;
  }

  if (!(typeof(p.y) == "number") || (p.y == null || typeof(p.y) == "undefined")) {
    return false;
  }

  return true;
}
