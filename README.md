# NodeJS Insecure Deserialization Lab

This project demonstrates a vulnerable environment for testing insecure deserialization in Node.js. It showcases the risks of using `node-serialize` for serializing and deserializing data.
## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Warning](#warning)
4. [License](#license)

## Installation

Follow these steps to set up the project:

### Prerequisites
- Node.js version 14.x or higher
- npm for managing packages

### Steps
1. Clone the repository:
```bash
git clone https://github.com/TheWation/NodeJsDeserializationLab
cd NodeJsDeserializationLab
```

2. Install the dependencies:
```bash
npm install
```

3. Start the server:
```bash
node app.js
```

The server will be available at `http://127.0.0.1:3000`.

## Usage

1. Once the server is running, visit the homepage: `http://127.0.0.1:3000`.

2. You will see a list of books with buttons. Clicking on a button sends the selected book's data (serialized using `node-serialize`) to the server.

3. The server deserializes the data and displays the book details (title, author, and year).

## Warning

**This project is intentionally vulnerable and should not be used in production environments.** It demonstrates the risks of insecure deserialization using `node-serialize`. Deserializing untrusted data can lead to arbitrary code execution and other security vulnerabilities. Use only in a controlled environment for educational or testing purposes.

## License

This project is for educational purposes only and is not intended for commercial use. Use at your own risk.