/*
 *  Commands for the bot to execute. Working commands need to be placed in the
 *  array so they get indexed as being commands. If a command is not in the
 *  array, it will be treated like it does not exist.
 */
import * as https from 'https'
import * as schedule from 'node-schedule'

import { sendMessage } from '../api'
import * as ConfigFile from '../config'

let rule = new schedule.RecurrenceRule();
rule.minute = 5
rule.hour = 8

schedule.scheduleJob(rule, () => {
  new joke().runCommand()
})

export default class joke implements Commands {

  private readonly __command = 'joke'

  private get_options = {
    hostname: 'icanhazdadjoke.com',
    port: 443,
    path: '/',
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  }

  help(): string {
    return 'This command tells a joke.'
  }

  isThisCommand(command: string): boolean {
    return command === this.__command
  }

  runCommand(args?: string[], msg?: string): void {
    const req = https.request(this.get_options, (res) => {
      const chunks: string[] = []

      res.on('data', (d) => {
        chunks.push(d)
      })

      res.on('end', () => {
        let joke = JSON.parse(chunks.join(''))['joke']
        let message: Message = {
          text: joke,
          bot_id: ConfigFile.config.bot_id
        }

        sendMessage(message)
      })
    })

    req.on('error', (error) => {
      console.log(error)
    })

    req.end()

    console.log('I just told a joke!')
  }
}
