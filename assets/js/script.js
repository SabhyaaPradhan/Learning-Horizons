const listInfo = document.querySelector('.list-info')
const listImg = document.querySelector('.list-img')
const nextBtn = document.querySelector('.next-btn')
const prevBtn = document.querySelector('.prev-btn')
const bgs = document.querySelectorAll('.bg')

let index = 0

nextBtn.addEventListener('click', () => {

  index = (index < 3) ? index + 1 : 3

  listInfo.style.transform = `translateY(${index * -25}%)`
  listImg.style.transform = `translateY(${index * -100}%)`

  bgs[index].classList.add('active')
})


prevBtn.addEventListener('click', () => {

  indexPrev = (index > 0) ? index : 0
  index = (index > 0) ? index - 1 : 0

  listImg.style.transform = `translateY(${index * -100}%)`
  listInfo.style.transform = `translateY(${index * -25}%)`

  bgs[indexPrev].classList.remove('active')
})

//  Product Slider JS

// const productContainers = [...document.querySelectorAll('.product-container')];
// const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
// const preBtn = [...document.querySelectorAll('.pre-btn')];

// productContainers.forEach((item, i) => {
//     let containerDimensions = item.getBoundingClientRect();
//     let containerWidth = containerDimensions.width;

//     nxtBtn[i].addEventListener('click', () => {
//         item.scrollLeft += containerWidth;
//     })

//     preBtn[i].addEventListener('click', () => {
//         item.scrollLeft -= containerWidth;
//     })
// })

var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  autoplay: {
    delay: 3000
  },
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: true
  },
  spaceBetween: 50,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});


// BG

var w = window.innerWidth,
  h = window.innerHeight,
  canvas = document.getElementById('test'),
  ctx = canvas.getContext('2d'),
  rate = 60,
  arc = 100,
  time,
  count,
  size = 7,
  speed = 20,
  parts = new Array,
  colors = ['red', '#f57900', 'yellow', '#ce5c00', '#5c3566'];
var mouse = { x: 0, y: 0 };

canvas.setAttribute('width', w);
canvas.setAttribute('height', h);

function create() {
  time = 0;
  count = 0;

  for (var i = 0; i < arc; i++) {
    parts[i] = {
      x: Math.ceil(Math.random() * w),
      y: Math.ceil(Math.random() * h),
      toX: Math.random() * 5 - 1,
      toY: Math.random() * 2 - 1,
      c: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * size
    }
  }
}

function particles() {
  ctx.clearRect(0, 0, w, h);
  canvas.addEventListener('mousemove', MouseMove, false);
  for (var i = 0; i < arc; i++) {
    var li = parts[i];
    var distanceFactor = DistanceBetween(mouse, parts[i]);
    var distanceFactor = Math.max(Math.min(15 - (distanceFactor / 10), 10), 1);
    ctx.beginPath();
    ctx.arc(li.x, li.y, li.size * distanceFactor, 0, Math.PI * 2, false);
    ctx.fillStyle = li.c;
    ctx.strokeStyle = li.c;
    if (i % 2 == 0)
      ctx.stroke();
    else
      ctx.fill();

    li.x = li.x + li.toX * (time * 0.05);
    li.y = li.y + li.toY * (time * 0.05);

    if (li.x > w) {
      li.x = 0;
    }
    if (li.y > h) {
      li.y = 0;
    }
    if (li.x < 0) {
      li.x = w;
    }
    if (li.y < 0) {
      li.y = h;
    }


  }
  if (time < speed) {
    time++;
  }
  setTimeout(particles, 1000 / rate);
}
function MouseMove(e) {
  mouse.x = e.layerX;
  mouse.y = e.layerY;

  //context.fillRect(e.layerX, e.layerY, 5, 5);
  //Draw( e.layerX, e.layerY );
}
function DistanceBetween(p1, p2) {
  var dx = p2.x - p1.x;
  var dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}
create();
particles();

// Eye
 
const svg = document.querySelector("#svg")
const mouse = svg.createSVGPoint()

const leftEye = createEye("#left-eye")
const rightEye = createEye("#right-eye")

let requestId = null

window.addEventListener("mousemove", onMouseMove)

function onFrame() {
  let point = mouse.matrixTransform(svg.getScreenCTM().inverse())

  leftEye.rotateTo(point)
  rightEye.rotateTo(point)

  requestId = null
}

function onMouseMove(event) {
  mouse.x = event.clientX
  mouse.y = event.clientY

  if (!requestId) {
    requestId = requestAnimationFrame(onFrame)
  }
}

function createEye(selector) {
  const element = document.querySelector(selector)

  TweenMax.set(element, {
    transformOrigin: "center"
  })

  let bbox = element.getBBox()
  let centerX = bbox.x + bbox.width / 2
  let centerY = bbox.y + bbox.height / 2

  function rotateTo(point) {
    let dx = point.x - centerX
    let dy = point.y - centerY

    let angle = Math.atan2(dy, dx)

    TweenMax.to(element, 0.3, {
      rotation: angle + "_rad_short",
    })
  }

  return {
    element,
    rotateTo,
  }
}
