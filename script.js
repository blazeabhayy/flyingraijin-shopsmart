document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // Initialize Lenis smooth scrolling
  const initSmoothScrolling = () => {
    const lenis = new Lenis({
      lerp: 1,
      smooth: true,
    });

    lenis.on("scroll", () => ScrollTrigger.update());

    const scrollFn = (time) => {
      lenis.raf(time);
      requestAnimationFrame(scrollFn);
    };

    requestAnimationFrame(scrollFn);
  };
  initSmoothScrolling();
});

function nav() {
  let lastScrollTop = 0;
  const navbar = document.getElementById("nav");
  const threshold1 = window.innerHeight * 3.2;
  const threshold2 = window.innerHeight * 3.5;
  const menuItems = document.querySelectorAll(".McButton > b");

  function setNavbarInitialStyles() {
    navbar.style.backgroundColor = "transparent";
    navbar.style.color = "#fff";
    menuItems.forEach((item) => (item.style.backgroundColor = "#fff"));
  }

  function setNavbarHoverStyles() {
    navbar.style.backgroundColor = "white";
    navbar.style.color = "#000";
    menuItems.forEach((item) => (item.style.backgroundColor = "#000"));
  }

  navbar.addEventListener("mouseenter", function () {
    setNavbarHoverStyles();
  });

  navbar.addEventListener("mouseleave", function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > threshold1) {
      navbar.style.backgroundColor = "white";
      navbar.style.color = "#000";
      menuItems.forEach((item) => (item.style.backgroundColor = "#000"));
    } else {
      setNavbarInitialStyles();
    }
  });

  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > threshold1) {
      navbar.style.backgroundColor = "white";
      navbar.style.color = "#000";
      menuItems.forEach((item) => (item.style.backgroundColor = "#000"));

      if (scrollTop > lastScrollTop && scrollTop > threshold2) {
        navbar.style.top = "-160px";
      } else {
        navbar.style.top = "0";
      }
    } else {
      setNavbarInitialStyles();
      navbar.style.top = "0";
    }
    lastScrollTop = scrollTop;
  });

  const button = document.querySelector(".burger-button");
  const mainNav = document.querySelector("#main-nav");
  const hideHoja = document.querySelector("#hide-hoja");
  const teslaSvgPath = document.querySelector(".tesla-svg-path");

  button.addEventListener("click", () => {
    button.classList.toggle("clicked");
    mainNav.classList.toggle("clicked");
    hideHoja.classList.toggle("clicked");
    teslaSvgPath.classList.toggle("clicked");
  });
}

function p1() {
  const tl1 = gsap.timeline(
    {
      scrollTrigger: {
        trigger: "#bg-image",
        start: "top top",
        end: "+=250%",
        scrub: 2,
        pin: "#bg-image",
      },
    },
    "a"
  );

  gsap.to("#bg-image", {
    width: "92%",
    left: "calc(50% - 46%)",
    scrollTrigger: {
      trigger: "#pinned-content",
      start: "top -60%",
      end: "+=150%",
      scrub: 0.5,

    },
  });
}

const animateWords = (el) => {
  gsap.set(el, { "font-kerning": "none" });

  // Apply SplitType
  const st = new SplitType(el, { types: "lines, words" });
  const lines = st.lines;

  const tl = gsap
    .timeline({
      delay: 1,
      scrollTrigger: {
        trigger: el,
        start: "center center",
        end: "+=100%",
        scrub: true,
        pin: el,
      },
    })
    .set(el, { perspective: 1000 });

  for (const [linepos, line] of lines.entries()) {
    gsap.set(line, { transformStyle: "preserve-3d" });

    const words = line.querySelectorAll(".word");

    tl.to(
      words,
      {
        ease: "back.inOut",
        opacity: 0,
        rotationY: (pos, _, arr) =>
          pos > arr.length / 2
            ? Math.abs(pos - arr.length / 2) * -15
            : Math.abs(pos - arr.length / 2) * 15,
        z: () => gsap.utils.random(-1000, -500),
        stagger: {
          each: 0.02,
          from: "center",
        },
      },
      linepos * 0.05
    );
  }
};

const scroll = () => {
  [...document.querySelectorAll("[data-split]")].forEach((el) => {
    animateWords(el);
  });
};

