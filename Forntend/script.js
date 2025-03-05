function clearForm() {
    document.getElementById("authorName").value = ""; // Clear only email field
    document.getElementById("bookName").value = ""; // Clear price field
}
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM Loaded, checking localStorage..."); // Debugging log
    const bookData = JSON.parse(localStorage.getItem("editBook"));

    if (bookData) {
        console.log("Editing book:", bookData); // Debugging log

        document.getElementById("bookName").value = bookData.bookName;
        document.getElementById("publisher").value = bookData.publisher;
        document.getElementById("description").value = bookData.description;
        document.getElementById("price").value = bookData.price;
        document.getElementById("authorName").value = bookData.authorName;
        document.getElementById("authorName").readOnly = true; // Prevent author edit

        document.getElementById("form1").onsubmit = function (event) {
            event.preventDefault();
            updateForm(bookData._id);
        };
    }
});
