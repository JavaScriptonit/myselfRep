1. ### HTTPS setup with Kubernetes [GOOGLE Domain](https://www.udemy.com/course/docker-and-kubernetes-the-complete-guide/learn/lecture/25482916#overview):
    1. Add the Jetstack **Helm** repository: 
       1. ```helm repo add jetstack https://charts.jetstack.io```
    2. Update your local Helm chart repository cache:
       1. ```helm repo update```
    3. Install the cert-manager Helm chart:
       1. ```
          1. helm install \
          2. cert-manager jetstack/cert-manager \
          3. --namespace cert-manager \
          4. --create-namespace \
          5. --version v1.8.0 \
          6. --set installCRDs=true
          ```
    4. Update ingress-service.yaml
    5. Create certificate.yaml
    6. Create issuer.yaml