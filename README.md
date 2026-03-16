# Exercise 4.1 4.1. Readines probe

Create a ReadinessProbe for the Ping-pong application. It should be
ready when it has a connection to the database.
And another ReadinessProbe for Log output application. It should be
ready when it can receive data from the Ping-pong application.

## Folders 

- scimitar-app The log-output app.
- scimitar-back1end The ping-pong backend.
- k8s 
  - db-setup yaml definitions to setup tables and default values
  - manifests Declarations to manifests
- postgres 
  - Postgres setup and 
  - scimitar setup and 

## Setup

1. Delete cluster :

    ` $ k3d cluster delete `


2. Create cluster with (k3d) :
   
   ` $ k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2 `
 
   ` $ docker exec k3d-k3s-default-agent-0 mkdir -p ~/kube_temp `

3. Create cluster with (GCKE)

4. Create a postgresql stateful set:

   Decrypt secret files (From project root) : 
 
   ``` 
    $ cd postgres 
    $ sops -d manifest\secret.enc.yaml > manifest\secret.yaml
    $ kustomize build . | kubectl apply -f - 
   ```
   
    Wait, check and verify it's running smoothly ...

5. Setup required databases and users for Scimitar (in project root) : 
   
   ` $ cd postgres\database`

   ` $ sops -d db-setup-sql.enc.yaml > db-setup-sql.yaml`
   
   ` $ kubectl apply -f db-setup-sql.yaml`
   ` $ kubectl apply -f db-setup-job.yaml`

 6. Create the service (From the project root) :
    
   ` $ cd k8s `
   ` sops -d manifest\secret.enc.yaml > manifest\secret.yaml `
   ` $ kustomize build . | kubectl apply -f - `

   ` $ kubectl apply -f db-init-sql-cm.yaml `
   ` $ kubectl apply -f db-init-job.yaml `
   
7. Wait for while so everything downloaded and system is finalized. Verify that everything is ok.

    ` $ kubectl get all -n exercises `

   Verify :
 
    - Open the browser url 'http://localhost:8081/'.
    - Increase the ping/pong counter using url address 'http://localhost:8081/pingpong'
