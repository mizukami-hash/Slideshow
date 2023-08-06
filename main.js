"use strict";
{
  const mainImage = document.querySelector("#main");
  const next = document.querySelector("#next");
  const prev = document.querySelector("#prev");
  const thumbnails = document.querySelector(".thumbnails");
  const play = document.querySelector("#play");
  const title = document.querySelector("#title");
  const date = document.querySelector("#date");
  let timeoutId;

  // currentIndex =indexが何番目を保持しているか
  let currentIndex = 0;
  let isPlaying = false;

  let images = [
    {
      src: "img/museum01.jpg",
      title: "海外旅行で美術館へ",
      date: "2019.12.28",
    },
    {
      src: "img/shrine02.jpg",
      title: "雄山神社へ初詣",
      date: "2020.01.02",
    },
    {
      src: "img/sea03.jpg",
      title: "バリ島3泊4日旅行",
      date: "2020.03.02",
    },
    {
      src: "img/flower-garden04.jpg",
      title: "夏のラベンダー祭りへ",
      date: "2020.05.30",
    },
    {
      src: "img/cafe05.jpg",
      title: "長野の人気カフェへ",
      date: "2020.07.20",
    },
    {
      src: "img/tokyo06.jpg",
      title: "東京旅行",
      date: "2020.10.01",
    },
    {
      src: "img/kyoto07.jpg",
      title: "京都の観光地巡り",
      date: "2020.12.03",
    },
  ];

  mainImage.src = images[currentIndex].src;
  title.textContent = images[0].title;
  date.textContent = images[0].date;

  images.forEach((image, index) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = image.src;

    // forEachの引数で取得したindexとcurrentIndexの比較でクラスを付ける
    if (index === currentIndex) {
      li.classList.add("current");
    }
    li.addEventListener("click", () => {
      mainImage.src = image.src;
      title.textContent = image.title;
      date.textContent = image.date;

      const thumbnails = document.querySelectorAll(".thumbnails > li");
      thumbnails[currentIndex].classList.remove("current");
      currentIndex = index;
      thumbnails[currentIndex].classList.add("current");
    });
    li.appendChild(img);
    thumbnails.appendChild(li);
  });

  next.addEventListener("click", () => {
    let target = currentIndex + 1;
    if (target === images.length) {
      target = 0;
    }

    const thumbnails = document.querySelectorAll(".thumbnails > li");
    thumbnails[currentIndex].classList.remove("current");
    currentIndex = target;
    thumbnails[target].classList.add("current");

    mainImage.src = images[target].src;
    title.textContent = images[target].title;
    date.textContent = images[target].date;
  });

  prev.addEventListener("click", () => {
    let target = currentIndex - 1;
    if (target < 0) {
      target = images.length - 1;
    }
    const thumbnails = document.querySelectorAll(".thumbnails > li");
    thumbnails[currentIndex].classList.remove("current");
    currentIndex = target;
    thumbnails[target].classList.add("current");
    mainImage.src = images[target].src;
    title.textContent = images[target].title;
    date.textContent = images[target].date;
  });

  function playSlideshow() {
    timeoutId = setTimeout(() => {
      playSlideshow();
    }, 1300);

    // nextのclickイベントを引用
    let target = currentIndex + 1;
    if (target === images.length) {
      target = 0;
    }
    const thumbnails = document.querySelectorAll(".thumbnails > li");
    thumbnails[currentIndex].classList.remove("current");
    currentIndex = target;
    thumbnails[target].classList.add("current");
    mainImage.src = images[target].src;
    title.textContent = images[target].title;
    date.textContent = images[target].date;
  }

  play.addEventListener("click", () => {
    if (isPlaying === false) {
      playSlideshow();
      play.textContent = "Stop";
      isPlaying = true;
    } else {
      clearTimeout(timeoutId);

      isPlaying = false;
      play.textContent = "slide show";
    }
  });
}
