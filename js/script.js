document.addEventListener('DOMContentLoaded', () => {
  loadDecks();
  loadUpdates();
});

async function loadUpdates(){
  const updatesList = document.querySelector(".updates-list");
  if (!updatesList) return;

  try{
    getUpdates(updatesList);
  } catch(err){
    console.error("Failed to load updates: ", err);
    gallery.innerHTML ="<p>Failed to load updates.</p>";
  }
}

async function loadDecks(){
  const gallery = document.querySelector(".gallery");
  if (!gallery) return;

  try{
    getCards(gallery);
  } catch(err) {
    console.error("Failed to load decks: ", err);
    gallery.innerHTML ="<p>Failed to load decks.</p>";
  }
}

function getUpdates(updatesList){
  fetch("data/updates.json")
  .then(r => r.json())
  .then(updates => {
    updates
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach(update => {
      const html = `
          <article class="update">
            <div class="update-meta">
              <span><b>[${update.tag}]</b></span>
              <time>${update.date}</time>
            </div>

            <h3>${update.title}</h3>
            <p>${update.text}</p>
          </article>
        `;
      updatesList.innerHTML += html;
    })
  })
}

function getCards(gallery){
  fetch("data/cards.json")
  .then(r => r.json())
  .then(cards => {
    cards.forEach(card => {
      const status = card.isFinished
      ? `<h3>Cartas: ${card.quantity}</h3>`
      : `<h3>en progreso...</h3>`;

      const html = 
      `
        <article class="card">
        <a href="${card.link}">
          <img src="./images/${card.image}" alt="${card.title}">
          <div class="card-content">
            <h2>${card.title}</h2>
            <h3>Dificultad: ${card.difficulty}</h3>
            ${status}
          </div>
        </a>
        </article>
      `;

      gallery.innerHTML += html;
    });
  });
}

