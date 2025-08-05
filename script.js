window.onload = function () {
  // Set a timeout to hide the loader and show the content
  setTimeout(function () {
    // Hide the loader
    document.querySelector(".loader").style.display = "none";

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach(function (element) {
      element.classList.remove("hidden");
    });
  }, 5500); // 5000 milliseconds = 5 seconds
};
window.onload = function () {
  const greetings = [
    "Hello!",
    "Hola!",
    "Xin Chao!",
    "Bonjour!",
    "Ciao!",
    "Hallo!",
    "こんにちは!",
    "안녕하세요!",
    "Merhaba!",
    "Привет!",
    "Olá!",
    "Namaste!",
    "Здравствуйте!",
  ];

  let index = 0;
  const greetingTextElement = document.querySelector(".greeting-text");

  const changeGreeting = () => {
    greetingTextElement.innerText = greetings[index];
    index = (index + 1) % greetings.length; // Loop back to the first greeting
  };

  // Change greeting every 1 second (1000 ms)
  const greetingInterval = setInterval(changeGreeting, 800);

  // Hide the loader and show content after 5 seconds
  setTimeout(() => {
    clearInterval(greetingInterval); // Stop changing greetings
    document.querySelector(".loader").style.display = "none";

    // Show all elements with the 'hidden' class
    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach(function (element) {
      element.classList.remove("hidden");
    });
  }, 5500);

  // Show the initial greeting
  changeGreeting();
};
document
  .querySelector(".hamburger-icon")
  .addEventListener("click", function () {
    const menuLinks = document.querySelector(".menu-links");
    const hamburgerIcon = document.querySelector(".hamburger-icon");

    // Toggle open class for both menu and icon
    menuLinks.classList.toggle("open");
    hamburgerIcon.classList.toggle("open");
  });

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");

  const options = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, options);

  sections.forEach((section) => {
    observer.observe(section);
  });
});

const roles = ["Marketing Intern", "Thực tập Marketing"];
let currentRoleIndex = 0;
let currentText = "";
let isDeleting = false;
const speed = 100; // typing speed in milliseconds
const pauseTime = 2000; // pause time before switching

function typeText() {
  const roleElement = document.getElementById("developer-role");
  const fullText = roles[currentRoleIndex];

  if (isDeleting) {
    // Remove characters one by one
    currentText = fullText.substring(0, currentText.length - 1);
  } else {
    // Add characters one by one
    currentText = fullText.substring(0, currentText.length + 1);
  }

  roleElement.textContent = currentText;

  // Dynamically set the width of the text as it's typed
  roleElement.style.width = `${currentText.length}ch`;

  // Adjust speed depending on adding or deleting characters
  let typingSpeed = isDeleting ? speed / 2 : speed;

  if (!isDeleting && currentText === fullText) {
    // Pause before deleting
    typingSpeed = pauseTime;
    isDeleting = true;
  } else if (isDeleting && currentText === "") {
    // Switch to next role
    isDeleting = false;
    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
    typingSpeed = 500; // Small pause before typing the next role
  }

  setTimeout(typeText, typingSpeed);
}

// Start typing effect
document.addEventListener("DOMContentLoaded", () => {
  typeText();
});

// Gallery navigation function
function scrollGallery(direction, button) {
  const gallery = button.parentElement.querySelector(".project-gallery");
  const scrollAmount = 220; // Width of one item + gap

  if (direction === "next") {
    gallery.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  } else {
    gallery.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  }
}

// Function to open Google Drive links
function openDriveLink(projectType) {
  const driveLinks = {
    event:
      "https://drive.google.com/drive/folders/10L2o-TB4lL9b5KNblIZoQNWL4Ul0-QBP?usp=sharing",
    healthskin:
      "https://drive.google.com/drive/folders/1nz-1TOv7Uzbk5QBMUYwLoWz_bMRaYxsA?usp=sharing",
  };

  const link = driveLinks[projectType];
  if (link) {
    window.open(link, "_blank");
  }
}

