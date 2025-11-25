async function loadProject() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const res = await fetch("../DB/projects.json");
  const data = await res.json();

  const project = data.find(p => p.id == id);
  if (!project) return;

  // Texto do projeto
  document.getElementById("project-title").textContent = project.title;
  document.getElementById("project-subtitle").textContent = project.subtitle;
  document.getElementById("project-context").textContent = project.context;

  // Tecnologias
  const techList = document.getElementById("tech-list");
  techList.innerHTML = "";
  project.technologies.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;
    techList.appendChild(li);
  });

  // Botão download
  if (project.download) {
    document.getElementById("download-btn").href = project.download;
  }

  // === Galeria dinâmica na estrutura existente ===
  const wrappers = document.querySelectorAll(".image-wrapper");

  wrappers.forEach((wrapper, index) => {
    wrapper.innerHTML = ""; // limpa conteúdo antigo

    const media = project.gallery[index];

    if (!media) {
      // Se não tem mídia, esconde o wrapper
      wrapper.style.display = "none";
      return;
    }

    wrapper.style.display = ""; // garante que está visível

    if (media.includes("studio.d-id.com/share")) {
      const iframe = document.createElement("iframe");
      iframe.src = media;
      iframe.width = "100%";
      iframe.height = "100%";
      iframe.style.border = "0";
      iframe.allow = "autoplay; encrypted-media";
      iframe.allowFullscreen = true;
      wrapper.appendChild(iframe);
    } else if (media.endsWith(".mp4")) {
      const video = document.createElement("video");
      video.src = media;
      video.controls = true;
      video.style.width = "100%";
      video.style.height = "100%";
      wrapper.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = media;
      img.style.width = "100%";
      img.style.height = "100%";
      wrapper.appendChild(img);
    }
  });
}

loadProject();
