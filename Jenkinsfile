pipeline {
    agent any
    stages {
        stage('Test') {
            agent {
                dockerfile {
                    dir 'volto'
                    filename 'Dockerfile-test'
                    args '-u root:root'
                    reuseNode true
                }
            }
            steps {
                dir('volto') {
                    sh "yarn install"
                    sh "yarn test"
                }
            }
        }
    }
    post {
        always {
            script {
                junit allowEmptyResults: true, testResults: 'volto/*.xml'
                publishHTML([
                        allowMissing: true,
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        reportDir   : "volto",
                        reportFiles : 'junit.xml',
                        reportName  : 'jest tests'])
            }
        }
    }
}