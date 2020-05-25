# GW2 Data Pad

> The datapad is an overlay to help keep relevant Guild Wars 2 data at your fingertips.

[Download](./overlay/build/gw2-data-pad.exe)

To open the data-pad from in-game, press `shift` + `enter`. Then type `> help` for some basic instructions.

## Contributing

The app resides in the `/overlay` directory. The `/docs` directory is a simple [vuepress](https://vuepress.vuejs.org/) project which serves the in-app help documentation.

The data-pad is an electron project. It leverages [iohook](https://github.com/wilix-team/iohook) to listen for the `shift + enter` combo, then brings up the overlay. [robotjs](https://github.com/octalmage/robotjs) is used to refocus Guild Wars 2, and paste the contents of the clipboard once refocused. Beyond that, it is a pretty standard vue app.

#### Build Setup

``` bash
# install dependencies
yarn install

# serve with hot reload
yarn serve

# build electron application for production
yarn build

# lint all JS/Vue component files in `src/`
yarn lint
```

Pull requests and issues are welcome and encouraged. No templates are set up, but please provide as much info as possible when submitting an issue!