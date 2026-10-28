pipeline {
    agent any
    parameters {
        choice(name: 'VERSION', choices: ['v1', 'v2', 'v3'], description: 'Version to build')
    }
    environment {
        IMAGE_NAME = 'jasmi4/help-desk-management'
    }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        
stage('Validate') {
    steps {
        powershell '''
            $version = $env:VERSION

            if (!(Test-Path "$version/index.html")) {
                throw "Missing $version/index.html"
            }

            if (!(Test-Path "$version/Dockerfile")) {
                throw "Missing $version/Dockerfile"
            }

            Write-Host "Validation successful for $version"
        '''
    }
}

stage('Build Docker Image') {
    steps {
        powershell '''
            $docker = "$env:LOCALAPPDATA\\Programs\\DockerDesktop\\resources\\bin\\docker.exe"
            $version = $env:VERSION
            $imageName = $env:IMAGE_NAME

            if ([string]::IsNullOrWhiteSpace($version)) {
                throw "VERSION parameter is empty"
            }

            if ([string]::IsNullOrWhiteSpace($imageName)) {
                throw "IMAGE_NAME is empty"
            }

            $tag = "${imageName}:${version}"

            Write-Host "Version: $version"
            Write-Host "Image tag: $tag"
            Write-Host "Build folder: $version"

            & $docker build -t $tag $version

            if ($LASTEXITCODE -ne 0) {
                exit $LASTEXITCODE
            }
        '''
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
