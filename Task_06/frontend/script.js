const API = "http://localhost:3000";

// Add account
function addAccount() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const balance = document.getElementById("balance").value;

    fetch(`${API}/accounts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, balance })
    }).then(() => loadData());
}


// Load all data
function loadData() {
    fetch(`${API}/accounts`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("accounts").innerHTML =
                data.map(a => `<p>${a.name} - ${a.balance}</p>`).join("");
        });

    fetch(`${API}/logs`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("logs").innerHTML =
                data.map(l => `<p>${l.operation_type} - ${l.account_id}</p>`).join("");
        });

    fetch(`${API}/daily-report`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("daily").innerHTML =
                data.map(d => `<p>${d.Activity_Date} - ${d.Total_Operations}</p>`).join("");
        });

    fetch(`${API}/account-summary`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("summary").innerHTML =
                data.map(s => `<p>${s.name} - ${s.Total_Changes}</p>`).join("");
        });
}

loadData();
setInterval(loadData, 5000);