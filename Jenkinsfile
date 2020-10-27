pipeline {  
	environment {
		registry = "osygroup/craze"
		registryCredential = 'dockerhub'
  }  
	agent { label 'DockerAgent' }	
	stages {
		stage('Cloning Git') {
			steps {
				git 'https://github.com/osygroup/isolation-logs'
				}
			}	
		stage('Building image') {
			steps{
				script {
					dockerImage = docker.build registry + ":$BUILD_NUMBER"
        }
      }
    }
		stage('Push Image') {
			steps{
				script {
					docker.withRegistry( '', registryCredential ) {
					dockerImage.push()
          }
        }
      }
    }
		stage('Deploy to AKS'){
			steps{
				withCredentials([azureServicePrincipal('k8stestSP')]) {
				sh 'echo "logging in" '
				sh 'az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET -t $AZURE_TENANT_ID'
				sh 'az account set -s $AZURE_SUBSCRIPTION_ID'
				sh 'az aks get-credentials -g k8stest -n k8stest'
				}
			}
		}
		stage('Apply Kubernetes files') {
			steps{
				withKubeConfig([credentialsId: 'jenkinsrobot']) {
				sh 'kubectl get pods'
				sh 'kubectl apply -f deployment.yml'
			}
		}
	}
  }
}
