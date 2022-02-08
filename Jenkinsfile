environment {
    DOCKERHUB_URL = 'gsscogs/dd-cms'
}

pipeline {
    agent any
    stages {
        stage('Build'){
            steps{
                sh 'docker-compose up -d'
                sh 'docker-compose down'
                sh 'docker tag plone:5.2.5 gsscogs/dd-cms/backend:latest'
                sh 'docker tag node:14 gsscogs/dd-cms/frontend:latest'
            }
        }
        stage('Publish images'){
            steps{
                sh 'docker push gsscogs/dd-cms/backend:latest'
                sh 'docker push gsscogs/dd-cms/frontend:latest'
            }
        }
    }
}