import { Vector } from "../utils"

export abstract class GameObject {
    public objImage: HTMLImageElement = new Image()
    public objWidth: number
    public objHeight: number
    public objPosition: Vector

    constructor(
        objImage: string,
        objWidth: number,
        objHeight: number,
        objPosition: Vector
    ) {
        this.objImage.src = objImage
        this.objWidth = objWidth
        this.objHeight = objHeight
        this.objPosition = objPosition
    }

    public get image(): HTMLImageElement {
        return this.objImage
    }

    public get width(): number {
        return this.objWidth
    }

    public get height(): number {
        return this.objHeight
    }

    public get position(): Vector {
        return this.objPosition
    }

    public set image(image: HTMLImageElement) {
        this.objImage = image
    }

    public set width(width: number) {
        this.objWidth = width
    }

    public set height(height: number) {
        this.objHeight = height
    }

    public set position(position: Vector) {
        this.objPosition = position
    }
    
    playerMove(keyPressed: string): void {

    }

    jump(): void {

    }

    switchImage(type: string): void {

    }

    moveToLeft(gameSpeed: number): void {

    }

    fly(): void {

    }

}