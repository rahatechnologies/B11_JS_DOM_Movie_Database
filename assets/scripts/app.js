//========================================//
//addMovieModal
//========================================//
// performance best
const addMovieModal = document.getElementById('add-modal');

// non static node
// const addMovieModal2 = document.querySelector('#add-modal');

// select first modal only
// const addMovieModal3 = document.querySelector('.modal');

// Dom Traversal (risky)
// const addMovieModal4 = document.body.children[1];

//========================================//
//startAddmovieButton
//========================================//
const startAddmovieButton = document.querySelector('header button');

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

const toggleBackDrop = () => {
  backdrop.classList.toggle('visible');
};

const toggleMovieModal = () => {
  // addMovieModal.className = 'modal visible'
  toggleBackDrop();
  addMovieModal.classList.toggle('visible');
};

const backdropClickHandler = () => {
  toggleMovieModal();
};

const addMovieHandler = () => {
  console.log(userInputs);

  const titleValue = userInputs[0].value;
  const imageUrl = userInputs[1].value;
  const rating = userInputs[2].value;

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
};

startAddmovieButton.addEventListener('click', toggleMovieModal);
cancelAddMovieButton.addEventListener('click', toggleMovieModal);
confirmAddMovieButton.addEventListener('click', addMovieHandler);

backdrop.addEventListener('click', backdropClickHandler);
