@echo off
chcp 65001 > nul
echo ======================================================
echo    ENVIANDO TODAS AS ATUALIZACOES PARA O GITHUB...
echo ======================================================
echo.
echo 1. Adicionando todos os arquivos modificados...
git add -A
echo.
echo 2. Criando o commit com todo o projeto...
git commit -m "chore: atualizacao do sistema pelo script"
echo.
echo 3. Enviando para o repositorio Fit Saude...
git push -u origin main
echo.
echo ======================================================
echo    TUDO ENVIADO COM SUCESSO!
echo    Agora o seu sistema Fit Saude esta atualizado.
echo ======================================================
pause
