// src/scripts/main.ts
// Temporizador de cuenta regresiva
function updateCountdown() {
  const tourDate = new Date('2025-09-27T00:00:00').getTime();
  const now = new Date().getTime();
  const difference = tourDate - now;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  const countdown = document.getElementById('countdown') as HTMLElement;
  countdown.innerHTML = `${days}d ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  if (difference < 0) {
    countdown.innerHTML = '¡YA ESTÁ AQUÍ!';
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

function showGalleryYear(year: string, event?: MouseEvent) {
  document.querySelectorAll('.gallery-btn').forEach(btn => {
    if (btn instanceof HTMLElement) {
      btn.classList.remove('active', 'bg-purple-600', 'text-white');
      btn.classList.add('bg-gray-300', 'text-gray-700');
    }
  });

  if (event && event.target instanceof HTMLElement) {
    event.target.classList.remove('bg-gray-300', 'text-gray-700');
    event.target.classList.add('active', 'bg-purple-600', 'text-white');
  }

  console.log(`Mostrando galería para el año: ${year}`);
}

// Funcionalidad del modal
function openModal(imageId: string) {
  const modal = document.getElementById('imageModal') as HTMLElement;
  const modalImg = document.getElementById('modalImage') as HTMLImageElement;
  const caption = document.getElementById('caption') as HTMLElement;

  const imageMap: { [key: string]: string } = {
    'gallery1': '/gallery1.jpg',
    'gallery2': '/gallery2.jpg',
    'gallery3': '/gallery3.jpg',
    'gallery4': '/gallery4.jpg',
    'gallery5': '/gallery5.jpg'
  };

  modal.style.display = 'block';
  modalImg.src = imageMap[imageId] || '/default-image.jpg';
  caption.innerHTML = `Imagen de la galería del Vibras Tour - ${imageId.replace('gallery', '2024 Imagen ')}`;
}

// Cerrar modal
const closeButton = document.querySelector('.close') as HTMLElement;
if (closeButton) {
  closeButton.onclick = function() {
    const modal = document.getElementById('imageModal') as HTMLElement;
    modal.style.display = 'none';
  };
}

window.onclick = function(event) {
  const modal = document.getElementById('imageModal') as HTMLElement;
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Desplazamiento suave para enlaces de navegación
// src/scripts/main.ts (líneas relevantes)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  if (anchor instanceof HTMLElement) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      if (href) {
        const target = document.querySelector(href);
        if (target instanceof HTMLElement) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  }
});

// Toggle de menú móvil
const mobileMenuButton = document.getElementById('mobile-menu-button') as HTMLElement;
const mobileNav = document.getElementById('mobile-nav') as HTMLElement;
let mobileMenuVisible = false;

if (mobileMenuButton && mobileNav) {
  mobileMenuButton.addEventListener('click', function() {
    mobileMenuVisible = !mobileMenuVisible;
    mobileNav.classList.toggle('hidden', !mobileMenuVisible);
    console.log('Menú móvil toggled:', mobileMenuVisible);
  });
}

// Intersection Observer para animaciones en scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && entry.target instanceof HTMLElement) {
      entry.target.classList.add('animate-fade-in');
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Efectos de hover en tarjetas de productos
document.querySelectorAll('.card-hover').forEach(card => {
  if (card instanceof HTMLElement) {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  }
});

// Botones de desplazamiento en galería
function scrollGallery(direction: string) {
  const gallery = document.querySelector('.gallery-slider') as HTMLElement;
  const scrollAmount = 320;

  if (direction === 'left') {
    gallery.scrollLeft -= scrollAmount;
  } else {
    gallery.scrollLeft += scrollAmount;
  }
}

// Lazy loading para imágenes
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src || '';
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Slider de patrocinadores con pausa en hover
const sponsorSlider = document.querySelector('.slider-track') as HTMLElement;
if (sponsorSlider) {
    sponsorSlider.addEventListener('mouseenter', () => {
        sponsorSlider.style.animationPlayState = 'paused';
    });
    sponsorSlider.addEventListener('mouseleave', () => {
        sponsorSlider.style.animationPlayState = 'running';
    });
}

// Validación de email
function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Estados de carga
function showLoading(button: HTMLButtonElement) {
  const originalText = button.innerHTML;
  button.innerHTML = '<span class="animate-spin">⏳</span> Cargando...';
  button.disabled = true;

  setTimeout(() => {
    button.innerHTML = originalText;
    button.disabled = false;
  }, 1500);
}

// Debounce para eventos de scroll
function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: any[]) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Manejador de scroll optimizado
const handleScroll = debounce(() => {
    const scrolled = window.pageYOffset;
    const header = document.querySelector('header') as HTMLElement;

    if (scrolled > 100) {
        header.classList.add('backdrop-blur-lg', 'bg-opacity-95', 'py-2'); // Reduce altura y aumenta opacidad
        header.classList.remove('py-4'); // Restaura altura original
    } else {
        header.classList.remove('backdrop-blur-lg', 'bg-opacity-95', 'py-2');
        header.classList.add('py-4'); // Vuelve a altura original
    }

    // Ocultar/Subir al scroll hacia abajo
    let lastScroll = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > lastScroll) {
            // Scroll hacia abajo
            header.style.transform = 'translateY(-100%)'; // Oculta el header
        } else {
            // Scroll hacia arriba
            header.style.transform = 'translateY(0)'; // Muestra el header
        }
        lastScroll = currentScroll <= 0 ? 0 : currentScroll; // Evita valores negativos
    }, { passive: true });
}, 10);

window.addEventListener('scroll', handleScroll);

// generador de nombres
import html2canvas from "html2canvas";

function generarNombreVibras() {
  const form = document.getElementById("form-nombre") as HTMLFormElement;
  const input = document.getElementById("input-nombre") as HTMLInputElement;
  const output = document.getElementById("nombre-renderizado") as HTMLElement;
  const btnDescarga = document.getElementById("descargar-btn") as HTMLButtonElement;

  if (!form || !input || !output || !btnDescarga) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = input.value.trim();
    if (!nombre) return;

    output.innerHTML = "";

    for (const letra of nombre) {
      const span = document.createElement("span");

      if (letra.toLowerCase() === "i") {
        const img = document.createElement("img");
        img.src = "/icons/rayo.png";
        img.alt = "rayo";
        img.className = "w-6 h-6 inline-block align-middle";
        span.appendChild(img);
      } else {
        span.textContent = letra;
        span.className = "font-vibras text-6xl";
      }

      output.appendChild(span);
    }

    // Añadir carita al final
    const cara = document.createElement("img");
    cara.src = "/img/cara.png";
    cara.alt = "carita";
    cara.className = "w-10 h-10 inline-block align-middle ml-2";
    output.appendChild(cara);

    // Mostrar botón de descarga
    btnDescarga.classList.remove("hidden");
  });

  btnDescarga.addEventListener("click", () => {
    html2canvas(output, { scale: 2 }).then((canvas) => {
      const link = document.createElement("a");
      link.download = "nombre-vibrastour.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  generarNombreVibras();
});

