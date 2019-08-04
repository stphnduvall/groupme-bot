interface Commands {
  help(): string
  isThisCommand(command: string): boolean;
  runCommand(args: string[], msg: string): void
}
