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


// *********EVENT LISTENERS********


window.addEventListener('load', windowLoad(ideasArray))
saveBtn.addEventListener('click', addCard);
cardBookmark.addEventListener('click', function(e) {
  if (e.target.className.includes('dlt-btn')) {
    deleteCard(e)
  }
})

cardBookmark.addEventListener('click', function(e) {
  if (e.target.className.includes('card-title')) {
    updateTitleContent(e);
  }
})
cardBookmark.addEventListener('click', function(e) {
  if (e.target.className.includes('card-body')) {
    updateBodyContent(e);
  }
})
cardBookmark.addEventListener('click', function(e) {
  if (e.target.className.includes('up-vote')) {
    upVote(e);
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
  console.log(numCards);
  var card =

`<article class="idea-card" id="card${idea.id}"">
      <h2 class="card-title editable" id="cardtitle" data-editcontent=${idea.id} data-edittitle=${idea.title}>${idea.title}</h2>
      <p class="card-body editable" id="cardbody" data-editcontent=${idea.id} data-editbody=${idea.body}>${idea.body}</p>
      <footer class="card-footer">
        <div class="card-footer-left-buttons">
          <input type="image" class="down-vote btns" data-editquality=${idea.id} src="assets/downvote.svg">
          <input type="image" class="up-vote btns" data-editquality=${idea.id}  src="assets/upvote.svg">
          <h4 class="card-quality">Quality: <span class="vote" data-changequality=${idea.quality}>${idea.quality}</span></h4>
        </div>
        <input type="image" data-deleteid=${idea.id} class="btns dlt-btn" src="assets/delete.svg">
      </footer>
    </article>`
    cardBookmark.insertAdjacentHTML('afterbegin', card);
};

function deleteCard(e) {

  var findId = e.target.dataset.deleteid;
  var data = document.querySelector(`#card${findId}`);
  data.remove();

  var idea = localStorage.getItem(findId);
  var ideaObject = JSON.parse(idea);
  var newIdea = new Idea(ideaObject.title, ideaObject.body, ideaObject.id, ideaObject.quality);
 
  newIdea.deleteFromStorage();
}


function updateTitleContent(e) {

  var findId = e.target.dataset.editcontent;
  var newTitle = e.target.dataset.edittitle;


  var idea = localStorage.getItem(findId);
  var ideaObject = JSON.parse(idea);
  var newIdea = new Idea(newTitle, ideaObject.body, ideaObject.id, ideaObject.quality);

  if (event.target.classList.contains("editable")) {
     event.target.contentEditable = true;
    newIdea.updateContent(event.target.innerText, 'title');
     
  }
  
}

function updateBodyContent(e) {
  
  var findId = e.target.dataset.editcontent;
  var newBody = e.target.dataset.editbody;

  var idea = localStorage.getItem(findId);
  var ideaObject = JSON.parse(idea);
  var newIdea = new Idea(ideaObject.title, newBody, ideaObject.id, ideaObject.quality);

  if (event.target.classList.contains("editable")) {
     event.target.contentEditable = true;
     event.keyCode === 13
     newIdea.updateContent(event.target.innerText,'body');
  }
 
}

function upVote(e) {

  findId = event.target.dataset.editquality;
  var showQual = document.querySelector('.vote');
// console.log(e.target.dataset.changequality);
  var idea = localStorage.getItem(findId);
  var ideaObject = JSON.parse(idea);
  var newQuality = ideaObject.quality;
  var newIdea = new Idea(ideaObject.title, ideaObject.body, ideaObject.id, newQuality);

  newIdea.updateQuality();
}


// *********Up vote button will change in local storage but not the dom********
// *********continue looking at down vote button********
