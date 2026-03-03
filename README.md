# Exercise 2.1 Connection pods - Exercise 2.7

## Folders 

- scimitar-app The log-output app.
- scimitar-backend The ping-pong backend.

## Setup

1. Delete cluster :

    ` $ k3d cluster delete `

2. Create cluster with :
 
   ` $ k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2 `

3. Create a postgresql stateful set:

   ` $ kubectl apply -f ../system/k3s-postgresql/ `

   ` Wait, check and verify it's running smoothly ... ` 
   
4. Create a namespace :

   ` $ kubectl create ns exercises `

5. Create application to the K8s system:

    ` $ kubectl apply -f manifests/ `

6. Wait for while so everything downloaded and system is finalized. Verify that everything is ok.

    ` $ kubectl get all -n exercises `

7. Verify :
 
    - Open the browser url 'http://localhost:8081/'.
    - Increase the ping/pong counter using url address 'http://localhost:8081/pingpong'
