export const KEYS: {[key: string]: string} = {
    ArrowUp: "Up",
    ArrowDown: "Down"
}

export class HandleUserInput {
    

    registerKeyPress(keys: any[]): any[] {
        document.addEventListener('keydown', (e: KeyboardEvent) => {
            var key
            if (e.keyCode != 38 && e.keyCode != 40) {
                key = "undefined"
            }
            else {key = KEYS[e.key].toString()
            if (key && keys.indexOf(key) === -1) {
                keys.unshift(key)
            }
        }
        })
        document.addEventListener('keyup', (e: KeyboardEvent) => {
            var key
            if (e.keyCode != 38 && e.keyCode != 40) {
                key = "undefined"
            }
            else {
                key = KEYS[e.key].toString()
                var index = keys.indexOf(key)
                if (index > -1) {
                    keys.splice(index, 1)
                }
            }
        })
        return keys
    }
}