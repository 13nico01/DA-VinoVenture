pipeline {
    agent any

    environment {
        DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1319437909094568007/LNOTEhzDIKAl868WpnkexihA-I1_NOZSFH4AWeIzk6diEeb-hfH6JKnI0WoZvd5tPwz9'
    }

    stages {
        stage('Notify Start') {
            steps {
                script {
                    sendDiscordNotification('🚀 Deployment gestartet! (git pull nicht vergessen!)')
                }
            }
        }

        stage('Pull Changes') {
            steps {
                script {
                    sh 'git fetch origin' // Holt die neuesten Änderungen vom Remote
                    sh 'git reset --hard origin/main' // Setzt den Arbeitsbereich auf den Zustand des Remote-Branches
                    sh 'git pull origin main' // Holt die Änderungen
                }
            }
        }

        stage('Restart Containers') {
            steps {
                script {
                    echo 'Starte alle Container neu mit docker-compose down -v und up --build...'
                    sh 'docker-compose down -v --remove-orphans' // Entfernt alle Container, Volumes und Netzwerke
                    sh 'docker container prune -f'
                    sh 'docker-compose up --build -d' // Baue und starte die Container neu
                }
            }
        }

        stage('Notify Success') {
            steps {
                script {
                    sendDiscordNotification('✅ Deployment erfolgreich abgeschlossen!')
                }
            }
        }

        stage('Cleanup') {
            steps {
                echo 'Bereinige alte Docker-Ressourcen...'
                sh '''
                docker system prune -f --volumes
                docker image prune -f
                docker container prune -f
                '''
            }
        }
    }

    post {
        failure {
            echo 'Pipeline ist fehlgeschlagen.'
            script {
                sendDiscordNotification('❌ Deployment fehlgeschlagen!')
            }
        }
    }
}

def sendDiscordNotification(String message) {
    def timestamp = new Date().format('yyyy-MM-dd HH:mm:ss', TimeZone.getTimeZone('UTC'))
    sh """
        curl -X POST -H "Content-Type: application/json" -d "{
            \\"content\\": \\"${message}\\n\\n(Zeit: ${timestamp})\\"
        }" ${DISCORD_WEBHOOK_URL}
    """
}
