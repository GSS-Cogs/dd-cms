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
                    sh "yarn develop"
                    sh "yarn install"
                    sh "yarn test"
                }
            }
        }
    }
    post {
        always {
            script {
                dir('volto') {
                    junit allowEmptyResults: true, testResults: '*.xml'
                }
            }
        }
    }
}