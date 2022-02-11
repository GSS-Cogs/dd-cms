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
                sh 'docker rm -f volto-dd-cms'
                sh 'docker run -d -t --name volto-dd-cms volto yarn test'
                sh 'docker cp volto-dd-cms:/app/junit.xml .'
                sh 'docker rm -f volto-dd-cms'
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