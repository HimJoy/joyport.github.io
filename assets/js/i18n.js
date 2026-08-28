/*
	Language toggle (EN/DE) for joyport.github.io
	Shared across all pages: COMMON_I18N holds strings identical on every
	page (nav, footer, contact form, shared button labels); each page
	defines its own PAGE_I18N for unique headings/article content.
*/
(function() {

	var COMMON_I18N = {
		en: {
			nav_projects: "BI Projects",
			nav_certs: "Certifications",
			nav_electrical: "Electrical Projects",
			nav_mba: "MBA Projects",
			form_name: "Name",
			form_email: "Email",
			form_message: "Message",
			form_submit: "Send Message",
			addr_heading: "Address",
			email_heading: "Email",
			social_heading: "Social",
			hamburg: "Hamburg, Germany",
			menu: "Menu",
			btn_view: "View Project",
			btn_full: "Full Story",
			rfid_desc: "This project explored how RFID can improve warehouse and inventory management through real-time tracking, fewer manual errors, and better process visibility. I supported the work by creating a Tableau dashboard to analyze missing articles and highlight inventory-related losses. The study also included cost, risk, and ROI analysis, showing that RFID implementation could deliver clear operational and financial benefits."
		},
		de: {
			nav_projects: "BI-Projekte",
			nav_certs: "Zertifikate",
			nav_electrical: "Elektrotechnik/Projekte",
			nav_mba: "MBA-Projekte",
			form_name: "Name",
			form_email: "E-Mail",
			form_message: "Nachricht",
			form_submit: "Nachricht senden",
			addr_heading: "Adresse",
			email_heading: "E-Mail",
			social_heading: "Soziale Medien",
			hamburg: "Hamburg, Deutschland",
			menu: "Menü",
			btn_view: "Projekt ansehen",
			btn_full: "Mehr erfahren",
			rfid_desc: "Dieses Projekt untersuchte, wie RFID die Lager- und Bestandsverwaltung durch Echtzeit-Tracking, weniger manuelle Fehler und mehr Prozesstransparenz verbessern kann. Ich unterstützte die Arbeit durch ein Tableau-Dashboard zur Analyse fehlender Artikel und bestandsbedingter Verluste. Die Studie umfasste zudem eine Kosten-, Risiko- und ROI-Analyse, die zeigte, dass eine RFID-Einführung klare betriebliche und finanzielle Vorteile bringen kann."
		}
	};

	function mergedDict(lang) {
		var page = (window.PAGE_I18N && window.PAGE_I18N[lang]) || {};
		var dict = {};
		var common = COMMON_I18N[lang] || {};
		for (var k in common) dict[k] = common[k];
		for (var k2 in page) dict[k2] = page[k2];
		return dict;
	}

	function applyLang(lang) {
		var dict = mergedDict(lang);

		document.documentElement.lang = lang;

		var textEls = document.querySelectorAll('[data-i18n]');
		for (var i = 0; i < textEls.length; i++) {
			var el = textEls[i];
			var key = el.getAttribute('data-i18n');
			if (dict[key] === undefined) continue;
			if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
				el.value = dict[key];
			} else {
				el.textContent = dict[key];
			}
		}

		var htmlEls = document.querySelectorAll('[data-i18n-html]');
		for (var j = 0; j < htmlEls.length; j++) {
			var el2 = htmlEls[j];
			var key2 = el2.getAttribute('data-i18n-html');
			if (dict[key2] === undefined) continue;
			el2.innerHTML = dict[key2];
		}

		var toggles = document.querySelectorAll('[data-lang-btn]');
		for (var k3 = 0; k3 < toggles.length; k3++) {
			var btn = toggles[k3];
			if (btn.getAttribute('data-lang-btn') === lang) {
				btn.classList.add('active');
			} else {
				btn.classList.remove('active');
			}
		}
	}

	window.setLang = function(lang) {
		localStorage.setItem('siteLang', lang);
		applyLang(lang);
	};

	var saved = localStorage.getItem('siteLang') || 'en';
	applyLang(saved);

})();
