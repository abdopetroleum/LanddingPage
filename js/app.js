/**
 * Define Global Variables
 * 
 */

const sections = document.querySelectorAll('section');
const myNavList = document.querySelector('#navbar__list');
// Add class 'active' to section when near top of viewport inside an intersection observer
const observer = new IntersectionObserver(entries => {
    for (entry of entries) {
        const navListElement = document.querySelector(`.menu__link[data-link='${entry.target.id}']`);
        const section = document.getElementById(entry.target.id)
        if (entry.isIntersecting) {
            addActive(navListElement);
            addActive(section);
        } else {
            removeActive(navListElement);
            removeActive(section);
        }
    }
}, {threshold: 0.6});
/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

const addActive = element => {
    element.classList.add('active');
}
const removeActive = element => {
    if (element.classList.contains('active')) {
        element.classList.remove('active')
    }
}


// End Helper Functions


// build the nav
// list items with section references
for (section of sections) {
    let listItem = document.createElement("li");
    listItem.className = 'menu__link ' + section.className;
    listItem.setAttribute('data-link', section.id);
    const ref = document.createElement('a');
    ref.setAttribute('href', `#${section.id}`);
    ref.textContent = section.dataset.nav;
    listItem.appendChild(ref);
    myNavList.appendChild(listItem);
}

// Scroll to anchor ID using scrollTO event
// adding click listener to the navigation elements to scroll smoothly rather than rough default behavior
myNavList.addEventListener('click', event => {
    event.preventDefault();
    let mySection;
    if (event.target.hasAttribute('data-link')) {
        mySection = document.getElementById(event.target.dataset.link);
    } else {
        mySection = document.getElementById(event.target.parentElement.dataset.link);
    }
    mySection.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
    });
})

// observe each section with the observer object
for(section of sections){
    observer.observe(section);
}
