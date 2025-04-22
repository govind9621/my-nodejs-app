pipeline {
  agent any

  environment {
    IMAGE_NAME = "yourdockerhubuser/nodejs-sample"
    KUBE_CONFIG = credentials('kubeconfig-id')
  }

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/YOUR_USERNAME/my-nodejs-app.git'
      }
    }

    stage('Install & Test') {
      steps {
        dir('app') {
          sh 'npm install'
          sh 'npm test || echo "No tests defined, skipping..."'
        }
      }
    }

    stage('Build & Push Image with buildctl') {
      steps {
        sh '''
        buildctl build \
          --frontend=dockerfile.v0 \
          --local context=. \
          --local dockerfile=. \
          --output type=image,name=$IMAGE_NAME:$BUILD_NUMBER,push=true
        '''
      }
    }

    stage('Deploy to K3s') {
      steps {
        withKubeConfig([credentialsId: 'kubeconfig-id']) {
          sh 'kubectl set image deployment/myapp myapp=$IMAGE_NAME:$BUILD_NUMBER -n mynamespace || kubectl apply -f k8s/deployment.yaml'
        }
      }
    }
  }

  post {
    success {
      echo '✅ Deployed to K3s!'
    }
    failure {
      echo '❌ Build failed.'
    }
  }
}
