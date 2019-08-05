interface Commands {
  help(): string
  isThisCommand(command: string): boolean;
  runCommand(args: string[], msg: string): void
}

interface Message {
  text: string
  bot_id: string
}
