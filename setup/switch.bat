@echo off
:: Start minimized
if not defined IS_MINIMIZED set IS_MINIMIZED=1 && start /min cmd /C "%~dpnx0" %* && exit


cd /d "C:\Users\Nayem\Desktop\download\Scraper"
npm start
pause
