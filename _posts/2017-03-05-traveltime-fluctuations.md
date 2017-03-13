---
layout: monochrome-default
type: ma-thesis
title: Differences of Minimum and Maximum Travel Times
---
Lektion von heute: Daten sinnvoll anzeigen ist schwer. Dies ist ein guter Anfang, aber es geht sicher noch besser.
## Was sieht man hier?

Aufgezeichnet ist `MinMaxDiff = longest_travel_time(e) - shortest_travel_time(e)` jeder Kante in der Schweiz und Deutschland und die Anzahl der Kanten, die, diese `MinMaxDiff` haben. Diese `MinMaxDiff` sind bucketed in 120s buckets. (`MinMaxDiff == 120`  sind die Anzahl der Kanten, bei denen `0s < MinMaxDiff < 120s` gilt).

Außerdem gibt es `MinMaxRelDiff = longest_travel_time(e) / shortest_travel_time(e)` in Prozentangaben.

## Daten
Betrachtet wurden alle Kanten mit Connections in der Schweiz und Deutschland, mit Abfahrtszeiten zwischen 8:00 und 18:00 Uhr.
Der letzte Datenpunkt (mit der absurden travel time) sind die Anzahl der Kanten, zwischen denen man <strong>nicht</strong> laufen kann. Dementsprechend ist das loslaufen nach der letzten Connection unmöglich und die travel time zu hoch.
    
### <code>MinMaxDiff</code> in der Schweiz
<canvas id="canvas_ch" class="chart"></canvas>

### <code>MinMaxRelDiff</code> in der Schweiz
<canvas id="canvas_rel_ch" class="chart"></canvas>

### <code>MinMaxDiff</code> in Deutschland
<canvas id="canvas_ger" class="chart"></canvas>

### <code>MinMaxRelDiff</code> in Deutschland
<canvas id="canvas_rel_ger" class="chart"></canvas>
<script src='/js/ma-thesis-minamaxcount.js'></script>






