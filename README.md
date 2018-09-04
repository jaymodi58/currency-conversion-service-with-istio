# currency-conversion-service-with-istio
1. forex-service
2. currency-conversion-service (that calls forex-service)

## How to run
1. Create the project currency-conversion-with-istio
2. Enable Google API.
3. Create a new cluster.
    ```
    gcloud container clusters create istio-cluster --cluster-version=1.10.5-gke.4 --zone us-east4-a --num-nodes 4 --project currency-conversion-with-istio
    ```
     > Please use Powershell for Windows platform.
4. Retrieve your credentials for kubectl.
    ```
    gcloud container clusters get-credentials istio-cluster --zone us-east4-a --project currency-conversion-with-istio
    ```
5. Grant cluster administrator (admin) permissions to the current user. To create the necessary RBAC rules for Istio, the current user requires admin permissions.
    ```
    kubectl create clusterrolebinding cluster-admin-binding --clusterrole=cluster-admin --user=$(gcloud config get-value core/account)
    ```
6. Download the istio and go to istio istallation directory.
    ```
    cd .\istio-1.1.0.snapshot.0\
    ```
7. Install Istio’s Custom Resource Definitions via `kubectl apply`.
    ```
    kubectl apply -f install/kubernetes/helm/istio/templates/crds.yaml
    ```
8. Install Istio without mutual TLS authentication between sidecars.
    ```
    kubectl apply -f install/kubernetes/istio-demo.yaml
    ```
    > For more information about istio setup, [please click here.](https://istio.io/docs/setup/kubernetes/quick-start/)
9. Build docker images and push it to Google registry.
    1. Start your local docker deamon service to build docker images.
    2. Clone the repository.
    3. Go to addition-service root directory
        ```
        cd ./forex-service/
        ```
    4. Build docker image.
        ```
        mvn clean install
        ```
    5. Push image to Goggle Registry.
        ```
        kubectl push us.gcr.io/service-mesh-istio-example/addition-service
        ```
    
10. Do the same process for `currency-conversion-service`.
11. Go back to root directory of the repository, and bring up the application containers:
	```
	cd ..
    ```
	- If you are using manual sidecar injection, use the following command
		```
		$ kubectl apply -f <(istioctl kube-inject -f deployment.yaml)
		```
		The `istioctl kube-inject` command is used to manually modify the `deployment.yaml` file before creating the deployments.

	- If you are using a cluster with automatic sidecar injection enabled, label the default namespace with `istio-injection=enabled`
		```
		$ kubectl label namespace default istio-injection=enabled
		```
		Then simply deploy the services using `kubectl`
		```
		$ kubectl apply -f deployment.yaml
		```
        
12. Now, both services have been deployed.
