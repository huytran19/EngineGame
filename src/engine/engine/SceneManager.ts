export class SceneManager {
    public checkCollision(player: any, obstacles: any[]): boolean {
        for (let i = 0; i < obstacles.length; i++) {
            let o = obstacles[i]
            if (
                player.objPosition.x < o.objPosition.x + o.width &&
                player.objPosition.x + player.width > o.objPosition.x &&
                player.objPosition.y < o.objPosition.y + o.height &&
                player.objPosition.y + player.height > o.objPosition.y
                ) {
                    return true
                }
            }
        return false
    }
}