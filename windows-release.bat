@echo off

REM Clearing the "release" folder...
del .\release\Overcaster.exe

REM Compressing the project files...
7z a Overcaster.zip .\node_modules .\node.exe .\server .\logo.svg .\splash.css .\splash.js .\icon.png .\loading.gif .\splash.html .\package.json
move Overcaster.zip .\release\Overcaster.nw

REM Copy nw.exe for packaging
copy .\node-webkit\nw.exe .\release\nw.exe

cd .\release

REM Converting to exe...
copy /b nw.exe+Overcaster.nw .\Overcaster-temp.exe

del .\Overcaster.nw
del .\nw.exe

REM Repackaging exe with required DLL's...
enigmavbconsole ..\Overcaster.evb

del .\Overcaster-temp.exe