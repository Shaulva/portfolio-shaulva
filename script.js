// ================= LOADER =================
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
});

// ================= GITHUB =================
const username = "Shaulva";

fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
  .then(res => res.json())
  .then(repos => {
    const container = document.getElementById("github-projects");

    repos.slice(0, 6).forEach(repo => {
      const div = document.createElement("div");
      div.className = "repo";

      div.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || "Pas de description"}</p>
        <p>⭐ ${repo.stargazers_count}</p>
        <a class="btn" href="${repo.html_url}" target="_blank">Voir</a>
      `;

      container.appendChild(div);
    });
  });

// ================= PARTICLES =================
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for(let i = 0; i < 70; i++){
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    size: Math.random() * 2
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if(p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.fillStyle = "#38bdf8";
    ctx.fillRect(p.x, p.y, p.size, p.size);
  });

  requestAnimationFrame(animate);
}

animate();

// ================= 3D HOVER =================
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -10;
    const rotateY = (x / rect.width - 0.5) * 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});

// ================= SCROLL =================
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
});

cards.forEach(card => observer.observe(card));
