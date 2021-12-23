import { Game } from "./Game";
import { Renderer, Scene, HandleUserInput, SceneManager } from "@/engine";
import { Player, Cactus } from "@/sprites";

import GAME_OVER_IMAGE from '../images/gameover_text.png'
import TREX_IMAGE from '../images/trex.png'
import CACTUS_LARGE_IMAGE from '../images/cactus_large.png'
import CACTUS_SMALL_IMAGE from '../images/cactus_small.png'
import ROAD_IMAGE from '../images/ground.png'
import CLOUD_IMAGE from '../images/cloud.png'
import { Bird } from "@/sprites/Bird";
import { Road } from "@/sprites/Road";
import { Cloud } from "@/sprites/Cloud";

export class GameManager {
    private _scene: Scene
    private _keyInput: HandleUserInput
    private _render: Renderer
    private _sceneManager: SceneManager
    private _playBtn: HTMLElement
    private _game: Game
    private _score: number
    private _scoreDisplay: HTMLElement
    highScore: number
    obstacles: any[]
    roads: Road[]
    clouds: Cloud[]

    constructor() {
        this._game
        this.obstacles = []
        this.roads = []
        this._scene = new Scene()
        this._keyInput
        this._render
        this._sceneManager
        this._scene.drawGameField({x: 600, y: 200})
        this._scene.addElement("div", "game", "", {id: "play"})
        this._scene.addElement("button", "play", "PLAY!", {id: "playBtn"})
        this._playBtn = document.getElementById('playBtn')!

        this._scene.addElement("div", "game", "", {id: "scoreDisplay"})
        this._scene.addElement("div", "scoreDisplay", "Score: 0", {id: "score"})
        this._scene.addElement("div", "scoreDisplay", "Highscore: 0", {id: "highScore"})
        this._scoreDisplay = document.getElementById('score')!
        this.highScore = 0
        this._game = new Game()
    }

    public initPlayBtn(): void {
        
        this._playBtn.addEventListener('click', () => {
            this._playBtn.setAttribute('style', 'visibility: hidden')
            this.play()
        })
    }

    public play(): void {
        this._keyInput = new HandleUserInput()
        this._render = new Renderer(this._scene)
        this._sceneManager = new SceneManager()
        this._score = 0
        this.obstacles = []
        this.roads = []
        this.clouds = []
        const player = new Player(TREX_IMAGE, 40, 45, {x: 30, y: 75})
        const cactus = new Cactus(CACTUS_LARGE_IMAGE, 25, 45, {x: 650, y: 130})
        const road = new Road(ROAD_IMAGE, 800, 10, {x: 0, y: 160})
        const cloud = new Cloud(CLOUD_IMAGE, 45, 15, {x: 620, y: 100})
        this.clouds.push(cloud)
        this.roads.push(road)
        this.obstacles.push(cactus)
        this._game.initGame(player, this.obstacles, this.roads, this.clouds, this._score, this._scoreDisplay, this, this._playBtn, this._scene, this._keyInput, this._render, this._sceneManager)
    }

    public gameOver(): void {
        const gameOverImage = new Image()
        gameOverImage.src = GAME_OVER_IMAGE
        const render = this._render
        gameOverImage.onload = function () {
            render.drawImageOnCanvas(gameOverImage, 170, 10, 215, 95)
        }
        this._playBtn.setAttribute('style', 'visibility: visible')
        return;
    }
}