function page2() {
  let allh1 = document.querySelectorAll("#page2 h1");
  allh1.forEach(function (elem) {
    let content = "";
    h1 = elem.textContent;
    let splittedText = h1.split("");
    splittedText.forEach(function (e) {
      content += `<span>${e}</span>`;
    });
    elem.innerHTML = content;
  });

  gsap.to("#page2 h1 span", {
    scrollTrigger: {
      trigger: "#page2 h1",
      start: "top 75%",
      end: "+=40%",
      scrub: 2,
    },
    color: "#000",
    stagger: 0.05,
    ease: "power2.inOut",
  });

  gsap.to("#page2-p1", {
    opacity: 1,
    scrollTrigger: {
      trigger: "#page2-p1",
      start: "top 70%",
      end: "+=50%",
      scrub: 1,
    },
  });

  const photos = gsap.utils.toArray(".desk-img:not(:first-child)");
  gsap.set(photos, { yPercent: 101, scale: 3, transformOrigin: "top center" });

  const animation = gsap.to(photos, {
    yPercent: 0,
    scale: 1,
    duration: 1,
    stagger: 1,
  });

  ScrollTrigger.create({
    trigger: "#scroll-effect",
    start: "top top",
    end: "bottom bottom",
    pin: "#scroll-right",
    animation: animation,
    scrub: true,
  });
}

