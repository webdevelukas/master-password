const fs = require("fs");

const fileName = "secrets.json";

function readSecrets() {
  try {
    const secretsJSON = fs.readFileSync(fileName);
    const secrets = JSON.parse(secretsJSON);
    return secrets;
  } catch (error) {
    writeSecrets({});
    return {};
  }
}

function writeSecrets(secrets) {
  fs.writeFileSync(
    fileName,
    JSON.stringify(secrets),
    console.log("Write secrets", secrets)
  );
}

exports.readSecrets = readSecrets;
exports.writeSecrets = writeSecrets;
