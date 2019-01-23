# planning-poker
Aplikacja webowa, która umożliwia zespołom estymację czasową poszczególnych zadań w projekcie. 

Użyte technologie: React ^16.6.1 (TypeScript) oraz .NET Core 2.1. Użyte biblioteki:

```
SignalR
Rematch
```


## Instalacja i uruchamianie

Źródła serwera `./PlanningPoker`

Uruchamianie:
```
dotnet run
```

Źródła klienta `./client`

Instalacja:
```
yarn install
```
lub
```
npm install
```
Uruchamianie:
```
yarn start
```
lub
```
npm start
```

Domyślnie serwer uruchamiany jest na porcie `7000`, natomiast klient na porcie `3000`.

## Komunikacja
Po stronie serwera głównym plikiem, odpowiedzialnym za obsługę przychodzących wiadomości jest `Hubs/RoomHub.cs`. Przykładowa metoda, która obsługuję akcję rozpoczęcia planowania:

```C#
public void StartPlanning()
    {
      Execute(async () =>
      {
        var room = storage.GetMembersRoom(Context.ConnectionId);
        storage.StartPlanning(Context.ConnectionId, room);
        await Clients.Group(room.RoomName).SendAsync("PlanningStarted");
      });
    }
```

Po stronie klienta głównym plikiem, odpowiedzialnym za komunikację z serwerem jest higher order component `modules/Common/HOC/SignalR.index.tsx`. Przykładowa metoda odpowiedzialna za wysyłanie akcji do serwera:

```TypeScript
startPlanning: EmptyFunction = () => this.invoke("startPlanning");
```

Fragment odpowiedzialny za obsługę wiadomości nadchodzących z serwera:

```TypeScript
WithSignalRComponent.connection.on("planningStarted", () => {
    changeStatus("duringPlanning");
  });
```
