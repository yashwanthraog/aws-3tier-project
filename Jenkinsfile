pipeline {
    agent any
    
    environment {
        DOCKER_HUB_USER = 'yashwanthraog'
        DOCKER_CREDS_ID = 'docker-hub-credentials'
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDS_ID}", usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh "echo ${PASS} | docker login -u ${USER} --password-stdin"
                }
            }
        }

        stage('Build & Push Docker Images') {
            steps {
                sh """
                docker build -t ${DOCKER_HUB_USER}/my-frontend:latest ./frontend
                docker build -t ${DOCKER_HUB_USER}/my-backend:latest ./backend
                docker push ${DOCKER_HUB_USER}/my-frontend:latest
                docker push ${DOCKER_HUB_USER}/my-backend:latest
                """
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh """
                kubectl apply -f k8s/mongo-db.yaml
                kubectl apply -f k8s/backend-api.yaml
                kubectl apply -f k8s/frontend-ui.yaml
                kubectl rollout restart deployment/frontend-ui
                kubectl rollout restart deployment/backend-api
                """
            }
        }
    }
}