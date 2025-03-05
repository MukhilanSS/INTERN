function validateForm() {
    let error = false;
    clearErrors(); 

    // const bookName = document.getElementById("bookName").value.trim();
    // const authorName = document.getElementById("authorName").value.trim();
    // const authorMail = document.getElementById("authorMail").value.trim();
    // const publisher = document.getElementById("publisher").value.trim();
    // const description = document.getElementById("description").value.trim();
    // const price = document.getElementById("price").value.trim();

    function showError(id, message) {
        document.getElementById(id).textContent = message;
        document.getElementById(id).style.color = "red";
        error = true;
    }

    const fields = bookObject();

    if (Object.values(fields).every(value => value.trim() === "")) {
        showError("e0", "*All fields are empty");
        return false;
    }

    const rules = {
        bookName: { regex: /^[a-zA-Z\s]+$/, errorId: "e1", emptyMsg: "*Please enter a book name", invalidMsg: "*Book name should only contain letters" },
        authorName: { regex: /^[a-zA-Z\s]+$/, errorId: "e2", emptyMsg: "*Please enter the author's name", invalidMsg: "*Author name should only contain letters" },
        authorMail: { regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]+$/, errorId: "e3", emptyMsg: "*Please enter an email", invalidMsg: "*Enter a valid email" },
        publisher: { minLen: 5, errorId: "e4", emptyMsg: "*Please enter the publisher's name", invalidMsg: "*Publisher must be at least 5 characters long" },
        description: { minLen: 20, errorId: "e5", emptyMsg: "*Please enter a description", invalidMsg: "*Description must be at least 20 characters long" },
        price: { regex: /^\d+(\.\d{1,2})?$/, errorId: "e6", emptyMsg: "*Please enter the price", invalidMsg: "*Enter a valid price greater than 0" }
    };


    for (const field in rules) {
        const value = fields[field];
        const rule = rules[field];

        if (!value) {
            showError(rule.errorId, rule.emptyMsg);
        } else if (rule.regex && !rule.regex.test(value)) {
            showError(rule.errorId, rule.invalidMsg);
        } else if (rule.minLen && value.length < rule.minLen) {
            showError(rule.errorId, rule.invalidMsg);
        }
    }

    return !error; 
}


function clearErrors() {
    document.querySelectorAll(".error").forEach(el => el.textContent = "");
}
document.getElementById("form1").addEventListener("submit",submitForm);
