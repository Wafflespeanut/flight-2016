const LIST_ITEM_TIMEOUT = 200;
const MAX_WIDTH = 700;
// probably ridiculous way of doing this, say whatever you want, I'm very lazy...
const HEADER = '<div id="mobile-header"> \
    <img id="mobile-logo" data-desktop="images/flight-white.png" data-mobile="images-mobile/flight-white.png" /> \
    <div id="header-text">Flight \'16</div> \
    <img id="header-button" data-desktop="images/propeller.png" data-mobile="images-mobile/propeller.png" /> \
</div> \
<div id="header"> \
    <div id="mobile-bg" class="bg-image"> \
        <div class="bg-dissolve"></div> \
    </div> \
    <div class="tab"> \
        <a href="future.html"> \
            <img id="home-logo" style="width: 150px" data-desktop="images/flight-white.png" data-mobile="images-mobile/flight-white.png" /> \
            <div id="home-tab" class="tab-content"> \
                <img data-desktop="images/home.png" data-mobile="images-mobile/home.png" /> \
                <span class="tab-text">Home</span> \
            </div> \
        </a> \
    </div> \
    <div class="tab"> \
        <a href="events.html"> \
            <div class="tab-content"> \
                <img data-desktop="images/events.png" data-mobile="images-mobile/events.png" /> \
                <span class="tab-text">Events</span> \
            </div> \
        </a> \
    </div> \
    <div class="tab"> \
        <a href="workshops.html"> \
            <div class="tab-content"> \
                <img data-desktop="images/workshop.png" data-mobile="images-mobile/workshop.png" /> \
                <span class="tab-text">Workshops</span> \
            </div> \
        </a> \
    </div> \
    <div class="tab"> \
        <a href="contact.html"> \
            <div class="tab-content"> \
                <img data-desktop="images/phone.png" data-mobile="images-mobile/phone.png" /> \
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
        var event_detail = document.getElementById('event-detail') || document.getElementById('col-group');
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

function transit_list(query_select) {
    query_select = (query_select) ? query_select : '.event-list li';
    var event_list = document.querySelectorAll(query_select);
    for (i = 0; i < event_list.length; i++) {
        show_elem(event_list[i], (i + 1) * LIST_ITEM_TIMEOUT);
    }
}

function switch_images() {
    var images = document.getElementsByTagName('img');
    if (window.innerWidth <= MAX_WIDTH) {
        for (i = 0; i < images.length; i++) {
            images[i].src = images[i].dataset.mobile;
        }
    } else {
        for (i = 0; i < images.length; i++) {
            images[i].src = images[i].dataset.desktop;
        }
    }

    var bg_images = document.querySelectorAll('.bg-marker');
    if (bg_images) {
        if (window.innerWidth <= MAX_WIDTH) {
            for (i = 0; i < bg_images.length; i++) {
                bg_images[i].style.backgroundImage = 'url(' + bg_images[i].dataset.mobile + ')';
            }
        } else {
            for (i = 0; i < bg_images.length; i++) {
                bg_images[i].style.backgroundImage = 'url(' + bg_images[i].dataset.desktop + ')';
            }
        }
    }
}
