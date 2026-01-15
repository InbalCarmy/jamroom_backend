import Cryptr from 'cryptr'
import bcrypt from 'bcrypt'

import { userService } from '../user/user.service.js'
import { loggerService } from '../../services/logger.service.js'

const cryptr = new Cryptr(process.env.SECRET1)

export const authService = {
    getLoginToken,
    validateToken,
    login,
    signup
}


function getLoginToken(user) {
    const str = JSON.stringify(user)
    const encryptedStr = cryptr.encrypt(str)
    return encryptedStr
}

function validateToken(token) {
    try {
        const json = cryptr.decrypt(token)
        const loggedinUser = JSON.parse(json)
        return loggedinUser
    } catch (err) {
        console.log('Invalid login token')
    }
    return null
}

async function login(username, password) {
    var user = await userService.getByUsername(username)
    if (!user) throw 'Unkown username'

    //  un-comment for real login
    const match = await bcrypt.compare(password, user.password)
    if (!match) throw 'Invalid username or password'

    // Removing passwords and personal data
        const miniUser = {
            _id: user._id,
            username: user.username,
            isAdmin: user?.isAdmin || false,
            instrument: user.instrument,
        }
    return miniUser
}

async function signup({ username, password, instrument }) {
    const saltRounds = 10

    loggerService.debug(`auth.service - signup with username: ${username}, instrument: ${instrument}`)
    if (!username || !password || !instrument) throw 'Missing required signup information'

    const userExist = await userService.getByUsername(username)
    if (userExist) throw 'Username already taken'

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ username, password: hash, instrument, isAdmin })
}