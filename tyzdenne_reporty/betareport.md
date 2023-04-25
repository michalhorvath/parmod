## Beta report

_Parmod, Michal Horváth_

### Repozitár

github.com/michalhorvath/parmod

### Verejná inštancia

http://13.53.140.50:8080/

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
    npm buildcp
    cd ../parmod-backend
    npm install
    npm build
    npm start

### Implementované 

* Registrácia a login

* Vytváranie dizajnov s parametrami, ktoré sú verejne viditelné

* Generovanie modelov aj s automatickým renderovaním stl súboru

* Interakcie ako lajkovanie a komentovanie

* Hlavný kanál na ktorom je vidieť aktivita používateľov

* Upload fotiek

### Naplánované

* Emailové notifikácie

* Cachovanie modelov aby sa nerenderovali viac krát

* Upravovanie a mazanie dizajnov a profilov

* Celkovo vylepšiť vzhľad klienta

### Problémy

* Najväčšie problémy boli so spúšťaním aplikácie OpenSCAD z NodeJS a celkovo s prácou so súbormi.

* TypeScript som videl prvý krát a typové kontroly veľmi spomalujú prácu.
