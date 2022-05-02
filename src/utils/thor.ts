export const lightItUpBaby = () => {
  // Credits https://codepen.io/mcdorli/pen/rLrQZq
  const c = top.document.createElement("canvas");
  c.id = "canvas";
  top.document.body.append(c);
  window.setTimeout(() => {
    top.document.body.removeChild(c);
  }, 2000);
  var size = 500;
  c.width = size;
  c.height = size;
  var ctx = c.getContext("2d");

  var center = { x: size / 2, y: 20 };
  var minSegmentHeight = 5;
  var groundHeight = size - 20;
  var color = "hsl(180, 80%, 80%)";
  var roughness = 2;
  var maxDifference = size / 5;

  ctx.globalCompositeOperation = "lighter";

  ctx.strokeStyle = color;
  ctx.shadowColor = color;

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = "hsla(0, 0%, 10%, 0.2)";

  function render() {
    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillRect(0, 0, size, size);
    ctx.globalCompositeOperation = "lighter";
    ctx.shadowBlur = 15;
    var lightning = createLightning();
    ctx.beginPath();
    for (var i = 0; i < lightning.length; i++) {
      ctx.lineTo(lightning[i].x, lightning[i].y);
    }
    ctx.stroke();
    requestAnimationFrame(render);
  }

  function createLightning() {
    var segmentHeight = groundHeight - center.y;
    var lightning = [];
    lightning.push({ x: center.x, y: center.y });
    lightning.push({
      x: Math.random() * (size - 100) + 50,
      y: groundHeight + (Math.random() - 0.9) * 50,
    });
    var currDiff = maxDifference;
    while (segmentHeight > minSegmentHeight) {
      var newSegments = [];
      for (var i = 0; i < lightning.length - 1; i++) {
        var start = lightning[i];
        var end = lightning[i + 1];
        var midX = (start.x + end.x) / 2;
        var newX = midX + (Math.random() * 2 - 1) * currDiff;
        newSegments.push(start, { x: newX, y: (start.y + end.y) / 2 });
      }

      newSegments.push(lightning.pop());
      lightning = newSegments;

      currDiff /= roughness;
      segmentHeight /= 2;
    }
    return lightning;
  }

  render();
};
