const express = require('express');
const bodyParser = require('body-parser');
const node_serialize = require('node-serialize');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/static', express.static(path.join(__dirname, 'static')));

const books = [
  { title: 'Python Crash Course', author: 'Eric Matthes', year: 2019 },
  { title: 'Fluent Python', author: 'Luciano Ramalho', year: 2022 },
  { title: 'Effective Python', author: 'Brett Slatkin', year: 2020 }
];

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Books</title>
        <link rel="stylesheet" href="/static/styles.css">
        <script>
          // Define books on the client-side
          const books = ${JSON.stringify(books)};

          // Function to send the selected book's data
          function sendBookData(index) {
            const serializedBook = '${node_serialize.serialize(books[0])}';
            fetch('/book', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ data: serializedBook }),
            })
            .then(response => response.text())
            .then(html => {
              document.open();
              document.write(html);
              document.close();
            })
            .catch(error => console.error('Error:', error));
          }
        </script>
      </head>
      <body>
        <div class="container">
          <h1>Books</h1>
          <!-- Use button to select book by index -->
          ${books
            .map((book, index) => `
              <button onclick="sendBookData(${index})">${book.title}</button>
            `)
            .join('')}
        </div>
      </body>
    </html>
  `);
});

app.post('/book', (req, res) => {
  const serializedData = req.body.data;
  if (!serializedData) {
    return res.status(400).send('No book data provided');
  }

  // Deserialize the book information using node_serialize
  const bookData = node_serialize.unserialize(serializedData);

  res.send(`
    <html>
      <head>
        <title>${bookData.title}</title>
        <link rel="stylesheet" href="/static/styles.css">
      </head>
      <body>
        <div class="container">
          <h1>${bookData.title}</h1>
          <p><strong>Author:</strong> ${bookData.author}</p>
          <p><strong>Year:</strong> ${bookData.year}</p>
          <a href="/">Back</a>
        </div>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
