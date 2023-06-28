"use strict";
{
  const mainImage = document.querySelector("#main");
  const next = document.querySelector("#next");
  const prev = document.querySelector("#prev");
  const thumbnails = document.querySelector(".thumbnails");
  const play = document.querySelector("#play");
  let timeoutId;

  // currentIndex =indexが何番目を保持しているか
  let currentIndex = 0;
  let isPlaying = false;

  let images = [
    "img/pic001.jpg",
    "img/pic002.jpg",
    "img/pic003.jpg",
    "img/pic004.jpg",
    "img/pic005.jpg",
    "img/pic006.jpg",
    "img/pic007.jpg",
  ];

  mainImage.src = images[currentIndex];

  images.forEach((image, index) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = image;

    // forEachの引数で取得したindexとcurrentIndexの比較でクラスを付ける
    if (index === currentIndex) {
      li.classList.add("current");
    }
    li.addEventListener("click", () => {
      mainImage.src = image;

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
    // document.querySelectorAll('.thumbnails > li')[target].click();でも呼び出せる
    const thumbnails = document.querySelectorAll(".thumbnails > li");
    thumbnails[currentIndex].classList.remove("current");
    currentIndex = target;
    thumbnails[target].classList.add("current");
    mainImage.src = images[target];
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
    mainImage.src = images[target];
  });

  function playSlideshow() {
    timeoutId = setTimeout(() => {
      playSlideshow();
    }, 1000);

    // nextのclickイベントを引用
    let target = currentIndex + 1;
    if (target === images.length) {
      target = 0;
    }
    const thumbnails = document.querySelectorAll(".thumbnails > li");
    thumbnails[currentIndex].classList.remove("current");
    currentIndex = target;
    thumbnails[target].classList.add("current");
    mainImage.src = images[target];
  }

  play.addEventListener("click", () => {
    if (isPlaying === false) {
      playSlideshow();
      play.textContent = "Stop";
      isPlaying = true;
    } else {
      clearTimeout(timeoutId);
      // isPlaying = !isPlayingでもOK
      isPlaying = false;
      play.textContent = "slide show";
    }
  });
}
