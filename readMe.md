# What is it?

## This was a group project from school. I went back and re-coded the JavaScript my own way in order to continue learning the basics of Javascript. The purpose of this project was to create a page where you can input values and it will create an Idea (which will appear on a newly generated card)

# What is used?

## Vanilla Javascript, HTML, and CSS

# How it works

## 1) By inputting values in the title and/or body text boxes, a card will generate below with the given values.
## 2) Card values are put into local storage to persist upon page reload.
## 3) Buttons on the cards allow for the deletion of a card, as well as changing the quality from Swill, to Plausible, to           Genius.
## 4) Swill, Plausible, and Genius buttons will bring back only the cards with the given quality.
## 5) Show-More button when clicked will toggle to Show-Less. Show-More will show all the cards that persist, while Show-Less       will show only the 10 most recent.
## 6) The title and body are editable on the cards.

# Complications

## Clicking the Swill, Plausible, and Quality buttons change the quality in local storage, but only appear on the DOM when        refreshing the page
## When editing the title and body on the cards, it changes in local storage only after clicking outside the card, then          clicking back inside it.

# Screenshot

![image](https://user-images.githubusercontent.com/43790434/55510920-94fa1080-561c-11e9-8e5b-b16e91feb3a2.png)
