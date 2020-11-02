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
					dockerImage = docker.build registry + ":latest"
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

		stage('Apply Kubernetes files') {
			steps{
				withKubeConfig([credentialsId: 'jenkinsrobot', serverUrl: 'https://mercy-dns-9e8ee0c0.hcp.westus2.azmk8s.io:443']) {
				sh 'kubectl apply -f deployment.yml'
			}
		}
	}
  }
}
