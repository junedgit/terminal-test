class Command {
  constructor(name, description, action) {
    this.name = name;
    this.description = description;
    this.action = action;
  }
}

class Commander {
  constructor() {
    this.commands = [];
  }

  command(name, description, action) {
    this.commands.push(new Command(name, description, action));
  }

  parse(input) {
    const [cmd, ...args] = input.split(" ");
    const command = this.commands.find((c) => c.name === cmd);
    if (command) {
      command.action(args);
    } else {
      outputDiv.innerText += `Unknown command: ${cmd}\n`;
    }
  }

  help() {
    outputDiv.innerText += "Available commands:\n";
    this.commands.forEach((cmd) => {
      outputDiv.innerText += `${cmd.name}: ${cmd.description}\n`;
    });
  }
}

const outputDiv = document.getElementById("output");
const commandInput = document.getElementById("commandInput");

const commander = new Commander();

commander.command("read", "Read and display text", (args) => {
  outputDiv.innerText += `Text: ${args.join(" ")}\n`;
});

commander.command("wordcount", "Count words in the provided text", (args) => {
  const wordCount = args
    .join(" ")
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  outputDiv.innerText += `Word count: ${wordCount}\n`;
});

commander.command("help", "List available commands", () => {
  commander.help();
});

commandInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const input = commandInput.value.trim();
    commander.parse(input);
    commandInput.value = "";
  }
});

outputDiv.innerText +=
  "A Simple terminal like App. Type 'help' for a list of commands.\n";
