const portfolioLinks = {
  email: "mailto:dimahalbarghash@gmail.com",
  phone: "tel:+966540939105",
  linkedin: "https://www.linkedin.com/in/dimah-albarghash-587035330/"
};

document.addEventListener("DOMContentLoaded", () => {
  setupMobileNav();
  setupSmoothNavigation();
  setupActiveNavigation();
  setupCursor();
  setupNameInteraction();
  setupInteractiveCards();
  setupMagneticButtons();
  setupReveal();
  setupHeaderState();
  const year = document.getElementById("footerYear");
  if (year) year.textContent = new Date().getFullYear();
});

function setupMobileNav(){
  const toggle=document.getElementById("navToggle"),nav=document.getElementById("primaryNav");
  if(!toggle||!nav)return;
  const close=()=>{nav.classList.remove("is-open");toggle.setAttribute("aria-expanded","false");toggle.setAttribute("aria-label","Open navigation menu")};
  toggle.addEventListener("click",()=>{const open=nav.classList.toggle("is-open");toggle.setAttribute("aria-expanded",String(open));toggle.setAttribute("aria-label",open?"Close navigation menu":"Open navigation menu")});
  nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",close));
  document.addEventListener("keydown",e=>{if(e.key==="Escape")close()});
  addEventListener("resize",()=>{if(innerWidth>900)close()});
}

function setupSmoothNavigation(){
  document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener("click",e=>{
    const id=link.getAttribute("href");
    if(!id||id==="#")return;
    const target=document.querySelector(id);
    if(!target)return;
    e.preventDefault();
    target.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});
    history.replaceState(null,"",id);
  }));
}

function setupActiveNavigation(){
  const links=[...document.querySelectorAll('.site-nav a[href^="#"]')];
  const sections=links.map(a=>document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if(!sections.length)return;
  const setActive=id=>links.forEach(a=>a.classList.toggle("active-link",a.getAttribute("href")==="#"+id));
  const io=new IntersectionObserver(entries=>{
    const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(visible)setActive(visible.target.id);
  },{rootMargin:"-30% 0px -55% 0px",threshold:[0,.15,.35,.6]});
  sections.forEach(s=>io.observe(s));
}

function setupHeaderState(){
  const header=document.getElementById("siteHeader");
  if(!header)return;
  const update=()=>header.classList.toggle("is-scrolled",scrollY>12);
  update();addEventListener("scroll",update,{passive:true});
}
function setupCursor(){
  if(!matchMedia("(pointer: fine)").matches)return;
  let raf;addEventListener("pointermove",e=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{document.documentElement.style.setProperty("--mx",`${e.clientX}px`);document.documentElement.style.setProperty("--my",`${e.clientY}px`)})},{passive:true});
}
function setupNameInteraction(){
  const name=document.querySelector(".display-name");if(!name||!matchMedia("(pointer: fine)").matches)return;
  name.addEventListener("pointermove",e=>{const r=name.getBoundingClientRect();name.style.setProperty("--name-x",`${Math.max(0,Math.min(100,((e.clientX-r.left)/r.width)*100))}%`);name.style.setProperty("--name-y",`${Math.max(0,Math.min(100,((e.clientY-r.top)/r.height)*100))}%`)});
  name.addEventListener("pointerleave",()=>{name.style.setProperty("--name-x","50%");name.style.setProperty("--name-y","50%")});
}
function setupInteractiveCards(){
  document.querySelectorAll(".interactive-card").forEach(card=>{
    card.addEventListener("pointermove",e=>{const r=card.getBoundingClientRect();card.style.setProperty("--card-x",`${e.clientX-r.left}px`);card.style.setProperty("--card-y",`${e.clientY-r.top}px`);if(!matchMedia("(pointer: fine)").matches||matchMedia("(prefers-reduced-motion: reduce)").matches)return;const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(1000px) rotateX(${-y*3}deg) rotateY(${x*3.5}deg) translateY(-4px)`});
    card.addEventListener("pointerleave",()=>{card.style.transform=""});
  });
}
function setupMagneticButtons(){
  if(!matchMedia("(pointer: fine)").matches)return;
  document.querySelectorAll(".magnetic").forEach(btn=>{btn.addEventListener("pointermove",e=>{const r=btn.getBoundingClientRect();btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.1}px,${(e.clientY-r.top-r.height/2)*.14}px)`});btn.addEventListener("pointerleave",()=>btn.style.transform="")});
}
function setupReveal(){
  const items=document.querySelectorAll(".reveal");if(matchMedia("(prefers-reduced-motion: reduce)").matches){items.forEach(i=>i.classList.add("is-visible"));return}
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");io.unobserve(e.target)}}),{threshold:.1});items.forEach(i=>io.observe(i));
}
