pipeline {
    agent any

    environment {
        DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1319437909094568007/LNOTEhzDIKAl868WpnkexihA-I1_NOZSFH4AWeIzk6diEeb-hfH6JKnI0WoZvd5tPwz9'
        ROLLBACK_BACKEND_IMAGE = 'da-vinoventure_backend:rollback'
        ROLLBACK_DATABASE_IMAGE = 'da-vinoventure_database:rollback'
        ROLLBACK_FRONTEND_IMAGE = 'da-vinoventure_frontend:rollback'
    }

    stages {
        stage('Pull Changes') {
            steps {
                script {
                    // Git-Repository klonen oder aktualisieren
                    git branch: 'main', url: 'https://github.com/13nico01/DA-VinoVenture.git'
                }
            }
        }

        stage('Detect Changes') {
            steps {
                script {
                    // Prüfen, welche Ordner geändert wurden
                    def changes = sh(script: 'git diff --name-only HEAD~1', returnStdout: true).trim().split('\n')
                    env.BACKEND_CHANGED = changes.any { it.startsWith('vinoventure_backend/') }.toString()
                    env.DATABASE_CHANGED = changes.any { it.startsWith('vinoventure_database/') }.toString()
                    env.FRONTEND_CHANGED = changes.any { it.startsWith('vinoventure_web/') }.toString()
                }
            }
        }

        stage('Restart Containers') {
            steps {
                script {
                    if (env.BACKEND_CHANGED == 'true') {
                        echo 'Backend wurde geändert, Container wird neu gestartet.'
                        sh 'docker tag da-vinoventure_backend:latest $ROLLBACK_BACKEND_IMAGE'
                        sh 'docker-compose stop backend && docker-compose build backend && docker-compose up -d backend'
                    }

                    if (env.DATABASE_CHANGED == 'true') {
                        echo 'Datenbank wurde geändert, Container wird neu gestartet.'
                        sh 'docker tag da-vinoventure_database:latest $ROLLBACK_DATABASE_IMAGE'
                        sh 'docker-compose stop db && docker-compose build db && docker-compose up -d db'
                    }

                    if (env.FRONTEND_CHANGED == 'true') {
                        echo 'Frontend wurde geändert, Container wird neu gestartet.'
                        sh 'docker tag da-vinoventure_frontend:latest $ROLLBACK_FRONTEND_IMAGE'
                        sh 'docker-compose stop frontend && docker-compose build frontend && docker-compose up -d frontend'
                    }
                }
            }
        }

        stage('Health Check') {
            steps {
                script {
                    echo 'Führe Health-Checks aus...'

                    if (env.BACKEND_CHANGED == 'true') {
                        sh 'curl -f http://localhost:3000/health || exit 1'
                    }
                    if (env.FRONTEND_CHANGED == 'true') {
                        sh 'curl -f http://localhost || exit 1'
                    }
                    if (env.DATABASE_CHANGED == 'true') {
                        sh 'docker exec $(docker ps -q --filter "name=db") mysqladmin ping -h 127.0.0.1 -u root -p${DB_PASSWORD} || exit 1'
                    }
                }
            }
        }

        stage('Cleanup') {
            steps {
                echo 'Bereinige alte Docker-Ressourcen...'
                sh 'docker system prune -f'
            }
        }
    }

    post {
        success {
            echo 'Pipeline erfolgreich abgeschlossen!'
            script {
                sendDiscordNotification('✅ Deployment erfolgreich abgeschlossen!')
            }
        }

        failure {
            echo 'Pipeline ist fehlgeschlagen.'
            script {
                sendDiscordNotification('❌ Deployment fehlgeschlagen! Rollback wird durchgeführt.')
                performRollback()
            }
        }
    }
}

def sendDiscordNotification(String message) {
    sh """
        curl -X POST -H "Content-Type: application/json" -d '{
            "content": "${message}"
        }' ${DISCORD_WEBHOOK_URL}
    """
        }

def performRollback() {
    echo 'Rollback wird ausgeführt...'
    sh '''
        if [ "${BACKEND_CHANGED}" = "true" ]; then
            docker-compose stop backend
            docker tag $ROLLBACK_BACKEND_IMAGE da-vinoventure_backend:latest
            docker-compose up -d backend
        fi
        if [ "${DATABASE_CHANGED}" = "true" ]; then
            docker-compose stop db
            docker tag $ROLLBACK_DATABASE_IMAGE da-vinoventure_database:latest
            docker-compose up -d db
        fi
        if [ "${FRONTEND_CHANGED}" = "true" ]; then
            docker-compose stop frontend
            docker tag $ROLLBACK_FRONTEND_IMAGE da-vinoventure_frontend:latest
            docker-compose up -d frontend
        fi
    '''
}
