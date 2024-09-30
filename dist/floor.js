"use strict";
class Floor {
    constructor(points) {
        // points = []
        /*
          Let say from 0 -100
          then based on the speed replace the points with the next progressively
          i.e 1 becomes 0, 0 gets deleted, 10 becomes 9 etc
      
          basically on each frame (based on speed) unshift and then push the new
          lets make it 5 per frame let's see
          It's only Y axis that should be different
          X should be predetermined, probably by canvas length
        */
        this.points = []; //number[] have a function that generates this
        this.points = [...Floor.topology.Straight, ...points];
        Floor.topology.Straight.push(...points);
    }
    draw(ctx) {
        // Doing per pixel to test
        ctx.beginPath();
        ctx.moveTo(0, ctx.canvas.height);
        ctx.strokeStyle = "blue";
        ctx.fillStyle = "white";
        for (let i = 1; i < ctx.canvas.width; i++) {
            ctx.lineTo(i, this.points[i]);
        }
        ctx.lineTo(ctx.canvas.width, ctx.canvas.height);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
    update(ctx) {
        this.points = this.points.slice(6);
        this.points.length < ctx.canvas.width &&
            this.points.push(...Floor.topology.Straight.reverse());
        this.draw(ctx);
    }
}
//   Forgot the correct english for this please rename if you know it
Floor.topology = adjustTopology(JSON.parse(localStorage.getItem("topology") ?? "{}"));
