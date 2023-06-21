import tl = require('azure-pipelines-task-lib/task');
//import httpc = require('typed-rest-client/HttpClient');
import http = require('http');

async function run() {
    const Version: String = "0.0.49";
    try {
        console.log("Version " + Version);
        console.log("Starting...")
        
        const token = "yk08/ihmL+orVGPC0i0FwOysXq7xyE+p9Q31xSxeRrc2aSrLb8Z8zcWbuFvPme0gflSAvQN+pOcV7MZYYqI8/6mnIhRXZP6y5nmI0d+uOeI="
        const serverapi = "http://app-sombreroblanco-api-prod-002.azurewebsites.net"
        const baseUrl: string = serverapi + "/api/Request/CreateScan"
        
        const targetUrl: string = tl.getInput('targeturl', true) || "";
        const projectName: string = tl.getInput('projectname', true) || "";
        const apppassword: string = tl.getInput('password', false) || "";
        const appusername: string = tl.getInput('username', false) || "";
        const urlLogin = encodeURIComponent(tl.getInput('loginurl', false) || "");
        let password, username;

        const email = tl.getVariable('release.requestedForEmail');
        let extrainfo:any={};
        
        tl.getVariables().forEach((p)=>{
            extrainfo[p.name]=p.value;
        });

        

        if (apppassword !== ""){
            password = tl.getVariable(apppassword) || "";
        }
        if (appusername !== ""){
            username = tl.getVariable(appusername) || "";
        }

        let post = JSON.stringify(
            {
                "Url":encodeURIComponent(targetUrl),
                "UrlAutenticacion" : urlLogin,
                "Version": Version, 
                "Nombre":encodeURIComponent(projectName), 
                "Email": email,
                "ExtraInfo" : JSON.stringify(extrainfo),
                "Usuario": username,
                "Password": password
            });
        
        
        const options = {
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(post),
              'Authorize': token
            }
          };

          
        let result = http.request(baseUrl,options, (res)=>{
            res.on('data', (chunk) => {
                let message = chunk.toString();
                const result = JSON.parse(message);
                if (result.Code === '-1'){
                    tl.setResult(tl.TaskResult.Failed, result.Message);    
                }
                else{
                    tl.setResult(tl.TaskResult.Succeeded, result.Message);
                    console.log(result.Mensaje);
                }
                
            });            
        });  

        result.write(post);
        result.end();
        
    }
    catch (err:any) {
        console.log(err);
        console.log(err.toString());
        tl.setResult(tl.TaskResult.Failed, err.toString());
        tl.setResult(tl.TaskResult.Failed, err.message);
        
    }
}

run();