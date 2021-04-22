# Wallet Dashboard

## Table of Contents

* [Docker](#markdown-header-docker)

---

## Docker

### Connect to the Wallet AWS Account

Before running the commands below you should configure ``wallet-aws`` profile. 

More information about profile configuration you can find on the page - [Named profiles](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html).

````bash
export AWS_PROFILE="wallet-aws" # optional

aws ecr get-login-password --region {AWS_REGION} | docker login --username AWS --password-stdin {AWS_ID}.dkr.ecr.{AWS_REGION}.amazonaws.com
````

### Run the frontend from container

The basic syntax of the command:

````bash
docker run -p 80:80 -e API_BASE_URL=LINK_TO_API {AWS_ID}.dkr.ecr.{AWS_REGION}.amazonaws.com/velmie/wallet-frontend:{IMAGE_TAG}
````

**Environment variables**:

* ``API_BASE_URL`` - The URL where the API is located. E.g. - ``https://api.wallet-web.site``

**Other parameters**:

* ``IMAGE_TAG`` - the tag of the image. At the moment the tag can be ``git commit hash`` or ``git tag``.

The ``real`` example of the command:

````bash
docker run -p 80:80 -e API_BASE_URL=https://api.wallet-web.site {AWS_ID}.dkr.ecr.{AWS_REGION}.amazonaws.com/velmie/wallet-frontend:{IMAGE_TAG}
````

### Build docker image

To build a docker image run the following command:


````bash
docker build -f docker/Dockerfile .
````

---
**[⬆ back to the top](#markdown-header-table-of-contents)**
