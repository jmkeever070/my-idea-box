class Idea {
  constructor(title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.quality = quality || 'Swill';
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
  }

  updateQuality() {
    var stringVar = JSON.stringify(this);
    localStorage.setItem(this.id, stringVar);
  
  }
}