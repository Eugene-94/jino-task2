const uploaders = document.querySelectorAll('.uploader');

const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const checkFile = (eventInfo) => {
  const state = eventInfo;
  if (state.file.type !== 'image/jpg' && state.file.type !== 'image/jpeg') {
    state.container.querySelector('.state-img img').textContent = 'Выберите изображение формата jpg';
    return false;
  }
  return true;
};

const finishLoading = (eventInfo) => {
  const state = eventInfo;
  const info = state.container.querySelector('.info');
  state.container.querySelector('.state-img img').src = 'img/wait.svg';
  info.textContent = `${state.file.name} (${(state.file.size / 1000).toFixed(2)}Кб)`;
  state.container.querySelector('.upload-link').textContent = 'Файл загружен';
  state.container.querySelector('.upload-link').setAttribute('style', 'text-decoration: none');
  state.container.querySelector('.state').textContent = 'Идет проверка';
};

const check = (eventInfo) => {
  const state = eventInfo;
  const info = state.container.querySelector('.info');
  if (state.status) {
    state.container.querySelector('.state-img img').src = 'img/ok.svg';
    state.container.querySelector('.state').textContent = 'Проверено';
    state.container.querySelector('.state').setAttribute('style', 'color: #7fa050');
  } else {
    state.container.querySelector('.state-img img').src = 'img/upload.svg';
    state.container.querySelector('.state').textContent = 'Отклонено';
    state.container.querySelector('.state').setAttribute('style', 'color: #c43524');
    info.textContent = 'Размер файла не более 5Мб';
  }
  state.container.querySelector('.upload-link').textContent = state.uploaderName;
};

uploaders.forEach((uploader) => {
  uploader.addEventListener('change', () => {
    const eventInfo = {
      container: uploader.closest('.upload-section'),
      uploaderName: uploader.closest('.upload-section').querySelector('.upload-link').textContent,
      file: uploader.files[0],
      status: getRandom(0, 1),
    };

    if (!checkFile(eventInfo)) return;
    eventInfo.container.querySelector('.state-img img').src = 'img/loading.gif';
    setTimeout(finishLoading, 3000, eventInfo);
    setTimeout(check, 6000, eventInfo);
  });
});
