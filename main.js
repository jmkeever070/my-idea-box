// ********GLOBAL VARIABLES*******
var title = document.querySelector('.title-input');
var body = document.querySelector('.body-input');
var saveBtn = document.querySelector('.form-btn');
var numCards = 0;
var cardBookmark = document.querySelector('.card-area');
var ideasArray = [];
var voteUp = 0;
var voteDown = 0;
var searchBox = document.querySelector('.search-input');
var searchBtn = document.querySelector('.fa-search');
var swillBtn = document.querySelector('#swill-btn');
var plausBtn = document.querySelector('#plaus-btn');
var genBtn = document.querySelector('#genius-btn');
var moreBtn = document.querySelector('#show-more-btn');



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

swillBtn.addEventListener('click', swillFilter);

plausBtn.addEventListener('click', plausFilter);

genBtn.addEventListener('click', geniusFilter);

moreBtn.addEventListener('click', moreAndLess);

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

cardBookmark.addEventListener('click', function(e) {
  if (e.target.className.includes('down-vote')) {
    downVote(e);
  }
})

searchBtn.addEventListener('click', textFilter);

searchBox.addEventListener('keyup', textFilter);


// ********** GENERATE CARD FUNCTIONS***************


function windowLoad(storageArray) {
  storageArray.forEach(function(x) {
    var idea = new Idea(x.title, x.body, x.id, x.quality);
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
  title.focus();
};

function makeCard(idea) {
  numCards++;
  var card =

`<article class="idea-card" id="card${idea.id}"">
      <h2 class="card-title editable" id="cardtitle" data-editcontent=${idea.id} data-edittitle=${idea.title}>${idea.title}</h2>
      <p class="card-body editable" id="cardbody" data-editcontent=${idea.id} data-editbody=${idea.body}>${idea.body}</p>
      <footer class="card-footer">
        <div class="card-footer-left-buttons">
          <input type="image" class="down-vote btns" data-editquality=${idea.id} src="assets/downvote.svg">
          <input type="image" class="up-vote btns" data-editquality=${idea.id}  src="assets/upvote.svg">
          <h4 class="card-quality">Quality: <span class="vote" id="newqual${idea.id}">${idea.quality}</span></h4>
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

// ****TITLE AND BODY CONTENT UPDATE FUNCTIONS ****

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

// **** UP AND DOWN VOTE FUNCTIONS ****

function upVote(e) {
voteUp++;

  findId = event.target.dataset.editquality;
  var idea = localStorage.getItem(findId);
  var ideaObject = JSON.parse(idea);
  var newQuality = ideaObject.quality;
    
    if (newQuality === 'Swill') {
        newQuality = 'Plausible';
        let newQual = document.querySelector(`#newqual${findId}`);
            newQual.innerText = 'Plausible';

    }   else if (newQuality === 'Plausible') {
               newQuality = 'Genius'
               let newQual = document.querySelector(`#newqual${findId}`);
               newQual.innerText = 'Genius'
    };

  var newIdea = new Idea(ideaObject.title, ideaObject.body, ideaObject.id, newQuality);
  newIdea.updateQuality();
}

function downVote(e) {
  voteDown++;

  findId = event.target.dataset.editquality;
  var idea = localStorage.getItem(findId);
  var ideaObject = JSON.parse(idea);
  var newQuality = ideaObject.quality;
    
    if (newQuality === 'Genius') {
        newQuality = 'Plausible';
        let newQual = document.querySelector(`#newqual${findId}`);
            newQual.innerText = 'Plausible';

    } 
      else if (newQuality === 'Plausible') {
               newQuality = 'Swill'
               let newQual = document.querySelector(`#newqual${findId}`);
               newQual.innerText = 'Swill'
    };
  
  var newIdea = new Idea(ideaObject.title, ideaObject.body, ideaObject.id, newQuality);
  newIdea.updateQuality();
}

// **** FILTERING FUNCTIONS ****

function textFilter() {
  removeCards();
  var searchText = searchBox.value;
  var textSearch = ideasArray.filter(function (x) {
    return x.title.toLowerCase().includes(searchText) || x.body.toLowerCase().includes(searchText);
  });

  textSearch.forEach(function(y) {
  makeCard(y);
  })

}

function removeCards() {
  cardBookmark.innerHTML = '';
}

function swillFilter(e) {
  e.preventDefault();
  removeCards();
  var swillSearch = ideasArray.filter(function (x) {
    return x.quality === "Swill"
  })

  swillSearch.forEach(function(y) {
    makeCard(y);
  })
}

function plausFilter(e) {
  e.preventDefault();
  removeCards();
  var plausSearch = ideasArray.filter(function (x) {
    return x.quality === "Plausible"
  })
  plausSearch.forEach(function(y) {
    makeCard(y);
  })
}

function geniusFilter(e) {
  e.preventDefault();
  removeCards();
  var geniusSearch = ideasArray.filter(function (x) {
    return x.quality === "Genius"
  })
  geniusSearch.forEach(function(y) {
    makeCard(y);
  })
}

function moreAndLess(e) {
  e.preventDefault();
  if (moreBtn.value === 'Show-More') {
      
      moreBtn.value = 'Show-Less';
      cardBookmark.innerHTML = '';

      ideasArray.forEach(function(x) {
        makeCard(x);
      })
    }
      else if (moreBtn.value === 'Show-Less') {

      moreBtn.value = 'Show-More';
      cardBookmark.innerHTML = '';

      var mostRecentIdeas = ideasArray.slice(-10);
      mostRecentIdeas.forEach(function(e) {
        makeCard(e);
      })
    }
}
