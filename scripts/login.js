document.getElementById("login_form").addEventListener("submit", login);
async function login(event) {
    event.preventDefault();
    if (
        document.querySelector("#password-login").value == "" &&
        document.querySelector("#username-login").value == ""
    ) {
        document.querySelector("#validPass").textContent =
            "Incorrect Username & Password";
        document.querySelector("#validPass").style.display = "block";
    } else {
        try {
            var login_data = {
                username: document.getElementById("username-login").value,
                password: document.getElementById("password-login").value,
            };
            login_data = JSON.stringify(login_data);
            console.log(login_data);
        } catch (err) {
            console.log(err);
        }
        let login_url = "https://masai-api-mocker.herokuapp.com/auth/login";
        let response = await fetch(login_url, {
            method: "POST",
            body: login_data,
            headers: {
                "Content-Type": "application/json",
            },
        });
        let data = await response.json();
        let username = document.getElementById("username-login").value;
        var user = {
            username: username,
            token: data.token,
        };
        localStorage.setItem("userData", JSON.stringify(user));
        // getUser(username, data.token);
        if (data.error == false) {
            window.location.href = "index.html";
        }
        console.log(data);
    }
    var time = setTimeout(function () {
        document.querySelector("#validPass").style.display = "none";
    }, 3000);
}