pipeline {
    agent any
    parameters {
        choice(name: 'VERSION', choices: ['v1', 'v2', 'v3'], description: 'Version to build')
    }
    environment {
        IMAGE_NAME = 'YOUR_DOCKERHUB_USERNAME/help-desk-management'
    }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Validate') {
            steps {
                powershell 'if (!(Test-Path "${VERSION}/index.html")) { throw "Missing version index.html" }'
                powershell 'if (!(Test-Path "${VERSION}/Dockerfile")) { throw "Missing version Dockerfile" }'
            }
        }
        stage('Build Docker Image') {
            steps {
                powershell 'docker build -t "${IMAGE_NAME}:${VERSION}" "${VERSION}"'
            }
        }
        stage('Push to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    powershell '''
                      $env:DOCKER_PASS | docker login -u $env:DOCKER_USER --password-stdin
                      docker push "${IMAGE_NAME}:${VERSION}"
                      docker logout
                    '''
                }
            }
        }
    }
}
