# Exercise 4.1 Readiness probe

* Create a ReadinessProbe for the Ping-pong application. It should be  
  ready when it has a connection to the database.
* And another ReadinessProbe for Log output application. It should be  
  ready when it can receive data from the Ping-pong application.


## Folders

```
├── k8s
│    ├── db-setup       // Setup files for tables and inits
│    └── manifests      // Manifest application itself 
├── postgres            //
│    ├── manifests      // Manifests files to setup postgreql 
│    └── scimitar       // To create users and databases for application
├── scimitar-app        // Frotend 
└── scimitar-backend    // Backend
```

# Scimitar Deployment 

1. Enable Gateway API on the cluster (if not already done)

```bash
# Standard Gateway API CRDs + GatewayClass + basic controllers
gcloud container clusters update dwk-cluster \
  --location europe-north1-b \
  --gateway-api=standard

# Also enable the GKE Gateway controller:
gcloud container clusters update dwk-cluster \
  --location europe-north1-b \
  --enable-gateway-api
``` 

Verify

```bash
kubectl get gatewayclass

# Should show at least "gke-l7-global-external-managed" or similar
````

2. PostgresSQL

```bash
cd postgres

# Decrypt secrets
sops -d manifest/secret.enc.yaml > manifest/secret.yaml

# Apply (with kustomize)
kustomize build . --load-restrictor LoadRestrictionsNone | kubectl apply -f -

# Wait & verify
kubectl -n exercises wait --for=condition=Ready pod -l app=postgres --timeout=300s
kubectl -n exercises get pods,svc -l app=postgres
```

	 
3. Create Scimitar database + user + permissions (idempotent job)

```bash
cd ../postgres/scimitar

sops -d db-setup-sql.enc.yaml > db-setup-sql.yaml

# Apply config + job
kubectl apply -f db-setup-sql.yaml
kubectl apply -f db-setup-job.yaml

# Wait for completion (you can also use --wait=false and check later)
kubectl wait --for=condition=Complete job/db-setup -n exercises --timeout=120s
````

4.  Initialize schema & seed data

```bash
# Apply configmap with initialization SQL
kubectl apply -f db-init-sql-cm.yaml

# Run initialization job
kubectl apply -f db-init-job.yaml

# Wait for it to finish
kubectl wait --for=condition=Complete job/db-init -n exercises --timeout=180s
```  


5. Wait & observe

```
# Watch everything coming up
kubectl get pods,svc,deploy,sts,jobs -n exercises -w

# Look especially for:
# • postgres-...    
# • scimitar-app-... or backend-...
# • scimitar-gateway (Gateway resource)
```

6. Find the external URL (Gateway API way)

```bash
 kubectl get gateway scimitar-gateway -n exercises -o jsonpath='{.status.addresses[0].value} `
``` 

Example output you might see:

```bash
Addresses:
  Value:  34.118.XX.XX
```

Then open:
- http://34.118.XX.XX/
- http://34.118.XX.XX/pingpong
- http://34.118.XX.XX/pings
