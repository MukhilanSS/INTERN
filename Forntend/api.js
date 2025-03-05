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
            window.location.href = "book.html"; // Redirect to book listing page
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



