import { loggerService } from '../../services/logger.service.js'
import { dbService } from '../../services/db.service.js'
import { ObjectId } from 'mongodb'


export const songService = {
    query,
    getById,
}

async function query(filterBy = {txt : ''}) {
    const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('song')
        var songs = await collection.find(criteria).toArray()
        songs = songs.map(song => {
            delete song.password
            song.createdAt = song._id.getTimestamp()
            // Returning fake fresh data
            // song.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            return song
        })
        return songs
    } catch (err) {
        loggerService.error('cannot find songs', err)
        throw err
    }
}


async function getById(songId) {
    try {
        if (!songId || !ObjectId.isValid(songId)) {
            throw new Error('Invalid song ID')
        }
        var criteria = { _id: ObjectId.createFromHexString(songId) }

        const collection = await dbService.getCollection('song')
        const song = await collection.findOne(criteria)
        delete song.password

        criteria = { bySongId: songId }

        return song
    } catch (err) {
        loggerService.error(`while finding song by id: ${songId}`, err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
        criteria.$or = [
            {
                title: txtCriteria,
            },
            {
                artist: txtCriteria,
            },
        ]
    }
    return criteria
}
