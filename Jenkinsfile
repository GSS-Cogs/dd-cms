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
                    sh "find ${env.WORKSPACE}/volto/src/addons -type l -maxdepth 1 -exec rm \\{\\} \\; "
                    sh "ln -s /app/node_modules ${env.WORKSPACE}/volto/"
                    sh "for n in \$(find /app/src/addons -type d -mindepth 1 -maxdepth 1); do ln -s \$n ${env.WORKSPACE}/volto/src/addons/\$(basename \$n); done;"
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