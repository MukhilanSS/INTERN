function validateForm() {
    let error = false;

  
    const bookName = document.getElementById("bookName").value.trim();
    const authorName = document.getElementById("authorName").value.trim();
    const authorMail = document.getElementById("authorMail").value.trim();
    const publisher = document.getElementById("publisher").value.trim();
    const description = document.getElementById("description").value.trim();
    const price = document.getElementById("price").value.trim();

    document.querySelectorAll(".error").forEach(el => el.textContent = "");

    function showError(id, message) {
        document.getElementById(id).textContent = message;
        document.getElementById(id).style.color = "red";
        error = true;
    }

    // Check if all fields are empty
    if (!bookName && !authorName && !authorMail && !publisher && !description && !price) {
        showError("e0", "*All fields are empty");
        return false;
    }

    // Book Name validation
    if (!bookName) {
        showError("e1", "*Please enter a book name");
    } else if (!/^[a-zA-Z\s]+$/.test(bookName)) {
        showError("e1", "*Book name should only contain letters");
    }

    // Author Name validation
    if (!authorName) {
        showError("e2", "*Please enter the author's name");
    } else if (!/^[a-zA-Z\s]+$/.test(authorName)) {
        showError("e2", "*Author name should only contain letters");
    }

    // Email validation
    if (!authorMail) {
        showError("e3", "*Please enter an email");
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]+$/.test(authorMail)) {
        showError("e3", "*Enter a valid email");
    }

    // Publisher validation
    if (!publisher) {
        showError("e4", "*Please enter the publisher's name");
    } else if (publisher.length < 5) {
        showError("e4", "*Publisher must be at least 5 characters long");
    }

    // Description validation
    if (!description) {
        showError("e5", "*Please enter a description");
    } else if (description.length < 20) {
        showError("e5", "*Description must be at least 20 characters long");
    }

    // Price validation
    if (!price) {
        showError("e6", "*Please enter the price");
    } else if (!/^\d+(\.\d{1,2})?$/.test(price) || price <= 0) {
        showError("e6", "*Enter a valid price");
    }

    return !error; // Return false if any error exists, otherwise return true
}
