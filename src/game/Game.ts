import { Scene, HandleUserInput, Renderer, SceneManager } from "@/engine"
import { Player, Cactus } from "@/sprites"
import { GameManager } from "./GameManager"
import { Bird } from "@/sprites/Bird"

import TREX_IMAGE from '../images/trex.png'
import CACTUS_LARGE_IMAGE from '../images/cactus_large.png'
import CACTUS_SMALL_IMAGE from '../images/cactus_small.png'
import BIRD_DOWN_IMAGE from '../images/bird_down.png'
import ROAD_IMAGE from '../images/ground.png'
import CLOUD_IMAGE from '../images/cloud.png'
import { Road } from "@/sprites/Road"
import { Cloud } from "@/sprites/Cloud"

export class Game {

    
    private _gameManager: GameManager
    keys = []
    gameSpeed: number
    private _scene: Scene
    private _keyInput: HandleUserInput
    private _render: Renderer
    private _sceneManager: SceneManager
    private _playBtn: HTMLElement
    private _check: boolean
    private _scoreDisplay: HTMLElement

    constructor() { 
        this._playBtn
        this._scene
        this._sceneManager
        this._keyInput
        this._render
        this._check = false
        this.keys = []
        this.gameSpeed = 6
        this._gameManager
    }

    public initGame(player: Player,
        obstacles: any[],
        roads: Road[],
        clouds: Cloud[],
        score: number,
        scoreDisplay: HTMLElement,
        gameManager: GameManager,
        playBtn: HTMLElement,
        scene: Scene,
        keyInput: HandleUserInput,
        render: Renderer,
        sceneManager: SceneManager): void {
            this._playBtn = playBtn
            this._scene = scene
            this._sceneManager = sceneManager
            this._keyInput = keyInput
            this._render = render
            this._gameManager = gameManager
            this._scoreDisplay = scoreDisplay
            this.gameLoop(player, obstacles, roads, clouds, score)
        }

    public gameLoop(
        player: Player,
        obstacles: any[],
        roads: Road[],
        clouds: Cloud[],
        score: number
    ): void {
        const render = this._render
        this._check = this._sceneManager.checkCollision(player, obstacles)
        this.update(this._keyInput.registerKeyPress(this.keys)[0], this.gameSpeed, player, obstacles, roads, clouds)
        this._scoreDisplay.innerText = `Score: ${score++}`.toString()
        this._render.clear()
        this._render.renderObject(player)
        this._render.renderObjects(obstacles)
        this._render.renderObjects(roads)
        this._render.renderObjects(clouds)
        if (this._check){
            if (score > this._gameManager.highScore) {
                this._gameManager.highScore = score
                const highScore = document.getElementById('highScore')!
                highScore.innerText = `Highscore: ${this._gameManager.highScore}`.toString()
            }
            return this._gameManager.gameOver()
        } else {
            requestAnimationFrame(() => this.gameLoop(player, obstacles, roads, clouds, score))
        }
    }

    private update(
        keyPressed: string,
        gameSpeed: number,
        player: Player, 
        obstacles: any[],
        roads: Road[],
        clouds: Cloud[]
    ): void {
        gameSpeed += 0.0007

        player.playerMove(keyPressed)

        for (let i = 0; i < obstacles.length; i++) {
            let o = obstacles[i]
            o.moveToLeft(gameSpeed)
            o.initSpawnObsTimer--
            
            if ((o.initSpawnObsTimer - Math.floor((Math.random() * (50 - 30) + 30))) <= 0 && obstacles.length < 2) {
                if (Math.round(Math.random() * (10 - 0) + 0) > 2 && Math.round(Math.random() * (10 - 0) + 0) <= 6) {
                    const newObstacle = new Cactus(CACTUS_LARGE_IMAGE, 25, 45, {x: Math.floor((Math.random() * (700 - 610) + 610)), y: 130})
                    obstacles.push(newObstacle)
                } else if (Math.round(Math.random() * (10 - 0) + 0) > 6 && Math.round(Math.random() * (10 - 0) + 0) <= 10) {
                    const newObstacle = new Cactus(CACTUS_SMALL_IMAGE, 18, 28, {x: Math.floor((Math.random() * (700 - 610) + 610)), y: 147})
                    obstacles.push(newObstacle)
                } 
                else {
                    const newObstacle = new Bird(BIRD_DOWN_IMAGE, 35, 15, {x: 620, y: 120})
                    obstacles.push(newObstacle)
                }
            }
            if (o.position.x < -30) {
                obstacles.splice(i, 1)
            }
        }
        for (let i = 0; i < roads.length; i++) {
            let r = roads[i]
            r.moveToLeft(gameSpeed)
            if (r.objPosition.x < -200 && roads.length < 2) {
                const newRoad = new Road(ROAD_IMAGE, 800, 10, {x: 600, y: 160})
                roads.push(newRoad)
            }
            if (r.objPosition.x < -800) {
                roads.splice(i, 1)
            }
        }
        for (let i = 0; i < clouds.length; i++) {
            let c = clouds[i]
            c.moveToLeft(gameSpeed)
            c.initSpawnObsTimer--
            if ((c.initSpawnObsTimer - Math.floor((Math.random() * (40 - 30) + 30))) <= -150 && clouds.length < 2) {
                const newCloud = new Cloud(CLOUD_IMAGE, 45, 15, {x: 600 + Math.floor((Math.random() * (50 - 10) + 10)), y: 30 + Math.floor((Math.random() * (50 - 10) + 10))})
                clouds.push(newCloud)
            }
            if (c.objPosition.x < -30) {
                clouds.splice(i, 1)
            }
        }
    }
}