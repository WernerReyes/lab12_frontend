import axios from 'axios';
import './style.css';


const autor = document.createElement('div');
autor.classList.add('autor');
autor.innerHTML = `<h1>Werner Reyes Pilco</h1>`;

const dropArea = document.createElement('div');
dropArea.classList.add('drop-area');
dropArea.innerHTML = `
  <h2>Drag & Drop to Upload File</h2>
  <p>or</p>
  <input type="file" id="fileElem" multiple accept="image/*">
  <label class="button" for="fileElem">Select some files</label>
`;


document.body.appendChild(autor);
document.body.appendChild(dropArea);

const fileInput = document.getElementById('fileElem');

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, () => {
    dropArea.classList.add('highlight');
  }, false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, () => {
    dropArea.classList.remove('highlight');
  }, false);
});

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;

  handleFiles(files);
}

fileInput.addEventListener('change', (e) => {
  const files = e.target.files;
  handleFiles(files);
});

function handleFiles(files) {
  ([...files]).forEach(uploadFile);
}

function uploadFile(file) {
  const url = import.meta.env.VITE_API_URL + '/upload';
  const formData = new FormData();
  formData.append('file', file);

  axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => {
    console.log('File uploaded successfully', response.data);
    alert('File uploaded successfully');
  }).catch(error => {
    console.error('Error uploading file', error);
  });
}
