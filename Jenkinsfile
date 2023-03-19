pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh "npm install --save-dev"
                withEnv(["CI=false"]) {
                    sh "npx tsc"
                }
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh "npm run test"
            }
        }
        stage("Purge") {
            steps {
                echo "Purging..."
                sh 'docker ps --format "{{.Names}}" | grep changer | tee \\>\\(xargs --no-run-if-empty docker stop\\) \\>\\(xargs --no-run-if-empty docker rm\\) || true'
                sh 'docker ps -q -f status=exited | xargs --no-run-if-empty docker rm -f'
                sh 'docker rm changer -f'
                sh 'docker images -q -f dangling=true | xargs --no-run-if-empty docker rmi -f'
                sh 'docker volume ls -qf dangling=true | xargs -r docker volume rm'
                sh 'docker rm `docker ps --no-trunc -aq -f status=exited` || true'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                sh "docker build -t changer ."
                sh "docker run -d -p 9092:9092 --name changer changer"
            }
        }
    }
}