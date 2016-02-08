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
        <a href="sponsors.html"> \
            <div class="tab-content"> \
                <img src="images/sponsors.png" /> \
                <span class="tab-text">Sponsors</span> \
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

function apply_mobile_header_attrs() {
    var mob_header = document.getElementById('mobile-header');
    var header = document.getElementById('header');
    var head_button = document.getElementById('header-button');
    mob_header.addEventListener('click', function() {
        if (header.style.top == '10%') {
            header.style.top = '-100%';
            head_button.style.transform = 'rotate(0deg)';
        } else {
            header.style.top = '10%';
            head_button.style.transform = 'rotate(90deg)';
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
