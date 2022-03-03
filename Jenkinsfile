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
                    /* only expecting this to be a soft link from a previous run */
                    sh "rm -f ${env.WORKSPACE}/volto/node_modules"
                    sh "ln -s /app/node_modules ${env.WORKSPACE}/volto/"
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