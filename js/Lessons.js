let lessons = [];
let currentIndex = 0;

const savedProgress = localStorage.getItem("moocProgress");
if (savedProgress !== null) {
  currentIndex = parseInt(savedProgress, 10);
}

fetch("../DB/lessons.json")
  .then(res => res.json())
  .then(data => {
    lessons = data;
    renderLesson();
  });

const titleEl = document.getElementById("lesson-title");
const contentEl = document.getElementById("lesson-content");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

function renderLesson() {
  const lesson = lessons[currentIndex];

  titleEl.textContent = lesson.title;
  contentEl.innerHTML = "";

  contentEl.scrollTop = 0;

  let totalQuizzes = 0;
  let correctAnswers = 0;

  lesson.content.forEach(item => {
    if (item.type === "text") {
      const p = document.createElement("p");
      p.innerHTML = item.body.replace(/\n/g, "<br>");
      contentEl.appendChild(p);
    }

    if (item.type === "image") {
    const img = document.createElement("img");
    img.src = "../DB/" + item.src;
    if (item.caption) {
        const caption = document.createElement("small");
        caption.textContent = item.caption;
        contentEl.appendChild(img);
        contentEl.appendChild(caption);
    } else {
        contentEl.appendChild(img);
    }
    }

    if (item.type === "video") {
    const video = document.createElement("video");
    video.controls = true;
    video.width = "100%";

    const source = document.createElement("source");
    source.src = "../DB/" + item.src;
    source.type = "video/mp4";
    video.style.width = "100%";
    video.appendChild(source);

    if (item.captions) {
        const track = document.createElement("track");
        track.kind = "subtitles";
        track.label = "Português";
        track.srclang = "pt";
        track.src = "../DB/" + item.captions;
        track.default = true
        video.appendChild(track);
    }

    contentEl.appendChild(video);
    }

    if (item.type === "quiz") {
    item.questions.forEach(q => {
        const wrapper = document.createElement("div");
        wrapper.style.margin = "20px 0";

        if (q.image) {
        const img = document.createElement("img");
        img.src = "../DB/" + q.image;
        wrapper.appendChild(img);
        }

        const question = document.createElement("p");
        question.textContent = q.question;
        wrapper.appendChild(question);

        q.options.forEach((opt, i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.style.display = "block";
        btn.style.margin = "5px 0";
        btn.onclick = () => {
            if (i === q.correctIndex) {
            btn.style.background = "#7ed957";
            } else {
            btn.style.background = "#ff7675";
            }
        };
        wrapper.appendChild(btn);
        });

        contentEl.appendChild(wrapper);
    });
    }
  });



  prevBtn.style.display = currentIndex === 0 ? "none" : "inline-block";
  nextBtn.style.display = currentIndex === lessons.length - 1 ? "none" : "inline-block";

  localStorage.setItem("moocProgress", currentIndex);
}

nextBtn.onclick = () => {
  if (currentIndex < lessons.length - 1) {
    currentIndex++;
    renderLesson();
  }
};

prevBtn.onclick = () => {
  if (currentIndex > 0) {
    currentIndex--;
    renderLesson();
  }
};