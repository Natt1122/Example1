"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
//import httpc = require('typed-rest-client/HttpClient');
const http = require("http");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const Version = "0.0.49";
        try {
            console.log("Version " + Version);
            console.log("Starting...");
            const token = "yk08/ihmL+orVGPC0i0FwOysXq7xyE+p9Q31xSxeRrc2aSrLb8Z8zcWbuFvPme0gflSAvQN+pOcV7MZYYqI8/6mnIhRXZP6y5nmI0d+uOeI=";
            const serverapi = "http://app-sombreroblanco-api-prod-002.azurewebsites.net";
            const baseUrl = serverapi + "/api/Request/CreateScan";
            const targetUrl = tl.getInput('targeturl', true) || "";
            const projectName = tl.getInput('projectname', true) || "";
            const apppassword = tl.getInput('password', false) || "";
            const appusername = tl.getInput('username', false) || "";
            const urlLogin = encodeURIComponent(tl.getInput('loginurl', false) || "");
            let password, username;
            const email = tl.getVariable('release.requestedForEmail');
            let extrainfo = {};
            tl.getVariables().forEach((p) => {
                extrainfo[p.name] = p.value;
            });
            if (apppassword !== "") {
                password = tl.getVariable(apppassword) || "";
            }
            if (appusername !== "") {
                username = tl.getVariable(appusername) || "";
            }
            let post = JSON.stringify({
                "Url": encodeURIComponent(targetUrl),
                "UrlAutenticacion": urlLogin,
                "Version": Version,
                "Nombre": encodeURIComponent(projectName),
                "Email": email,
                "ExtraInfo": JSON.stringify(extrainfo),
                "Usuario": username,
                "Password": password
            });
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(post),
                    'Authorize': token
                }
            };
            let result = http.request(baseUrl, options, (res) => {
                res.on('data', (chunk) => {
                    let message = chunk.toString();
                    const result = JSON.parse(message);
                    if (result.Code === '-1') {
                        tl.setResult(tl.TaskResult.Failed, result.Message);
                    }
                    else {
                        tl.setResult(tl.TaskResult.Succeeded, result.Message);
                        console.log(result.Mensaje);
                    }
                });
            });
            result.write(post);
            result.end();
        }
        catch (err) {
            console.log(err);
            console.log(err.toString());
            tl.setResult(tl.TaskResult.Failed, err.toString());
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
