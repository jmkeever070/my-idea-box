// ********GLOBAL VARIABLES*******
var title = document.querySelector('.title-input');
var body = document.querySelector('.body-input');
var saveBtn = document.querySelector('.form-btn');
var numCards = 0;
var cardBookmark = document.querySelector('.card-area');
var ideasArray = [];



for (var i=0; i<localStorage.length; i++) {
    // Might want to check for the correct object
    // properties before appending to ideasArray
    var key = localStorage.key(i);
    var value = localStorage[key];
    var parsedIdea = JSON.parse(value);
    ideasArray.push(parsedIdea);
}
// console.log(ideasArray);


// *********EVENT LISTENERS********


window.addEventListener('load', windowLoad(ideasArray))
saveBtn.addEventListener('click', addCard);
cardBookmark.addEventListener('click', function(e) {
  if (e.target.className.includes('dlt-btn')) {
    // console.log("This is working")
    deleteCard(e)
  }
})

cardBookmark.addEventListener('click', function(e) {
  if (e.target.className.includes('card-title')) {
    // console.log('this works too');
    updateCardContent(e);
  }
})
cardBookmark.addEventListener('click', function(e) {
  if (e.target.className.includes('card-body')) {
    // console.log('this works as well');
    updateCardContent(e);
  }
})


// **********FUNCTIONS***************


function windowLoad(storageArray) {
  storageArray.forEach(function(x) {
    var idea = new Idea(x.title, x.body, x.id);
    makeCard(idea);
  });

};

function addCard(e) {
  e.preventDefault();
  var idea = new Idea(title.value, body.value);
  ideasArray.push(idea);
  idea.saveToStorage(ideasArray);
  console.log(ideasArray);
  makeCard(idea);
  title.value = '';
  body.value = '';
};

function makeCard(idea) {
  numCards++;
  var card =

`<article class="idea-card" id="card${idea.id}"">
      <h2 class="card-title editable" id="cardtitle" data-deleteid=${idea.id}>${idea.title}</h2>
      <p class="card-body editable" id="bodytitle">${idea.body}</p>
      <footer class="card-footer">
        <div class="card-footer-left-buttons">
          <input type="image" class="down-vote btns" src="assets/downvote.svg">
          <input type="image" class="up-vote btns" src="assets/upvote.svg">
          <h4 class="card-quality">Quality: <span class="vote">${idea.quality}</span></h4>
        </div>
        <input type="image" data-deleteid=${idea.id} class="btns dlt-btn" src="assets/delete.svg">
      </footer>
    </article>`
    cardBookmark.insertAdjacentHTML('afterbegin', card);
};

function deleteCard(e) {
  // console.log(e.target.dataset);

  var findId = e.target.dataset.deleteid;
  var data = document.querySelector(`#card${findId}`);
  data.remove();

  var idea = localStorage.getItem(findId);
  var ideaObject = JSON.parse(idea);
  var newIdea = new Idea(ideaObject.title, ideaObject.body, ideaObject.id, ideaObject.quality);
  // console.log("New ideaa: ", newIdea)
  // logic to isolate a single idea
  newIdea.deleteFromStorage();
}

function updateCardContent(e) {

  //
}