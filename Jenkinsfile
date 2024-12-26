pipeline {
    agent any
    stages {
        stage('Restart Containers') {
            steps {
                script {
                    echo 'Starte alle Container neu mit docker-compose down -v und up --build...'
                    sh 'docker-compose down -v --remove-orphans'
                    sh 'docker-compose up --build -d' 
                }
            }
        }
    }
}


