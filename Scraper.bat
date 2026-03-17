@echo off
:: Start minimized
if not defined IS_MINIMIZED set IS_MINIMIZED=1 && start /min cmd /C "%~dpnx0" %* && exit

:: Navigate to scraper project directory
cd /d "C:\Users\Nayem\Downloads\Scraper-main\Scraper-main"
npm start
pause