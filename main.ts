import { Point3D } from "./Point3D.js";
import { Point2D } from "./Point2D.js";
import { Edge } from "./Edge.js";
import { Object3D } from "./Object3D.js";

const canvasElement = document.getElementById("canvas") as HTMLCanvasElement;
const context = canvasElement.getContext("2d")!;
let width = canvasElement.width = 800;
let height = canvasElement.height = 640;
let FOV = 10;

let cube = new Object3D(
    [
        new Point3D(-1, -1, -1),
        new Point3D(-1, -1, 1),
        new Point3D(1, -1, -1),
        new Point3D(-1, 1, -1),
        new Point3D(-1, 1, 1),
        new Point3D(1, -1, 1),
        new Point3D(1, 1, -1),
        new Point3D(1, 1, 1),
    ], [
    new Edge(0, 1),
    new Edge(0, 2),
    new Edge(0, 3),
    new Edge(2, 5),
    new Edge(3, 6),
    new Edge(3, 4),
    new Edge(4, 7),
    new Edge(6, 7),
    new Edge(7, 5),
    new Edge(5, 1),
    new Edge(4, 1),
    new Edge(2, 6),
]);
window.requestAnimationFrame(step);
function step() {
    let rotation = 10e-3;
    cube.rotateZ(rotation);
    cube.rotateX(rotation);
    renderLines(context, cube);
    window.requestAnimationFrame(step);
}

function renderLines(context: CanvasRenderingContext2D, object: Object3D) {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);
    object.returnEdgesAsCoordinates().forEach(edge => {
        let projectedStartPoint = projection(edge.start);
        let projectedEndPoint = projection(edge.end);
        drawLine(context, new Edge<Point2D>(projectedStartPoint, projectedEndPoint), "blue");
    })
}
function drawLine(context: CanvasRenderingContext2D, line: Edge<Point2D>, color: string = "red") {
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(line.start.x, line.start.y);
    context.lineTo(line.end.x, line.end.y);
    context.stroke();
}
function projection(point: Point3D): Point2D {
    let { x, y, z } = point;
    // z += 20;//move from camera
    let edgeX = width / 2 + 100 * (FOV * x) / (FOV + z);
    let edgeY = height / 2 + 100 * (FOV * y) / (FOV + z);
    return new Point2D(edgeX, edgeY);
}