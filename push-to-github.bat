@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo ========================================
echo  🧵 dudidolls — Push su GitHub
echo ========================================
echo.
set /p USERNAME=Nome utente GitHub: 
set /p TOKEN=Token GitHub (o password se usi HTTPS): 
echo.

echo [1/3] Aggiungo remote...
git remote remove origin 2>nul
git remote add origin https://%USERNAME%:%TOKEN%@github.com/%USERNAME%/dudidolls.git

echo [2/3] Push su main...
git branch -M main
git push -u origin main --force

if %ERRORLEVEL% == 0 (
  echo.
  echo ========================================
  echo  ✅ Push completato!
  echo ========================================
  echo.
  echo Ora vai su:
  echo https://github.com/%USERNAME%/dudidolls/settings/pages
  echo.
  echo Imposta: Branch = main, folder = /(root)
  echo.
  echo Il sito sarà live su:
  echo https://%USERNAME%.github.io/dudidolls/
  echo.
  pause
) else (
  echo.
  echo ❌ Errore nel push.
  echo Se il repo non esiste ancora, crealo prima su:
  echo https://github.com/new?name=dudidolls^&visibility=public
  echo.
  pause
)
