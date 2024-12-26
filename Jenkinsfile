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
                    sh 'git fetch origin' // Holt die neuesten Änderungen vom Remote
                    sh 'git reset --hard origin/main' // Setzt den Arbeitsbereich auf den Zustand des Remote-Branches
                    sh 'git pull origin main'
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

                    // Überprüfe, ob der Datenbank-Container existiert
                    if (!sh(script: 'docker ps -q --filter "name=db"', returnStdout: true).trim()) {
                        echo 'Datenbank-Container existiert nicht.'
                        containerMissing = true
                    }

                    // Überprüfe, ob der Backend-Container existiert
                    if (!sh(script: 'docker ps -q --filter "name=backend"', returnStdout: true).trim()) {
                        echo 'Backend-Container existiert nicht.'
                        containerMissing = true
                    }

                    // Überprüfe, ob der Frontend-Container existiert
                    if (!sh(script: 'docker ps -q --filter "name=frontend"', returnStdout: true).trim()) {
                        echo 'Frontend-Container existiert nicht.'
                        containerMissing = true
                    }

                    // Wenn mindestens ein Container fehlt, dann starte alle neu
                    if (containerMissing) {
                        echo 'Mindestens ein Container fehlt. Starte alle Container neu mit docker-compose down -v und up --build...'
                        sh 'docker-compose down -v --remove-orphans'
                        sh 'docker-compose up --build -d'

                        // Warte, bis die Datenbank bereit ist
                        echo 'Warte, bis der Datenbank-Container bereit ist...'
                        waitForDatabase()
                    } else {
                        echo 'Alle Container existieren. Prüfe auf Änderungen...'

                        def backendChanged = env.BACKEND_CHANGED == 'true'
                        def databaseChanged = env.DATABASE_CHANGED == 'true'
                        def frontendChanged = env.FRONTEND_CHANGED == 'true'

                        // Überprüfe, ob Änderungen an Backend, Database oder Frontend vorgenommen wurden
                        if (backendChanged || databaseChanged || frontendChanged) {
                            if (databaseChanged) {
                                echo 'Änderungen an der Datenbank erkannt. Starte den Datenbank-Container neu...'
                                sh 'docker-compose stop db'
                                sh 'docker-compose up -d db'

                                // Warte, bis die Datenbank bereit ist
                                echo 'Warte, bis der Datenbank-Container bereit ist...'
                                waitForDatabase()
                            }

                            if (backendChanged) {
                                echo 'Änderungen am Backend erkannt. Aktualisiere Backend ohne Neustart...'
                                sh 'docker-compose exec -T backend npm install --legacy-peer-deps'
                                sh 'docker-compose exec backend npx nodemon server.js'
                            }

                            if (frontendChanged) {
                                echo 'Änderungen am Frontend erkannt. Aktualisiere Frontend ohne Neustart...'
                                sh '''
                                    docker-compose exec -T frontend rm -rf node_modules
                                    docker-compose exec -T frontend npm install --legacy-peer-deps
                                    docker-compose exec -T frontend npm run dev
                                '''
                            }
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
                sh '''
                docker system prune -f --volumes
                docker image prune -f
                docker container prune -f
                '''
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

// Funktion: Warten auf die Verfügbarkeit der Datenbank
def waitForDatabase() {
    sh '''
    for i in {1..30}; do
        if docker exec $(docker ps -q --filter "name=db") mysqladmin ping -h 127.0.0.1 -u root -p${DB_PASSWORD} --silent; then
            echo "Datenbank ist bereit."
            break
        fi
        echo "Datenbank ist noch nicht bereit. Warte 1 Sekunde..."
        sleep 1
    done || exit 1
    '''
}