// Add scroll detection for galleries
document.addEventListener("DOMContentLoaded", function () {
  const galleries = document.querySelectorAll(".project-gallery");

  galleries.forEach((gallery) => {
    const seeMoreBtn = gallery.parentElement.querySelector(".see-more-btn");

    gallery.addEventListener("scroll", function () {
      // Check if scrolled to the end of the gallery
      const scrollPosition = gallery.scrollLeft;
      const maxScroll = gallery.scrollWidth - gallery.clientWidth;
      const threshold = 50; 

      if (scrollPosition >= maxScroll - threshold) {
        seeMoreBtn.classList.add("show");
      } else {
        seeMoreBtn.classList.remove("show");
      }
    });

    // Also check on load
    const scrollPosition = gallery.scrollLeft;
    const maxScroll = gallery.scrollWidth - gallery.clientWidth;
    const threshold = 50;

    if (scrollPosition >= maxScroll - threshold) {
      seeMoreBtn.classList.add("show");
    }
  });
});

// Add keyboard navigation for galleries
document.addEventListener("DOMContentLoaded", function () {
  const galleries = document.querySelectorAll(".project-gallery");

  galleries.forEach((gallery) => {
    gallery.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        gallery.scrollBy({
          left: -220,
          behavior: "smooth",
        });
      } else if (e.key === "ArrowRight") {
        gallery.scrollBy({
          left: 220,
          behavior: "smooth",
        });
      }
    });
  });
});

// Add touch/swipe support for mobile
document.addEventListener("DOMContentLoaded", function () {
  const galleries = document.querySelectorAll(".project-gallery");

  galleries.forEach((gallery) => {
    let startX = 0;
    let scrollLeft = 0;

    gallery.addEventListener("touchstart", function (e) {
      startX = e.touches[0].pageX - gallery.offsetLeft;
      scrollLeft = gallery.scrollLeft;
    });

    gallery.addEventListener("touchmove", function (e) {
      if (!startX) return;
      const x = e.touches[0].pageX - gallery.offsetLeft;
      const walk = (x - startX) * 2;
      gallery.scrollLeft = scrollLeft - walk;
    });

    gallery.addEventListener("touchend", function () {
      startX = 0;
    });
  });
});

// Modal functionality
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".close-btn");

  // Get all gallery images
  const galleryImages = document.querySelectorAll(".gallery-item img");

  // Add click event to all gallery images
  galleryImages.forEach((img) => {
    img.addEventListener("click", function () {
      openModal(this.src, this.alt);
    });
  });

  // Function to open modal
  function openModal(imgSrc, imgAlt) {
    modalImg.src = imgSrc;
    modalImg.alt = imgAlt;
    modal.style.display = "block";

    // Add show class after a small delay for smooth animation
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  }

  // Function to close modal
  function closeModal() {
    modal.classList.remove("show");

    // Hide modal after animation completes
    setTimeout(() => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }, 300);
  }

  // Close modal when clicking the close button
  closeBtn.addEventListener("click", closeModal);

  // Close modal when clicking outside the image
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.style.display === "block") {
      closeModal();
    }
  });

  // Add keyboard navigation for modal images
  let currentImageIndex = 0;
  let allImages = [];

  // Update allImages array when modal opens
  function updateImageArray(clickedImg) {
    const gallery = clickedImg.closest(".project-gallery");
    if (gallery) {
      allImages = Array.from(gallery.querySelectorAll("img"));
      currentImageIndex = allImages.indexOf(clickedImg);
    }
  }

  // Navigate to next/previous image
  function navigateImage(direction) {
    if (allImages.length === 0) return;

    if (direction === "next") {
      currentImageIndex = (currentImageIndex + 1) % allImages.length;
    } else {
      currentImageIndex =
        currentImageIndex === 0 ? allImages.length - 1 : currentImageIndex - 1;
    }

    const nextImg = allImages[currentImageIndex];
    openModal(nextImg.src, nextImg.alt);
  }

  // Add arrow key navigation
  document.addEventListener("keydown", function (e) {
    if (modal.style.display === "block") {
      if (e.key === "ArrowRight") {
        navigateImage("next");
      } else if (e.key === "ArrowLeft") {
        navigateImage("prev");
      }
    }
  });

  // Update the openModal function to include image array update
  const originalOpenModal = openModal;
  openModal = function (imgSrc, imgAlt, clickedImg) {
    if (clickedImg) {
      updateImageArray(clickedImg);
    }
    originalOpenModal(imgSrc, imgAlt);
  };

  // Update click event listeners to pass the clicked image
  galleryImages.forEach((img) => {
    img.addEventListener("click", function () {
      openModal(this.src, this.alt, this);
    });
  });
});
