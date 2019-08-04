/*
 *  Commands for the bot to execute. Working commands need to be placed in the
 *  array so they get indexed as being commands. If a command is not in the
 *  array, it will be treated like it does not exist.
 */

export default class joke implements Commands {

  private readonly __command = 'joke'

  help(): string {
    return 'This command tells a joke.'
  }

  isThisCommand(command: string): boolean {
    return command === this.__command
  }

  runCommand(args: string[], msg: string): void {
    console.log('I just told a joke!')
  }
}
