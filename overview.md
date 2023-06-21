
npm install typescript -g    
npm install -g tfx-cli

> Publish Extension
```bash
tfx extension publish --manifest-globs vss-extension.json --share-with IntergrupoSA --token "XXXXXXXXXXXXXXXXx"
```
> Package

```bash
tfx extension create --manifest-globs vss-extension.json
```
# Version 0.1.0
Create a extension a upload to market place.


### Reference 

 * https://docs.microsoft.com/en-us/azure/devops/extend/develop/add-build-task?view=azure-devops
 * https://www.ipswitch.com/blog/how-to-build-an-azure-custom-build-release-task
 * https://docs.microsoft.com/en-us/azure/devops/extend/develop/integrate-build-task?view=azure-devops


### Nodejs Module Documentation

  * https://github.com/microsoft/azure-pipelines-task-lib/blob/master/node/docs/azure-pipelines-task-lib.md
  * https://learn.microsoft.com/en-us/javascript/api/azure-devops-extension-api/tasksourcedefinition

## Pickup list demo

* https://stackoverflow.com/questions/48095492/using-a-web-api-in-task-json-to-fill-picklists-buildtask