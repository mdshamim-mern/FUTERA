import {spawn} from "node:child_process";
import {fileURLToPath} from "node:url";
const commerce=process.argv.includes("--commerce");
const port=commerce?3100:3101,apiPort=commerce?4100:4101;
const backend=fileURLToPath(new URL("../../FUTERA-server/",import.meta.url));
const env={...process.env,APP_URL:`http://127.0.0.1:${port}`,API_BASE_URL:`http://127.0.0.1:${apiPort}`,COMMERCE_ENABLED:String(commerce),CATALOG_SOURCE:"sample",PORT:String(apiPort)};
const api=spawn(process.execPath,[commerce?"scripts/e2e-server.mjs":"dist/index.js"],{cwd:backend,env,stdio:"inherit",windowsHide:true});
let web,stopping=false;
function stop(code=0){if(stopping)return;stopping=true;web?.kill();api.kill();process.exit(typeof code==="number"?code:0);}
process.on("SIGTERM",stop);process.on("SIGINT",stop);api.on("exit",stop);
for(let attempt=0;attempt<180;attempt++){
 try{const response=await fetch(`${env.API_BASE_URL}/api/health`);if(response.ok)break;}catch{}
 if(attempt===179)throw new Error("Backend did not become healthy");
 await new Promise(resolve=>setTimeout(resolve,1000));
}
web=spawn(process.execPath,["node_modules/next/dist/bin/next","start","--hostname","127.0.0.1","--port",String(port)],{env,stdio:"inherit",windowsHide:true});web.on("exit",stop);
