// pages/download-image.tsx
"use client";
const DownloadImages = ({
  imageData,
}: {
  imageData: { title: string; images: string[] };
}) => {
  // Array of image URLs, names, and titles

  const downloadImage = async (imageUrl: string, imageName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = imageName; // Name of the downloaded file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up the URL object
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  const downloadAllImages = () => {
    // images.forEach((image, index) => {
    //   const indexedName = `${image.title}-${index + 1}.jpg`;
    //   downloadImage(image.url, indexedName);
    // });
    imageData.images.forEach((imageUrl, index) => {
      const indexedName = `${imageData.title}-${index + 1}.jpg`; // Adding index to title
      downloadImage(imageUrl, indexedName);
    });
  };

  return (
    <button
      onClick={downloadAllImages}
      className="bg-green-500 rounded text-white px-10 py-2 w-full my-2"
    >
      Download all images
    </button>
  );
};

export default DownloadImages;
