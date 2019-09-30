const { readSecrets, writeSecrets } = require("./secrets");

function set(key, value) {
  const secrets = readSecrets();
  secrets[key] = value;
  writeSecrets(secrets);
}

function unset(key) {
  const secrets = readSecrets();
  delete secrets[key];
  writeSecrets(secrets);
}

function get(key) {
  const secrets = readSecrets();
  const secret = secrets[key];
  console.log(`\nYour ${key.toUpperCase()} is: ${secret}`);
}

const commands = {
  set,
  get,
  unset
};

function executeCommand(action, key, value) {
  const command = commands[action];
  if (!command) {
    throw new Error("unknown action");
  }
  command(key, value);
}

exports.executeCommand = executeCommand;
