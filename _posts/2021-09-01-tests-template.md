---
layout: post
title: Jak pisać czytelne testy?
subtitle: 
bigimg: /img/posts/testing.png
tags: [testy, testowanie, testing, clean code, code quality]
comments: true
permalink: /2021/09/tests-template
published: true
---

Obecnie niewiele osób zaangażowanych w rozwój oprogramowania jest przeciwna testowaniu. 
Wyzwanie pojawia się w momencie gdy takie testy trzeba napisać. 
Często podstawą tego problemu nie jest jakaś podświadoma niechęci do testowania czy też 
brak dostrzegania w tej czynności wartości. Często chodzi o samo pisanie testów: 
Jak zacząć? Co robić aby takie testy były przydatne oraz zrozumiałe?
<!--more -->

Dzisiaj chciałbym Ci pokazać jak rozpocząć pisanie testów w taki sposób aby były one czytelne. 
Technikę tą możesz stosować niezależnie od tego czy testy tworzone są po implementacji 
czy może przed (z wykorzystaniem np. <a href="https://www.youtube.com/watch?v=yiPcPJeTbik&t=46s" style="color: blue; text-decoration: underline;">Test-Driven Development</a>).

## Zacznijmy od kodu
Naszym celem jest przetestowanie funkcjonalności, która ma umożliwić dodawanie nowego Apartamentu
i jej logika zapewnia następujące działanie:
1. Jeżeli Właściciel nie istnieje to:
   1. Publikujemy zdarzenie. 
   2. Zwracamy wartość nie będącą identyfikatorem 
2. Jeżeli Właściciel oraz Apartament istnieją to:
   1. Publikujemy zdarzenie.
   2. Zwracamy identyfikator istniejącego Apartamentu. 
3. Jeżeli Właściciel istnieje, ale Apartament nie to:
   1. Tworzymy nowy Apartament. 
   2. Zwracamy identyfikator nowego Apartamentu.

Poniżej jest kod realizujący opisane wymagania:
```java
public class ApartmentService {
   private static final ApartmentId NO_ID = ApartmentId.nullObject();

   public ApartmentId add(OwnerId ownerId, ApartmentDto dto) {
       if (ownerRepository.exists(ownerId)) {
           Address address = new Address(dto.getStreet(), dto.getHouseNumber(), dto.getApartmentNumber(), dto.getCity(), dto.getCountry());
           Optional<Apartment> found = apartmentRepository.findBy(address);

           if (found.isPresent()) {
               Apartment apartment = found.get();

               eventRegistry.publish(new ApartmentAlreadyCreated(apartment.getId(), dto.getStreet(), dto.getHouseNumber(), dto.getApartmentNumber(), dto.getCity(), dto.getCountry()));
               return apartment.getId();
           } else {
               Apartment apartment = new Apartment(ownerId, address);
               return apartmentRepository.save(apartment);
           }
       } else {
           eventRegistry.publish(new OwnerNotFound(ownerId));
       }

       return NO_ID;
   }
```
## Scenariusze testowe
Na sam początek warto stworzyć klasę testową gdzie metody reprezentują odpowiednie scenariusze testowe:
```java
class ApartmentServiceTest {
   @Test
   void shouldFoundExistingApartment() {}

   @Test
   void shouldCreateAnApartment() {}

   @Test
   void shouldRecognizeOwnerWasNotFound() {}
```
Ten krok może wydawać się prosty, ale dzięki niemu jesteśmy w stanie zweryfikować czy 
rzeczywiście rozumiemy funkcjonalność. Niekiedy zdarza się, że któryś blok warunku (if lub else) 
nam “umyka” i nie jesteśmy w stanie nazwać scenariusza testowego, 
którego dotyczy ten fragment kodu. Warto wtedy wrócić do kodu i zastanowić się czy te 
linijki wspierają jakikolwiek prawdopodobny scenariusz. Finalnie, albo usuniemy niepotrzebny kod,
albo  nowy scenariusz testowy pojawi się w naszym zestawie.

## Given - When - Then
Given - When - Then jest to styl pisania testów, który pomoże nam zadbać o czytelność metod 
testowych. Polega on na podzieleniu testu na trzy części:
1. **Given** - założenia; wszystko co musi się wydarzyć aby po wywołaniu testowanej metody stało się to, czego oczekujemy. Czasami zdarzają się testy, gdzie nie mamy żadnych założeń, a niekiedy mamy ich kilka.
2. **When** - wywołanie testowanej metody. Tutaj zawsze mamy jedną linijkę kodu.
3. **Then** - weryfikacja (asercja) czy wydarzyło się to, czego oczekujemy. W teście musimy mieć co najmniej jedną weryfikację (asercję).

```java
@Test
void shouldDoSomething() {
  // GIVEN
  givenAssumptionOne();
  givenAssumptionTwo();

  // WHEN
  Result actual = systemUnderTest.doSomething();

  // THEN
  thenTrueIsFirst();
  thenTrueIsSecond();
}
```

