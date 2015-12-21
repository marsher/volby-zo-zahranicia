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
**Ako si nechať doručiť hlasovacie lístky na adresu v cudzine, ktorú ešte nepoznáte?**

(Kamionisti, ktorý sú mesiac na cestách po EU, alebo ľudia, ktorí adresu v cudzine po 30.1. keď im hlasovacie lístky majú prísť v čase keď majú o ne požiadať, teda do 15.1. ešte nepoznajú)
V tomto prípade môžete požiadať o poslatie zásielky na adresu pošty v meste, kde budete v danú dobu. To znamená, že si zistíte iba adresu pošty v meste, v ktorom budete v čase doručenia hlasovacích lístkov. Ako adresu miesta pobytu v cudzine vo formulári zadáte namiesto Ulice a čísla slová "Poste Restante" - http://i.imgur.com/REVhJsM.jpg Obec Vám to pošle na adresu:
```
Meno Priezvisko
Poste Restante
PSC MESTO
KRAJINA
```
Zásielka sa Vám vydá na základe dokladu totožnosti, kde sa overuje Vaše meno.
**Zásielka sa drží na pošte doručenia 2 týždne.** Preto ak nebudete v danom meste celú dobu v rámci ktorej Vám môžu prísť hlasovacie lístky, bude dobré sa informovať úradníkov kam ste zasielali žiadosť o lístky kedy Vám to pošlú. Nedá sa na to spoliehať, pretože majú iba povinnosť Vám to poslať v termíne do 35 dní pred voľbami a nie Vás o dátume poslania informovať. Prípadne predom dohodnúť dlhšiu dobu dodania. V možnostiach pošty je "Predĺženie odbernej lehoty, Časové doposielanie, Splnomocnenie, Doručenie na inú adresu na žiadosť adresáta" ( http://www.posta.sk/sluzby/doporucena-zasielka-svet a Infolinke pošty 0800 122 413 )
Zásielky sa budú posielať doporučene. Do niektorych krajín to nie je možné, preto ak by bol problém, treba sa dohodnúť s obcou na nedoporučenej zásielke.

*Toto platí iba pre tých, ktorí nepoznajú adresu svojho pobytu v cudzine v mesiaci február, keď prídu hlasovacie lístky*

---
**Testovacia stránka:**  
https://volby.digital/test/

**Nápad vznikol na:**  
[platforma.slovensko.digital](https://platforma.slovensko.digital/)

**Ohlasy v médiách**

21.12. [Info.sk: Aké majú možnosti Slováci v zahraničí?](http://www.info.sk/sprava/81039/volby-2016-ake-maju-moznosti-slovaci-v-zahranici/) 

20.12. [TV Markiza](http://videoarchiv.markiza.sk/video/televizne-noviny/televizne-noviny/39681_televizne-noviny) (9. reportáž "Zo zahraničia sa volí skôr") 

19.12. [TV RTVS](http://www.rtvs.sk/televizia/archiv/7600/82947) (Čas 26:20-29:05)

13.12. [DennikN:V cudzine sú desaťtisíce hlasov, politici na ne nemyslia, mobilizujú aktivisti](https://dennikn.sk/319788/slovakov-zo-zahranicia-urnam-nemobilizuje-stat-aktivisti/)


**Zoznam podporovaných/otestovaných zariadení:**  

* Windows 10, Firefox 42.0 - Plná funkcionalita
* Windows 10, Chrome 47.0.2526.80 - Plná funkcionalita
* Windows 10, Internet explorer 11.0.26 - Funguje, ale náhľad PDF nefunguje, ale ponúka PDF na stiahnutie
* Windows 10, Edge 20.10260.16384.0 - Funguje, ale náhľad PDF nefunguje, ale ponúka PDF na stiahnutie
* Windows 7, Chrome 46.0.2490.86m: Nefunguje - Plná funkcionalita
* Windows 7, Internet explorer 11.0.9600 - Funguje, ale náhľad PDF nefunguje, ale ponúka PDF na stiahnutie
* Windows 7, Firefox 42.0 - Plná funkcionalita
* Android 5.1.1, Chrome 47.0.2526.83 - Funguje, ale preview a finálnu verziu priamo sťahuje
* Android 4.1, Opera - Nefunguje
* Android 4.1, Sony Xperia E 4.1 (Vstavaý prehliadač) - Nefunguje
* Android 4.1, Chrome - Náhľad nefunguje, súbory náhľadu a finálnej žiadosti sú automaticky stiahnuté
* Mac OS X El Capitan v10.11.1, Chrome 47.0.2526.106 (64-bit) - Plná funkcionalita
* Mac OS X El Capitan v10.11.1, Safari Version 9.0.1 - Plná funkcionalita
* Mac OS X El Capitan v10.11.1, Firefox 43.0 - Plná funkcionalita
* iOS 9.2 (iPad),Mobile Safari 9.0 - Plná funkcionalita
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
