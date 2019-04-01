class Idea {
  constructor(title, body, id, quality) {
    this.title = title;
    this.body = body;
    this.id = id || Date.now();
    this.quality = quality || 'Swill';
  }

  saveToStorage(tarheels) {
    console.log(this);
    var stringVar = JSON.stringify(this);
    localStorage.setItem(this.id, stringVar);
  }

  deleteFromStorage() {
    localStorage.removeItem(this.id);
  }

  updateContent(text, type) {
    // debugger;
    console.log(this);
    if (type == 'title') {
      this.title = text;
    } else if (type == 'body') {
      this.body = text;
    }
    var stringVar = JSON.stringify(this);
    localStorage.setItem(this.id, stringVar);
  }

  updateQuality() {

  }

}