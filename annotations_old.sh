npm i -g serverless

az login
az account list
# az account set --subscription "Visual Studio Enterprise"
az ad sp create-for-rbac > credentials.json
# az ad sp create -n sp-name -p sp-password

export azureSubId='894dcb0d-2c21-40fa-9290-f421f3d15c82' #subscriptionid
export azureServicePrincipalTenantId='b757cceb-bba0-4105-aa3d-8154cda9549b'
export azureServicePrincipalClientId='0868929e-db08-4df7-b3ad-ddb030f602b5'
export azureServicePrincipalPassword='0afe1841-84b5-4b69-b731-49fa424cc3c8'

serverless create --template azure-nodejs \
    --path graphql-app \
    --name graphql-app

cd graphql-app
npm install

sls deploy 

curl https://graphql-app.azurewebsites.net/api/hello

--
Graphql 

1o - npm i apollo-server-azure-functions graphql
2o - npm i serverless-offline 
3o - 
4o - serverless offline start