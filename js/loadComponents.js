fetch("./components/header.html")
  .then(r => r.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
    const page = document.body.dataset.page;
    const title = document.getElementById("page-title");
    
    if (page !== "home") title.textContent = page;
  });