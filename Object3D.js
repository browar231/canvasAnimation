import { Edge } from "./Edge.js";
export class Object3D {
    constructor(vertices, edges) {
        this.vertices = vertices;
        this.edges = edges;
    }
    returnEdgesAsCoordinates() {
        return this.edges.map((edge) => {
            return new Edge(this.vertices[edge.start], this.vertices[edge.end]);
        });
    }
    rotateX(angle) {
        this.vertices.forEach(vertex => {
            let { x, y, z } = vertex;
            vertex.y = Math.cos(angle) * y - Math.sin(angle) * z;
            vertex.z = Math.sin(angle) * y + Math.cos(angle) * z;
        });
    }
    rotateY(angle) {
        this.vertices.forEach(vertex => {
            let { x, y, z } = vertex;
            vertex.x = Math.cos(angle) * x + Math.sin(angle) * z;
            vertex.z = Math.sin(angle) * x + Math.cos(angle) * z;
        });
    }
    rotateZ(angle) {
        this.vertices.forEach(vertex => {
            let { x, y, z } = vertex;
            vertex.x = Math.cos(angle) * x - Math.sin(angle) * y;
            vertex.y = Math.sin(angle) * x + Math.cos(angle) * y;
        });
    }
}
