environment {
    DOCKERHUB_URL = 'gsscogs/dd-cms'
}

pipeline {
    agent any
    stages {
        stage('Volto'){
            steps{
                sh 'cd volto'
                sh 'docker build . -t volto'
                sh 'docker run volto yarn test'
            }
        }
    }
}