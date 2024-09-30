"use strict";
const canvas = document.getElementsByTagName("canvas")[0];
const input = document.getElementsByTagName("input")[0];
// canvas.width = innerWidth;
// canvas.height = innerHeight;
const ctx = canvas.getContext("2d");
const floor = new Floor([]);
const ball = new Ball({
    gravity: 9.8,
    height: 30,
    width: 30,
    velocity: 80,
    x: (1 / 5) * canvas.width,
    y: 150,
    angle: Math.PI / 3,
    ctx,
});
// floor.draw(ctx!);
function animate() {
    if (!ctx)
        return;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    ball.update(ctx);
    // floor.update(ctx);
    requestAnimationFrame(animate);
}
animate();
let tempTopology = [];
function generateTopologies() {
    const landscapeHeightLimit = canvas.height / 2;
    if (!ctx)
        return;
    ctx.fillStyle = "red";
    ctx.fillRect(0, landscapeHeightLimit, 10, 10);
    ctx?.beginPath();
    ctx?.moveTo(0, landscapeHeightLimit);
    canvas.addEventListener("pointermove", (e) => {
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        tempTopology.push(e.clientY - canvas.offsetTop);
    });
}
function saveTopology() {
    if (tempTopology.length > 50) {
        //Random Threshold
        Floor.topology[input.value] = tempTopology;
        localStorage.setItem("topology", JSON.stringify(Floor.topology));
    }
}
function resetTopology() {
    tempTopology = [];
}
// generateTopologies();
