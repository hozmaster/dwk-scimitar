# Exercise 2.1 Connection pods - Exercise 2.7

## Folders 

- scimitar-app The log-output app.
- scimitar-backend The ping-pong backend.

## Setup

1. Delete cluster :

    ` $ k3d cluster delete `

2. Create cluster with :
   
   ` $ k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2 `
 
   ` $ docker exec k3d-k3s-default-agent-0 mkdir -p /tmp/kube `

3. Create a postgresql stateful set:

   Decrypt secret files (In project root) : 
 
   ` $ cd setup && sops -d manifest\secret.enc.yaml > manifest\secret.yaml`
   
   ` $ kustomize build . | kubectl apply -f - `

   ` Wait, check and verify it's running smoothly ... `

4. Setup required databases and users for Scimitar (in project root) : 
   
   ` $ cd postgres\database`

   ` $ sops -d db-setup-sql.enc.yaml > db-setup-sql.yaml`
   
   ` $ kubectl apply -f db-setup-sql.yaml`
   ` $ kubectl apply -f db-setup-job.yaml`

 5. Create the service (From the project root) :
    
   ` $ cd k8s `
   ` sops -d manifest\secret.enc.yaml > manifest\secret.yaml `
   ` $ kustomize build . | kubectl apply -f - `

   ` $ kubectl apply -f db-init-sql-cm.yaml `
   ` $ kubectl apply -f db-init-job-cm.yaml `
   
6. Wait for while so everything downloaded and system is finalized. Verify that everything is ok.

    ` $ kubectl get all -n exercises `

   Verify :
 
    - Open the browser url 'http://localhost:8081/'.
    - Increase the ping/pong counter using url address 'http://localhost:8081/pingpong'
