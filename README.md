<h1 align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
  <br>discord-student-study-bot
</h1>
<h4 align="center">Discord Bot for Students: Streamline Study Resources and Enhance Collaboration</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<p align="center">
  <img src="https://img.shields.io/badge/Framework-Discord.js-blue" alt="Framework - Discord.js" />
  <img src="https://img.shields.io/badge/Language-JavaScript-red" alt="Language - JavaScript" />
  <img src="https://img.shields.io/badge/Database-MySQL-blue" alt="Database - MySQL" />
  <img src="https://img.shields.io/badge/LLMs-OpenAI-black" alt="LLMs - OpenAI" />
</p>
<p align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/discord-student-study-bot?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/discord-student-study-bot?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/discord-student-study-bot?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</p>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
The repository contains a project called "discord-student-study-bot" that provides a comprehensive solution for students to find and share study materials, collaborate in study groups, and access personalized learning resources, all within the familiar interface of Discord. The bot leverages JavaScript, Discord.js, MySQL, and OpenAI APIs to deliver a seamless and engaging learning experience. 

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| ⚙️ | Architecture   | The codebase follows a modular architectural pattern with separate directories for different functionalities, ensuring easier maintenance and scalability.             |
| 📄 | Documentation  | The repository includes a README file that provides a detailed overview of the project, its dependencies, and usage instructions.|
| 🔗 | Dependencies   | The codebase relies on various external libraries and packages such as Discord.js, node-fetch, dotenv, mysql2, Prisma, bcrypt, jsonwebtoken, and googleapis. |
| 🧩 | Modularity     | The modular structure allows for easier maintenance and reusability of the code, with separate directories and files for commands, events, services, models, and utilities.|
| 🧪 | Testing        | Implement unit tests using frameworks like Jest to ensure the reliability and robustness of the codebase.       |
| ⚡️  | Performance    | The performance of the system can be optimized based on factors such as the browser and hardware being used. Consider implementing performance optimizations for better efficiency.|
| 🔐 | Security       | Enhance security by implementing measures such as input validation, data encryption, and secure communication protocols.|
| 🔀 | Version Control| Utilizes Git for version control with GitHub Actions workflow files for automated build and release processes.|
| 🔌 | Integrations   | Interacts with Discord API, OpenAI API, Google Books API, and potentially other APIs like Cloudinary for file management.|
| 📶 | Scalability    | Design the system to handle increased user load and data volume, utilizing caching strategies and cloud-based solutions for better scalability.           |

## 📂 Structure
```
├── commands
│   ├── help.js
│   ├── notes.js
│   ├── books.js
│   ├── resources.js
│   ├── group.js
│   └── study.js
├── events
│   ├── ready.js
│   ├── message.js
│   └── guildMemberAdd.js
├── services
│   ├── authenticationService.js
│   ├── notesService.js
│   ├── booksService.js
│   ├── resourcesService.js
│   ├── groupService.js
│   ├── databaseService.js
│   └── permissionService.js
├── models
│   ├── User.js
│   ├── Note.js
│   ├── Book.js
│   ├── Resource.js
│   ├── Group.js
│   └── Server.js
├── utils
│   ├── commandHandler.js
│   ├── logger.js
│   └── errorHandler.js
├── config
│   ├── env.config.js
│   └── database.config.js
├── .env
├── package.json
└── README.md

```

  ## 💻 Installation
  ### 🔧 Prerequisites
  - Node.js
  - npm
  - Docker

  
  ### 🚀 Setup Instructions
  1. Clone the repository:
     - 'git clone https://github.com/coslynx/discord-student-study-bot.git'
  2. Navigate to the project directory:
     - 'cd discord-student-study-bot'
  3. Install dependencies:
     - 'npm install'
  
  ## 🏗️ Usage
  ### 🏃‍♂️ Running the Project
  1. Start the development server:
     - 'npm start'
  2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
  
  ### ⚙️ Configuration
  Adjust configuration settings in 'config.js' or '.env'.
  
  ### 📚 Examples
  - 📝 Example 1: Use the `!study help` command to view a list of available commands.
  - 📝 Example 2: Use `!study notes add [title] [content]` to add a new note.
  - 📝 Example 3: Use `!study books search [book title]` to find book information.

  
  ## 🌐 Hosting
  ### 🚀 Deployment Instructions
  1. Create a Heroku account:
     - [https://www.heroku.com/](https://www.heroku.com/)
  2. Install the Heroku CLI:
     - 'npm install -g heroku'
  3. Login to Heroku:
     - 'heroku login'
  4. Create a new Heroku app:
     - 'heroku create'
  5. Deploy the code:
     - 'git push heroku main'

  ### 🔑 Environment Variables
  - 'DISCORD_TOKEN': Your Discord bot token
  - 'DB_HOST': Database host
  - 'DB_USER': Database user
  - 'DB_PASS': Database password
  - 'OPENAI_API_KEY': Your OpenAI API key
  - 'GOOGLE_BOOKS_API_KEY': Your Google Books API key
  
  ## 📜 API Documentation
  ### 🔍 Endpoints
  - POST /api/auth/register: Registers a new user.
  - POST /api/auth/login: Logs in an existing user.
  - GET /api/notes: Retrieves a list of notes for the authenticated user.
  - POST /api/notes: Creates a new note for the authenticated user.
  - PUT /api/notes/:id: Updates an existing note for the authenticated user.
  - DELETE /api/notes/:id: Deletes an existing note for the authenticated user.
  - GET /api/books/search: Searches for books based on a given query.
  - GET /api/books/:id: Retrieves details about a specific book.
  - GET /api/resources: Retrieves a list of resources.
  - POST /api/resources: Creates a new resource.
  - PUT /api/resources/:id: Updates an existing resource.
  - DELETE /api/resources/:id: Deletes an existing resource.
  - POST /api/groups: Creates a new study group.
  - GET /api/groups/:id/members: Retrieves members of a specific group.
  - POST /api/groups/:id/join: Joins a study group.
  - DELETE /api/groups/:id/leave: Leaves a study group.
  
  ### 🔒 Authentication
  Use JWT tokens for authentication.
  
  ### 📝 Examples
  - 'curl -X POST -H "Content-Type: application/json" -d '{"username": "your_username", "password": "your_password"}' http://localhost:3000/api/auth/register'
  
  ## 📜 License
  This project is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/).
  
  ## 👥 Authors
  - Author Name - [Spectra.codes](https://spectra.codes)
  - Creator Name - [DRIX10](https://github.com/Drix10)

  <p align="center">
    <h1 align="center">🌐 Spectra.Codes</h1>
  </p>
  <p align="center">
    <em>Why only generate Code? When you can generate the whole Repository!</em>
  </p>
  <p align="center">
	<img src="https://img.shields.io/badge/Developer-Drix10-red" alt="">
	<img src="https://img.shields.io/badge/Website-Spectra.codes-blue" alt="">
	<img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
	<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="">
  <p>