import util from 'util'
import fs from 'fs'

const readFile = util.promisify(fs.readFile)

const processFile = async(path?: string|string[]) => {
    path = ('undefined' === typeof path) ? '.env' : path

    const file = await readFile(`${process.cwd()}/${path}`)
    loadFile(file.toString())
}

const loadFile = (file: string) => {
    // Split file by newline
    const lines = file.split('\n')

    for (const line of lines) {
        if (line.indexOf('=') < 0) continue

        // split line by '='
        const [key, value] = line.split('=')

        // If there is already an environment variable for this key, don't replace it
        if ('undefined' !== typeof process.env[key]) continue

        process.env[key] = value.trim().replace('\r', '')
    }
}

export { processFile, loadFile }
