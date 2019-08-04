/*
 *  This file will run the http server that receives the POST from GroupMe when
 *  a message is sent to the group. It will parse the message for a possible
 *  command and execute accordingly.
 */

import http from 'http'
import * as ConfigFile from './config'

let commands: Commands[] = []
loadCommands(`${__dirname}/commands`)

const server = http.createServer((req, res) => {
  const data: string[] = []

  req.on('data', (d) => {
    data.push(d)
  })

  req.on('end', () => {
    console.log(`DATA: ${data}`)

    let message = JSON.parse(data.join(''))['text']
    if (message[0] !== ConfigFile.config.prefix) { return }

    handleCommand(message)
  })

  res.writeHead(200)
  res.end()
})

async function handleCommand(message: string) {

  // Parse command and args from the message
  let command: string = message.split(' ')[0].replace(ConfigFile.config.prefix, '').toLowerCase()
  let args = message.split(' ').slice(1)

  console.log(`Command: ${command} \nArgs: ${args}`)

  for (const commandsClass of commands) {
    try {

      if(!commandsClass.isThisCommand(command)) { continue }

      await commandsClass.runCommand(args, message)

    } catch (exception) {
      console.log(exception)
    }
  }
}

function loadCommands(path: string) {
  for (const commandName of ConfigFile.config.commands as string[]) {

    const commandsClass = require(`${path}/${commandName}`).default

    const command = new commandsClass() as Commands

    commands.push(command)
  }
}

server.listen(5000)
