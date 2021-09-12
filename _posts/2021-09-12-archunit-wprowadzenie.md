---
layout: post
title: ArchUnit - czyli jak testować swoją architekturę?
subtitle: Proste testowanie architektury? Niemożliwe staje się możliwe!
bigimg: /img/posts/danist-soh-dqXiw7nCb9Q-unsplash.jpg
img-author: Danist Soh
tags: [architektura, testowanie, testy, testing, clean code, code quality]
comments: true
published: true
---

Nowy projekt, idealna sprawa dla zespołu deweloperskiego, bo "greendfield". Po wielu przemyśleniach i ożywionych dyskusjach, zespół ustala architekturę w projekcie i decyduje, jak podzielona będzie
aplikacja - w jakich pakietach wylądują poszczególne funkcjonalności, jakie będą konwencje nazwenicze, co wolno, a czego nie. Na początku wszystko idzie zgodnie z planem - podział funkcjonalności
jest klarowny, klasy odpowiednio się ze sobą komunikują, zespół trzyma się przyjętych zasad nazewniczych. Jednak z czasem, z zespołu odchodzą developerzy, przychodzą świeżynki "niewtajemniczone"
w arkana architekury kodu w projekcie, zmieniają się liderzy mający różne wizje rozwoju owego softu, w końcu i regularnie pojawiają się okresy wzmożonego "ciśnienia" na dowożenie krytycznych funkcjonalności.
Z czasem projekt zaczyna bardziej przypominać zlepek klas bez ładu i składu, wołających się cyklicznie, z rozjechanym nazewnictwem. Generalnie większy lub mniejszy bałagan. Myślę, że wielu z nas
widziało na własne oczy taką ewolucję projektu lub miało okazję wejść do projektu na pewien czas, wyskoczyć z niego i kiedyś ponownie wrócić.

Czy można tego uniknąć? Jest kilka środków zaradczych,
lecz jednym z najprostszych i skuteczniejszych jest zastosowanie ArchUnita, który przypilnuje, by kod trzymał się ustalonych zasad.

W dzisiejszym materiale Pawel opowie, czym jest ArchUnit i jak użyć tego świetnego narzędzia:

<div style="text-align: center;">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/uv98TxaRq-w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

O ArchUnicie napisałem też pokrótce na swoim blogu: [Guard your architecture by ArchUnit](https://unknownexception.eu/2021-08-12-archunit).

Jeśli nie używaliście nigdy wcześniej ArchUnit, to naprawdę warto spróbować. Parę testów napisanych w kwadrans wykryje mnósto problemów z kodem i zabezpieczy go na przyszłość.

[Dawid](https://unknownexception.eu)