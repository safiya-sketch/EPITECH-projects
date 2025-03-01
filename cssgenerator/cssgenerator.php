<?php

function my_scandir($dir_path)
{
    $readarray = []; // Initialisation du tableau

    if (is_dir($dir_path) && $dir_path != null) {
        if ($open = opendir($dir_path)) {
            while (($read = readdir($open)) !== false) {
                if ($read != "." && $read != "..") {
                    $completePath = $dir_path . '/' . $read;
                    if (is_file($completePath)) {
                        if (exif_imagetype($completePath) == IMAGETYPE_PNG) {
                            $readarray[] = $completePath;
                        }
                    } elseif (is_dir($completePath)) {
                        $readarray = array_merge($readarray, my_scandir($completePath));
                    }
                }
            }
            closedir($open);
        }
    }
    return $readarray;
}

function my_merge_image($dir_path)
{
    $readarray = my_scandir($dir_path);
    
    if (empty($readarray)) {
        echo "Aucune image trouvée.";
        return;
    }
 
    $fp = fopen("style.css", "w"); // Utilisation de "w" pour écraser l'ancien fichier
    $index = 0;

    foreach ($readarray as $image) {
        $dataim = getimagesize($image);
        if ($dataim === false) {
            continue; // Évite les erreurs si getimagesize échoue
        }
        $widthim = $dataim[0];
        $heightim = $dataim[1];

       
        fwrite($fp, "img-$index {
            background: url('$image');
            height: {$heightim}px;
            width: {$widthim}px;
            display:inline-block;
        }\n");

         $index++;
    }

    fclose($fp);
    echo "Fichier CSS généré avec succès.";
}

my_merge_image("Images");

