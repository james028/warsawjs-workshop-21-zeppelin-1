# warsawjs-workshop-21-zeppelin

To repozytorium zawiera kod źródłowy przygotowany na warsztaty WarsawJS #21. Jest to aplikacja
do grupowego komentowania obrazków.

# Plan

**Skonfigurowanie projektu**

- utworzenie projektu o nazwie warsawjs-workshop-21-zeppelin
- utworzenie "pustego" projektu za pomocą create-react-app
- instalacja bibliotek
    - @material-ui/core
    - @material-ui/icons
    - react-router
    - react-router-dom
    - redux
    - react-redux
    - redux-thunk
    - reselect

**Zapoznanie się z API**

https://warsawjs-21-api.herokuapp.com/

- implementacja funkcji odpytujących końcówki API
    - login({ username, password })
    - readPostList()
    - createPost({ username, title, image })
    - readPost(postId)
    - createComment({ postId, username, body, position })

**Widoki (kontenery) oraz nawigacja**

- implementacja szkieletów widoków kontenerów
    - Login
    - Layout
- implementacja komponentów Header oraz menu bocznego
- podpięcie kontenerów pod routing aplikacji
    - ProjectListPage
    - ProjectCreatePage
    - ProjectEditPage

**Logowanie oraz wylogowanie**

- akcja do logowania, reduktor oraz selektory isLoggedIn, getUserName
- formularz logowania LoginPage
- wywołanie akcji w formularzu oraz przekierowanie do widoku listy projektów
- blokowanie wejścia na widoki listy projektów dla niezalogowanych użytkowników

**Widok listy projektów**

- akcja wczytująca listę projektów
- reduktor dot. listy projektów
- wywołanie akcji w komponencie ProjectListPage
- wyświetlanie listy projektów
  - komponent ProjectListItem do wyświetlania pojedynczego projektu w wersji skróconej

**Widok dodawania nowego obrazka**

- akcja do tworzenia projektu
- komponent do wyboru obrazka, ImageUploadField
- wywołanie akcji tworzącej projekt w kontenerze ProjectCreatePage
- przekierowanie do listy projektów po utworzeniu projektu

**Widok edycji pojedynczego projektu**

- akcja do wczytywanie pojedynczego projektu, reduktor oraz selektory
- komponent ProjectCommentPreview do pokazywania komentarzy na obrazku projektu
- wyświetlanie informacji o projekcie oraz listy komentarzy na widoku ProjectEditPage

**Dodawanie komentarzy do projektu**

- akcja do tworzenia komentarzy, reduktor oraz selektory
- wyświetlanie modala z formularzem tworzenia komentarza po kliknięciu na komponencie
  podglądu projektu
- wywołanie akcji tworzącej nowy komentarz oraz odświeżenie listy komentarzy projekta
