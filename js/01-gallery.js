import { galleryItems } from './gallery-items.js';
// Change code below this line


const gallery = document.querySelector('.gallery');

// Создание и рендер разметки по массиву данных galleryItems
const createGalleryItem = ({ preview, original, description }) => {
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery__item');

  const link = document.createElement('a');
  link.classList.add('gallery__link');
  link.href = original;

  const image = document.createElement('img');
  image.classList.add('gallery__image');
  image.src = preview;
  image.dataset.source = original;
  image.alt = description;

  link.appendChild(image);
  galleryItem.appendChild(link);

  return galleryItem;
};

const renderGallery = (items) => {
  const galleryItems = items.map(item => createGalleryItem(item));
  gallery.append(...galleryItems);
};

renderGallery(galleryItems);

// Реализация делегирования на ul.gallery и получение url большого изображения
const openModal = event => {
  event.preventDefault();

  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const largeImageUrl = event.target.dataset.source;
  const instance = basicLightbox.create(`<img src="${largeImageUrl}">`);

  instance.show();

  // Закрытие модального окна по нажатию клавиши Escape
  const handleKeyPress = event => {
    if (event.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', handleKeyPress);
    }
  };

  window.addEventListener('keydown', handleKeyPress);
};

gallery.addEventListener('click', openModal);
console.log(galleryItems);
