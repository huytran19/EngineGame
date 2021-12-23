import { GameObject, Vector } from "@/engine"

export class Cactus extends GameObject {
    initSpawnObsTimer: number

    constructor(objImage: string,
        objWidth: number,
        objHeight: number,
        objPosition: Vector) {
        super(objImage, objWidth, objHeight, objPosition)
        this.initSpawnObsTimer = 100
    }

    moveToLeft(gameSpeed: number): void {
        this.position.x -= gameSpeed
    }
}