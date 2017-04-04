---
layout: monochrome-default
type: school
title: Zusammenfassung für Randomisierte Algorithmen
---
## Einleitung
#### Randomisierte Algorithmen
* Zufälliger Wert irgendwie zur Verfügung gestellt
* Unbekannter nächster Elementarschritt, des Wahrscheinlichkeiten aber bekannt sind
* Viele deterministische Algorithmen, Auswahl des Algorithmus durch Zufallsstring in Eingabe oder 

#### Zufallsvariablen
Zufällig (mit Erwartungswerten) sind
* Laufzeit
* Ergebnis
* Speicherplatz

#### Vorteile
* leichter zu formulieren als deterministische
* manchmal besser (in Laufzeit oder Ergebnis)
* kein deterministischer Algorithmus vorhanden

## Wichtige Sätze
* MINIMAX Methode von Yao für untere Schranken von randomisierten Algorithmen
    * $$\min_{A}E(C(I_p,A)) \leq \max_{I}E(C(I,A_d))$$.
* Chebyshev zur ANzahl von Primzahlen
    * $$\pi(n) \in O(n \ln n)$$.

## USTCON

#### Problem
Graph $$G=(V,E)$$, $$s, t \in V$$. Frage: Sind $$s$$ und $$t$$ in der gleichen Zshkomp.?

#### Algo USTCON
Random Walk ab $$s$$ mit Länge $$2n^3$$, wenn $$t$$ gefunden, _YES_ sonst _NO_.
#### Analyse USTCON
* Laufzeit $$O(n^3)$$
* $$RP$$ .
* Fehler $$\leq \frac{1}{2}$$
    * $$X$$ Anzahl Schritte bis $$t$$
    * Markov-Ungl $$Pr(X \geq 2n^3)\leq \frac{E(X)}{2n^3} \lt \frac{n^3}{2n^3} = \frac{1}{2}$$

## Random Walks

#### Widerstandsnetze
* $$1 \Omega$$ pro Kante
* $$d(v)$$ Stromstärke pro Knoten
* $$m_{uv} = \varphi_{uv}$$.
* $$C_{uv} = m_{uv} + m_{vu} = 2mR_{uv} \lt n^3$$.
    * $$m \lt \frac{1}{2}n(n-1) \lt n^2$$.
    * $$R_{uv} \lt n-1$$.

## STCON

#### Algo STCON
Random Walk bis $$n-1$$, würfle $$n\log n$$ und bei `null` gebe _NO_ zurück.
#### Analyse STCON
* Platz $$O(log n)$$
* Fehler $$\lt \frac{1}{2}$$
* $$RP$$.

## MIN CUT

#### Algo CONTRACT
Kontrahiere zufällig Knoten, finde Cut zwischen zwei letzten Knoten
#### Analyse CONTRACT
* Laufzeit $$O(n*n)=O(n^2)$$
* Fehler $$\Omega(\frac{1}{n^2})$$
    * i-te Phase in der noch keine k-Kante kontrahiert wurde hat (n-i+1) Knoten mit min-degree k, also mindestens $$\frac{(n-i+1)k}{2}$$ Kanten
* mit $$n^2$$ Wiederholungen 
    * Fehler $$\lt \frac{1}{e}$$
    * Laufzeit $$O(n^4)$$ (det. $$O(n^3)$$)

#### ITERCONTRACT
* Wahrsch. Cut noch da $$\binom{t}{2}/\binom{n}{2}$$

#### Algo ITERCONTRACTDETMINCUT
$$\frac{n^2}{t^2}$$ mal `ITERCONTRACT(t)` dann deterministisch mit $$t=n^{\frac{2}{3}}$$
#### Analyse ITERCONTRACTDETMINCUT
* Laufzeit $$O(n^{\frac{8}{3}})$$ ($$\frac{n^2}{t^2}(n^2+n^3)$$)
* Fehler $$\lt \frac{1}{e}$$

#### Algo FASTCUT
Mache zweimal Itercontract bis $$t = \lceil 1 + \frac{n}{\sqrt{2}} \rceil$$ und rufe auf beiden rekursiv `FASTCUT` auf
#### Analyse FASTCUT
* Laufzeit $$O(n^2\log n)$$
* Erfolg $$\Omega (\frac{1}{log n})$$

