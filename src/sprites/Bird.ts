import { GameObject, Vector } from '@/engine'

import BIRD_UP_IMAGE from '../images/bird_up.png'
import BIRD_DOWN_IMAGE from '../images/bird_down.png'

export class Bird extends GameObject {
    
    flyTime: number
    deltaTime: number = 0.0625
    isFlyDown: boolean = false
    initSpawnObsTimer: number

    constructor(objImage: string,
        objWidth: number,
        objHeight: number,
        objPosition: Vector) {
        super(objImage, objWidth, objHeight, objPosition)
        this.initSpawnObsTimer = 100
        this.flyTime = 0
    }

    moveToLeft(gameSpeed: number): void {
        this.flyTime += this.deltaTime
        this.position.x -= gameSpeed
        if (this.flyTime > 0.8) {
            this.flyTime = 0
            this.fly()
        }
    }

    fly(): void {
        if (this.isFlyDown) {
            this.objImage.src = BIRD_UP_IMAGE
            this.isFlyDown = false
            return
        }
        if (!this.isFlyDown) {
            this.objImage.src = BIRD_DOWN_IMAGE
            this.isFlyDown = true
            return
        }
    }
}