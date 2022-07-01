"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

//When the user clicks the nav to submit a story open the form
function addStoryClick(evt){
  console.debug("submitStoryClick", evt);
  $submitStoryForm.show();
}
$navSubmitStory.on("click", addStoryClick);


//When the user clicks on the nave to open favorites
function favoritesNavClick(evt)
{
  console.debug("navFavoritesClick")
  putFavoritesOnPage();
}
$navFavorites.on("click", favoritesNavClick);

