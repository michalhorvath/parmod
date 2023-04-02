## Týždeň 5 (20.3.2023 - 26.3.2023)

_Parmod, Michal Horváth_

### Plán

* Inicializovanie komunikácie s databázov
* Registrácia a login užívateľov
* Renderovanie OpenSCAD na serveri
* Pridávanie dizajnov
* Generovanie modelov

### Realizovanie

* Registrácia a login užívateľov - vytvorené REST API a model pre DB, hashovanie hesla cez bcrypt, udržiavanie tokenu vygenerovaného cez jwt, bootstrap formuláre na frontend. (commit f11fa4e1d1b5c970249f34a5d4bf16b40a471950, commit 8784aeff7012b05d8e98e959786c7602c6a698fb, commit 62822544a00fc1f92dc9bcfe083db395cd030013)
* Renderovanie OpenSCAD na serveri - iba otestované spúštanie konzolového príkazu cez nodejss preddefinovanými testovnými súbormi. (commit e04c174f98c8b913b5426e853aaf7d1fc28d32c7)
* Pridávanie dizajnov - vytvorené REST API a model pre DB, bootstrap formuláre na frontend. Zatial bez nahrávania súborov. (commit 5cdc7e18069169e790cb550921b27850e1800a75, commit 5cdc7e18069169e790cb550921b27850e1800a75)
* Generovanie modelov - vytvorené REST API, model pre DB, zatial nepracuje s OpenSCAD (commit 3bb15ee3dd15aec7f8eb7f5f466a33e7e4e85bab)
* Katalóg dizajnov - zatial iba v jednoduchom textovom výpise (commit dc95d45b2407de6b49e199aa5fb54312b418ae89)

### Komentár

Za tento týždeň som celkom úspešne vytvoril základ projektu na frontende aj backende. Jedinú planovanú vec, ktorú som neriešil je práca so súbormi. Na druhú stranu som začal pracovať na jednom bode z ďalšieho týždňa.

### Plán na ďalší týždeň

* Práca so súbormi
* Lajkovanie a komentovanie
* Hlavný kanál

