document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector("nav");
    const openBtn = document.querySelector(".open-btn");
    const closeBtn = document.querySelector(".close-btn");
    const navLinks = document.querySelectorAll(".nav-link");

    // Selektory pro Apartmány
    const aptDropdownBtn = document.querySelector('.apartments-dropdown-btn');
    const aptDropdownLinks = document.querySelectorAll('.apartments-dropdown-link');
    const mainAptLink = document.querySelector('.apartments-main-link');

    // Selektory pro Jazyky
    const langWrapper = document.querySelector('.language-menu-wrapper');
    const langBtn = document.querySelector('.language-dropdown-btn');

    // --- 1. HAMBURGER MENU ---
    const toggleMenu = (state) => {
        if (nav) {
            nav.classList.toggle("active", state);
            document.body.style.overflow = state ? "hidden" : "";
        }
    };

    if (openBtn) openBtn.addEventListener("click", () => toggleMenu(true));
    if (closeBtn) closeBtn.addEventListener("click", () => toggleMenu(false));

    // --- 2. APARTMÁNY DROPDOWN (v mobilu i desktopu) ---
    if (aptDropdownBtn) {
        aptDropdownBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const parent = aptDropdownBtn.closest('.nav-item');
            if (parent) parent.classList.toggle('active');
        });
    }

    // --- 3. JAZYKOVÝ DROPDOWN (Logika) ---
    if (langBtn && langWrapper) {
        langBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Pokud otevíráme jazyky, zavřeme apartmány (pro jistotu)
            const activeApt = document.querySelector('.nav-item.active');
            if (activeApt) activeApt.classList.remove('active');
            
            langWrapper.classList.toggle('active');
        });
    }

    // --- 4. KLIKNUTÍ NA ODKAZY (Zavírání menu) ---
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(l => l.classList.remove("active-link"));
            link.classList.add("active-link");
            setTimeout(() => toggleMenu(false), 300);
        });
    });

    aptDropdownLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove("active-link"));
            if (mainAptLink) mainAptLink.classList.add("active-link");
            const parent = link.closest('.nav-item');
            if (parent) parent.classList.remove('active');
            setTimeout(() => toggleMenu(false), 300);
        });
    });

    // --- 5. ZAVŘENÍ PŘI KLIKNUTÍ MIMO (Klíčové pro UX) ---
    document.addEventListener("click", (e) => {
        // Zavřít jazyky, pokud kliknu mimo
        if (langWrapper && !langWrapper.contains(e.target)) {
            langWrapper.classList.remove('active');
        }

        // Zavřít apartmány, pokud kliknu mimo
        const activeApt = document.querySelector('.nav-item.active');
        if (activeApt && !activeApt.contains(e.target)) {
            activeApt.classList.remove('active');
        }

        // Zavřít hamburger
        if (nav?.classList.contains("active") && !nav.contains(e.target) && !openBtn?.contains(e.target)) {
            toggleMenu(false);
        }
    });
});