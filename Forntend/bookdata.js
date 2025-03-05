function bookObject() {
    return {
         bookName : document.getElementById("bookName").value.trim(),
         authorName :document.getElementById("authorName").value.trim(),
         authorMail : document.getElementById("authorMail").value.trim(),
         publisher :document.getElementById("publisher").value.trim(),
         description : document.getElementById("description").value.trim(),
         price : document.getElementById("price").value.trim()
    };
}

  