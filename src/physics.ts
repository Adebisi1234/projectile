// ANGLE IS IN RADIAN
interface IVariable {
  velocity: number;
  angle: number;
  gravity: number;
}
function getTimeOfFlight({ velocity, angle, gravity }: IVariable) {
  return (2 * velocity * +Math.sin(angle).toFixed(4)) / Math.max(gravity, 0.1); // Mustn't get divided by zero
}

function getRange({ velocity, angle, gravity }: IVariable) {
  return (
    (Math.pow(velocity, 2) * +Math.sin(2 * angle)) / Math.max(gravity, 0.1)
  ); // Mustn't get divided by zero
}

function getMaximumHeight({ velocity, angle, gravity }: IVariable) {
  return (
    (Math.pow(velocity, 2) * +Math.pow(+Math.sin(angle), 2).toExponential(4)) /
    Math.max(gravity, 0.1)
  );
}

function getCoordinate({
  dt,
  angle,
  velocity,
  gravity,
}: { dt: number } & IVariable) {
  const x = velocity * Math.cos(angle) * dt;
  const y = velocity * Math.sin(angle) * dt - 0.5 * gravity * Math.pow(dt, 2);

  return [x, y];
}

function getCoordinates({ angle, velocity, gravity }: IVariable) {
  const time = getTimeOfFlight({ velocity, angle, gravity });
  let i = 0;

  const coords = [];
  while (i <= time) {
    const newCoord = getCoordinate({ dt: i, angle, velocity, gravity });
    coords.push(newCoord);
    i += time / 59;
  }

  return coords as [number, number][];
}
