"use strict";
const img = document.getElementsByTagName("img")[0];
function adjustTopology(topology) {
    // Adjust height
    const adjustedTopology = {};
    for (const top in topology) {
        if (Object.prototype.hasOwnProperty.call(topology, top)) {
            topology[top] = topology[top].map((y) => {
                return (y * innerHeight) / 100;
            });
            //   Adjust length
            if (topology[top].length < innerWidth) {
                const diff = Math.round(innerWidth / topology[top].length);
                topology[top] = topology[top].flatMap((y, i) => {
                    const temp = [y];
                    for (let j = 1; j < diff; j++) {
                        temp.push(lerp(y, topology[top][i], j / diff));
                    }
                    return temp;
                });
            }
            adjustedTopology[top] = topology[top];
        }
    }
    return adjustedTopology;
}
setInterval(() => {
    if (img.src.includes("day")) {
        img.classList.add("dark");
        img.src = "./night.gif";
    }
    else {
        img.classList.remove("dark");
        img.src = "./day.gif";
    }
}, 10000);
function lerp(A, B, t) {
    return A + (B - A) * t;
}
