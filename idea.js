class Idea {
  constructor(title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.quality = quality || 'Swill';
    this.voteUp = 0;
    this.voteDown = 0;
  }

  saveToStorage(tarheels) {
    var stringVar = JSON.stringify(this);
    localStorage.setItem(this.id, stringVar);
  }

  deleteFromStorage() {
    localStorage.removeItem(this.id);
  }

  updateContent(text, type) {
    if (type == 'title') {
      this.title = text;
    } else if (type == 'body') {
      this.body = text;
    }
    var stringVar = JSON.stringify(this);
    localStorage.setItem(this.id, stringVar);
    console.log(this);
  }

  updateQuality(change) {


    if (this.quality === 'Swill') {
        this.quality = 'Plausible'
    } else if (this.quality === 'Plausible') {
               this.quality = 'Genius'
    } else {
      this.voteDown++;
      
        if(this.quality === 'Genius') {
           this.quality = 'Plausible';
      } else if (this.quality === 'Plausible') {
                 this.quality = 'Swill'
      }
    }

    var stringVar = JSON.stringify(this);
    localStorage.setItem(this.id, stringVar);
    }
  }
