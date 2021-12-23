import { GameObject, Vector } from '@/engine'

export class Road extends GameObject {

    moveToLeft(gameSpeed: number): void {
        this.position.x -= gameSpeed
    }
}