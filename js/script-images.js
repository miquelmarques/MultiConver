function previewImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.getElementById('previewImage');
        img.src = e.target.result;
        document.getElementById('preview-container').classList.remove('hidden');
    };
    reader.readAsDataURL(file);
}

function convertImage() {
    const img = document.getElementById('previewImage');
    const format = document.getElementById('formatSelect').value;
    
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    const dataUrl = canvas.toDataURL(format);
    const link = document.createElement('a');
    
    // Generate a filename based on format
    const extension = format.split('/')[1];
    link.download = `converted-image.${extension}`;
    link.href = dataUrl;
    link.click();
}
