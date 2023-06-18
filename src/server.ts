import 'dotenv/config'
import express from 'express'
import { SERVER_PORT } from './config/environment'

const server = express()

server.listen(SERVER_PORT, () =>
	console.log(`Express server is running on ${SERVER_PORT}`)
)