## Szablon pierwszego testu
Teraz możemy stworzyć szablon pierwszego testu. Od którego scenariusza zacząć? 
Najlepiej zacząć od tego, który wydaje nam się najprostszy. 
Najistotniejsze jest aby skupić się na poprawnym uzupełnieniu i nazwaniu części testu odpowiedzialnego
za założenia (given) oraz weryfikację (then). Na ten moment naszym celem jest
zadeklarowanie tego, co w tym teście ma się wydarzyć i co ma zostać spełnione, 
a nie finalna implementacja:
```java
@Test
void shouldFoundExistingApartment() {
   OwnerId ownerId = givenExistingOwner();
   ApartmentDto apartmentDto = givenValidExistingApartmentDto();

   ApartmentId id = service.add(ownerId, apartmentDto);

   thenReturnedIdOfExistingApartment(id, ownerId, apartmentDto);
   thenRecognizedApartmentAlreadyExists(ownerId, apartmentDto);
   thenApartmentWasNotCreated(apartmentDto);
}
```
**Jak wygląda implementacja metod?** Na obecną chwilę się nad tym nie zastanawiamy i pozostawiamy ciała metod puste. Istotną rzeczą jest poprawne nazwanie założeń i weryfikacji.

**Skąd się biorą zwracane atrybuty metod?** Wynikają one z potrzeb konkretnego scenariusza testowego:
- ```OwnerId ownerId = givenExistingOwner();``` - potrzebujemy przekazać id istniejącego właściciel. Dlatego też nasza metoda odpowiadająca za poprawność tego założenia zwraca jego identyfikator.
- ```ApartmentDto apartmentDto = givenValidExistingApartmentDto();``` - potrzebujemy DTO dotyczące apartamentu, który już istnieje. Dlatego też nasza metoda zwraca obiekt odpowiadający temu założeniu.

**Skąd się biorą parametry metod?** Przekazuję te parametry, które wydaje mi się, że mogą się przydać podczas uzupełniania ciała metod. Czy tak rzeczywiście będzie? To się okaże w momencie implementacji.

## Szablon kolejnych testów
Jeżeli chodzi o szablony kolejnych scenariuszy to budujemy je w taki sam sposób jak pierwszy szablon:
```java
@Test
void shouldCreateAnApartment() {
   OwnerId ownerId = givenExistingOwner();
   ApartmentDto apartmentDto = givenValidNotExistingApartmentDto();

   ApartmentId id = service.add(ownerId, apartmentDto);

   thenApartmentWasCreated(id, ownerId, apartmentDto);
}

@Test
void shouldRecognizeOwnerWasNotFound() {
   OwnerId ownerId = givenNotExistingOwner();
   ApartmentDto apartmentDto = givenValidNotExistingApartmentDto();

   ApartmentId id = service.add(ownerId, apartmentDto);

   thenInvalidApartmentIdReturned(id);
   thenRecognizedOwnerWasNotFound(ownerId);
   thenApartmentWasNotCreated(apartmentDto);
}
```
Jak widać w powyższym przykładzie kilku deklaracji jesteśmy w stanie użyć ponownie:
- ```givenExistingOwner``` 
- ```givenValidNotExistingApartmentDto``` 
- ```thenApartmentWasNotCreated```

Bardzo łatwo jest zauważyć momenty gdy istniejące deklaracje mogą być wykorzystane w innym scenariuszu gdyż skupiamy się jedynie na dobrze opisanych założeniach oraz asercjach (deklaracje metod), a nie na ich implementacji.

## Co dalej?
Gdy już posiadamy wszystkie scenariusze wraz z deklaracjami metod możemy przystąpić do ich implementacji. 
Korzystanie z dobrze nazwanych metod sprawia, że scenariusze testowe (metody z adnotacją ```@Test```) 
są odseparowane od detali implementacji. Dzięki takiemu podejściu same metody testowe są dużo prostsze
w zrozumieniu, a metody założeń i weryfikacji mogą być dowolnie skomplikowane nie wpływając przy tym negatywnie 
na czytelność samych testów.

## Podsumowanie
W tym artykule zademonstrowałem Wam jak stworzyć czytelny szablon do swoich testów za pomocą kilku kroków:
1. Stwórz dobrze nazwane puste metody reprezentujące scenariusze testowe.
2. Zweryfikuj czy każdemu rozgałęzieniu w kodzie (warunki, pętle) odpowiada jakiś scenariusz testowy.
3. Opisz zachowanie konkretnego scenariusza poprzez uzupełnienie metody testowej za pomocą dobrze nazwanych metod.
4. Powtórz krok trzeci dla wszystkich scenariuszy.

Dzięki takiemu podejściu nie skupiasz się na problemach związanych z implementacją tylko na logice, która ma zostać przetestowana. Ponadto, bardzo szybko zauważasz miejsca gdzie możesz ponownie wykorzystać zadeklarowane wcześniej metody.

---------------
<div style="text-align: center;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/_MOK258eho0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Github: <a href="https://github.com/KodowanieBezCenzury/testing-tips/tree/master/tests-template" style="color: blue; text-decoration: underline;">repository</a>

---------------
<a href="https://www.linkedin.com/in/sebastian-malaca-3206004b/" style="color: blue; text-decoration: underline;">Sebastian Malaca</a>