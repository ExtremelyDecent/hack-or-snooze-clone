"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);
  let star;
  const hostName = story.getHostName();
  if(currentUser.favorites.includes(story)){
    star = "fas fa-star";
  }
  else{
    star = "far fa-star";
  }
  return $(`
      <li id="${story.storyId}">
        <span class = "star">
          <i class = "${star}">
          </i>
        </span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
    
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

function putFavoritesOnPage() {
  console.debug("putFavoritesOnPage");

  $favoritesList.empty();

  // loop through all of our favorite stories and generate HTML for them
  console.log(currentUser.favorites);
  for (let story of currentUser.favorites) {
    
    const $story = generateStoryMarkup(story);
    
    $favoritesList.append($story);
  }
  $allStoriesList.hide();
  $favoritesList.show();
}

/** Gets user input for new story and sends story to */
async function submitNewStory (evt) {
  console.debug("SubmitNewStory", evt);
  evt.preventDefault();

  // grab the author, title and url
  const author = $("#author-name").val();
  const title = $("#story-title").val();
  const url =  $("#story-url").val();
   await storyList.addStory(currentUser, {title:title, author:author, url: url});
  getAndShowStoriesOnStart();
}

$submitStoryForm.on("submit", submitNewStory);


/** puts only user submitted stories on page */
function putUserStoriesOnPage() {
  console.debug("putUserStoriesOnPage");

  $userStoriesList.empty();

  // loop through all of our favorite stories and generate HTML for them
  console.log(currentUser);
  for (let story of currentUser.ownStories) {
    
     const $story = generateStoryMarkup(story);
    
    $userStoriesList.append($story);
  }
  $allStoriesList.hide();
  $userStoriesList.show();
}

//When the user clicks the favorite star toggles the checked star
async function starClick(evt){
  console.debug("starClick");
  const $star = $(evt.target).closest('i');
  $star.toggleClass("far fas");
  const favoriteId = $star.closest('li').attr('id');

  for (let story of storyList.stories) {
    if(story.storyId === favoriteId){
      if(currentUser.favorites.includes(story)){
        currentUser.favorites.pop(story);
        //remove favorite
        await currentUser.removeFavorite(favoriteId);
        
      }
      else{
        //add favorite
        currentUser.favorites.push(story);
        await currentUser.addFavorite(favoriteId);
        
      }
      
    }
    
  }
  
  //console.log(currentUser.favorites)

}

$allStoriesList.on("click", $favoriteStar, starClick);
$favoritesList.on("click", $favoriteStar, starClick);