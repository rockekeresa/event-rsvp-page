pipeline {
  agent any

  triggers {
    githubPush()
  }

  environment {
    TF_VERSION = '1.6.7'
    AWS_DEFAULT_REGION = 'us-east-2'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('AWS Authentication') {
      steps {
        withCredentials([
          string(credentialsId: 'AKIAUQM463LVSLYLPWWE', variable: 'AWS_ACCESS_KEY_ID'),
          string(credentialsId: '6no2XO9Yac084WRZ6Q/0GYhvq9x5cDE72RCK0oQL', variable: 'AWS_SECRET_ACCESS_KEY')
        ]) {
          script {
            if (isUnix()) {
              sh 'echo AWS credentials are available as environment variables'
            } else {
              bat 'echo AWS credentials are available as environment variables'
            }
          }
        }
      }
    }

    stage('Terraform Installation') {
      steps {
        script {
          if (isUnix()) {
            sh '''
              if ! command -v terraform >/dev/null 2>&1; then
                curl -LO https://releases.hashicorp.com/terraform/${TF_VERSION}/terraform_${TF_VERSION}_linux_amd64.zip
                unzip -o terraform_${TF_VERSION}_linux_amd64.zip
                chmod +x terraform
              fi
              ./terraform version
            '''
          } else {
            bat '''
              if not exist terraform.exe (
                powershell -Command "Invoke-WebRequest -Uri https://releases.hashicorp.com/terraform/${TF_VERSION}/terraform_${TF_VERSION}_windows_amd64.zip -OutFile terraform.zip"
                powershell -Command "Expand-Archive terraform.zip -DestinationPath . -Force"
              )
              terraform.exe version
            '''
          }
        }
      }
    }

    stage('Terraform Init') {
      steps {
        script {
          if (isUnix()) {
            sh './terraform init -input=false'
          } else {
            bat 'terraform.exe init -input=false'
          }
        }
      }
    }

    stage('Terraform Plan') {
      steps {
        script {
          if (isUnix()) {
            sh './terraform plan -out=tfplan -input=false'
          } else {
            bat 'terraform.exe plan -out=tfplan -input=false'
          }
        }
      }
    }

    stage('Approval') {
      steps {
        input message: 'Approve Terraform apply to proceed?', ok: 'Apply'
      }
    }

    stage('Terraform Apply') {
      steps {
        script {
          if (isUnix()) {
            sh './terraform apply -input=false tfplan'
          } else {
            bat 'terraform.exe apply -input=false tfplan'
          }
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'tfplan', allowEmptyArchive: true
    }
  }
}
