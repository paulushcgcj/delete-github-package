const core = require("@actions/core");
const github = require("@actions/github");

try {
  const token = core.getInput("token");
  const typeOfPackage = core.getInput("type");

  console.log(`Hello ${typeOfPackage}!`);
} catch (error) {
  core.setFailed(error.message);
}
