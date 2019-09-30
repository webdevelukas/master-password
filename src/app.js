const { readSecrets, writeSecrets } = require("./models/secrets");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const [action, key, value] = process.argv.slice(2);

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
  console.log(secret);
}

const commands = {
  set,
  get,
  unset
};

const command = commands[action];
if (command) {
  requirePassword();
} else if (!command) {
  throw new Error("unknown action");
}

// Ask the user for a password to run the functions
function requirePassword() {
  rl.question("Whats your master-password? ", answer => {
    if (answer === "helloWorld") {
      command(key, value);
      rl.close();
    } else {
      console.log("Your password is not correct, please try again.");
      rl.close();
    }
  });
}

/* 
My solution

function checkAction() {
  switch (action) {
    case "set":
      set(key, value);
      break;
    case "unset":
      unset(key);
      break;
    case "get":
      get(key);
      break;
    default:
      throw new Error("This action is not defined!");
  }
}

checkAction(); */

/* 
Leons solution

function showProcessDetails() {
  console.log(`Node version: ${process.version}`);
  console.log(`Platform: ${process.platform} ${process.arch}`);
  console.log(`Arguments: ${process.argv.join(" ")}`);
}

showProcessDetails();

const firstArgument = parseInt(process.argv[2]);
const secondArgument = parseInt(process.argv[3]);

function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}

const addResult = add(firstArgument, secondArgument);
console.log(`Add Result ${addResult}`);
const subResult = sub(firstArgument, secondArgument);
console.log(`Sub Result ${subResult}`);
 */
