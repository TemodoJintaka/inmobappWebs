// ============================================
// PROPERTY GALLERY COMPONENT
// ============================================

import React, { useState } from 'react';
import { PropertyImage } from '../../types';

interface PropertyGalleryProps {
  images: PropertyImage[];
  propertyName: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, propertyName }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
        <p className="text-gray-500">No hay imágenes disponibles</p>
      </div>
    );
  }

  const sortedImages = [...images].sort((a, b) => a.order - b.order);
  const selectedImage = sortedImages[selectedIndex];

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div 
          className="relative h-96 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={selectedImage.image}
            alt={`${propertyName} - Imagen ${selectedIndex + 1}`}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
            {selectedIndex + 1} / {sortedImages.length}
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
              Click para ampliar
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        {sortedImages.length > 1 && (
          <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
            {sortedImages.map((image, index) => (
              <div
                key={image.id}
                className={`
                  relative h-20 rounded-lg overflow-hidden cursor-pointer
                  ${selectedIndex === index ? 'ring-4 ring-blue-600' : 'ring-2 ring-gray-200'}
                `}
                onClick={() => setSelectedIndex(index)}
              >
                <img
                  src={image.image}
                  alt={`${propertyName} - Miniatura ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Full Screen Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>

          {/* Previous Button */}
          {selectedIndex > 0 && (
            <button
              className="absolute left-4 text-white text-4xl hover:text-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(selectedIndex - 1);
              }}
            >
              &#8249;
            </button>
          )}

          {/* Next Button */}
          {selectedIndex < sortedImages.length - 1 && (
            <button
              className="absolute right-4 text-white text-4xl hover:text-gray-300"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedIndex(selectedIndex + 1);
              }}
            >
              &#8250;
            </button>
          )}

          {/* Image */}
          <img
            src={selectedImage.image}
            alt={`${propertyName} - Imagen ${selectedIndex + 1}`}
            className="max-h-full max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-lg bg-black bg-opacity-70 px-4 py-2 rounded-full">
            {selectedIndex + 1} / {sortedImages.length}
          </div>
        </div>
      )}
    </>
  );
};

