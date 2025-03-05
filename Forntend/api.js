async function submitForm(event){
    event.preventDefault();
    if(!validateForm()) return;
    const bookData=bookObject();
    try{
        const response=await fetch("http://localhost:5000/books",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(bookData)
        });
        if (response.ok) {
            alert("Book added successfully!");
            window.location.href = "books.html"; // Redirect to book listing page
        } else {
            const errorData = await response.json();
            alert("Error: " + (errorData.error || "Failed to add book"));
            clearForm();
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    }
    
}
async function updateForm(bookId) {
    const bookData = bookObject();
    
    delete bookData.authorName; // Prevent author updates

    console.log("Updating book:", bookId, bookData);

    try {
        const response = await fetch(`http://localhost:5000/books/${bookId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookData)
        });

        if (response.ok) {
            alert("Book updated successfully");
            localStorage.removeItem("editBook");
            window.location.href = "books.html";
        } else {
            const errorData = await response.json();
            alert("Error: " + (errorData.error || "Failed to update book"));
        }
    } catch (error) {
        console.error("Error: ", error);
        alert("Something went wrong. Please try again later.");
    }
}
async function deleteBook(id) {
    if (!confirm("Are you sure you want to delete this book?")) {
        return;
    }

    try {
        const response = await fetch(`http://localhost:5000/books/${id}`, {
            method: "DELETE",
        });

        if (response.ok) {
            alert("Book deleted successfully");
            window.location.reload(); // Refresh book list
        } else {
            const errorData = await response.json();
            alert("Error: " + (errorData.error || "Failed to delete book"));
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again later.");
    }
}





