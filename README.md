# Creating serverless applications using graphql

az login
az account list
<!-- # az account set --subscription "Visual Studio Enterprise" -->

## Presentation Slides

- [Creating serverless applications using graphql](http://bit.ly/graphql-azfunction-erickwendel)

## Technical Requirements

- [Access here the requirements section.](https://gist.github.com/ErickWendel/e45d45a97e068e44303f0c2056bf647b)

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

add $return to function.json

```sh
npm i graphql-mongodb-projection
```

## Publishing

az group create --name $RESOURCE --location $LOCATION

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

## Cleaning up

```sh
az functionapp delete \
    --resource-group $RESOURCE \
    --name $FUNCTION_APP

az storage account delete \
    --name $STORAGE_ACCOUNT \
    --resource-group $RESOURCE \
    --yes
```

## Keep in touch! 
 - [@erickwendel_](https://twitter.com/erickwendel_)
 - [Linkedin](https://br.linkedin.com/in/erickwendel)
 - [erickwendel.com](https://erickwendel.com/)