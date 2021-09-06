pipeline {
    environment {
        registry = "karthikeyanr4java/universities"
        // registry = "universities"
        registryCredential = 'dockerhub_id'
        dockerImage = ''
    }
    agent any
    stages {
        stage('Gitea checkout') {
            steps {
                // git 'https://github.com/karthikeyanr4java/universities.git'
                git branch: 'main', credentialsId: 'github', url: 'https://github.com/karthikeyanr4java/universities.git'
            }
        }
        /*
        stage('Install and Build') {
            steps {
                sh "npm install"
                sh "npm run build"
            }
        }
        */
        stage('Run Test') {
            steps {
                sh "npm install"
                sh "npm run jest"
            }
            post {
                always {
                    /*publishHTML target: [
                        allowMissing         : false,
                        alwaysLinkToLastBuild: false,
                        keepAll             : true,
                        reportDir            : 'coverage',
                        reportFiles          : 'index.html',
                        reportName           : 'Coverage Report'
                    ]*/
                    step([$class: 'CoberturaPublisher', coberturaReportFile: '**/cobertura-coverage.xml'])
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