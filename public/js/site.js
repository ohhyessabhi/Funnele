(function () {
  var spots = document.querySelectorAll('.spot');
  if (!spots.length) return;
  document.addEventListener('mousemove', function (e) {
    spots.forEach(function (s) {
      var r = s.parentElement.getBoundingClientRect();
      s.style.setProperty('--sx', (e.clientX - r.left) + 'px');
      s.style.setProperty('--sy', (e.clientY - r.top) + 'px');
    });
  });
})();
