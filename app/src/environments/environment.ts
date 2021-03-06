// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  title: 'Wallpaper switcher',
  unsplash: {
    applicationId: "4afd12bc87af48014ea8f25f1fd0f8e260484831c827b0a647107fd96ebb4b94",
    secret: "3d2a9c5d887b9fd33feb4bb628daa665b3d683fce5d4548b5baed8d893d72ed2",
    callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
  }
};
