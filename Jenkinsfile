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
                sh 'docker run volto yarn test
                docker run -d -t --name sample volto yarn test
                docker cp sample:/app/junit.xml .
                docker rm -f sample'
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
                        reportDir   : "build/reports/tests/",
                        reportFiles : 'junit.xml',
                        reportName  : 'jest tests'])
            }
        }
    }
}