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
    // href for inner anchor tag
    const href = `#${allSections[i].getAttribute("id")}`;
    // textContent of the anchor tag ex: Section 1;
    const textContent = allSections[i].getAttribute('data-nav');

    // creating anchor tag with innerHtml while adding class 'menu__link' to apply the css styles
    // filling the innerText with the data-nav attribute from sections to reduce reflow and repaint
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

// Added event listener to parent instead of each list item => Event Delegation.
navBar.addEventListener('click', (event) => {
    // prevent default action.
    event.preventDefault();
    const anchor = event.target

    // Respond only when an anchor tag is clicked.
    if(anchor.tagName === 'A') {
        
        const section = document.querySelector(anchor.getAttribute('href'))
        // calculating the distance from the top to scroll.
        const distanceToScroll = section.offsetTop;
        window.scrollTo({
            top: distanceToScroll,
            behavior: 'smooth'
        })
    }
})

// Set sections as active
// Add class 'your-active-class' to section when near top of viewport

function update() {
    
    for (section of allSections) {
        const rect = section.getBoundingClientRect();
        // checking if section is within 300px from the viewport.
        if (rect.top < 300 && rect.top > -300) {
            // adding class
            section.classList.add('your-active-class');
            // Adding class "active" to list item when section is in viewport => Optional
            const allLinks = document.querySelectorAll('.menu__link');
            for (link of allLinks) {
                if (link.textContent === section.getAttribute('data-nav')) {
                    link.classList.add('active')
                } else {
                    link.classList.remove('active')
                }
            }
        } else {
            section.classList.remove('your-active-class')
        }
    }
    
}
window.addEventListener('scroll', update)


// hide navigation after 1/4s when stop scrolling => Optional
let isScrolling;
window.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling)
    const navbar =  document.querySelector('.navbar__menu')
    navbar.classList.add('invisible')
    isScrolling = window.setTimeout( function () {
        const navbar =  document.querySelector('.navbar__menu')
        navbar.classList.remove('invisible')
    }, 250)
})


// scroll to top button functionality

const scrollButton = document.querySelector('.scroll-tp__btn');
scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})