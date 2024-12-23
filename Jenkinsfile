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
                    sendDiscordNotification('🚀 Deployment gestartet! (git pull nicht vergessen!)')
                    git branch: 'main', url: 'https://github.com/13nico01/DA-VinoVenture.git'
                }
            }
        }

        stage('Detect Changes') {
            steps {
                script {
                    dir('/root/.jenkins/workspace/VinoVenture-Pipeline') {
                        def changes = sh(script: 'git diff --name-only HEAD~1', returnStdout: true).trim().split('\n')
                        env.BACKEND_CHANGED = changes.any { it.startsWith('vinoventure_backend/') }.toString()
                        env.DATABASE_CHANGED = changes.any { it.startsWith('vinoventure_database/') }.toString()
                        env.FRONTEND_CHANGED = changes.any { it.startsWith('vinoventure_web/') }.toString()
                    }
                }
            }
        }

        stage('Restart Containers') {
            steps {
                script {
                    def containerMissing = false

                    echo 'Prüfe, ob alle benötigten Container existieren...'

                    if (!sh(script: 'docker ps -q --filter "name=backend"', returnStdout: true).trim()) {
                        echo 'Backend-Container existiert nicht.'
                        containerMissing = true
                    }

                    if (!sh(script: 'docker ps -q --filter "name=db"', returnStdout: true).trim()) {
                        echo 'Datenbank-Container existiert nicht.'
                        containerMissing = true
                    }

                    if (!sh(script: 'docker ps -q --filter "name=frontend"', returnStdout: true).trim()) {
                        echo 'Frontend-Container existiert nicht.'
                        containerMissing = true
                    }

                    if (containerMissing) {
                        echo 'Mindestens ein Container fehlt. Starte alle Container neu mit docker-compose up --build...'
                        sh 'docker-compose up --build -v -d'
                        sh 'docker stop vinoventure-pipeline_db_1'
                    } else {
                        echo 'Alle Container existieren. Prüfe auf Änderungen...'

                        def restartAll = false

                        if (env.BACKEND_CHANGED == 'true' || env.DATABASE_CHANGED == 'true' || env.FRONTEND_CHANGED == 'true') {
                            restartAll = true
                        }

                        if (restartAll) {
                            echo 'Änderungen erkannt. Starte alle Container neu...'

                            sh 'docker tag da-vinoventure_backend:latest $ROLLBACK_BACKEND_IMAGE'
                            sh 'docker tag mysql:8.0.33-oracle $ROLLBACK_DATABASE_IMAGE'
                            sh 'docker tag da-vinoventure_frontend:latest $ROLLBACK_FRONTEND_IMAGE'

                            sh 'docker-compose down'

                            sh 'docker-compose up --build -d'
                        } else {
                            echo 'Keine Änderungen erkannt. Kein Neustart erforderlich.'
                        }
                    }
                }
            }
        }

        stage('Health Check') {
            steps {
                script {
                    echo 'Führe Health-Checks für alle Container aus...'

                    sh '''
                for i in {1..30}; do
                    if docker exec $(docker ps -q --filter "name=db") mysqladmin ping -h 127.0.0.1 -u root -p${DB_PASSWORD}; then
                        echo "Datenbank ist bereit."
                        break
                    fi
                    echo "Datenbank ist noch nicht bereit. Warte 1 Sekunde..."
                    sleep 1
                done || exit 1
            '''

                    sh '''
                for i in {1..30}; do
                    if nc -z localhost 3000; then
                        echo "Backend läuft auf Port 3000."
                        break
                    fi
                    echo "Warte auf Backend (Port 3000)..."
                    sleep 1
                done || exit 1
            '''

                    sh '''
                for i in {1..30}; do
                    if nc -z localhost 80; then
                        echo "Frontend läuft auf Port 80."
                        break
                    fi
                    echo "Warte auf Frontend (Port 80)..."
                    sleep 1
                done || exit 1
            '''
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
    def timestamp = new Date().format('yyyy-MM-dd HH:mm:ss', TimeZone.getTimeZone('UTC'))
    sh """
        curl -X POST -H "Content-Type: application/json" -d "{
            \\"content\\": \\"${message}\\n\\n(Zeit: ${timestamp})\\"
        }" ${DISCORD_WEBHOOK_URL}
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
