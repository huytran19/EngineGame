import { GameObject, Scene } from "../basicClass";

export class Renderer {
    private _canvas: HTMLCanvasElement
    private _context: CanvasRenderingContext2D


    constructor(scene: Scene) {
        this._canvas = scene.canvas
        this._context = scene.context
    }

    renderObject<T>(object: T): void {
        this.drawSprite(object)
    }

    renderObjects<T>(objects: T[]): void {
        objects.forEach(object => {
            this.drawSprite(object)
        });
    }

    clear(): void {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
    }

    drawSprite<C>(gameObject: any): void {
        if(gameObject.image.complete){
            this._context.drawImage(
                gameObject.image,
                gameObject.position.x,
                gameObject.position.y,
                gameObject.width,
                gameObject.height,
            )
        }
    }

    drawImageOnCanvas(image: HTMLImageElement, width: number, height: number, x: number, y: number): void {
        if(image.complete) {
            this._context.drawImage(
                image,
                x,
                y,
                width,
                height
            )
        } 

    }
}