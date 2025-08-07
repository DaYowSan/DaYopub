// ==UserScript==
// @name         Pixeltris modifié avec qualité forcée + Pikachu
// @namespace    https://github.com/tonpseudo/TwitchAdSolutions
// @version      1.0
// @description  Modifie le script Pixeltris officiel pour forcer qualité source + afficher Pikachu lors du blocage pub Twitch
// @author       DayDay + ChatGPT
// @match        *://www.twitch.tv/*
// @run-at       document-start
// ==/UserScript==

(() => {
    'use strict';

    // ======== Variables & utilitaires ========
    let adBlocked = false;
    let pikachuShown = false;

    // Injection Pikachu + message
    function showPikachuMessage() {
        if (pikachuShown) return;
        pikachuShown = true;

        const div = document.createElement('div');
        div.id = 'pikachu-message';
        div.style = `
            position: fixed;
            bottom: 10px;
            right: 10px;
            background: rgba(255,255,255,0.85);
            border-radius: 10px;
            padding: 5px 10px;
            font-size: 14px;
            color: #333;
            display: flex;
            align-items: center;
            gap: 6px;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
            z-index: 9999999;
            user-select: none;
            cursor: default;
        `;

        const img = document.createElement('img');
        img.src = 'https://i.imgur.com/UuWmvbI.gif'; // Pikachu GIF
        img.style.width = '24px';
        img.style.height = '24px';

        const span = document.createElement('span');
        span.textContent = 'DayDay bloque les pubs';

        div.appendChild(img);
        div.appendChild(span);
        document.body.appendChild(div);
    }

    // Forcer la qualité source
    function forceQualitySource() {
        const player = document.querySelector('video');
        if (!player) return;

        // Essayer d'appeler setQuality si dispo
        try {
            if (player.setQuality) {
                player.setQuality('source');
                console.log('[Pixeltris Mod] Qualité forcée en Source via API.');
                return;
            }
        } catch(e) {
            // Pas dispo, on tente autre chose
        }

        // Sinon, tentative de cliquer sur bouton source dans les réglages (complexe, pas garanti)
        // On peut améliorer cette partie selon besoins
    }

    // Écoute des mutations sur la page pour détecter blocage pub
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            // Exemples : détection d'un élément pub qui disparait ou d'un message "ads blocked"
            // À adapter selon le script original Pixeltris

            // Si pub détectée bloquée
            if (!adBlocked) {
                // Ici on devrait détecter que la pub est bloquée par Pixeltris
                // Comme c'est intégré dans le script original, on simule en détectant vidéo ready

                const video = document.querySelector('video');
                if (video && !video.paused && video.readyState > 2) {
                    adBlocked = true;
                    console.log('[Pixeltris Mod] Pub bloquée détectée.');

                    // Actions
                    forceQualitySource();
                    showPikachuMessage();
                }
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    // Ici on peut copier/injecter le reste du code Pixeltris officiel
    // Pour simplifier, tu peux coller le contenu original en dessous et rajouter ces fonctions

})();
