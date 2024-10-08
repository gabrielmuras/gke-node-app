# Cloud Infrastructure Engineer
## Take-home technical assessment

## Introduction
The purpose of this assessment is for **sisu-tech** to ascertain the technical suitability of candidates applying for a Cloud Infrastructure Engineer position.

Please note the following:

 - We do not expect this test to take more than 2 hours
 - We recommend to create a new account in Google Cloud Platform (GCP) for testing the results.

## Process

 1. Complete the tasks listed below
 2. Edit this `README.md` file to include brief answers to the questions about the assessment listed below
 3. Push your work to your new repository
 4. Send your recruitment contact a link to the new repository

If you have any questions about this process, please speak to your recruitment contact.

## Tasks

### 1. Docker
A basic TypeScript application has been created in the `application` folder. Create a Dockerfile to build this application, making sure that it runs on your local device.

### 2. CI/CD
 - :arrow_forward: Github Actions
 - :arrow_forward: Argo Workflows

Write a YAML-based or Kubernetes-based CI/CD pipeline to build, push and deploy this docker image to some Google Kubernetes Engine cluster.

Create Kubernetes resource definitions needed to deploy the application and include it in the `kubernetes` folder.

Use whatever mechanism/tools you think are appropriate/relevant to deploy the application.

NOTE: This pipeline does not have to be fully active. All we're looking for is the YAML file. Minor syntax errors will be overlooked.

### 3. Infrastructure as Code
 - :arrow_forward: Terraform **CDK in TypeScript** https://developer.hashicorp.com/terraform/cdktf

Create some Infrastructure as Code resources to deploy an Google Cloud Kubernetes Engine and an Cloud SQL database to some Google Cloud account.

The Google Cloud Kubernetes Engine must be able to connect to Google Cloud SQL, and the Kubernetes Cluster will need to be accessed as follows:
 - VPN from IPs `10.26.32.12` and `19.104.105.29`
 - HTTPS traffic from anywhere

Consider other general security best practices.

Other configuration can be decided by yourself, based on the instance being used for a low resource usage, low traffic web application.

## Questions

 1. How long did you spend on this assessment in total?\
 
 - In code arround 1:45 h but I needed some time setting up my env so I would say a little bit more than 2 hours.

 2. What was the most difficult task?\

 - Setup the cdktf environment and get used on how to use it. It doesn't relly on a lot of documentation and I needed to keep reading the packages and auto generated information
 - Time. 2 hours is too little time to setup env and to deliver a project like this.
 

 3. If you had an unlimited amount of time to complete this task, what would you have done differently?\
 
 - Make functional
 - Write a documentation on how to use it and why it's like this and the architecture overview
 - Write tests for the application
 - Monitor the application
 - Create a infrastructure as code pipeline
 - Create a helm chart to deploy the application
 - Separate infrastructure components in different states, folders and in a better written code. Probably VPC, SQL and GKE folders. And use variables instead of put values inside the code
 - Create/use modules to manage the infrastructure
 - Use ingress (like nginx controller) or istio as a L7 in front of the application
 - Implement a canary deployment
 - Implement a image building tagging instead of relying on latest which isn't a good practice
 - I'm not sure about the cdktf but for me it does not seem like a production ready IaC solution. Lacks documentation (All of it is self generated) and not many people use it. I would probably stick with standard hcl terraform or opentofu. Or maybe crossplane inside a k8s
 - Setup and configure postgresql connection pool and other best practices
