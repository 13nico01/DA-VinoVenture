pipeline {
    agent any

    environment{
        DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1319437909094568007/LNOTEhzDIKAl868WpnkexihA-I1_NOZSFH4AWeIzk6diEeb-hfH6JKnI0WoZvd5tPwz9'
    }

    stages {

        stage('Notify Start'){
            steps{
                script{
                    sendDiscordNotification('🚀 Deployment gestartet! (git pull nicht vergessen!)')
                }
            }
        }

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

                    // Lösche alle existierenden Container, aber nur wenn Container vorhanden sind
                    sh '''
                    containers=$(docker ps -a -q)
                    if [ -n "$containers" ]; then
                        docker rm -f $containers
                    else
                        echo "Keine Container zum Entfernen."
                    fi
                    '''

                    // Baue die Container neu und starte sie
                    sh 'docker-compose up --build -d'
                }
            }
        }

        stage('Notify success'){
            steps{
                script{
                    sendDiscordNotification('✅ Deployment erfolgreich abgeschlossen!')
                }
            }
        }

        stage('Cleanup'){
            steps{
                echo 'Cleanup'
                sh '''
                docker system prune -f
                docker container prune -f
                docker image prune -f
                docker volume prune -f
                '''
            }
        }

        post{
            failure{
                echo 'Pipeline error!'
                script{
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
}
