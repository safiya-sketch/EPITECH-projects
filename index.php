<?php

function pelican_game(int $totalDice)
{
    if ($totalDice < 60 || $totalDice > 360) {
        echo "Valeur impossible\n";
        return;
    }

    $score = $totalDice + 43;
    echo "Total des dés : $totalDice\n";
    echo "Ajout de 43 : $totalDice + 43 = $score\n";

    if ($score % 32 === 0) {
        $score = $score / 8;
        echo "Le total est un multiple de 32, division par 8 : $score\n";
    } elseif ($score % 6 === 0) {
        $score = $score / 3;
        echo "Le total est un multiple de 6, division par 3 : $score\n";
    } else {
        $score = $score - 42;
        echo "Le total n’est ni multiple de 32 ni de 6, soustraction de 42 : $score\n";
    }

    $floor = floor($score / 10) * 10;

    // Décompte "Nigel X"
    $counter = 1;
    while ($score > $floor) {
        echo "Nigel" . " " . $counter . "\n";
        $score--;
        $counter++;
    }

    $etape3 = $totalDice + 43;
    $difference = $floor - $etape3;
    echo "$floor - $etape3 = $difference\n";

    $finalScore = intval($difference / 100);
    echo "Centaine de $difference = $finalScore\n";

    echo "Score final : $finalScore\n";
}

pelican_game(311);
