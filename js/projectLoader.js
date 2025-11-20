async function loadProject() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const res = await fetch("../DB/projects.json");
  const data = await res.json();

  const project = data.find(p => p.id == id);

  if (!project) return;

  document.getElementById("project-title").textContent = project.title;
  document.getElementById("project-subtitle").textContent = project.subtitle;
  document.getElementById("hero-img").src = project.hero;
  document.getElementById("project-context").textContent = project.context;

  // Technologies
  const techList = document.getElementById("tech-list");
  techList.innerHTML = "";
  project.technologies.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    techList.appendChild(li);
  });

  // Fill grids
  const grids = document.querySelectorAll("div img");
  for (let i = 0; i < grids.length; i++) {
    grids[i].src = project.gallery[i] || "../img/placeholder_small.png";
  }

  // Download file
  if (project.download) {
    document.getElementById("download-btn").href = project.download;
  }
}

loadProject();
