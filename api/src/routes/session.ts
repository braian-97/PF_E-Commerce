import { Router, Request, Response } from "express";

const router = Router()
interface User{username: string, password: string}
type Users = User[]

let users: Users = []

router.post('/register', async (req:Request, res:Response) => {
    const {username, password} = req.body;
    if (users.find ((user: any) => user.username === username )) {
        return res.status(400).send('el usuario ya existe')
    } else {
        console.log('register')
        users.push(
            {
                username: username,
                password: password
            }
        )
        return res.send(users[users.length - 1])
    }
})

router.post('/login', async (req:Request, res:Response) => {
    const {username, password} = req.body;
    if (users.find ((user: any) => (user.username === username && user.password === password))) {
        return res.status(200).send('usuario y contraseña correctos')
    } else {
        return res.status(400).send('usuario o contaseña incorrectos')
    }
})



export default router