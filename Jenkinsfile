pipeline {
    agent any
    stages {
        stage('Volto'){
            steps {
                sh 'docker build ./volto -t volto'
                sh 'docker run volto yarn test'
            }
        }
    }
}