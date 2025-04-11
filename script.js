function sendAppointmentEmail(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const datepicker = document.getElementById("datepicker").value;
    const time = document.getElementById("time").value;

    fetch("http://localhost:3000/send-whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, datepicker, time }),
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error("Error:", error));
}


function downloadImage() {
    const imageUrl = "assets/images/main-img/scanner-img.png";

    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = "scanner-img.png"; 
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

document.getElementById("facebook-share").addEventListener("click", function() {
    var pageUrl = window.location.href; 
    var facebookUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(pageUrl);
    window.open(facebookUrl, "_blank"); 
});

document.getElementById("instagram-share").addEventListener("click", function() {
    var pageUrl = window.location.href;
    var instagramUrl = "https://www.instagram.com/";
    window.open(instagramUrl, "_blank");
});

document.getElementById("whatsapp-share").addEventListener("click", function() {
    var pageUrl = window.location.href;
    var whatsappUrl = "https://wa.me/?text=" + encodeURIComponent(pageUrl);
    window.open(whatsappUrl, "_blank");
});

document.getElementById("linkedin-share").addEventListener("click", function() {
    var pageUrl = window.location.href;
    var linkedinUrl = "https://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(pageUrl);
    window.open(linkedinUrl, "_blank");
});

document.getElementById("twitter-share").addEventListener("click", function() {
    var pageUrl = window.location.href;
    var twitterUrl = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(pageUrl);
    window.open(twitterUrl, "_blank");
});

document.getElementById("telegram-share").addEventListener("click", function() {
    var pageUrl = window.location.href;
    var telegramUrl = "https://t.me/share/url?url=" + encodeURIComponent(pageUrl);
    window.open(telegramUrl, "_blank");
});

document.getElementById("pinterest-share").addEventListener("click", function() {
    var pageUrl = window.location.href;
    var pinterestUrl = "https://www.pinterest.com/pin/create/button/?url=" + encodeURIComponent(pageUrl);
    window.open(pinterestUrl, "_blank");
});

document.getElementById("email-share").addEventListener("click", function() {
    var pageUrl = window.location.href;
    var emailUrl = "mailto:?subject=Check%20this%20out&body=" + encodeURIComponent(pageUrl);
    window.open(emailUrl, "_blank");
});
async function addToContacts() {
    if ('contacts' in navigator && 'ContactsManager' in window) {
        try {
            const props = ['name', 'tel'];
            const opts = {multiple: false};
            
            const contact = {
                name: ['Contact Name'], // You can customize this
                tel: ['+919789705885']
            };
            
            await navigator.contacts.select(props, opts);
            // The browser will handle the actual saving
        } catch (err) {
            console.error('Contact Picker error:', err);
            fallbackContactSave();
        }
    } else {
        fallbackContactSave();
    }
}