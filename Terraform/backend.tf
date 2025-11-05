terraform {
  required_version = "~> 1.13.3"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.14.1"
    }
  }

  cloud {

    organization = "bilarn"

    workspaces {
      name = "devops-project"
    }
  }
}
provider "aws" {
  region = var.aws-region
}
