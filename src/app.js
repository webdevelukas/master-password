const readline = require("readline");
const crypto = require("crypto");
const fs = require("fs");

const { executeCommand } = require("./lib/commands");

const userArgv = process.argv.slice(2);
const [action, key, value] = userArgv;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const masterPasswordHash = fs.readFileSync(".masterPassword", "utf-8");

rl.question("Whats your master password? \n", password => {
  rl.output.write("*");
  if (verifyHash(password, masterPasswordHash)) {
    executeCommand(password, action, key, value);
  } else {
    console.log("\ninvalid master password");
  }
  rl.close();
});

// Override default output to hide password
rl._writeToOutput = function _writeToOutput() {
  rl.output.write("*");
};

// Checking the password hash
function verifyHash(password, original) {
  const originalHash = original.split("$")[1];
  const salt = original.split("$")[0];
  const hash = crypto
    .pbkdf2Sync(password, salt, 2048, 32, "sha512")
    .toString("hex");

  return hash === originalHash;
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
