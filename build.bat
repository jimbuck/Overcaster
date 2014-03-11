@echo off

REM Clearing the "release" folder...
rmdir /S /Q .\release
mkdir .\release

REM Compressing the project files...
7z a Overcaster.zip .\node_modules .\logo.svg .\icon.png .\index.html .\LICENSE.txt .\package.json .\README.md
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