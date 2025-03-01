function fetchBookInfo() {
    const bookTitle = document.getElementById('bookTitle').value;
    const resultDiv = document.getElementById('result');

    // Pastro rezultatin e mëparshëm
    resultDiv.innerHTML = 'Loading...';

    // Thirrja e API-së
    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(bookTitle)}`)
        .then(response => response.json())
        .then(data => {
            if (data.docs && data.docs.length > 0) {
                const book = data.docs[0]; // Merr librin e parë nga rezultatet
                const title = book.title;
                const author = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
                const publishYear = book.first_publish_year || 'Unknown Year';

                // Shfaq informacionin e librit
                resultDiv.innerHTML = `
                    <h2>${title}</h2>
                    <p><strong>Author:</strong> ${author}</p>
                    <p><strong>First Published:</strong> ${publishYear}</p>
                `;
            } else {
                resultDiv.innerHTML = 'No book found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching the book information.';
        });
}