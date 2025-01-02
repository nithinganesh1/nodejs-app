# CI/CD Pipeline for Node.js Application

This project implements a robust CI/CD pipeline for a Node.js application, aiming to automate the entire software lifecycle—from code integration to deployment. The application is built and tested using npm, containerized with Docker, and deployed to a Kubernetes cluster on AWS EKS (or Minikube for local setups). Additionally, the project integrates monitoring tools like Prometheus and Grafana to track performance and ensure reliability.

The pipeline is triggered via GitHub webhooks and orchestrated using Jenkins, ensuring efficient and seamless deployment. With features like rolling updates and canary deployments, this setup guarantees zero downtime while deploying new changes.

---

## Table of Contents
1. [Overview](#overview)
2. [Requirements](#requirements)
3. [Pipeline Steps](#pipeline-steps)
4. [Technologies Used](#technologies-used)
5. [Setup Instructions](#setup-instructions)
6. [Key Features](#key-features)
7. [Repository Structure](#repository-structure)

---

## Overview

### Purpose
The main objective of this project is to demonstrate how to design and implement a fully automated CI/CD pipeline for a Node.js application. By leveraging modern DevOps practices and cloud-native tools, this pipeline facilitates rapid, reliable, and repeatable application delivery. 

### Workflow
1. **Code Integration**: Developers push code changes to a GitHub repository.
2. **Build Process**: Jenkins automates building and testing the application using npm.
3. **Containerization**: The application is packaged into a Docker container and stored in Docker Hub.
4. **Deployment**: Kubernetes manifests are used to deploy the application to AWS EKS or a local Minikube cluster.
5. **Monitoring**: Application performance is tracked using Prometheus, with visual dashboards provided by Grafana.
6. **Updates**: Supports rolling updates and canary deployments for minimal service disruption during changes.

---

## Requirements
- **Node.js**: To develop and test the application.
- **Git**: For version control and code management.
- **Jenkins**: To automate CI/CD processes.
- **Docker**: For containerizing the application.
- **Kubernetes**: To manage and deploy containerized applications.
- **AWS EKS / Minikube**: Deployment environments.
- **Prometheus and Grafana**: For application monitoring and visualization.

---

## Pipeline Steps

### 1. Clone Repository
Pulls the latest code from the GitHub repository.
```groovy
stage('Clone') {
    steps {
        git url: 'https://github.com/nithinganesh1/nodejs-app.git', branch: 'main'
    }
}
```

### 2. Build Message
Prints a build message to the console.
```groovy
stage('Build Msg') {
    steps {
        echo "Building..."
    }
}
```

### 3. Environment Verification
Verifies the build environment by listing files and printing the current directory.
```groovy
stage('Hello') {
    steps {
        sh 'ls'    // List files in the workspace
        sh 'pwd'   // Print the current directory
    }
}
```

### 4. Docker Build
Builds the Docker image using the provided Dockerfile.
```groovy
stage('Docker Build') {
    steps {
        script {
            sh "docker build -t nithin-nodejs-app -f docker/dockerfile ."
        }
    }
}
```

### 5. Tag and Push Image
Tags and pushes the Docker image to Docker Hub.
```groovy
stage('Tag and Push') {
    steps {
        script {
            sh "docker tag nithin-nodejs-app:latest nithingganesh/nithin-nodejs-app:latest"
            sh "docker push nithingganesh/nithin-nodejs-app:latest"
        }
    }
}
```

### 6. Deploy to Kubernetes
Applies Kubernetes manifests to deploy the application.
```groovy
stage('Deploy to k8s') {
    steps {
        script {
            sh "kubectl apply -f k8s/deployment.yaml --namespace ng"
            sh "kubectl apply -f k8s/service.yaml --namespace ng"
        }
    }
}
```

### 7. Rolling Update
Performs a rolling update to ensure zero downtime during deployments.
```groovy
stage('Restart Pods') {
    steps {
        script {
            sh "kubectl rollout restart deployment nodejs-app --namespace ng"
        }
    }
}
```

---

## Technologies Used

### CI/CD
- **Jenkins**: Automates the pipeline with multiple stages.
- **GitHub Webhooks**: Triggers Jenkins builds on code changes.

### Containerization and Orchestration
- **Docker**: Packages the application into lightweight containers.
- **Kubernetes**: Deploys and manages containers in clusters.
- **AWS EKS / Minikube**: Production-grade and local cluster environments.

### Monitoring
- **Prometheus**: Collects application metrics for analysis.
- **Grafana**: Visualizes metrics with interactive dashboards.

---

## Setup Instructions

### 1. Prerequisites
- Install Docker, Kubernetes (kubectl), Jenkins, and AWS CLI.
- Configure AWS credentials for access to EKS and ECR.
- Install Prometheus and Grafana in the Kubernetes cluster for monitoring.

### 2. Pipeline Setup
1. Create a Jenkins pipeline and paste the provided Groovy script.
2. Configure Jenkins credentials for Docker Hub and AWS.
3. Set up a webhook in the GitHub repository to trigger Jenkins.

### 3. Kubernetes Setup
- Ensure the Kubernetes cluster is running (EKS or Minikube).
- Apply the `deployment.yaml` and `service.yaml` manifests.

### 4. Monitoring Setup
- Install Prometheus and Grafana using Helm charts.
- Configure Prometheus to scrape metrics from the application.
- Set up Grafana dashboards to visualize performance data.

---

## Key Features
- **Automated CI/CD pipeline** triggered by GitHub webhooks.
- **Containerization** using Docker.
- **Orchestration** and deployment using Kubernetes.
- **Performance monitoring** with Prometheus and Grafana.
- **Rolling updates** and **canary deployments** for zero downtime.

---

## Repository Structure
```
nodejs-app
├── docker
│   └── Dockerfile
├── k8s
│   ├── deployment.yaml
│   └── service.yaml
├── src
│   └── ... (Node.js application source code)
└── Jenkinsfile
```

---

## Additional Notes
- If AWS EKS proves too resource-intensive, Minikube can be used for local Kubernetes testing.
- Ensure Docker Hub credentials and AWS IAM roles are securely managed.

---

## Contributors
- [nithingganesh](https://github.com/nithinganesh1)

