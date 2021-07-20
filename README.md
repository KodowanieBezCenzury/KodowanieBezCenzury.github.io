# KodowanieBezCenzury blog

### Build and run:

#### Option 1) Jekyll:

- Build (required once):
```bash
npm install
bundle install
```

- Run:
```bash
npm run jekyll
```

The site will be available at `http://localhost:4000/`.

- Stop:
```bash
npm run jekyll
npm run jekyll-stop
```

#### Option 2) Docker:

- Build (required once):
```bash
npm install
docker build -t blog "$PWD"
docker run -d -p 4000:4000 --name blog -v "$PWD":/srv/jekyll blog
```

or execute "docker_install_run.sh" from "scripts" folder.

- Run:
```bash
docker start blog
```
or
```bash
docker restart blog
```

- Stop:
```bash
docker stop blog
```

or execute "restart.sh" from "scripts" folder.

The site will be available at `http://localhost:4000/`.

### Testing:

#### Option 1) Jekyll:
```bash
npm run test
npm run cypress

```

#### Option 2) Docker:
```bash
npm run test-docker
npm run cypress-docker
```

### Credits:
- Theme: `https://github.com/daattali/beautiful-jekyll`

- Few awesome libraries used:
    - AOS: `https://github.com/michalsnik/aos`
    - Animate CSS: `https://github.com/daneden/animate.css`
    - lozad.js: `https://github.com/ApoorvSaxena/lozad.js`
    - Pace: `https://github.hubspot.com/pace/docs/welcome`
    - Back top scroll indicator: `https://www.jqueryscript.net/other/back-top-scroll-indicator.html`
    - Read time: `https://www.jqueryscript.net/other/Medium-Inspired-jQuery-Read-Time-Estimating-Plugin-readtime.html`
