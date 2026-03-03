
1. Delete cluster: 'k3d cluster delete'
2. Create cluster with : 'k3d cluster create --port 8082:30080@agent:0 -p 8081:80@loadbalancer --agents 2'
3. Create the service with command : 'kubectl apply -f manifests'
4. Verify: 
   - 'curl -X GET http://localhost:8081/hashtime' or open it to browser 
   - 'curl -X GET http://localhost:8081/pingpong' or open it to browser
