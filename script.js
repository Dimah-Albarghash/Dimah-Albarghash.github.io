
const portfolioLinks = {
  email: "mailto:dimahalbarghash@gmail.com",
  phone: "tel:+966540939105",
  linkedin: "https://www.linkedin.com/in/dimah-albarghash-587035330/",
  projects: {
    bpm: "https://drive.google.com/file/d/1BKBQOTHNAY8_CHvKKdnuyzvly50h97U-/view?usp=share_link",
    ownBakery: "https://drive.google.com/file/d/1KGCBSqz93QB4b1gUlFi2EIq8U-iud7eZ/view?usp=share_link",
    hirak: "https://drive.google.com/file/d/1uXujJ9HGB14qwPJ5scUjE_9EfHPzLkF5/view?usp=share_link",
    hirakWebsite: "https://vr-motion-mimic.lovable.app",
    steam: "https://drive.google.com/file/d/1ruWsE0Xj97GPAgSw6F1E9NKfAFM5gbnl/view?usp=share_link",
    pureRay: "https://drive.google.com/file/d/1a8fyGaWwsZmsxpB0CthmD2psuZIQH2OI/view?usp=share_link",
    pureRayWebsite: "https://pure-ray.lovable.app",
    unemployment: "https://drive.google.com/file/d/1ZzBRHUojHg2FmkEqYoPYECKUqopB03-u/view?usp=share_link",
    peakGym: "https://drive.google.com/file/d/1QjiIhf0Dx5eCm6Owwuj82NYpWOUztzg1/view?usp=share_link",
    erpNext: "https://drive.google.com/file/d/1nNJ8Tcy3_ufv10EJCpEDgqieKGUllYjN/view?usp=share_link"
  }
};

document.addEventListener("DOMContentLoaded", () => {
  setupMobileNav();
  setupCursor();
  setupNameInteraction();
  setupInteractiveCards();
  setupMagneticButtons();
  setupReveal();
  setupPageTransitions();
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
function setupCursor(){
  if(!matchMedia("(pointer: fine)").matches)return;
  let raf;
  addEventListener("pointermove",e=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{document.documentElement.style.setProperty("--mx",`${e.clientX}px`);document.documentElement.style.setProperty("--my",`${e.clientY}px`)})},{passive:true});
}

function setupNameInteraction(){
  const name=document.querySelector(".display-name");
  if(!name||!matchMedia("(pointer: fine)").matches)return;
  name.addEventListener("pointermove",e=>{
    const r=name.getBoundingClientRect();
    const x=Math.max(0,Math.min(100,((e.clientX-r.left)/r.width)*100));
    const y=Math.max(0,Math.min(100,((e.clientY-r.top)/r.height)*100));
    name.style.setProperty("--name-x",`${x}%`);
    name.style.setProperty("--name-y",`${y}%`);
  });
  name.addEventListener("pointerleave",()=>{
    name.style.setProperty("--name-x","50%");
    name.style.setProperty("--name-y","50%");
  });
}

function setupInteractiveCards(){
  document.querySelectorAll(".interactive-card").forEach(card=>{
    card.addEventListener("pointermove",e=>{
      const r=card.getBoundingClientRect();card.style.setProperty("--card-x",`${e.clientX-r.left}px`);card.style.setProperty("--card-y",`${e.clientY-r.top}px`);
      if(!matchMedia("(pointer: fine)").matches||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
      const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(1000px) rotateX(${-y*3.5}deg) rotateY(${x*4}deg) translateY(-4px)`;
    });
    card.addEventListener("pointerleave",()=>{card.style.transform=""});
  });
}
function setupMagneticButtons(){
  if(!matchMedia("(pointer: fine)").matches)return;
  document.querySelectorAll(".magnetic").forEach(btn=>{
    btn.addEventListener("pointermove",e=>{const r=btn.getBoundingClientRect();btn.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.1}px,${(e.clientY-r.top-r.height/2)*.14}px)`});
    btn.addEventListener("pointerleave",()=>btn.style.transform="");
  });
}
function setupReveal(){
  const items=document.querySelectorAll(".reveal");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches){items.forEach(i=>i.classList.add("is-visible"));return}
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");io.unobserve(e.target)}}),{threshold:.12});items.forEach(i=>io.observe(i));
}
function setupPageTransitions(){
  document.querySelectorAll("a[data-page-link]").forEach(link=>link.addEventListener("click",e=>{
    if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||link.target==="_blank")return;
    const u=new URL(link.href,location.href);if(u.origin!==location.origin||u.pathname===location.pathname)return;
    e.preventDefault();document.body.classList.add("is-leaving");setTimeout(()=>location.href=link.href,170);
  }));
}
