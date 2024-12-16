pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git credentialsId: 'git-credentials', url: 'https://mein-git-repo-url.com/mein-backend.git'
            }
        }

        stage('Build and Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('https://mein-docker-registry-url', 'docker-credentials') {
                        docker.image('docker-compose:1.29.2').inside('-u root') {
                            sh 'docker-compose -f docker-compose.yml build'
                            sh 'docker-compose -f docker-compose.yml push'
                        }
                    }
                }
            }
        }

        stage('Deploy to AWS') {
            steps {
                script {
                    sshagent(['aws-server-ssh-credentials']) {
                        sh 'ssh ec2-user@mein-aws-server "docker stack deploy -c docker-compose.yml mein-stack"'
                    }
                }
            }
        }

        stage('Test Deployment') {
            steps {
                script {
                    // Implementieren Sie hier Ihre Tests, z. B. API-Tests mit curl oder einem Testframework
                    sh 'curl -s http://mein-aws-server:3000/health-check'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        failure {
            mail to: 'email@beispiel.com', subject: 'Fehler in der Pipeline', body: 'Ein Fehler ist aufgetreten. Bitte überprüfen.'
        // Optional: Rollback-Schritte hier einfügen
        }
    }
}
