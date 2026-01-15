import { songService } from './song.service.js'
import { loggerService } from '../../services/logger.service.js'

export async function getSong(req, res) {
    try {
        console.log('Received song ID:', req.params.id)
        const song = await songService.getById(req.params.id)
        res.send(song)
    } catch (err) {
        loggerService.error('Failed to get song', err)
        res.status(400).send({ err: 'Failed to get song' })
    }
}

export async function getSongs(req, res) {
    try {
        const filterBy = {
            txt: req.query.txt || ''
        }
        const songs = await songService.query(filterBy)
        res.send(songs)
    } catch (err) {
        loggerService.error('Failed to get songs', err)
        res.status(400).send({ err: 'Failed to get songs' })
    }
}