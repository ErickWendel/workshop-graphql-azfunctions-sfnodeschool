# Annotations 

npm i -g serverless

az login
az account list
<!-- # az account set --subscription "Visual Studio Enterprise" -->

## Technical Requirements

- Node Version Manager (NVM) 8+
    - Windows: https://github.com/coreybutler/nvm-windows
    - Linux Ubuntu: https://github.com/creationix/nvm
    - Mac OS: http://dev.topheman.com/install-nvm-with-homebrew-to-use-multiple-versions-of-node-and-iojs-easily/

- VSCode
    - https://code.visualstudio.com/

- Azure Command Line Interface (CLI)
    - Windows: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-windows?view=azure-cli-latest
    - Linux Ubuntu: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-apt?view=azure-cli-latest
    - Mac OS: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-macos?view=azure-cli-latest

- Azure Functions Core Tools
    - https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local#v2

## Starting

```sh
RESOURCE=graphqlsfnode
LOCATION=eastus
STORAGE_ACCOUNT=graphapi
FUNCTION_APP=graphapi-examples
ACCOUNT_NAME_WEB_SITE=graphapi
ACCOUNT_NAME=graphapi
FUNCTION_NAME=heroes

func init $FUNCTION_APP
cd $FUNCTION_APP
func new --template "Http Trigger" --name $FUNCTION_NAME
cd $FUNCTION_NAME
npm init -y
npm i apollo-server-azure-functions
npm i graphql
```

```sh
add $return to function.json


npm i graphql-mongodb-projection


az storage account create \
    --name $STORAGE_ACCOUNT \
    --location $LOCATION \
    --resource-group $RESOURCE \
    --sku Standard_LRS

az functionapp create \
    --resource-group $RESOURCE \
    --name $FUNCTION_APP \
    --consumption-plan-location $LOCATION \
    --runtime node \
    --storage-account $STORAGE_ACCOUNT

func azure functionapp publish $FUNCTION_APP

az functionapp delete \
    --resource-group $RESOURCE \
    --name $FUNCTION_APP

az storage account delete \
    --name $STORAGE_ACCOUNT \
    --resource-group $RESOURCE \
    --yes
```