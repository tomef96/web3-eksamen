# Case: Lagersystem

Klient port: 3000 \
API port: 5001

Når det gjelder klienten så bruker jeg en mappestruktur hvor hver komponent har en mappe med navnet på \
komponenten som indeholder en fil med navn index.js og en fil med navnet på komponenten. \
For eksempel: Input -> [index.js, Input.js, style.css, Input.test.js]. index.js sitt eneste formål er å exportere \
komponenten. På denne måten kan jeg samle opp filer som er relaterte og jeg kan importere komponenten \
 ved å peke på mappen, så importen blir kortere.
