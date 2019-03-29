// ********GLOBAL VARIABLES*******
var title = document.querySelector('.title-input');
var body = document.querySelector('.body-input');
var saveBtn = document.querySelector('.form-btn');
var numCards = 0;
var cardBookmark = document.querySelector('.card-area');
var ideasArray = [];


//
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


// **********FUNCTIONS


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
      <h2 class="card-title" id= cardtitle contenteditable>${idea.title}</h2>
      <p class="card-body" id="cardbody" contenteditable>${idea.body}</p>
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

  // .card-title is a class and there are many on the page, you can't be sure what you're getting
  // Make this a unique ID much like you did with the ID on the article html element
  var title = document.querySelector('.card-title');
  // since you're using the contenteditable attribute I believe this will jsut be the new title if you selected it right in the line above
  var oldTitle = title.innerText;

  // Remember that we're saving the stringified ideas by their unique timestamp ID (see how you're doing the findId aboe)
  var idea = localStorage.getItem(oldTitle);
  var ideaObject = JSON.parse(idea);
  // This will be slightly different than the above. Instead of passing in all of the same properties, you actually want to pass in the new title from the querySelector above to the title arg
  var newIdea = new Idea(ideaObject.title, ideaObject.body, ideaObject.id, ideaObject.quality);
  newIdea.updateContent()
  //
}