## UOB

#### Deterministisch UOB
Es gibt immer einen Fall, in dem $$n=4^k$$ Knoten angeschaut werden müssen
#### Algo UOB
Wähle zufällig Kindknoten
#### Analyse UOB
* Erwartung $$3^k$$ mit Induktion
* MINIMAX von Yao als Vergleich zu unterer Schranke
    * Umschreiben in NOR Gatter
    * wähle Eingabe $$p = (1-p)^2$$ und erwartete Anzahl besuchter Blätter von bestem Algorithmus A: $$W(h) = W(h-1) + (1-p)W(h-1)$$

## Komplexitätsklassen
* RTM ist DTM mit bis zu zwei Übergangsmöglichkeiten gleicher Wahrscheinlichkeit
    * normalisiert, wenn immer zwei Übergänge und alle Berechnungen gleich lang 
* $$RP$$ und $$co-RP$$ einseitig mit Fehler $$\lt \frac{1}{2}$$
    * durch Wiederholen bessere Wahrscheinlichkeit  
    * $$ZPP$$ sind beide $$RP$$ Klassen
* $$BPP$$ wenn Fehler $$\lt \frac{1}{4}$$
    * durch Wiederholen und wählen des am meisten Vorkommenden bessere Wahrscheinlichkeit
* $$PP$$ Erkennen der Sprache $$\gt \frac{1}{2}$$, Erkennen der Nicht-Sprache $$\leq \frac{1}{2}$$  

## MST

#### Algo BORUVKA
Boruvka Phase: Finde lokal minimale Kanten, kontrahiere diese. Wiederhole bis alle Kanten kontrahiert
#### Analyse BORUVKA
* Laufzeit $$O(m \log n)$$ (eine Phase in $$O(m+n)$$)

#### Algo RANDOM SAMPLE
Sortiere Kanten und wähle zu Wahrscheinlichkeit p falls Knoten noch nicht in gleicher Komponente. Alle Kanten sind $$F_i$$-leicht
#### Analysis RANDOM SAMPLE
* Erwartungswert leichter Kanten $$\frac{n}{p}$$

#### Algo MSF
Mach 3x Boruvka, Sample $$\frac{1}{2}$$ Kanten, entferne F-schwere Kanten, wiederhole rekursiv
#### Analyse MSF
* Laufzeit $$O(m+n)$$

## Markov-Ketten
#### Definitionen
* Zustandsautomat, beschreibbar als Matrix mit stochastischen Zeilen
* $$f^{(t)}_{ik}$$ Wahrscheinlichkeit nach $$t$$ Schritten von $$i$$ zu $$j$$ zu gehen; $$f^*_{ij}$$ Wahrscheinlichkeit von $$i$$ irgendwann zu $$j$$ zu kommen
* $$m_{ij}$$ Erwartungswert Schritte von $$i$$ zum erstenmal zu $$j$$ zu kommen
* rekurrenter Zustand $$i$$ 
    * positiv persistent wenn $$m_{ii} \lt \infty$$ 
    * null-persistent wenn $$m_{ii} = \infty$$ 
* ergodisch, wenn irreduzibel und aperiodisch

#### Aperiodisieren von Markov-Ketten
* $$P' = \frac{1}{2}(I + P)$$.
* $$wP = w \Rightarrow wP' = w$$.

#### Ergodische Markov-Ketten
* $$W = \lim P^t$$ existiert
* $$W$$ besteht aus identischen Zeilen $$w$$, $$0 \lt w_i$$
* $$wP=w$$.
* $$w_i = \frac{1}{m_{ii}}$$.
* reversibel wenn $$w_iP_{ij} = w_jP_{ji}$$

