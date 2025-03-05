document.addEventListener("DOMContentLoaded",function(){
    fetchBooks();
});
function fetchBooks() {
    fetch('http://localhost:5000/books') // Ensure the backend is running
        .then(response => response.json())
        .then(books => {
            const tableBody = document.getElementById("bookTableBody");
            tableBody.innerHTML = "";

            books.forEach(book => {
                const row = `<tr>
                    <td>${book.bookName}</td>
                    <td>${book.authorName}</td>
                    <td>${book.publisher}</td>
                    <td class="text-end">
                        <button class="btn btn-info btn-sm me-2" onclick="getBookDetails('${book._id}')">Get</button>
                        <button class="btn btn-warning btn-sm me-2" onclick="updateBookDetails('${book._id}')">Update</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteBook('${book._id}')">Delete</button>
                    </td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error("Error fetching books:", error));
}
function getBookDetails(bookId) {
    fetch(`http://localhost:5000/books/${bookId}`)
        .then(response => response.json())
        .then(book => {
            alert(
                `Book Details:\n` +
                `Book Name: ${book.bookName}\n` +
                `Author: ${book.authorName}\n` +
                `Publisher: ${book.publisher}\n` +
                `Email: ${book.authorMail}\n` +
                `Description: ${book.description}\n` +
                `Price: $${book.price}`
            );
        })
        .catch(error => console.error("Error fetching book details:", error));
}
function updateBookDetails(bookId) {
    console.log("Fetching details for book ID:", bookId); 

    fetch(`http://localhost:5000/books/${bookId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Book not found");
            }
            return response.json();
        })
        .then(book => {
            if (!book) {
                alert("Book Not Found");
                return;
            }
            localStorage.setItem("editBook", JSON.stringify(book));
            window.location.href = "form.html"; 
        })
        .catch(error => console.error("Error fetching book details:", error));
}