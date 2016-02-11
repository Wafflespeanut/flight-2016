const LIST_ITEM_TIMEOUT = 200;
const MAX_WIDTH = 700;
// probably ridiculous way of doing this, say whatever you want, I'm very lazy...
const HEADER = '<div id="mobile-header"> \
    <img id="mobile-logo" src="images/flight-white.png" /> \
    <div id="header-text">Flight \'16</div> \
    <img id="header-button" src="images/propeller.png" /> \
</div> \
<div id="header"> \
    <div id="mobile-bg" class="bg-image"> \
        <div class="bg-dissolve"></div> \
    </div> \
    <div class="tab"> \
        <a href="future.html"> \
            <img id="home-logo" style="width: 150px" src="images/flight-white.png" /> \
            <div id="home-tab" class="tab-content"> \
                <img src="images/home.png" /> \
                <span class="tab-text">Home</span> \
            </div> \
        </a> \
    </div> \
    <div class="tab"> \
        <a href="events.html"> \
            <div class="tab-content"> \
                <img src="images/events.png" /> \
                <span class="tab-text">Events</span> \
            </div> \
        </a> \
    </div> \
    <div class="tab"> \
        <a href="workshops.html"> \
            <div class="tab-content"> \
                <img src="images/workshop.png" /> \
                <span class="tab-text">Workshops</span> \
            </div> \
        </a> \
    </div> \
    <div class="tab"> \
        <a href="contact.html"> \
            <div class="tab-content"> \
                <img src="images/phone.png" /> \
                <span class="tab-text">Contact us</span> \
            </div> \
        </a> \
    </div> \
</div>'

function apply_header() {
    document.getElementById('header-area').innerHTML = HEADER;
    var mob_header = document.getElementById('mobile-header');
    var header = document.getElementById('header');
    var head_button = document.getElementById('header-button');
    document.addEventListener('click', function(event) {
        var target = event.target || event.srcElement;
        if (mob_header.contains(target)) {
            if (header.style.top == '10%') {
                header.style.top = '-100%';
                head_button.style.transform = 'rotate(0deg)';
            } else {
                header.style.top = '10%';
                head_button.style.transform = 'rotate(90deg)';
            }
        } else if (header.style.top == '10%') {
            header.style.top = '-100%';
            head_button.style.transform = 'rotate(0deg)';
        }
    }, false);
}

function insert_contact() {     // useful for pages dedicated to events
    if (window.innerWidth <= MAX_WIDTH) {
        var contact = document.getElementById('side-col');
        var event_detail = document.getElementById('event-detail');
        while (contact.childNodes.length) {
            event_detail.appendChild(contact.firstChild);
        }
    }
}

function show_elem(elem, timeout) {
    setTimeout(function() {
        elem.style.visibility = 'visible';
        elem.style.opacity = 1;
    }, timeout)
}

function transit_list() {
    var event_list = document.querySelectorAll('#event-list li');
    for (i = 0; i < event_list.length; i++) {
        show_elem(event_list[i], (i + 1) * LIST_ITEM_TIMEOUT);
    }
}
