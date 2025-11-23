/*======================== toggle icon navbar =================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active');
};

/*======================== Scroll Section =================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(links => links.classList.remove('active'));
      const el = document.querySelector('header nav a[href*=' + id + ']');
      if (el) el.classList.add('active');
    }
  });

  /* sticky navbar */
  let header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);

  /* remove toggle icon and navbar when click navbar link */
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active');
};

/*======================== scroll reveal =================*/
ScrollReveal({
  distance: '80px',
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top'});
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom'});
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left'});
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right'});

/*======================== types js =================*/
const typed = new Typed('.multiple-text', {
  strings: ['Graphic Designers!', 'Creative Thinkers!', 'Brand Builders!'],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

/* ================== Contact form submit (Option A: form-encoded) ================== */

// NOTE: developer/tooling instruction: using the uploaded file path here.
// Replace this with your actual deployed Apps Script web app URL (example: "https://script.google.com/macros/s/AKfy.../exec")
const url = "https://script.google.com/macros/s/AKfycbxnAQ361HLut1Lq810LhwuvlVnvRTF8U3ph4mB0sMTW4cMqKVkbaiMxZPWikSSH92fUdQ/exec"
document.querySelector("#contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;

  // Use URLSearchParams so the body is sent as application/x-www-form-urlencoded
  const formParams = new URLSearchParams(new FormData(form));

  fetch(url, {
    method: "POST",
    body: formParams // no custom Content-Type header -> avoids preflight CORS
  })
  .then(async res => {
    // For debugging: print status and raw text
    console.log('fetch status', res.status, res.statusText);
    const txt = await res.text().catch(() => null);
    console.log('raw response text:', txt);
    try {
      return JSON.parse(txt);
    } catch (err) {
      console.error('Invalid JSON from server:', err);
      return { result: "error", raw: txt };
    }
  })
  .then(obj => {
    if (obj && obj.result === "success") {
      alert("Message has been sent! We will contact you soon!");
      form.reset();
    } else {
      console.warn('Server returned:', obj);
      alert("Oops! Something went wrong.");
    }
  })
  .catch(err => {
    console.error("Fetch error:", err);
    alert("Server error. Please try again later.\n\n" + (err.message || ''));
  });
});
