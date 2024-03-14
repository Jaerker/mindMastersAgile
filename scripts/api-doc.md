# API Handler (api.js)

* Filens placering i vår projekt är: `./scripts/api.js`
* Den JS fil som behöver använda denna måste vara en modulfil, till exempel:
 `<script type="module" src="./script.js"></script>`

Inne i din JS fil så får du importera `api.js`. Har vi vår JS fil inuti samma mapp som `api.js` så skriver vi enklast: `import api from './api.js'`. 

Tanken är att vi helst ska lägga alla JS filer i `scripts` mappen, så har vi inte gjort det så kan det vara ett bra tillfälle att göra det och samtidigt städa lite i koden. 

**Glöm inte att ändra `src` attributen i din script-tag i HTML filen du jobbat med också, annars så kommer den inte koppla korrekt.** 

# Funktioner för Användarna

## <mark>await</mark> api.user.list()
>Funktionen <u>returnerar en lista med alla användare.</u> Kan t.ex vara bra när man ska:
>* Jämföra username och password när man ska logga in
>* Kolla om användarnamnet är upptaget eller inte när man registrerar ny användare
>
>Såhär kan den användas: 
>```
>import api from './api.js'; //Hämtar funktionerna i api.js
>
>async function registerValidation(){
>    const userList = await api.user.list();
>    
>    //  userList kommer nu att se ut så här: 
>    //  [
>    //     {username:'jesper123', password:'fisnils123', email:'jesper@något.com',role:'admin', profile_image_:'något'}, 
>    //     {...} 
>    //  ] 
>    //  
>    //  Alltså en array av objekt bestående av: 
>    //  {
>    //      username,
>    //      password,
>    //      email,
>    //      role,
>    //      profile_image
>    //  
>    //  }
>    
>    console.log(userList); //Skriver ut listan i konsolen som ett test
>}
>registerValidation(); //Kör funktionen som skrivits här ovan.
>```

## <mark>await</mark> api.user.details(<mark>username</mark>)
>Tar emot användarnamnet på den man vill ha speciella detaljer om och returnerar användaren som ett objekt om den finns i listan. Om användaren inte finns i listan returneras <u>False</u>, samt att ett meddelande loggas i konsolen om varför.

## <mark>await</mark> api.user.add(<mark>userToAdd</mark>)
>Funktionen <u>lägger till en ny användare</u> till listan. Är användbar när man ska registrera en ny användare. 
>
><b>KOM IHÅG</b> att den gör ingen validering, utan <b>det enda den gör</b> är att den lägger till en användare i listan. <u>Den tar inte hänsyn till om användarnamnet är upptaget. </u>
>
>Funktionen returnerar <u>True</u> om allt fungerar som det ska, annars skickar den tillbaka <u>False</u>, samt skriver ut felmeddelandet i konsolen.
>
> Exempel på användning: 
>```
>import api from './api.js';         // Hämta hem API
>
>const userDummyData = {             // Exempel på hur objektet kan se ut efter man 
>                                     // fyllt i det i formuläret för registrering.
>    username: 'Jaerker',
>    password: 'sjuktsäkertlösen',
>    email: 'johan@hemsida.se',
>    profile_image: 'https://randomuser.me/api/portraits/men/1.jpg'
>}
>
>async function addUser(user){       // Vi tar emot ett objekt, likt den ovan, när vi 
>                                     //skapar en användare. Profilbilden kan vi ju ha 
>                                     //en "default" som man kan ändra sen.
>    if(await api.user.add(user)){    // Returnerar True om allt går som det ska.
>        console.log('Här hamnar vi om allt går som det ska!');
>    }
>    else                             // Returnerar False om det inte fungerar, t.ex att 
>                                     // vi inte skickar med någon användare.
>    {
>        console.log('Här hamnar vi om något inte stämmer, och då kommer det stå ett felmeddelande i konsolen, förmodligen ovanför detta meddelande.');
>    }
>
>    // Skulle det bli något som blir fel i localStorage efter man har kört Add så
>    // kan man bara radera hela sektionen av users, den återskapas om man kör denna
>    // funktionen om den inte existerar. 
>
>}
>```

## api.user.login(<mark>username</mark>)
>Väldigt enkel om man vill hålla koll på vem som sen är inloggad. <u>Det enda funktionen gör är att spara username i localStorage.</u>
>Funktionen är bra att använda när man ska: 
>* Logga in och vill kunna hålla koll på vem som är inloggad på andra ställen av hemsidan 
>Exempel på att användas: 
>```
>function validateLogin(formInfo){
>    /*
>    Vi låtsas att vi har massa inloggningsfunktion här ovan och allt har gått bra, då kör vi koden nedan (grundat på att formInfo innehåller nyckeln 'username')
>    */
>    api.user.login(formInfo.username);
>
>
>}
>```  
## api.user.logout()
>Tömmer och tar bort vem som är inloggad just nu. Returnerar inget.

