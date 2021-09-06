pipeline {
    environment {
        registry = "karthikeyanr4java/universities"
        // registry = "universities"
        registryCredential = 'dockerhub_id'
        dockerImage = ''
    }
    agent any
    stages {
        /*stage('Git checkout') {
            steps {
                git 'https://github.com/karthikeyanr4java/universities.git'
                // git branch: 'main', credentialsId: 'github', url: 'https://github.com/karthikeyanr4java/universities.git'
            }
        }
        
        stage('Install and Build') {
            steps {
                sh "npm install"
                sh "npm run build"
            }
        }
        */
        stage('Run Test') {
            steps {
                bat "npm install"
                bat "npm run jest"
            }
            post {
                always {
                    step([$class: 'CoberturaPublisher', coberturaReportFile: '**/cobertura-coverage.xml'])
                }
            }
        }
        stage('Sonarqube Analysis') {
            steps {
                withSonarQubeEnv('Your Sonar Server Name here') {
                    bat '''
                        ${JENKINS_HOME}/tools/hudson.plugins.sonar.SonarRunnerInstallation/SonarQube_Scanner/bin/sonar-scanner \
                        -Dsonar.host.url=http://localhost:9000/ \
                        -Dsonar.login=sonarqubecred \
                        -Dsonar.projectKey=Universities \
                        -Dsonar.projectName=Universities-$BUILD_NUMBER
                    '''
                }
            }
        }
        stage('Building our image') {
            steps {
                script {
                    dockerImage = docker.build registry + ":latest"
                }
            }
        }
        stage('Push To Artifactory') {
            steps {
                script {
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }
                }
            }
        }
        /*
        stage('Cleaning up') {
            steps {
                sh "docker rmi $registry:latest"
            }
        }
        */
    }
}