function canvas() {
  const canvas = document.querySelector("#canvas canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
  
  ./Assets/media/images2/frame00117.jpg
./Assets/media/images2/frame00118.jpg
./Assets/media/images2/frame00119.jpg
./Assets/media/images2/frame00120.jpg
./Assets/media/images2/frame00121.jpg
./Assets/media/images2/frame00122.jpg
./Assets/media/images2/frame00123.jpg
./Assets/media/images2/frame00124.jpg
./Assets/media/images2/frame00125.jpg
./Assets/media/images2/frame00126.jpg
./Assets/media/images2/frame00127.jpg
./Assets/media/images2/frame00128.jpg
./Assets/media/images2/frame00129.jpg
./Assets/media/images2/frame00130.jpg
./Assets/media/images2/frame00131.jpg
./Assets/media/images2/frame00132.jpg
./Assets/media/images2/frame00133.jpg
./Assets/media/images2/frame00134.jpg
./Assets/media/images2/frame00135.jpg
./Assets/media/images2/frame00136.jpg
./Assets/media/images2/frame00137.jpg
./Assets/media/images2/frame00138.jpg
./Assets/media/images2/frame00139.jpg
./Assets/media/images2/frame00140.jpg
./Assets/media/images2/frame00141.jpg
./Assets/media/images2/frame00142.jpg
./Assets/media/images2/frame00143.jpg
./Assets/media/images2/frame00144.jpg
./Assets/media/images2/frame00145.jpg
./Assets/media/images2/frame00146.jpg
./Assets/media/images2/frame00147.jpg
./Assets/media/images2/frame00148.jpg
./Assets/media/images2/frame00149.jpg
./Assets/media/images2/frame00150.jpg
./Assets/media/images2/frame00151.jpg
./Assets/media/images2/frame00152.jpg
./Assets/media/images2/frame00153.jpg
./Assets/media/images2/frame00154.jpg
./Assets/media/images2/frame00155.jpg
./Assets/media/images2/frame00156.jpg
./Assets/media/images2/frame00157.jpg
./Assets/media/images2/frame00158.jpg
./Assets/media/images2/frame00159.jpg
./Assets/media/images2/frame00160.jpg
./Assets/media/images2/frame00161.jpg
./Assets/media/images2/frame00162.jpg
./Assets/media/images2/frame00163.jpg
./Assets/media/images2/frame00164.jpg
./Assets/media/images2/frame00165.jpg
./Assets/media/images2/frame00166.jpg
./Assets/media/images2/frame00167.jpg
./Assets/media/images2/frame00168.jpg
./Assets/media/images2/frame00169.jpg
./Assets/media/images2/frame00170.jpg
./Assets/media/images2/frame00171.jpg
./Assets/media/images2/frame00172.jpg
./Assets/media/images2/frame00173.jpg
./Assets/media/images2/frame00174.jpg
./Assets/media/images2/frame00175.jpg
./Assets/media/images2/frame00176.jpg
./Assets/media/images2/frame00177.jpg
./Assets/media/images2/frame00178.jpg
./Assets/media/images2/frame00179.jpg
./Assets/media/images2/frame00180.jpg
./Assets/media/images2/frame00181.jpg
./Assets/media/images2/frame00182.jpg
./Assets/media/images2/frame00183.jpg
./Assets/media/images2/frame00184.jpg
./Assets/media/images2/frame00185.jpg
./Assets/media/images2/frame00186.jpg
./Assets/media/images2/frame00187.jpg
./Assets/media/images2/frame00188.jpg
./Assets/media/images2/frame00189.jpg
./Assets/media/images2/frame00190.jpg
./Assets/media/images2/frame00191.jpg
./Assets/media/images2/frame00192.jpg
./Assets/media/images2/frame00193.jpg
./Assets/media/images2/frame00194.jpg
./Assets/media/images2/frame00195.jpg
./Assets/media/images2/frame00196.jpg
./Assets/media/images2/frame00197.jpg
./Assets/media/images2/frame00198.jpg
./Assets/media/images2/frame00199.jpg
./Assets/media/images2/frame00200.jpg
./Assets/media/images2/frame00201.jpg
./Assets/media/images2/frame00202.jpg
./Assets/media/images2/frame00203.jpg
./Assets/media/images2/frame00204.jpg
./Assets/media/images2/frame00205.jpg
./Assets/media/images2/frame00206.jpg
./Assets/media/images2/frame00207.jpg
./Assets/media/images2/frame00208.jpg
./Assets/media/images2/frame00209.jpg
./Assets/media/images2/frame00210.jpg
./Assets/media/images2/frame00211.jpg
./Assets/media/images2/frame00212.jpg
./Assets/media/images2/frame00213.jpg
./Assets/media/images2/frame00214.jpg
./Assets/media/images2/frame00215.jpg
./Assets/media/images2/frame00216.jpg
./Assets/media/images2/frame00217.jpg
./Assets/media/images2/frame00218.jpg
./Assets/media/images2/frame00219.jpg
./Assets/media/images2/frame00220.jpg
./Assets/media/images2/frame00221.jpg
./Assets/media/images2/frame00222.jpg
./Assets/media/images2/frame00223.jpg
./Assets/media/images2/frame00224.jpg
./Assets/media/images2/frame00225.jpg
./Assets/media/images2/frame00226.jpg
./Assets/media/images2/frame00227.jpg
./Assets/media/images2/frame00228.jpg
./Assets/media/images2/frame00229.jpg
./Assets/media/images2/frame00230.jpg
./Assets/media/images2/frame00231.jpg
./Assets/media/images2/frame00232.jpg
./Assets/media/images2/frame00233.jpg
./Assets/media/images2/frame00234.jpg
./Assets/media/images2/frame00235.jpg
./Assets/media/images2/frame00236.jpg
./Assets/media/images2/frame00237.jpg
./Assets/media/images2/frame00238.jpg
./Assets/media/images2/frame00239.jpg
./Assets/media/images2/frame00240.jpg
./Assets/media/images2/frame00241.jpg
./Assets/media/images2/frame00242.jpg
./Assets/media/images2/frame00243.jpg
./Assets/media/images2/frame00244.jpg
./Assets/media/images2/frame00245.jpg
./Assets/media/images2/frame00246.jpg
./Assets/media/images2/frame00247.jpg
./Assets/media/images2/frame00248.jpg
./Assets/media/images2/frame00249.jpg
./Assets/media/images2/frame00250.jpg
./Assets/media/images2/frame00251.jpg
./Assets/media/images2/frame00252.jpg
./Assets/media/images2/frame00253.jpg
./Assets/media/images2/frame00254.jpg
./Assets/media/images2/frame00255.jpg
./Assets/media/images2/frame00256.jpg
./Assets/media/images2/frame00257.jpg
./Assets/media/images2/frame00258.jpg
./Assets/media/images2/frame00259.jpg
./Assets/media/images2/frame00260.jpg
./Assets/media/images2/frame00261.jpg
./Assets/media/images2/frame00262.jpg
./Assets/media/images2/frame00263.jpg
./Assets/media/images2/frame00264.jpg
./Assets/media/images2/frame00265.jpg
./Assets/media/images2/frame00266.jpg
./Assets/media/images2/frame00267.jpg
./Assets/media/images2/frame00268.jpg
./Assets/media/images2/frame00269.jpg
./Assets/media/images2/frame00270.jpg
./Assets/media/images2/frame00271.jpg
./Assets/media/images2/frame00272.jpg
./Assets/media/images2/frame00273.jpg
./Assets/media/images2/frame00274.jpg
./Assets/media/images2/frame00275.jpg
./Assets/media/images2/frame00276.jpg
./Assets/media/images2/frame00277.jpg
./Assets/media/images2/frame00278.jpg
./Assets/media/images2/frame00279.jpg
./Assets/media/images2/frame00280.jpg
./Assets/media/images2/frame00281.jpg
./Assets/media/images2/frame00282.jpg
./Assets/media/images2/frame00283.jpg
./Assets/media/images2/frame00284.jpg
./Assets/media/images2/frame00285.jpg
./Assets/media/images2/frame00286.jpg
./Assets/media/images2/frame00287.jpg
./Assets/media/images2/frame00288.jpg
./Assets/media/images2/frame00289.jpg
./Assets/media/images2/frame00290.jpg
./Assets/media/images2/frame00291.jpg
./Assets/media/images2/frame00292.jpg
./Assets/media/images2/frame00293.jpg
./Assets/media/images2/frame00294.jpg
./Assets/media/images2/frame00295.jpg
./Assets/media/images2/frame00296.jpg
./Assets/media/images2/frame00297.jpg
./Assets/media/images2/frame00298.jpg
./Assets/media/images2/frame00299.jpg
./Assets/media/images2/frame00300.jpg
./Assets/media/images2/frame00301.jpg
./Assets/media/images2/frame00302.jpg
./Assets/media/images2/frame00303.jpg
./Assets/media/images2/frame00304.jpg
./Assets/media/images2/frame00305.jpg
./Assets/media/images2/frame00306.jpg
./Assets/media/images2/frame00307.jpg
./Assets/media/images2/frame00308.jpg
./Assets/media/images2/frame00309.jpg
./Assets/media/images2/frame00310.jpg
./Assets/media/images2/frame00311.jpg
./Assets/media/images2/frame00312.jpg
./Assets/media/images2/frame00313.jpg
./Assets/media/images2/frame00314.jpg
./Assets/media/images2/frame00315.jpg
./Assets/media/images2/frame00316.jpg
./Assets/media/images2/frame00317.jpg
./Assets/media/images2/frame00318.jpg
./Assets/media/images2/frame00319.jpg
./Assets/media/images2/frame00320.jpg
./Assets/media/images2/frame00321.jpg
./Assets/media/images2/frame00322.jpg
./Assets/media/images2/frame00323.jpg
./Assets/media/images2/frame00324.jpg
./Assets/media/images2/frame00325.jpg
./Assets/media/images2/frame00326.jpg
./Assets/media/images2/frame00327.jpg
  `;
    return data.split("\n")[index];
  }

  const frameCount = 210;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.5,
      trigger: `#canvas`,
      start: `top top`,
      end: `350% top`,
      // scroller: `#main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({
    trigger: "#canvas",
    pin: true,
    start: `top top`,
    end: `350% top`,
  });

