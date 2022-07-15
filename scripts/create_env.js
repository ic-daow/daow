#!/usr/bin/env node

const fs = require("fs");

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

async function main() {
  const canisterIds = readJsonSync("canister_ids.json");
  const {
    daow: { ic: daowCid },
    photo: { ic: photoCid },
    frontend: { ic: frontendCid },
  } = canisterIds;
  const envPath = "packages/frontend/.env.production";
  const envExist = fs.existsSync(envPath);
  let text = `
VUE_APP_IC_HOST=https://raw.ic0.app
VUE_APP_CANDIDUI_CID=
VUE_APP_DAOW_CID=
VUE_APP_PHOTO_CID=
VUE_APP_FRONTEND_CID=
`;
  if (envExist) {
    text = readTextSync(envPath);
  }
  [
    ["VUE_APP_DAOW_CID", daowCid],
    ["VUE_APP_PHOTO_CID", photoCid],
    ["VUE_APP_FRONTEND_CID", frontendCid],
  ].forEach(([key, cid]) => {
    const line = `${key}=${cid}`;
    if (text.includes(`${key}=`)) {
      text = text.replace(new RegExp(`${key}=([a-z\\d-]*)`), line);
    } else {
      text += `\n${line}`;
    }
  });
  fs.writeFileSync(envPath, text);
}

function readTextSync(path) {
  return fs.readFileSync(path).toString();
}

function readJsonSync(path) {
  return JSON.parse(readTextSync(path));
}
