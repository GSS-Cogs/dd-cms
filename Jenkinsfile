pipeline {
    agent any
    stages {
        stage('Frontend tests') {
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
                    /* only expecting this to be a soft link from a previous run
                       but it could be a dir in existing jenkins workspaces, so
                       recursively delete it there
                    */
                    sh "(test -d ${env.WORKSPACE}/volto/node_modules && rm -rf ${env.WORKSPACE}/volto/node_modules) || true"
                    sh "(test -f ${env.WORKSPACE}/volto/node_modules && rm -f ${env.WORKSPACE}/volto/node_modules) || true"
                    /* this is a safer version of the git clean, but in Jenkins we have various
                       "dirty" workspaces from before the caching attempts.
                        so leave the git clean in for a bit, and when this is merged, after a while,
                        go back to this one. */
                    /* sh "find ${env.WORKSPACE}/volto/src/addons -type l -maxdepth 1 -exec rm \\{\\} \\; " */
                    sh "git clean -f ${env.WORKSPACE}/volto/src/addons"
                    sh "ln -s /app/node_modules ${env.WORKSPACE}/volto/"
                    sh "for n in \$(find /app/src/addons -type d -mindepth 1 -maxdepth 1); do ln -sf \$n ${env.WORKSPACE}/volto/src/addons/\$(basename \$n); done;"
                    sh "yarn test-ci"
                }
            }
        }
        stage('End user tests') {
            steps {
                script {
                    dir('tests/climate-change-v2') {
                        sh "docker-compose build"
                        sh "docker-compose up -d plone"
                        sh "docker-compose up -d volto"
                        sh "docker-compose up -d proxy"
                        def puppeteer = docker.image('climate-change-v2_test')
                        puppeteer.inside("--rm --entrypoint= --network climate-change-v2_test_net") { testContainer ->
                            sh './run.sh'
                        }
                        sh "docker-compose down"
                    }
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
                dir('tests/climate-change-v2') {
                    cucumber 'test-results.json'
                }
            }
        }
    }
}