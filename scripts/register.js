document.getElementById("regForm").addEventListener("submit", Register);

async function Register(event) {
    event.preventDefault();

    if (
        document.querySelector("#password").value == "" &&
        document.querySelector("#username").value == ""
    ) {
        document.querySelector("#validPass").innerHTML = "Enter Valid Details";
        document.querySelector("#validPass").style.display = "block";
    } else {
        try {
            var register_data = {
                name: document.getElementById("name").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                username: document.getElementById("username").value,
                mobile: document.getElementById("mobile").value,
                description: document.getElementById("description").value,
            };

            register_data = JSON.stringify(register_data);
            console.log("data", register_data);
        } catch (err) {
            console.log(err);
        }

        let reg_api = "https://masai-api-mocker.herokuapp.com/auth/register";
        let response = await fetch(reg_api, {
            method: "POST",
            body: register_data,
            headers: {
                "Content-Type": "application/json",
            },
        });
        let data = await response.json();
        if (data.error == true) {
            document.querySelector("#validPass").textContent =
                "Account Already Exists";
            document.querySelector("#validPass").style.display = "block";
        } else {
            window.location.href = "login.html";
        }
        console.log(data);
    }
    var time = setTimeout(function () {
        document.querySelector("#validPass").style.display = "none";
    }, 3000);
}

document.getElementById("fileInput").addEventListener("change", function () {
    let reader = new FileReader();

    reader.addEventListener("load", () => {
        localStorage.setItem("recentImg", reader.result);
        let recentImg = localStorage.getItem("recentImg");
        if (recentImg) {
            document.getElementById("imgPrev").setAttribute("src", recentImg);
        }
    });
    reader.readAsDataURL(this.files[0]);
});