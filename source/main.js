// DOM Reference.
var clickArea = document.querySelector('.click-area');
var introText = document.querySelector('.intro-text');

var ws = new Primus('ws://localhost:2000/primus?token=password');
ws.on('data', function(data) {
  playAudioVisual(data.x, data.y, 'blue');
});

// Handle all clicks on the click area.
clickArea.addEventListener('click', function onClick(event) {
  // Send the location to the server.
  ws.write({
    x: event.x,
    y: event.y
  });

  // Hide the intro text.
  introText.className = 'intro-text hide';
}, false);

/**
 * Display the clicked/touched spot and play the associated tone.
 * @param  {Number} x     The x-coordinate clicked.
 * @param  {Number} y     The y-cooridnate clicked.
 * @param  {String} color Color to rende the dot.
 */
function playAudioVisual(x, y, color) {
  // Adjust the location by the radius of the circle.
  x -= 25;
  y -= 25;

  // Setup the base DOM element.
  var div = document.createElement('div');
  div.className = 'color-dot show ' + color;
  div.style.left = x + 'px';
  div.style.top = y + 'px';
  clickArea.appendChild(div);

  // Remove the circle from the DOM.
  setTimeout(function() {
    clickArea.removeChild(div);
  }, 3000);
}
