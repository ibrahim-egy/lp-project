/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


const allSections = document.querySelectorAll("section")
const navMenu = document.querySelector("#navbar__list");

// creating li inside #navbar__list with an anchor as a child
// ex: <li>
//         <a class="menu__link" href="#section1">Section 1</a>
//     </li>
for (let i = 0; i < allSections.length; i++) {
    const listItem = document.createElement("li");
    const listItemLink = document.createElement("a");

    // href for inner anchor tag
    const href = `#${allSections[i].getAttribute("id")}`;
    // textContent of the anchor tag ex: Section 1;
    const textContent = allSections[i].getAttribute('data-nav');

    // adding class menu__link to apply the css styles
    listItem.innerHTML = `<a class="menu__link" href="${href}">${textContent}</a>`

    // appending list item as a child to #navbar__list ul
    navMenu.appendChild(listItem);

}












/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click
// Scroll to section on click using scrollTo method
const allNavItems = document.querySelectorAll('.menu__link')
const navBar = document.querySelector('#navbar__list')

navBar.addEventListener('click', function (event) {
    event.preventDefault();
    const anchor = event.target
    if(anchor.tagName === 'A') {
        
        const section = document.querySelector(anchor.getAttribute('href'))
        const distanceToScroll = section.offsetTop;
        window.scrollTo({
            top: distanceToScroll,
            behavior: 'smooth'
        })
    }
})

// Set sections as active
// Add class 'active' to section when near top of viewport

function update() {
    
    for (section of allSections) {
        const rect = section.getBoundingClientRect();
        if (rect.top < 300 && rect.top > -300) {
            section.classList.add('your-active-class')
        } else {
            section.classList.remove('your-active-class')
        }
    }

}

window.addEventListener('scroll', update)


// hide navigation after 1s when stop scrolling

function showNavbar () {

    document.querySelector('#navbar__list').style.visibility = 'visible';

}

window.addEventListener('scroll', function () {
    setTimeout(showNavbar, 2000)
})

