pipeline {
    agent any
    stages {
        stage('Build Volto') {
            steps {
                sh 'docker build ./volto -t volto'
            }
        }
        stage('Integration Test Volto') {
            steps {
                sh 'docker rm -f sample'
                sh 'docker run --name sample volto yarn test'
                sh 'docker cp sample:/app/junit.xml .'
                sh 'docker rm -f sample'
            }
        }
    }
    post {
        always {
            script {
                junit allowEmptyResults: true, testResults: '*.xml'
                publishHTML([
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir   : "/",
                        reportFiles : 'junit.xml',
                        reportName  : 'jest tests'])
            }
        }
    }
}