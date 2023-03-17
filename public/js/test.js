fetch("/customer", {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
}).then(data => data.json(data)).then(data => console.log(data))