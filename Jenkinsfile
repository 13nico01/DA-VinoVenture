pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/13nico01/DA-VinoVenture.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Projekt wird gebaut...'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deployment wird ausgeführt...'
            }
        }
    }

    post {
        success {
            echo 'Build und Deployment erfolgreich!'
        }
        failure {
            echo 'Build oder Deployment fehlgeschlagen.'
        }
    }
}
