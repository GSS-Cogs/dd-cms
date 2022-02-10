pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker build ./volto -t volto'
                sh 'docker build ./plone-5 -t plone'
            }
        }
        stage('Test') {
            steps {
                sh 'docker run volto yarn test'
            }
        }
    }
}