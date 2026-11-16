(function () {
  var stage = document.getElementById("stage");
  var slides = Array.prototype.slice.call(stage.querySelectorAll(".slide"));
  var index = 0;

  function fit() {
    var s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    stage.style.setProperty("--fit", s);
  }

  function show(i) {
    index = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach(function (el, n) {
      el.classList.toggle("is-active", n === index);
    });
    if (location.hash !== "#" + (index + 1)) {
      history.replaceState(null, "", "#" + (index + 1));
    }
  }

  function fromHash() {
    var n = parseInt(location.hash.slice(1), 10);
    show(isNaN(n) ? 0 : n - 1);
  }

  document.addEventListener("keydown", function (e) {
    var k = e.key;
    if (k === "ArrowRight" || k === "PageDown" || k === " ") { e.preventDefault(); show(index + 1); }
    else if (k === "ArrowLeft" || k === "PageUp") { e.preventDefault(); show(index - 1); }
    else if (k === "Home") { show(0); }
    else if (k === "End") { show(slides.length - 1); }
  });

  stage.addEventListener("click", function (e) {
    if (e.target.closest("a")) return;
    var half = window.innerWidth / 2;
    show(e.clientX > half ? index + 1 : index - 1);
  });

  window.addEventListener("resize", fit);
  window.addEventListener("hashchange", fromHash);
  fit();
  fromHash();
})();
