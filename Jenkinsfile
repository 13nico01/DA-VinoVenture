def sendDiscordNotification(String message) {
    def timestamp = new Date().format('yyyy-MM-dd HH:mm:ss', TimeZone.getTimeZone('UTC'))
    sh """
        curl -X POST -H "Content-Type: application/json" -d "{
            \\"content\\": \\"${message}\\n\\n(Zeit: ${timestamp})\\"
        }" ${DISCORD_WEBHOOK_URL}
    """
}

pipeline {
    agent any

    environment {
        DISCORD_WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1326118775292035215/ihrdboQSfwl_g2di2yOGTO84SOCQqsPjtml8zSQNODLkax0fSSMloazTq7oafphu-NJy'
    }

    stages {

        stage('Notify Start') {
            steps {
                script {
                    sendDiscordNotification('🚀 Deployment gestartet! (git pull nicht vergessen!)')
                }
            }
        }

        stage('Git Pull') {
            steps {
                script {
                    echo 'Pulling the latest code from Git...'
                    dir('/var/lib/jenkins/workspace/DA-VinoVenture') {
                        sh 'git pull origin main' // Stelle sicher, dass der Branch korrekt ist (z.B. 'main' oder 'master')
                    }
                }
            }
        }

        stage('Check for changes') {
            steps {
                script {
                    echo 'Prüfe, ob es Änderungen gibt, die einen Containerneustart erfordern...'

                    // Prüfe, ob es Änderungen im vinoventure_backend-Verzeichnis gibt
                    def codeChanged = sh(script: "git diff --name-only HEAD HEAD~1", returnStdout: true).trim()

                    // Wenn sich etwas im vinoventure_backend-Ordner geändert hat, führe keinen Neustart der Container durch
                    if (codeChanged.contains("vinoventure_backend")) {
                        echo 'Änderungen im Ordner vinoventure_backend erkannt, Container werden NICHT neu gestartet.'
                    } else {
                        echo 'Änderungen außerhalb von vinoventure_backend erkannt, Container werden neu gestartet.'

                        // Container neu starten
                        sh 'docker-compose down -v --remove-orphans'
                        sh '''
                            containers=$(docker ps -a -q)
                            if [ -n "$containers" ]; then
                                docker rm -f $containers
                            else
                                echo "Keine Container zum Entfernen."
                            fi
                        '''
                        sh 'docker-compose up --build -d'
                    }
                }
            }
        }

        stage('Notify success') {
            steps {
                script {
                    sendDiscordNotification('✅ Deployment erfolgreich abgeschlossen!')
                }
            }
        }

        stage('Cleanup') {
            steps {
                echo 'Cleanup'
                sh '''
                docker system prune -f
                docker container prune -f
                docker image prune -f
                docker volume prune -f
                '''
            }
        }
    }

    post {
        failure {
            echo 'Pipeline error!'
            script {
                sendDiscordNotification('❌ Deployment fehlgeschlagen!')
            }
        }
    }
}
