import {spawn} from "node:child_process";
import {fileURLToPath} from "node:url";
const task=process.argv[2];
if(!["seed","indexes"].includes(task))throw new Error("Unknown backend task");
const child=spawn(process.execPath,["--import","tsx",`scripts/${task}.ts`],{cwd:fileURLToPath(new URL("../../FUTERA-server/",import.meta.url)),stdio:"inherit",windowsHide:true});
child.on("error",()=>{console.error("Clone FUTERA-server beside FUTERA and install its dependencies first.");process.exitCode=1;});
child.on("exit",code=>{process.exitCode=code??1;});
