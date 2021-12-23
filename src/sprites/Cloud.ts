import { GameObject, Vector } from '@/engine'

export class Cloud extends GameObject {
    initSpawnObsTimer: number

    constructor(objImage: string,
        objWidth: number,
        objHeight: number,
        objPosition: Vector) {
        super(objImage, objWidth, objHeight, objPosition)
        this.initSpawnObsTimer = 100
    }
    moveToLeft(gameSpeed: number): void {
        this.position.x -= gameSpeed * 0.25
    }
}