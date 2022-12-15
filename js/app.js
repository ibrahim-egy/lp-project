/**
 * Define Global Variables
 * 
*/
const allSections = document.querySelectorAll("section");
const navMenu = document.querySelector("#navbar__list");
const scrollButton = document.querySelector('.scroll-tp__btn');
let isScrolling;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// Add class 'highlight' to section when near top of viewport
function update() {
    
    for (section of allSections) {
        const rect = section.getBoundingClientRect();
        // checking if section is within 300px from the viewport.
        if (rect.top < 300 && rect.top > -300) {
            // adding class
            section.classList.add('highlight');
            // Adding class "active" to list item when section is in viewport => Optional
            const allNavItems = document.querySelectorAll('.menu__link');
            for (link of allNavItems) {
                if (link.textContent === section.getAttribute('data-nav')) {
                    link.classList.add('active')
                } else {
                    link.classList.remove('active')
                }
            }
        } else {
            section.classList.remove('highlight')
        }
    }

}

function showScrollUpButton () {
    const distance = allSections[3].getBoundingClientRect().top
    // show scroll top up button
    if (distance <= 300) {
        scrollButton.classList.add('show')
    } else {
        scrollButton.classList.remove('show')
    }
}

function showNavigation () {
// show navigation
    window.clearTimeout(isScrolling)
    const navbar =  document.querySelector('.navbar__menu')
    navbar.classList.add('invisible')
    isScrolling = window.setTimeout( function () {
        const navbar =  document.querySelector('.navbar__menu')
        navbar.classList.remove('invisible')
    }, 250)
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
function main () {
    // build the nav
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
}

/**
 * End Main Functions
 * Begin Events
 * 
*/
// Set sections as active when near top of viewport with update() function
// show navigation after 1/4s when stop scrolling. showScrollUpButton() => Optional
// show scroll top up button when near page end. showNavigation() => Optional
window.addEventListener('scroll', () => {
    update()
    showScrollUpButton()
    showNavigation()
})

// Scroll to section on link click
// Scroll to section on click using scrollTo method
// Added event listener to parent instead of each list item => Event Delegation.
navMenu.addEventListener('click', (event) => {
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

// scroll to top button functionality
scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})

// End Events

// Main function will build the navigation according to the number of sections in the DOM
main()