@echo off

start node ./server/server.js

del .\Overcaster-temp.nw

7z a Overcaster.zip .\node_modules .\splash.css .\splash.js .\splash.html .\logo.svg .\icon.png .\loading.gif .\package.json rem .\server
move Overcaster.zip .\Overcaster-temp.nw

.\node-webkit\nw.exe --remote-debugging-port=8888 .\Overcaster-temp.nw --debug

del .\Overcaster-temp.nw