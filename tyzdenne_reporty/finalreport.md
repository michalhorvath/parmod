## Final report

_Parmod, Michal Horváth_

### Repozitár

github.com/michalhorvath/parmod

### Verejná inštancia

http://parmod.michalhorvath.io/

### Postup ako rozbehať vývojové prostredie

Príkazy pre spustenie vo vývojovom režime:

    git clone github.com/michalhorvath/parmod
    cd parmod/parmod-frontend
    npm install
    npm start
    cd ../parmod-backend
    npm install
    npm run dev

Príkazy pre build:

    git clone github.com/michalhorvath/parmod
    cd parmod/parmod-frontend
    npm install
    npm run buildcp
    cd ../parmod-backend
    npm install
    npm build
    npm start

### Implementované 

* Registrácia a login, upravovanie a mazanie profilov

* Vytváranie, upravovanie, mazanie dizajnov s parametrami, ktoré sú verejne viditelné

* Generovanie a mazanie modelov aj s automatickým renderovaním stl súboru

* Interakcie ako lajkovanie a komentovanie

* Funkcie moderátora

* Hlavný kanál na ktorom je vidieť aktivita používateľov

* Upload fotiek

* Emailové notifikácie

* Prehliadanie 3D modelu.

### Neimplementované

* Cachovanie modelov aby sa nerenderovali viac krát pri rovankých parametroch - Rozhodol som sa túto požiadavku neimplementovať nakoľko by to pridalo zložitosť do kritickej časti aplikácie.

* Typy parametrov, reps. obmeznenia možných hodnôt parametrov (číslo alebo string, interval alebo preddefinovaná množina) - Na túto požiadavku som zabudol. Parametre ako také samozrejme implementované sú ale iba v jednoduchej forme kde je možné do nich dosatiť ľubovolnú hodnotu.

### Problémy

* Najväčšie problémy boli so spúšťaním aplikácie OpenSCAD z NodeJS a celkovo s prácou so súbormi.

* TypeScript som videl prvý krát a typové kontroly veľmi spomalujú prácu.

* UI a UX nie sú moja silná stránka.


### Čo by som spravil inak?

* Pridal by som kategórie dizajnov pre lepšie vyhľadávanie.

* Praktické rozlíšenie mezdi User a Designer je triviálne, kludne by stačila jedna rola.

* Hlavný kanál mi nepríde užitočný.

* Prenos súborov by som nerobil cez REST API.

### Na ktoré apsekty som hrdý?

* To, že som zobral desktopovú aplikáciu OpenSCAD a rozbehal ju na serveri cez nodejs aj s prehadzovaním súborov lokálne na serveri, do databáze a klientovy pričom celý proces beží asynchróne. 

* Je to asi prvý školský projekt, ktorý bude pre mňa osobne užitočný.
