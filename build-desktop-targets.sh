rm -rf ./desktop-version/src/weboutput
ng build --configuration production
cp -r dist/kings-scroll ./desktop-version/src/weboutput 
cd ./desktop-version
npm install
electron-forge package
