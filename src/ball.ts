class Ball {
  x = 0;
  y = 0;
  width = 0;
  height = 0;
  speed = 0;
  acceleration = 0;
  velocity = 0;
  friction = 0;
  angle = 0;
  gravity = 0.1;
  radius = 20;
  coords: [number, number][] = [];
  i = 0;
  resolution = 0;
  polygon: { x: number; y: number }[] = [];
  rotate = false;
  defaultX = 30;
  constructor({
    x,
    y,
    velocity,
    width,
    height,
    gravity = 9.8,
    angle = Math.PI / 4,
    ctx,
  }: {
    x: number;
    velocity: number;
    width: number;
    height: number;
    angle: number;
    y: number;
    gravity: number;
    ctx: CanvasRenderingContext2D | null;
  }) {
    this.x = x;
    this.defaultX = x;
    this.y = floor.points[x];
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.acceleration = 0.2;
    this.gravity = gravity;
    this.velocity = velocity;
    this.angle = angle;
    this.coords = getCoordinates({
      angle,
      velocity,
      gravity,
    });
    this.i = 0;
    this.#addEventListeners(ctx);
  }

  jump({ angle, velocity, gravity }: IVariable) {
    this.coords = getCoordinates({
      angle: Math.atan(this.x),
      velocity,
      gravity,
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
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

  #addEventListeners(ctx: CanvasRenderingContext2D | null) {
    if (!ctx) return;
    ctx.canvas.addEventListener("mousedown", () => {
      this.rotate = true;
      this.coords = getCoordinates({
        angle: Math.atan(this.x),
        velocity: this.velocity,
        gravity: this.gravity,
      });
    });
    ctx.canvas.addEventListener("mouseup", () => {
      this.rotate = false;
    });
  }
  #createPolygon() {
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
  }

  update(ctx: CanvasRenderingContext2D) {
    if (this.rotate) {
      this.y = Math.min(
        ctx.canvas.height - this.coords[this.i][1],
        floor.points[this.x] - this.height / 2
      );
    } else {
      this.x = this.defaultX;
      this.y = floor.points[this.x] - this.height / 2;
    }
    this.polygon = this.#createPolygon();
    floor.update(ctx);
    this.draw(ctx);
    this.i = (this.i + 1) % this.coords.length;
    if (this.rotate) {
      this.resolution += (Math.PI * 2) / this.velocity;
    }
  }
}
