import { authService } from "../api/auth/auth.service"

export function requireAuth(req, res, next) {
    const loginToken = req.cookies.loginToken
    const loggedinUser = authService.validateToken(loginToken)

    if(!loggedinUser) return rs.status(401).send('Please login')
    req.loggedinUser = loggedinUser

    next()
}