## api.user.getCurrentUser()
>Returnerar den användare som är inloggad, om han är det. Annars returneras `undefined`.

## <mark>await</mark> api.user.change(<mark>userToChange</mark>)
>Funktionen tar emot användaren som man vill ska ändras på. Viktigt att ha med är att skicka med hela objektet, med tanke på att vilket värde som helst kan ändras. 
>
>Jag rekommenderar först att använda:
>```
>const userToChange = await api.user.details(api.user.getCurrentUser())
>```
>Med tanke på att vi ändrar bara användaren som är inloggad så tror jag det är lämpligast. Sen kan man i `userToChange` variabeln byta ut, t.ex profilbildsURL eller lösenord (genom `userToChange.password` eller `userToChange.profile_image`) och sen skicka in nya objektet i databasen med `await api.user.change(userToChange)`.

# Funktioner för Produkter

## <mark>await</mark> api.product.list()
>Funktionen <u>returnerar en lista med alla produkter</u> Kan t.ex vara bra när man ska:
>* Fixa menyn
>Funkar väldigt likt users exemplet. Man får ett felmeddelande returnerat om något går galet.

## <mark>await</mark> api.product.details(<mark>productId</mark>)
>Tar emot produktID på produkt man vill ha en detaljerad sida på om den existerar. Om inte, så returneras False.

## <mark>await</mark> api.product.add(<mark>productToAdd</mark>)
>Funktionen <u>lägger till en ny produkt</u> till listan. 
>
>ID skapas automatiskt åt produkten när den läggs in, det är inget man behöver ta med.
>
>Funktionen returnerar <u>True</u> om allt fungerar som det ska, annars skickar den tillbaka <u>False</u>.
>
>Exempel på hur produkt objekt kan se ut som man lägger till (Första kaffet som jag lånade som referens):
>
>```
>{
>title: 'Bryggkaffe',
>desc: 'En klassisk och pålitlig kopp kaffe, bryggd på månadens utvalda bönor.',
>longer_desc: 'Bryggkaffe är en av de mest populära kaffedryckerna runt om i världen. Med sin enkla tillredningsmetod och välbalanserade smak är det det perfekta valet för kaffedrickare som vill njuta av en ren kaffesmak utan krångel.',
>price: 29,
>rating: 4.5,
>image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D'
>}
>```

## <mark>await</mark> api.product.change(<mark>productToChange</mark>)
>Funktionen tar emot produkten som man vill ska ändras på. Viktigt att ha med är att skicka med hela objektet, med tanke på att vilket värde som helst kan ändras. 
>
>Jag rekommenderar först att använda:
>```
>const changedProduct = await api.product.details(<ID PÅ PRODUKT VI VILL ÄNDRA PÅ>)
>```
>Sen kan man i `changedProduct` variabeln byta ut, t.ex namn, pris, rating (genom `changedProduct.title` eller `changedProduct.price`) och sen skicka in nya objektet i databasen med `await api.product.change(changedProduct)`.

# Funktioner för Orderhistorik
## api.orderHistory.list()
>Denna gjorde jag lite annorlunda, mer baserad på vem som är inloggad. Man vill ju inte se allas orderhistorik, men är man inte inloggad så dyker alla upp. Detta är kopplat till `api.user.getCurrentUser()`, alltså den som är inloggad just nu enligt localStorage. Om dett inte används så får man själv sortera fram användarens ordrar.
>
## api.orderHistory.add(<mark>orderToAdd</mark>)
>Lägger till order som skapats. Det som behöver finnas i objektet `orderToAdd` är:
>```
>{
>    id: <UNIKT ID VI FÅR FIXA SEN>,
>    username: <ANVÄNDARENS NAMN, ELLER INGET VÄRDE OM INGEN ÄR INLOGGAD?>,
>    dateOfPurchase: <TIDSSTÄMPEL NÄR KÖPET GJORDES (YYMMDD), finns ofta färdig tidsstämpelhantering som innehåller mer>,
>    totalSum: <TOTALA PRISET PÅ ORDERN>
>
>}
>```

Allt ska vara testat, men säg till om något är helt galet! Sorry för all text, men hoppas jag har underlättat något till senare hehe.