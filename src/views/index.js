const form = document.getElementById('urlForm');
const host = 'https://surajkm24-crispy-space-meme-4prg476p696hj4p5-8080.preview.app.github.dev'
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