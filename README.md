Voľby zo zahraničia — [volby.digital](https://volby.digital/)
============================

Webová aplikácia, ktorá vygeneruje žiadosť pre voľby do Národnej rady SR
alebo o volebný preukaz. Vygenerovanú žiadosť si volič môže stiahnuť a poslať poštou,
alebo ju poslať rovno emailom na príslušný úrad.


Formálne: Z hľadiska zákona o ochrane osobných údajov 122/2013 Z.z. keďže nie sú údaje prenášané na servery prevádzkovateľa aplikácie, nedochádza u neho k "spracúvaniu osobných údajov" v zmysle §4.3.a, nie sú teda naplnené požiadavky §2, a preto sa na neho tento zákon nevzťahuje. Špeciálne odoslanie žiadosti je úkon ktorý vykonáva používateľ aplikácie sám (z vlastnej vôle) a prostriedkami plne pod vlastnou kontrolou (svoj email či pošta), preto prevádzkovateľ aplikácie ani nevykonáva "odovzdávanie osobných údajov tretej strane", t.j. poskytovanie údajov v zmysle §4.3.a.1. Aplikácia je určená pre pomoc zabezpečovania osobnej činnosti fyzickej osoby a v takomto prípade sa v zmysle §3.2.a tento zákon nevťahuje ani na používateľa aplikácie (t.j. používateľ nemusí nič riešiť).

Informácie poskytované prostredníctvom tejto aplikácie týkajúce sa volieb (termíny, možnosti voliča, text žiadosti) sú zísakné z verejne dostupných zdrojov a overené. Správnosť informácií týkajúcich sa adries obcí tiež podľa možností overujeme, ale najmä pri e-mailových adresách malých obcí nevieme garantovať ich funkčnosť. Ak niekto zistí že sú tu nesprávne údaje, vytvorte prosím issue na githube. Napriek snahe autorov aplikácie aby všetko fungovalo ako má, za výsledok neručíme a odporúčame používateľom neodkladať zaslanie žiadosti na poslednú chvíľu, aby aj v prípade nefunkčnosti aplikácie, napr. v dôsledku nekompatibilnej konfigurácie zariadenia používateľa, alebo probléme v komunikácii (napr. zlá emailová adresa úradu) nedošlo k zmeškaniu kritických lehôt.

Žiadosti musia byť DORUČENÉ do 15.1/15.2. Ďalšie informácie sú dostupné napríklad na stránke http://volby.scholtz.sk/, https://platforma.slovensko.digital/t/registracia-na-volby-postou-zo-zahranicia-alebo-volicsky-preukaz/893/34

Oficiálne informácie o hlasovacom preukaze: http://www.minv.sk/?nr16-preukaz 

Oficiálne informácie o hlasovaní poštou pre osobu s trvalým pobytom na Slovensku: http://www.minv.sk/?nr16-posta2

Oficiálne informácie o hlasovaní poštou pre osobu bez trvalého pobytu na Slovensku: http://www.minv.sk/?nr16-posta1


---
**Ako si nechať doručiť hlasovacie lístky na adresu, ktorú ešte nepoznáte?**
(V prípade, že ste napríklad kamionista, ktorý je mesiac na cestách, alebo adresu v cudzine v mesiaci február, marec ešte nepoznáte) 
Pošty vo väčšine krajín sveta umožňujú poslať zásielku ako POSTE RESTANTE. To znamená, že si zistíte iba adresu pošty v meste, v ktorom budete v čase doručenia hlasovacích lístkov. Ako adresu miesta pobytu v cudzine zadáte:
```
Meno Priezvisko
Poste restante
Adresa posty
PSC MESTO
KRAJINA
```
Zásielka sa drží na pošte doručenia 2 týždne. Preto ak nebudete v danom meste celú dobu v rámci ktorej Vám môžu prísť hlasovacie lístky, bude dobré sa informovať úradníkov kam ste zasielali žiadosť o lístky kedy Vám to pošlú. Nedá sa na to spoliehať, pretože majú iba povinnosť Vám to poslať v termíne do 35 dní pred voľbami a nie Vás o dátume poslania informovať. 
Zásielka sa Vám vydá na základe dokladu totožnosti, kde sa overuje Vaše meno.

---
**Testovacia stránka:**  
https://volby.digital/test/

**Nápad vznikol na:**  
[platforma.slovensko.digital](https://platforma.slovensko.digital/)

**Zoznam podporovaných/otestovaných zariadení:**  

* Windows 10, Firefox 42.0 - Plná funkcionalita
* Windows 10, Chrome 47.0.2526.80 - Plná funkcionalita
* Windows 10, Internet explorer 11.0.26 - Funguje, ale náhľad PDF nefunguje, ale ponúka PDF na stiahnutie
* Windows 10, Edge 20.10260.16384.0 - Funguje, ale náhľad PDF nefunguje, ale ponúka PDF na stiahnutie
* Windows 7 64bit, Chrome 46.0.2490.86m: Nefunguje - Podpisovanie je nefunkčné
* Windows 7, Internet explorer 11.0.9600 - Funguje, ale náhľad PDF nefunguje, ale ponúka PDF na stiahnutie
* Windows 7, Firefox 42.0 - Plná funkcionalita
* Android 5.1.1, Chrome 47.0.2526.83 - Funguje, ale preview a finálnu verziu priamo sťahuje
* Android 4.1, Opera - Nefunguje
* Android 4.1, Sony Xperia E 4.1 (Vstavaý prehliadač) - Nefunguje
* Android 4.1, Chrome - Náhľad nefunguje, súbory náhľadu a finálnej žiadosti sú automaticky stiahnuté
* Mac OS X El Capitan v10.11.1, Chrome 46.0.2490.86 (64-bit): Nefunguje - Podposiovanie je nefunkčné
* Mac OS X El Capitan v10.11.1, Safari Version 9.0.1: Plná funkcionalita
* iOS 9.2 (iPad),Mobile Safari 9.0: Plná funkcionalita
* Ubuntu 14.10, Chrome 46.0.2490.86 - Podpisovanie je nefunkčné
* Ubuntu 14.10, Firefox 42.0 - Plná funkcionalita

---

**Changelog:**  
  1.0-beta 11.12.2015 
	Formulár žiadosti o hlasovací preukaz poštou bol skontrolovaný
	Formulár žiadosti o hlasovací preukaz pre splnomocnenca bol skontrolovaný
	Formulár žiadosti o hlasovanie poštou s trvalým pobytom na Slovensku bol skontrolovaný
	Formulár žiadosti o hlasovanie poštou bez trvalého pobytu na Slovensku bol skontrolovaný
	Zmena štýlu
	Odstránená funkcionalita vkladania foto - cez mailto nie je možné odoslať prílohy, iba vytvoriť email a prílohy manuálne pripnúť
	
  0.4 - Všetky možnosti pokryte  
  0.3 - Podpis a fotografia je vkladaná do PDF  
  0.2 - Proof of concept - signaturePad  
  0.1 - Proof of concept - Generovanie žiadosť
