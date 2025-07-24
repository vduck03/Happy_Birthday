document.addEventListener('DOMContentLoaded', function() {
  const gallery = document.querySelector('.gallery');
  const container = document.querySelector('.gallery-container');
  const images = gallery.querySelectorAll('img');
  const totalImages = images.length;
  const visibleCount = 6;
  let currentIndex = 0;
  let slideInterval;
  const delay = 3000;

  // Tính toán kích thước container
  const imageWidth = 150;
  const imageMargin = 10;
  container.style.width = `${visibleCount * (imageWidth + imageMargin * 2)}px`;

  // Cập nhật vị trí slide
  function updateSlide() {
    const offset = -currentIndex * (imageWidth + imageMargin * 2);
    gallery.style.transform = `translateX(${offset}px)`;
  }

  // Chuyển slide tiếp theo
  function nextSlide() {
    if (currentIndex < totalImages - visibleCount) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSlide();
    resetInterval();
  }

  // Về slide trước
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = totalImages - visibleCount;
    }
    updateSlide();
    resetInterval();
  }

  // Tự động chuyển slide
  function startInterval() {
    slideInterval = setInterval(nextSlide, delay);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }

  // Gắn sự kiện nút
  document.querySelector('.next').addEventListener('click', nextSlide);
  document.querySelector('.prev').addEventListener('click', prevSlide);

  // Khởi tạo
  startInterval();

  // Xử lý phóng to ảnh
  const modal = document.createElement('div');
  modal.className = 'modal';
  const modalImg = document.createElement('img');
  modalImg.className = 'modal-content';
  modal.appendChild(modalImg);
  document.body.appendChild(modal);

  images.forEach(img => {
    img.addEventListener('click', () => {
      modal.style.display = 'flex';
      modalImg.src = img.src;
      clearInterval(slideInterval);
    });
  });

  modal.addEventListener('click', () => {
    modal.style.display = 'none';
    startInterval();
  });
});