#### Algo METROPOLIS
Finde Markovkette mit gegebenr stationärer Verteilung. $$Q$$ proposal matrix, $$H$$ energy function. Start bei $$i_0$$. Berechne $$i_{t+1}$$ mit 2 Schritten: 
* wähle $$j$$ je nach $$Q(i_t,\cdot)$$. 
* wenn $$H(j) \leq H(i_t)$$ also $$w_j \geq w_{i_t}$$, dann $$i_{t+1}=j$$
* wenn $$H(j) \gt H(i_t)$$ also $$w_j \lt w_{i_t}$$, dann 
    * $$i_{t+1} = j$$ mit Wahrscheinlichkeit $$\frac{w_j}{w_{i_t}}$$

## Approximieren

#### Allgemeines
* NTM kann zu Problem aus $$\#P$$ genau $$\#_{\Pi}(x)$$ Eingaben in poly Zeit akzeptieren
* $$(1-\epsilon)\#(x)\leq (Ax) \leq(1+\epsilon)\#(x)$$.
    * PAS wenn Laufzeit polynomiell in n
    * FPAS wenn Laufzeit polynomiell in n und $$\frac{1}{\epsilon}$$ 
* $$Pr[(1-\epsilon)\#(x)\leq (Ax) \leq(1+\epsilon)\#(x)] \geq \frac{3}{4}$$.
    * PRAS wenn Laufzeit polynomiell in n
    * FPRAS wenn Laufzeit polynomiell in n und $$\frac{1}{\epsilon}$$

#### Algo SAMPLEDNF
Rate Lösungen und zähl wie hoch der Anteil richtig geratener Lösungen, rate dementsprechend Anzahl Gesamtlösungen.
#### Analyse SAMPLEDNF
* für Fehlerwahrsch. $$\lt \frac{1}{4}$$ muss Anz. Wiederholungen umgekehrt proportional zu $$\frac{\|G\|}{\|U\|}$$ sein, kann exponentielle Laufzeit bedeuten

#### Algo RANDDNF
??
#### Analyse RANDDNF
??

## Online Algorithmen
#### Kompetivität Cache Misses
* MIN ist optimaler Offline Algorithmus
* Worst Case macht keinen Sinn, weil es immer Anfragen gibt, die Cache Miss erzeugen können
* $$f_A - Cf_O \leq b$$, b nicht von Eingabelänge abhängig (aber von C)
* LRU, FIFO k-kompetitiv

#### Widersacher
* oblivious: kennt Code aber nicht Zufallsbits (immer gleiche Eingaben)
* adaptiv
    * online: kennt Code, kann auf bisherige Anfragen und Zufälle onlie entscheiden
    * offline: kennt auch noch alle zukünftigen Zufallsbits

#### Algo MARKER
Bei Cachemiss, schmeiße unmarkierten raus, und markieren neuen, wenn alle markiert, entferne Marker
#### Analyse MARKER
* $$H_k$$-kompetitiv
    * Vergleich mit OPT pro Phase mit $$l$$ sauberen Elementen
    * Unterschiede Cache Elementen in OPT und MARKER mit $$d_a$$ und $$d_e$$ 

#### Algo ADAPTW
Kosten von Cachemissen, verdränge daher eher leichte Elemente $$x_i$$ mit Wahrscheinlichkeit $$\frac{\frac{1}{w(x_i)}}{\sum{\frac{1}{w(x_j)}}}$$
#### Analyse ADAPTW
* k-kompetitiv

#### k-Server Problem

## Kleine Beispiele

#### Matrizenvergleich
* Frage $$AB=C$$ in $$O(n^3)$$ oder aber 
* Abschätzung $$ABr=Cr$$ in O(n^2) mit 
* Fehler $$\leq \frac{1}{2}$$
    * letzter bit in $$d$$ muss negative der bisherigen Summe sein

#### Wörtervergleich
* Primzahl $$p \leq n^2 \ln n^2$$, Vergleich der modulos 
* Fehler $$\lt \frac{1}{n}$$
* Chebyshev: Zahl $$2^n$$ hat höchstens n Primteiler

#### Pattern Matching
* Wie Wörterbuchvergleich, nächster Fingerabdruck berechnbar 
* in Laufzeit $$O(m+n)$$
* mit Fehler $$\lt \frac{1}{n}$$

#### Quicksort
* Wähle Pivot zufällig
* Erwartete Laufzeit in $$O(n\log n)$$
