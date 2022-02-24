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
                    reportDir
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
                sh 'mkdir coverage'
                sh 'mv junit.xml coverage'
                dir('coverage') {
                junit allowEmptyResults: true, testResults: '*.xml'
                publishHTML([
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir   : ".",
                    reportFiles : 'junit.xml',
                    reportName  : 'jest tests'
                ])
            }
        }
    }
}