gsap.to("#canvas img",{
  display:"none",
  scrollTrigger:{
    trigger: "#canvas img",
    start: "top top",
    end: "+=1%",
    scrub:.2,
    ease: "none",
  }
})
}

function page3() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#showcase-pin",
      start: "top top",
      end: "+=880%",
      scrub: 1,
      y: "950%",
      pin: true,
    },
  });

  tl.to(".showcase-ctn", {
    scrollTrigger: {
      trigger: "#showcase-pin",
      start: "top top",
      end: "+=150%",
      scrub: 1,
    },
    "clip-path": " inset(0% 0% 100%)",
    ease: Power2,
  });

  gsap.to(".texte-circle-img", {
    rotation: 360,
    duration: 10,
    repeat: -1,
    ease: "linear",
  });

  tl.to("#showcase-pin", {
    scrollTrigger: {
      trigger: "#showcase-scroll>h1",
      start: "top top",
      end: "+=130%",
      scrub: 1,
    },
    scale: (0.5, 0.5),
  });

  tl.to("#showcase-pin", {
    scrollTrigger: {
      trigger: "#showcase-scroll>h2",
      start: "top top",
      end: "+=130%",
      scrub: 1,
    },
    scale: (1, 1),
  });
}

function slides() {
  gsap.to(".energy-header h1", {
    scrollTrigger: {
      trigger: ".energy-header h1",
      start: "top 66%",
      end: "+=60%",
      scrub: 2,
    },
    color: "#000",
    stagger: 0.5,
    ease: "power2.inOut",
  });
  const photos = gsap.utils.toArray(".slide:not(:first-child)");
  gsap.set(photos, { yPercent: 101, transformOrigin: "top center" });

  const animation = gsap.to(photos, {
    yPercent: 0,
    duration: 1,
    stagger: 1,
  });

  ScrollTrigger.create({
    trigger: ".slides",
    start: "top top",
    end: "+=500%",
    pin: ".slides",
    animation: animation,
    scrub: true,
  });
}
function footer(){
  if(window.innerWidth>768){
    gsap.to(".foot-scroll",{
      scrollTrigger: {
        trigger: ".footer",
        start: "top top",
        end: "+=220%",
        scrub: 1,
        pin: true,
      },
      x:"-200%"
    })
  }

  if(window.innerWidth <= 768){
    gsap.to(".foot-scroll",{
      scrollTrigger: {
        trigger: ".footer",
        start: "top top",
        end: "+=220%",
        scrub: 1,
        pin: true,
      },
      x:"-270%"
    })
  }
}
nav();
p1();
scroll();
page2();
canvas()
page3();
slides();
footer()