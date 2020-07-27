const fs = require('fs');
const path = require('path');
const util = require('util');
const webpack = require('webpack');
const webpackConfig = require(path.resolve(__dirname, 'webpack.prod.js'));

const copyfile = util.promisify(fs.copyFile);
const writeFile = util.promisify(fs.writeFile);

function addTranslationShims(translationData) {
  console.log('Adding translation items missed by i18nize in aria-labels');
  translationData['dv-u'] = 'Damage Value';
}

async function buildSheet() {
  console.log('Starting the character sheet build process');
  console.log('Building HTML and CSS');
  webpack(webpackConfig, async (err, stats) => {
    if (webpackHasErrors(err, stats)) {
      handleErr(err);
      handleStatErr(stats);
      handleStatWarning(stats);
      return;
    }

    handleStatWarning(stats);
    await copyFiles();
    const translationData = getTranslationData();
    addTranslationShims(translationData);
    saveTranslationData(translationData);
  });
}

function copyBuildFile(localFile) {
  return copyfile(path.resolve(__dirname, `build/${localFile}`), path.resolve(__dirname, `../${localFile}`));
}

async function copyFiles() {
  console.log('Copying build files...');
  const promiseArr = [];
  promiseArr.push(copyBuildFile('sr6sheet.css'));
  promiseArr.push(copyBuildFile('sr6sheet.html'));

  await Promise.all(promiseArr);
}

function getTranslationData() {
  console.log('Fetching translation data');
  return require(path.resolve(__dirname, 'src/translation.json'));
}

function handleErr(err) {
  if (!err) return;

  console.err(err.stack || err);

  if (err.details) {
    console.err(err.details);
  }  
}

function handleStatErr(stats) {
  if (!stats.hasErrors()) return;

  const info = stats.toJson();
  console.error(info.errors);
}

function handleStatWarning(stats) {
  if (!stats.hasWarnings()) return;

  const info = stats.toJson();
  console.warn(info.warnings);
}

function saveTranslationData(translationData) {
  console.log('Saving translation data');
  return writeFile(path.resolve(__dirname, '../translation.json'), JSON.stringify(translationData));
}

function webpackHasErrors(err, stats) {
  if (err) {
    return true;
  }

  if (stats.hasErrors()) {
    return true;
  }
}

buildSheet();