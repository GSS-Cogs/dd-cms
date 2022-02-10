pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker build ./volto -t volto'
                sh 'docker build ./plone-5 -t plone'
            }
        }
        stage('Integration Test') {
            steps {
                sh 'docker run volto yarn test'
            }
        }
    }
    post {
        always {
            script {
                junit allowEmptyResults: true, testResults: 'build/test-results/**/*.xml'
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