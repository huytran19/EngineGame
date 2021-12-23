import { Vector } from '../utils'

export class Scene {
    private size: Vector
    private cv: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D

    constructor(
        
    ) {
        this.cv = document.createElement('canvas')
        this.ctx = this.cv.getContext('2d')!
    }

    public get canvas(): HTMLCanvasElement {
        return this.cv
    }

    public get context(): CanvasRenderingContext2D {
        return this.ctx
    }

    drawGameField(size: Vector): void {
        this.cv.setAttribute('width', `${size.x}px`)
        this.cv.setAttribute('height', `${size.y}px`)
        document.getElementById('game')?.appendChild(this.cv)
    }

    addElement(elementName: string, parentElementName: string, text: string, ...rest: any[]): void {
        const element = document.createElement(`${elementName}`)
        if (rest) {
            for (let i = 0; i < rest.length; i++) {
                element.setAttribute(`${Object.keys(rest[i]).toString()}`, `${Object.values(rest[i]).toString()}`)
            }
        }
        element.innerText = text
        document.getElementById(`${parentElementName}`)?.appendChild(element)
    }
}