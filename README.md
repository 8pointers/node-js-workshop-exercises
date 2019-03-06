# NodeJS Workshop Exercises

## Setup

```bash
git clone https://github.com/8pointers/node-js-workshop-exercises.git
cd node-js-workshop-exercises
npm install

node lib/01-hello-world
```

## Debugging

Starting with inspector enabled:

```bash
node --inspect lib/02-web-server/
```

If you use Chrome, either navigate to [chrome://inspect](chrome://inspect) or install [Node.js V8 --inspector Manager (NiM) extension](https://chrome.google.com/webstore/detail/nim-node-inspector-manage/gnhhdgbaldcilmgcpfddgdbkhjohddkj)

## Docker

To build the image:

```bash
docker build -t <your username>/node-web-app .
```

To run the image:

```bash
docker run -p 49160:3000 -d <your username>/node-web-app

docker ps
docker logs <container id>
```
