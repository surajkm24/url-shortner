const form = document.getElementById('urlForm');
const host = process.env
form.onsubmit = async (event) => {
    event.preventDefault();
    let body = {
        url: form.url.value
    }
    let res = await fetch(`${host}/url`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    })

    let data = await res.json();
    console.log(data);
}