/*
 * Filename: advanced_image_gallery.js
 * Content: Advanced Image Gallery with Search Functionality
 * Author: John Doe
 * Date: 2022-01-01
 * Description: This code implements a sophisticated, elaborate, and complex image gallery with search functionality.
 */

// ImageGallery class represents an advanced image gallery
class ImageGallery {
  constructor(selector, images) {
    this.galleryElement = document.querySelector(selector);
    this.images = images;
    this.filteredImages = images;

    this.renderGallery();
    this.addSearchListener();
  }

  // Render the gallery based on the filtered images
  renderGallery() {
    this.galleryElement.innerHTML = '';

    for (const image of this.filteredImages) {
      const imgElement = document.createElement('img');
      imgElement.src = image.url;
      imgElement.alt = image.caption;

      const figureElement = document.createElement('figure');
      figureElement.appendChild(imgElement);

      const figcaptionElement = document.createElement('figcaption');
      figcaptionElement.textContent = image.caption;
      figureElement.appendChild(figcaptionElement);

      this.galleryElement.appendChild(figureElement);
    }
  }

  // Add search listener to the search input field
  addSearchListener() {
    const searchInput = document.querySelector('#search-input');

    searchInput.addEventListener('input', () => {
      const searchText = searchInput.value.toLowerCase();
      this.filteredImages = this.images.filter((image) =>
        image.caption.toLowerCase().includes(searchText)
      );

      this.renderGallery();
    });
  }
}

// Predefined array of images
const images = [
  { url: 'image1.jpg', caption: 'Beautiful Scenery' },
  { url: 'image2.jpg', caption: 'Nature Landscape' },
  { url: 'image3.jpg', caption: 'City Street at Night' },
  { url: 'image4.jpg', caption: 'Abstract Artwork' },
  { url: 'image5.jpg', caption: 'Sunset on the Beach' },
  // More images...
  // ...
];

// Create an instance of the ImageGallery class
const imageGallery = new ImageGallery('#gallery', images);
