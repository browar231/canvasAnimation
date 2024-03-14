import { Edge } from "./Edge.js";
import { Point3D } from "./Point3D.js";

export class Object3D {
    public vertices: Point3D[];
    public edges: Edge<number>[];
    constructor(vertices: Point3D[], edges: Edge<number>[]) {
        this.vertices = vertices;
        this.edges = edges;
    }
    returnEdgesAsCoordinates(): Edge<Point3D>[] {
        return this.edges.map((edge) => {
            return new Edge<Point3D>(this.vertices[edge.start], this.vertices[edge.end])
        })
    }
    rotateX(angle: number) {
        this.vertices.forEach(vertex => {
            let { x, y, z } = vertex;
            vertex.y = Math.cos(angle) * y - Math.sin(angle) * z;
            vertex.z = Math.sin(angle) * y + Math.cos(angle) * z;
        })
    }
    rotateY(angle: number) {
        this.vertices.forEach(vertex => {
            let { x, y, z } = vertex;
            vertex.x = Math.cos(angle) * x + Math.sin(angle) * z;
            vertex.z = Math.sin(angle) * x + Math.cos(angle) * z;
        })
    }
    rotateZ(angle: number) {
        this.vertices.forEach(vertex => {
            let { x, y, z } = vertex;
            vertex.x = Math.cos(angle) * x - Math.sin(angle) * y;
            vertex.y = Math.sin(angle) * x + Math.cos(angle) * y;
        })
    }
}