(function () {
    if (!localStorage.getItem('cookieconsent')) {
        document.body.innerHTML += '\
		<div class="cookiePopup cookieconsent animated fadeInUp">\
			Ta strona używa ciasteczek. <a href="#" class="cookieBtn">OK! Zamknij popup.</a>\
		</div>\
		';
        document.querySelector('.cookieconsent a').onclick = function (e) {
            e.preventDefault();
            document.querySelector('.cookieconsent').style.display = 'none';
            localStorage.setItem('cookieconsent', true);
        };
    }
})();