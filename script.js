var points = [];
var pointCount = 0;
var body = document.getElementsByTagName('body')[0];

function defer(t) {
  setTimeout(function() {
    t();
  }, 1);
}

function reset() {
  var p = document.querySelectorAll('.point');
  var lines = document.querySelectorAll('.line');

  for (var i = 0; i < lines.length; i++ ) {
    body.removeChild(lines[i]);
  }

  for (i = 0; i < p.length; i++) {
    body.removeChild(p[i]);
  }

  points = [];
  pointCount = 0;
}

function drawPoint(point, color) {
  var p = document.createElement('div');
  p.className = 'point';
  p.style.left = point.x + 'px';
  p.style.top = point.y + 'px';
  if (color) {
    p.style.borderColor = color;
  }

  body.appendChild(p);

  defer(function() {
    p.className += " show";
  });
}

function drawLine(point, angle, width, klasses) {
  var line = document.createElement('div');

  line.className = "line";
  if (klasses) line.className = ([line.className].concat(klasses)).join(' ');
  line.style.top = point.y + 'px';
  line.style.left = point.x + 'px';
  line.style.webkitTransform = 'rotateZ(' + angle + 'deg)';

  body.appendChild(line);

  defer(function() {
    line.style.webkitTransitionDuration = "0.5s";
    line.style.webkitTransitionProperty = "width";
    line.style.webkitTransitionTimingFunction = "cubic-bezier(0.770, 0.000, 0.175, 1.000)";
    line.style.width = width + 'px';
  });
}

function calculate(t) {
  var m = (t.points[0].y - t.points[1].y) / (t.points[1].x - t.points[0].x);

  drawPoint(t.points[2], 'red');

  var point;
  var width;
  var angle;

  // hypotenuse
  point = new Point(Math.min(t.points[0].x, t.points[1].x), m > 0 ? Math.max(t.points[0].y, t.points[1].y) : Math.min(t.points[0].y, t.points[1].y));
  angle = m > 0 ? -t.angles[0] : t.angles[0];
  width = t.hypotenuse;

  drawLine(point, angle, width);

  // x
  point = new Point(t.points[0].x, Math.min(t.points[0].y, t.points[1].y));
  angle = 90;
  width = Math.abs(t.points[1].y - t.points[0].y);

  drawLine(point, angle, width, ['light']);

  // y
  point = new Point(Math.min(t.points[0].x, t.points[1].x), t.points[2].y);
  angle = 0;
  width = Math.abs(t.points[1].x - t.points[0].x);

  drawLine(point, angle, width, ['light']);
}

function pointClicked(e) {
  if (pointCount == 2) {
    reset();
  } else {
    var point = new Point(e.pageX, e.pageY);
    drawPoint(point);
    points.push(point);
    pointCount++;
  }

  if (pointCount == 2) {
    var t = new RightTriangle(points[0], points[1]);
    calculate(t);
  }
}

/*
var hasTouch = "ontouchstart" in document;
if (hasTouch) {
  window.addEventListener('ontouchend', pointClicked, false);
} else {
}
*/

window.addEventListener('click', pointClicked, false);
