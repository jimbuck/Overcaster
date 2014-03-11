@echo off

7z a Overcaster.zip .\node_modules .\server .\bootstrap.min.css .\logo.svg .\icon.png .\loading.gif .\index.html .\LICENSE .\package.json .\README.md
move Overcaster.zip .\release\Overcaster.nw

.\node-webkit\nw.exe --remote-debugging-port=8888 .\release\Overcaster.nw

del .\release\Overcaster.nw