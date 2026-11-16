(function () {
  var here = document.getElementById("here");
  var sections = Array.prototype.slice.call(document.querySelectorAll("main > section"));
  if (!here || !("IntersectionObserver" in window)) return;

  var visible = {};
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        visible[e.target.id] = e.isIntersecting;
      });
      var current = sections.filter(function (s) { return visible[s.id]; })[0];
      here.textContent = current ? current.getAttribute("data-name") || "" : "";
    },
    { rootMargin: "-56px 0px -60% 0px" }
  );
  sections.forEach(function (s) { observer.observe(s); });
})();
