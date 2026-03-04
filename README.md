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

   ` $ kustomize build . | kubectl apply -f - `

   ` Wait, check and verify it's running smoothly ... ` 
   
4. Create the service :

    ` $ kustomize build . | kubectl apply -f -  `

5. Wait for while so everything downloaded and system is finalized. Verify that everything is ok.

    ` $ kubectl get all -n exercises `

Verify :
 
    - Open the browser url 'http://localhost:8081/'.
    - Increase the ping/pong counter using url address 'http://localhost:8081/pingpong'
