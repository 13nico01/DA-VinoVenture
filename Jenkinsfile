pipeline {
    agent any
    stages {
        stage('Git Pull') {
            steps {
                script {
                    echo 'Pulling the latest code from Git...'
                    // Wechsle in das Verzeichnis, wo das Git-Repository gespeichert ist
                    dir('/var/lib/jenkins/workspace/DA-VinoVenture') {
                        // Hole die neuesten Änderungen aus dem Git-Repository
                        sh 'git pull origin main' // Stelle sicher, dass der Branch korrekt ist (z.B. 'main' oder 'master')
                    }
                }
            }
        }
        stage('Restart Containers') {
            steps {
                script {
                    echo 'Starte alle Container neu mit docker-compose down -v und up --build...'

                    // Alle bestehenden Container stoppen und löschen
                    sh 'docker-compose down -v --remove-orphans'
                    sh 'docker rm -f $(docker ps -a -q)'

                    // Baue die Container neu und starte sie
                    sh 'docker-compose up --build -d'
                }
            }
        }
    }
}
