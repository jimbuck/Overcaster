@echo off

7z a Overcaster.zip .\node_modules .\server .\splash.css .\splash.js .\splash.html .\logo.svg .\icon.png .\loading.gif .\LICENSE .\package.json
move Overcaster.zip .\release\Overcaster.nw

.\node-webkit\nw.exe --remote-debugging-port=8888 .\release\Overcaster.nw --debug

del .\release\Overcaster.nw