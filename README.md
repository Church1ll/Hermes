### Build library for development
```bash
ng build hermes
cd dist/hermes
npm link
cd ../../
npm link hermes
npm run serve:demo
```

### Package and post library
```bash
npm version patch # patch / minor / major

ng build hermes
cd dist/hermes
npm pack

# login first
npm login

npm publish --access public
```