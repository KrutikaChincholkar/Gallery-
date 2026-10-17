const photos = [
  {title:"A little coffee ritual",category:"SLOW LIVING",tag:"Morning light",image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85",color:"#6c472d"},
  {title:"The quiet in-between",category:"SMALL MOMENTS",tag:"A slower morning",image:"https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1000&q=85",color:"#806043"},
  {title:"Made with intention",category:"THE EVERYDAY",tag:"Little details",image:"https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=85",color:"#4b3829"},
  {title:"A table for two",category:"SLOW LIVING",tag:"Gather together",image:"https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",color:"#75533c"},
  {title:"Golden hour, always",category:"OUT OF OFFICE",tag:"Chasing the sun",image:"https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1000&q=85",color:"#987044"},
  {title:"A space to breathe",category:"SPACES & PLACES",tag:"Home inspiration",image:"https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=85",color:"#a58c70"},
  {title:"Soft shapes, wild things",category:"LITTLE WONDERS",tag:"Art & objects",image:"https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1000&q=85",color:"#665b85"},
  {title:"Somewhere by the sea",category:"OUT OF OFFICE",tag:"Open horizons",image:"https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=85",color:"#496b7d"},
  {title:"The art of doing less",category:"SLOW LIVING",tag:"A moment to pause",image:"https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1000&q=85",color:"#4d3a2b"},
  {title:"A room of our own",category:"SPACES & PLACES",tag:"Collected interiors",image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85",color:"#8d7c68"},
  {title:"Colour outside the lines",category:"LITTLE WONDERS",tag:"Unexpected beauty",image:"https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=85",color:"#536d9c"},
  {title:"Where the day ends",category:"OUT OF OFFICE",tag:"Golden landscapes",image:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85",color:"#6d7656"}
];
let current = 0;
const $ = id => document.getElementById(id);
const mainImage = $("mainImage"), mainPhoto = $("mainPhoto");
const backCards = [...document.querySelectorAll(".card-back")];
let toastTimer;
function padded(n){return String(n+1).padStart(2,"0")}
function paint(){
  const p=photos[current], prev=photos[(current-1+photos.length)%photos.length], next=photos[(current+1)%photos.length];
  mainImage.src=p.image; mainImage.alt=p.title;
  $("photoTitle").textContent=p.title; $("photoCategory").textContent=p.category;
  $("currentTitle").textContent=p.title;
  $("stageIndex").innerHTML=`${padded(current)} <i>/</i> ${photos.length}`;
  $("slideCounter").textContent=`${padded(current)} / ${photos.length}`;
  $("sliderProgress").style.width=`${((current+1)/photos.length)*100}%`;
  $("sliderThumb").style.left=`${((current+1)/photos.length)*100}%`;
  $("sliderTrack").setAttribute("aria-valuenow",current+1);
  $("imageCount").textContent=`${photos.length} moments`;
  backCards.forEach(card=>{
    const offset=Number(card.dataset.offset), idx=(current+offset+photos.length)%photos.length;
    card.style.setProperty("--card-color",photos[idx].color);
    card.style.backgroundColor=photos[idx].color;
    card.style.setProperty("background-image",`url("${photos[idx].image}")`);
    card.style.backgroundImage=`linear-gradient(0deg,rgba(0,0,0,.04),rgba(0,0,0,.04)),url("${photos[idx].image}")`;
    card.style.backgroundSize="cover";card.style.backgroundPosition="center";
    card.setAttribute("aria-label",photos[idx].title);
  });
  document.querySelectorAll(".thumb-card").forEach((el,i)=>el.classList.toggle("selected",i===current));
  if($("lightbox").classList.contains("open")) paintLightbox();
}
function go(n){current=(n+photos.length)%photos.length;paint()}
function showToast(message){const t=$("toast");t.textContent=message;t.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2200)}
function paintLightbox(){const p=photos[current];$("lightboxImage").src=p.image;$("lightboxImage").alt=p.title;$("lightboxTitle").textContent=p.title;$("lightboxCategory").textContent=p.category}
function openLightbox(){$("lightbox").classList.add("open");$("lightbox").setAttribute("aria-hidden","false");paintLightbox()}
function closeLightbox(){$("lightbox").classList.remove("open");$("lightbox").setAttribute("aria-hidden","true")}
function buildThumbs(){
  $("thumbnailRow").innerHTML=photos.slice(0,4).map((p,i)=>`<button class="thumb-card ${i===0?"selected":""}" data-index="${i}"><img src="${p.image}" alt="" loading="lazy"><div class="thumb-info"><span>${p.category}</span><strong>${p.title}</strong><small>${p.tag}</small></div></button>`).join("");
  $("thumbnailRow").querySelectorAll(".thumb-card").forEach(card=>card.addEventListener("click",()=>go(Number(card.dataset.index))));
}
$("prevBtn").addEventListener("click",()=>go(current-1));
$("nextBtn").addEventListener("click",()=>go(current+1));
mainPhoto.addEventListener("click",openLightbox);
$("closeLightbox").addEventListener("click",closeLightbox);
$("lightboxPrev").addEventListener("click",()=>go(current-1));
$("lightboxNext").addEventListener("click",()=>go(current+1));
$("lightbox").addEventListener("click",e=>{if(e.target===$("lightbox"))closeLightbox()});
document.querySelectorAll(".card-back").forEach(card=>card.addEventListener("click",()=>go(current+Number(card.dataset.offset))));
$("sliderTrack").addEventListener("click",e=>{const r=e.currentTarget.getBoundingClientRect();go(Math.min(photos.length-1,Math.max(0,Math.floor(((e.clientX-r.left)/r.width)*photos.length))))});
$("sliderTrack").addEventListener("keydown",e=>{if(e.key==="ArrowRight"){e.preventDefault();go(current+1)}if(e.key==="ArrowLeft"){e.preventDefault();go(current-1)}});
document.addEventListener("keydown",e=>{if(e.key==="ArrowRight")go(current+1);if(e.key==="ArrowLeft")go(current-1);if(e.key==="Escape")closeLightbox()});
$("shareBtn").addEventListener("click",async()=>{try{if(navigator.share)await navigator.share({title:"Still — Visual Gallery",text:"A visual diary of things worth slowing down for."});else if(navigator.clipboard){await navigator.clipboard.writeText(location.href);showToast("Gallery link copied to clipboard") }else showToast("Your gallery is ready to share");}catch(err){if(err.name!=="AbortError")showToast("Ready to share your gallery")}});
$("searchBtn").addEventListener("click",()=>{const existing=document.querySelector(".search-overlay");if(existing){existing.remove();return}const wrap=document.createElement("div");wrap.className="search-overlay";wrap.innerHTML='<div class="search-box"><input type="search" placeholder="Search moments, places, moods…" aria-label="Search gallery" autofocus /></div>';document.body.appendChild(wrap);const input=wrap.querySelector("input");input.focus();input.addEventListener("input",()=>{const term=input.value.toLowerCase();const found=photos.findIndex(p=>(p.title+" "+p.category+" "+p.tag).toLowerCase().includes(term));if(term&&found>=0)go(found)});wrap.addEventListener("click",e=>{if(e.target===wrap)wrap.remove()});input.addEventListener("keydown",e=>{if(e.key==="Escape")wrap.remove();if(e.key==="Enter"){const term=input.value.toLowerCase();const found=photos.findIndex(p=>(p.title+" "+p.category+" "+p.tag).toLowerCase().includes(term));if(found>=0){go(found);wrap.remove()}else showToast("No matching moments found")}})});
$("gridBtn").addEventListener("click",()=>{document.querySelector(".below-gallery").scrollIntoView({behavior:"smooth",block:"start"});showToast("Explore your collection below")});
$("viewAllBtn").addEventListener("click",()=>{const row=$("thumbnailRow");row.innerHTML=photos.map((p,i)=>`<button class="thumb-card ${i===current?"selected":""}" data-index="${i}"><img src="${p.image}" alt="" loading="lazy"><div class="thumb-info"><span>${p.category}</span><strong>${p.title}</strong><small>${p.tag}</small></div></button>`).join("");row.querySelectorAll(".thumb-card").forEach(card=>card.addEventListener("click",()=>{go(Number(card.dataset.index));$("galleryStage").scrollIntoView({behavior:"smooth",block:"center"})}));$("viewAllBtn").textContent="Showing all 12";});
document.querySelectorAll(".nav-item").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll(".nav-item").forEach(b=>b.classList.remove("active"));btn.classList.add("active");if(btn.textContent.includes("Favourites"))showToast("Your favourite moments will appear here");else if(btn.textContent.includes("Recently")){go(photos.length-1);showToast("Showing your most recent moment")}else{showToast("You're viewing the full gallery")}}));
document.querySelectorAll(".collection").forEach((btn,i)=>btn.addEventListener("click",()=>{go([0,5,6][i]);showToast(btn.textContent.trim().replace(/\d+/g,"").trim()+" collection")}));
buildThumbs();paint();
