<h1 align="center">Varta 🗞️</h1>

<p align="center">An innovative <b>News Feed Analyzer Agent</b> which provides comprehensive summaries of the <b>latest news from many News Outlets</b> based on <b>User Interests, leveraging open-source LLMs, ScrapeGraph AI, Spheron</b> and tools like <b>LangChain</b> ️‍🔥</p>

## 📋 Table of Contents
- [Demo](#-demo)
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Steps to Run](#-steps-to-run)
- [Deploy on Spheron](#-deploy-on-spheron)
- [Project structure](#%EF%B8%8F-project-structure)
- [Contributing](#-contributing)
- [Acknowledgments](#-acknowledgments)
- [License](#-license)

## 🎥 DEMO
The **Server and Ollama Llama3** was deployed on **Spheron** when this demo video was shot.
[![demo video](https://img.youtube.com/vi/OL2nFczDWso/0.jpg)](https://www.youtube.com/watch?v=OL2nFczDWso)

## 📙 Features
An News Feed Analyzer Agent that can:

- 🗞️ Aggregate news from 14+ sources.
- 🔍 Analyze content from 60+ interests choosed by user.
- 📝 Concise and comprehensive summaries of the latest news.
- 📧 Email subscriptions with customizable frequency.
- 🔖 Bookmark news for later read.

## 🫳 Prerequisites
You should have

- [Node v20.16.0 or higher](https://nodejs.org/en)
- [Python 3.11 or higher](https://www.python.org/downloads/)
- [MongoDB Atlas Connection URL](https://www.mongodb.com/docs/guides/atlas/connection-string/)
- [Google App Password for SMTP](https://www.gmass.co/blog/gmail-smtp/)
- [Ollama Llama3](https://ollama.com/library/llama3)

## 👣 Steps to Run
**Navigate to the Project Directory:**
Change to the directory where the project files are located. For example:
```shell
cd path/to/project/directory
```

### 1. Expo App

1. Install dependencies

   ```bash
   bun install # or npm install
   ```

2. Configure environment variables

    1. Copy `.env.example` to `.env`.
    2. Fill in the `.env` file with the necessary environment variables.

2. Start the app

   ```bash
    bunx expo start # or npx expo start
   ```

In the output, you'll find options to open the app in a

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

This project uses [file-based routing](https://docs.expo.dev/router/introduction).

<br />

### 2. Server

1. Change the directory

   ```bash
   cd server
   ```

2. Create a virtual environment.

   ```bash
   python3 virtualenv venv
   ```

3. Activate the virtual environment.

   ```bash
   source ./venv/bin/activate
   ```

4. Install dependencies from `requirements.txt`

   ```bash
   pip install -r requirements.txt
   ```

5. Configure environment variables

    1. Copy `.env.example` to `.env`.
    2. Fill in the `.env` file with the necessary environment variables.

6. Start the server

   ```bash
    fastapi dev main.py --reload --port 8000 # or for production, fastapi run main.py --port 8000
   ```

> [!NOTE]
> Ollama should be running locally before you start the server!

## 🚀 Deploy on Spheron
Here I will help you to deploy **Server and Ollama** on Spheron using **Spheron Protocol CLI** 💪

### Prerequisites
You should have this before you start deploying on Spheron:

- [curl](https://curl.se/)

### 1. Install Spheron Protocol CLI (Linux, MacOS)
```bash
curl -sL1 https://sphnctl.sh | bash
```
After installation, verify the installation by using a simple command to check the Spheron version:
```bash
sphnctl version # or `sphnctl -h` for help
```

### 2. Creating a Wallet
```bash
sphnctl wallet create --name <your-wallet-name>
```
Replace `<your-wallet-name>` with your desired wallet name. Here is an example of how the result will look:
```bash
Created account xxx:
 path: /home/thatsmeadarsh/.spheron/<your-wallet-name>.json
 address: 0x3683Ae6bd8f23DEb35f79A750EA0a7e6fc858047
 secret: xxxxxxxxxx
 mnemonic: xxxxxx xxxxx xxxx xxxxx xxxxx xxxx xxxxx xxxxx
```
Make sure to _securely save the mnemonic phrase and key secret provided_.

### 3. Get Test Tokens from the Faucet
You will need some token to deploy on Spheron. Visit the [Spheron Faucet](https://faucet.spheron.network/) to obtain test tokens for deployment. After receiving the tokens, you can check your wallet balance with:
```bash
sphnctl wallet balance --token USDT
```
Here is an example of how the result will look:
```bash
Current ETH balance: 0.09993387282 
Total USDT balance: 35 
 
Deposited USDT balance
 unlocked: 14.030481 
 locked: 4e-06 
```
Note: You might have `unlocked or locked USDT balance` as 0 but here I don't because I have previously deployed on Spheron. Don't worry, in next step I have covered that 😋.

### 4. Deposit Tokens to Your Escrow Balance
Deposit USDT to your escrow wallet for deployment:
```bash
sphnctl payment deposit --amount 20 --token USDT
```
Now check your balance, if it's unlocked and sufficient (just like mine above):
```bash
sphnctl wallet balance --token USDT
```

### 5. Create your Deployment
I have already created a docker image for you so you can directly head towards to deployment without worrying 😉. 
In the project directory, navigate to `server/`:
```bash
cd server
```
Open `deploy.yml` in a code editor and fill the environmental variables:
```bash
- MONGO_CONNECTION_URL=
- DATABASE_NAME=
- JWT_SECRET_KEY=
- JWT_REFRESH_SECRET_KEY=
- ACCESS_TOKEN_EXPIRE_MINUTES=
- REFRESH_TOKEN_EXPIRE_MINUTES=
- ALGORITHM=
- SMTP_SERVER=
- SMTP_PORT=
- SMTP_USERNAME=
- SMTP_PASSWORD=
```
And deploy the `deploy.yml` configuration file on Spheron:
```bash
sphnctl deployment create deploy.yml
```
Here is an example of how the result will look:
```bash
Validating SDL configuration.
SDL validated.
Sending configuration for provider matching.
Create deployment tx: [Tx Hash]
Waiting for providers to bid on the deployment order...
Bid found.
Order matched successfully.
Deployment created using wallet 0x3683Ae6bd8f23DEb35f79A750EA0a7e6fc858047
 lid: 389
 provider: 0x6634d41cccBD1E1576Ed4c6226832521A66bF874
 agreed price: 0.74
Sending the manifest for deployment…
Deployment manifest sent, waiting for acknowledgment.
Deployment is finished.
```
Note: The `lid` we get from the deployment is called **Lease ID**. This is the identifier you need to use to access your deployment's logs and status.

Now, Congratulations!! You have deployed the **Server and Ollama** on Spheron successfully 🥳🥳.

### 6. Access Your Deployment
To get details about your deployment, including the URL, ports, and status, run:
```bash
sphnctl deployment get --lid <lease-id>
```
Replace the `<lease-id>` with your actual Lease ID, you obtained after deployment.

## 🏛️ Project structure

### 1. Expo App

```bash
├── app/                        # Main application
│   ├── email-subscription/     # Email subscription screen
│   ├── interest/               # News Interest screen
│   ├── news-outlet/            # News Outlet screen
│   ├── login/                  # Login screen
│   ├── register/               # Register screen
│   ├── news/                   # News screen (dynamic)
│   ├── (tabs)/                 # Screens those are on Navigation Tab
│       ├── index.tsx           # Home screen
│       ├── bookmark/           # Bookmark screen
│       └── settings/           # Settings screen
├── assets/                     # Assets like fonts and images
│   ├── fonts/                  # Font files
│   └── images/                 # Image and Icon files
├── components/                 # Reusable components
│   ├── auth/                   # Authentication components
│   ├── button/                 # Button components
│   ├── common/                 # Common components
│   ├── form/                   # Form-related components
│   └── sections/               # Section components
├── constants/                  # Constant values
├── hooks/                      # Custom hooks
├── server/                     # SERVER (BACKEND)
├── service/                    # Services for API calls
│   ├── auth/                   # Authentication services
│   ├── email-subscription/     # Email subscription services
│   └── news/                   # News services
├── utils/                      # Utility functions
├── .env.example                # Example environment variables
└── .gitignore                  # Git ignore rules
```

### 2. Server

```bash
├── app/                        # Main application folder
│   ├── auth/                   # Authentication module
│   ├── news/                   # News module
│   ├── subscription/           # Subscription module
│   └── users/                  # User management module
├── data/                       # Data and templates folder
├── database/                   # Database management module
├── helpers/                    # Helper functions
├── models/                     # Models for data validation, serialization, and type enforcement 
├── service/                    # Service-related code
│   ├── news/                   # News service
│   └── subscription/           # Subscription service
├── utils/                      # Utility functions
├── main.py                     # Main application file
├── deploy.yml                  # Spheron Deployment configuration
├── Dockerfile                  # Docker configuration
├── .dockerignore               # Docker ignore rules
├── .env.example                # Example environment variables
├── .gitignore                  # Git ignore rules
└── requirements.txt            # Python dependencies
```

## 🤗 Contributing
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes.
4. Push your branch: `git push origin feature-name`.
5. Create a pull request.

## ✍ Acknowledgments
This project couldn't be there if they didn't be there!
- [Spheron](https://spheron.network/)
- [Ollama Llama3](https://ollama.com/library/llama3)
- [ScrapeGraphAI](https://github.com/ScrapeGraphAI/Scrapegraph-ai)
- [Langchain](https://www.langchain.com/)

Even I had many issues while making this project and this was my first time to make a complete react native project with backend but spheron team helped me to over come the issues, gave me suggestions and I am really thankful to it ❤️‍🩹!

## 🧾 License
This project is licensed under the [MIT License](LICENSE).

