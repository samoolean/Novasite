document.querySelectorAll(".service").forEach(div => {
    div.addEventListener("click", function() {
        window.location.href = this.dataset.url;
    });
});

/*custom*/