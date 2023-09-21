# VirtualWhiteBoard

Virtual Board
Projektet går ut på att skapa en virtuell whiteboard som man kan använda för kollaborativt arbete som projektplanering, brainstorming, minnesanteckningar eller liknande.

Det finns massvis med kommersiella lösningar (kolla in Padlet, Jamboard, Miro, Mural etc för att hämta inspiration) men nu har vi chansen att skapa en egen app som funkar som vi vill och inte gnäller om betalning och annat!

Ett enkelt exempel kunde se ut ungefär så här:



 

Projektet utförs i första hand som pararbete! För fulla poäng ska projektet innehålla följande teknologier och features:

 

Del 1 – REST-API för inloggning och grunduppgifter (15p)

Använd t.ex. Node + Express för att koda denna del.
Använd valfri molntjänst för datbasen, MongoDB Atlas eller ElephantSQL rekommenderas.
Använd ORM/ODM för databashantering, Prisma rekommenderas (Mongoose, Sequelize eller annan liknande funkar också)
Ha en endpoint för inloggning (POST) som tar emot användarnamn och lösenord
Lösenordet ska lagras som saltad hash (använd t.ex. bcrypt)
Lyckad lösenordsautentisering ska returnera en JWT-token
JWT:n ska innehålla allt som behövs för fortsatt användning av appen, alltså t.ex.vilka boards en viss användare har tillgång till
Användarna och lösenords-hasharna skrivas direkt i databasen, formulär för användarregistrering krävs inte i detta skede.
Ha en endpont boards/ som returnerar de boards en viss användare har tillgång till.
JWT ska skickas i en authorization-header enligt alla konstens regler
 

Del 2 – WebSocket API för omedelbar uppdatering och kollaborativt arbete (20p)

Använd t.ex. Node + ws eller socket.io för att koda denna del.
Gör denna del som ett skilt projekt! Det är möjligt att t.ex. med Express ha WebSocket och REST i samma app, men det kan bli svårt att driftsätta i molnet.
Använd JWT för auktorisering, WebSocket tillåter inte egna headers så man kan skicka JWT:n som en url-parameter (access_token) när socketen öppnas.
Ta också emot boardens id i urlen.
Spara alla aktiva ws-connections i en lämplig datastruktur, en möjlig lösning är en Array numrerad enligt boardId, som innehåller Set() för alla klienter som just nu är kopplade till denna board. Så för första connectionen (om clients[boardId] är tom) :
clients[boardId] = new Set()
och sedan, efter check att en connection inte redan finns sparad:
clients[boardId].add(ws)
Sedan kan man (vid uppdatering) loopa clients[boardId] med forEach och skicka ett ws-meddelande åt varje klient!
WebSocket-delen ska klara av att skapa nya lappar på en board samt göra ändringar i dessa.
Del 3 – Frontend-applikation (10p)

Använd client side HTML, CSS och JavaScript för att koda denna del, ramverk är tillåtna men vanlig javascript duger bra
Ha de formulär som krävs för REST-delen (inloggning, användarregistrering och board-hantering)
Alla ändringar ska omedelbart synas hos alla klienter som är uppkopplade till samma board, använd WebSocket för detta!
Det går bra att skicka uppdatering vid varje tangenttryck!
Använd nativ WebSocket eller socket.io för att sköta kommunikationen med websocket-API:et (REST-kommunikationen sköts på vanligt sätt med fetch eller det som rekommenderas av ett eventuellt ramverk)
Efter inloggning, lagra JWT:n i t.ex. LocalStorage eller som cookie.
Del 4 – Stil, logik och UX (10p)

Följ regler och guidelines gällande autentisering och auktorisering
Koda snygg och modern JS
Satsa på så bra UX som möjligt, fixa så att lapparna går att flytta med musen, ändra färg osv.
Ge vettiga felmeddelanden åt användaren!
Del 5 – Driftsättning (5p)

Driftsätt API-delarna (REST och WebSocket) i en molntjänst, t.ex. Azure.
Frontend-appen behöver ingen server-side-teknologi så den kan driftsättas var som helst, t.o.m. people.arcada.fi.
ALTERNATIV: Enklare variant utan WebSocket– mindre poäng för hela projektet

En enklare variant där all kommunikation sköts med REST är också möjlig
Ha t.ex. en setInterval som kör ett GET-request och uppdaterar boarden med jämna mellanrum. Inte lika snyggt, men torde funka rätt bra ändå.
Kör inte uppdaterings-request på varje tangenttryck, utan ha en skild Save-knapp som skickar uppdateringen.
 
Får man göra någonting annat coolt i stället?

JA! Så länge ovanämnda features finns med så går det bra. Koda t.ex. ett webbaserat multiplayer-spel som fungerar med REST/JWT för inloggning och WebSocket för själva spelandet!

 

    https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Falchetron.com%2Fcdn%2Fsopwith-video-game-ed0b355f-e124-4647-a107-668afbe2f22-resize-750.jpeg&f=1&nofb=1&ipt=808f6e10b92c2e6bb80fba88268f7d9f7202e9937f255c22b1a7abf446012936&ipo=images

Inlämning

Lämna in på itslearning, Ha med följande
Länkar till alla git-repos som används i projektet. Ge access (read räcker) åt welandfr@arcada.fi
Inloggningsuppgifter till en fungerande testanvändare
En beskrivning hur ni fördelat arbetet inom teamet
En kort reflektion över hur projektet lyckades, vad som var lätt, vad som var svårt osv.
Plagiat är förbjudet, ange källa som kommentar i koden om ni använt andras lösningar (också ChatGPT)
Försenad inlämning a bedöms, men med ett avdrag på -5p per påbörjad försenad vecka.
