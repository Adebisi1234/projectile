"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Ball_instances, _Ball_addEventListeners, _Ball_createPolygon;
class Ball {
    constructor({ x, y, velocity, width, height, gravity = 9.8, angle = Math.PI / 4, ctx, }) {
        _Ball_instances.add(this);
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.speed = 0;
        this.acceleration = 0;
        this.velocity = 0;
        this.friction = 0;
        this.angle = 0;
        this.gravity = 0.1;
        this.radius = 20;
        this.coords = [];
        this.i = 0;
        this.resolution = 0;
        this.polygon = [];
        this.rotate = false;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 0;
        this.acceleration = 0.2;
        this.gravity = gravity;
        this.velocity = velocity;
        this.angle = angle;
        this.coords = getCoordinates({ angle, velocity, gravity });
        this.i = 0;
        __classPrivateFieldGet(this, _Ball_instances, "m", _Ball_addEventListeners).call(this, ctx);
    }
    draw(ctx) {
        // ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        // ctx.rect(this.x, this.y, this.radius, this.radius);
        ctx.fillStyle = "red";
        // ctx.fill();
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.stroke();
        ctx.fill();
    }
    update(ctx) {
        this.x = this.coords[this.i][0];
        this.y = ctx.canvas.height - this.coords[this.i][1];
        this.polygon = __classPrivateFieldGet(this, _Ball_instances, "m", _Ball_createPolygon).call(this);
        // console.log(this.i);
        this.draw(ctx);
        this.i = (this.i + 1) % this.coords.length;
        if (this.rotate) {
            this.resolution += (Math.PI * 2) / this.velocity;
        }
    }
}
_Ball_instances = new WeakSet(), _Ball_addEventListeners = function _Ball_addEventListeners(ctx) {
    if (!ctx)
        return;
    ctx.canvas.addEventListener("mousedown", () => {
        this.rotate = true;
    });
    ctx.canvas.addEventListener("mouseup", () => {
        this.rotate = false;
    });
}, _Ball_createPolygon = function _Ball_createPolygon() {
    const points = [];
    const rad = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);
    points.push({
        x: this.x - Math.sin(this.resolution - alpha) * rad,
        y: this.y - Math.cos(this.resolution - alpha) * rad,
    });
    points.push({
        x: this.x - Math.sin(this.resolution + alpha) * rad,
        y: this.y - Math.cos(this.resolution + alpha) * rad,
    });
    points.push({
        x: this.x - Math.sin(Math.PI + this.resolution - alpha) * rad,
        y: this.y - Math.cos(Math.PI + this.resolution - alpha) * rad,
    });
    points.push({
        x: this.x - Math.sin(Math.PI + this.resolution + alpha) * rad,
        y: this.y - Math.cos(Math.PI + this.resolution + alpha) * rad,
    });
    return points;
};
