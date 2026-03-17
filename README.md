# Exercise 4.1 Readines probe

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

## Setup

Create cluster to Google Kubernetes service with Gateway support:

```bash
gcloud container clusters create dwk-cluster --zone=europe-north1-b --cluster-version=1.33 --disk-size=32 --num-nodes=2 --machine-type=e2-small 
```

Switch to use Gateway API:

```bash 
gcloud container clusters update dwk-cluster --location=europe-north1-b --gateway-api=standard
```

## Installation:

#### Setup database :

Create a PostgreSQL installation:

	Derypt secret files (From project root) :  
  
```bash   
$ cd postgres  
$ sops -d manifest\secret.enc.yaml > manifest\secret.yaml  
$ kustomize build . | kubectl apply -f -   
```  
	
Wait, check and verify it's running smoothly ...  
	 
#### Setup required databases and users for Scimitar (in project root) :  
	 
` $ cd postgres\database`  
` $ sops -d db-setup-sql.enc.yaml > db-setup-sql.yaml`  
` $ kubectl apply -f db-setup-sql.yaml`  
` $ kubectl apply -f db-setup-job.yaml`  

###  Install the service (From the project root) :

``` 
$ cd k8s 
$ sops -d manifest\secret.enc.yaml > manifest\secret.yaml 
$ kustomize build . | kubectl apply -f - 
```  

Init tables and default values:

``` $ kubectl apply -f db-init-sql-cm.yaml 
$ kubectl apply -f db-init-job.yaml 
```  

6. Wait & observe

    ` kubectl get pods,svc,deploy,sts,jobs -n exercises -w `


7. Find the external URL (Gateway API way)

    ` kubectl get gateway scimitar-gateway -n exercises -o jsonpath='{.status.addresses[0].value} `

Then open:
- http://34.118.XX.XX/
- http://34.118.XX.XX/pingpong
- http://34.118.XX.XX/pings
