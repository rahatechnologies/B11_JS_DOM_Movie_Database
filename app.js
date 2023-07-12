//========================================//
//addMovieModal
//========================================//

// way 1
// performance best
const addMovieModal = document.getElementById('add-modal');

// Way2
// non static node
// const addMovieModal2 = document.querySelector('#add-modal');

// way3
// select first modal only
// const addMovieModal3 = document.querySelector('.modal');

// way4
// Dom Traversal (risky)
// const addMovieModal4 = document.body.children[1];

//========================================//
//startAddmovieButton
//========================================//
// way1
const startAddmovieButton = document.querySelector('header button');

// way2
// performance not good than css child selector
// const startAddmovieButton2 = document.querySelector('header').lastElementChild;

//========================================//
//backdrop
//========================================//
const backdrop = document.getElementById('backdrop');

//========================================//
//Modal cancel button
//========================================//
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive');

//========================================//
//Modal Add button
//========================================//
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;

//========================================//
//Modal input
//========================================//
const userInputs = addMovieModal.querySelectorAll('input');
// const userInputs2 = addMovieModal.getElementsByTagName('input');

const entryTextSection = document.getElementById('entry-text');

const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const toggleBackDrop = () => {
  backdrop.classList.toggle('visible');
};

// const toggleMovieModal = () => {
//   // addMovieModal.className = 'modal visible'
//   toggleBackDrop();
//   addMovieModal.classList.toggle('visible');
// };

const showMovieModal = () => {
  // addMovieModal.className = 'modal visible'
  toggleBackDrop();
  addMovieModal.classList.add('visible');
};

const closeMovieModal = () => {
  addMovieModal.classList.remove('visible');
};

const backdropClickHandler = () => {
  closeMovieModal();
  cancelMovieDeletion();
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  clearMovieInput();
};

const addMovieHandler = () => {
  console.log(userInputs);

  const titleValue = userInputs[0].value;
  const imageUrl = userInputs[1].value;
  const rating = userInputs[2].value;

  // user input validation
  if (
    titleValue.trim() === '' ||
    imageUrl.trim() === '' ||
    rating.trim() === '' ||
    +rating < 1 ||
    +rating > 5
  ) {
    alert('Please enter valid values(rating between 1 and 5). ');
    return;
  }

  //  create new movie element
  const newMovie = {
    id: Math.random().toString(),
    titleValue,
    imageUrl,
    rating,
  };

  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackDrop();
  clearMovieInput();

  // cancelAddMovieHandler();

  renderNewMovieElement(
    newMovie.id,
    newMovie.titleValue,
    newMovie.imageUrl,
    newMovie.rating
  );
  updateUI();
};

const clearMovieInput = () => {
  for (const userinput of userInputs) {
    userinput.value = '';
  }
};

const deleteMovieHandler = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    console.log(`movie.id ${movie.id}`);
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  console.log(`moviIndex is ${movieIndex}`);

  let spliceOutput = movies.splice(movieIndex, 1);
  console.log(`output of splice ${spliceOutput.toString}`);

  const listRoot = document.getElementById('movie-list');
  listRoot.children[movieIndex].remove();
  // listRoot.removeChild(listRoot.children[movieIndex + 1]);

  console.dir(listRoot);
  console.log(movies);
};

const closeMovieDeletionModal = () => {
  toggleBackDrop();
  deleteMovieModal.classList.remove('visible');
};

const startDeleteMovieHandler = (movieId) => {
  // Moving to global scope
  // const deleteMovieModal = document.getElementById('delete-modal');

  toggleBackDrop();
  deleteMovieModal.classList.add('visible');
  // deleteMovie(movieId);

  const cancelDeletionButton = deleteMovieModal.querySelector('.btn--passive');
  const confirmDeletionButton = deleteMovieModal.querySelector('.btn--danger');

  cancelDeletionButton.addEventListener('click', closeMovieDeletionModal);

  confirmDeletionButton.addEventListener(
    'click',
    deleteMovieHandler.bind(null, movieId)
  );
};

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';

  newMovieElement.innerHTML = `
  <div class="movie-element__image">
    <img src="${imageUrl}" alt="${title}">
  </div>
  <div class="movie-element__info">
  <h2>${title}</h2>
  <p>${rating}/5 stars</p>
  </div>
  `;

  newMovieElement.addEventListener(
    'click',
    startDeleteMovieHandler.bind(null, id)
  );

  const listRoot = document.getElementById('movie-list');

  listRoot.append(newMovieElement);
};

const cancelMovieDeletion = () => {
  toggleBackDrop();
  deleteMovieModal.classList.remove('visible');
};

startAddmovieButton.addEventListener('click', showMovieModal);
cancelAddMovieButton.addEventListener('click', cancelAddMovieHandler);

confirmAddMovieButton.addEventListener('click', addMovieHandler);

backdrop.addEventListener('click', backdropClickHandler);
