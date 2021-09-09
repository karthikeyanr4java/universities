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
        stage('SonarQube analysis') {
            steps {
                bat "npm run sonar"
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
        stage('Checkout helm chart') {
            steps {
                bat 'git clone https://github.com/karthikeyanr4java/helm-chart-ui.git chart'
            }
        }
        stage('Run Helm chart') {
            agent any
            steps {
                bat 'rm -rf chart'
                bat 'helm install ./chart'
            }
        }
        stage('Get service url from Minikube') {
            steps {
                bat 'helm version'
            }
        }
    }
}