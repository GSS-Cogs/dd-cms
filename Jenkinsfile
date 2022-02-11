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
                sh 'docker run volto yarn test'
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
                        reportDir   : "build/reports/tests/integrationTest/",
                        reportFiles : 'index.html',
                        reportName  : 'Integration Tests'])
            }
        }
    }
}