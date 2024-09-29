"use strict";
const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");
const ball = new Ball({
    gravity: 9.8,
    height: 30,
    width: 30,
    velocity: 50,
    x: 300,
    y: 150,
    angle: Math.PI / 3,
    ctx,
});
let i = 0;
function animate() {
    if (!ctx)
        return;
    ctx.reset();
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 300, 300);
    ball.update(ctx);
    requestAnimationFrame(animate);
}
animate();
