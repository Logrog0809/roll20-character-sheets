const sheetCurrentVersion = '1.1';
const sheetUpdateCallbacks = {
  '1.0': function() {
    logToConsole('Intro version. Updating to 1.1!');
    sheetUpdateCallbacks['1.1']();
  },
  '1.1': function() {
    logToConsole('Sheet is up to date!');
    setAttrs({ sheet_version: '1.1' });
  }
};

const repeatingRemovedHandlers = {};
const repeatingUpdatedHandlers = {};

repeatingRemovedHandlers.rangedweapons = () => {
  checkIfWeShouldShowSection('rangedweapons');
};

repeatingUpdatedHandlers.rangedweapons = () => {
  checkIfWeShouldShowSection('rangedweapons');

  // Recalc totals
  getAttrs([
    getRepeatingAttributeName('rangedweapons', attributenames.rangedweapons.close),
    getRepeatingAttributeName('rangedweapons', attributenames.rangedweapons.extreme),
    getRepeatingAttributeName('rangedweapons', attributenames.rangedweapons.far),
    getRepeatingAttributeName('rangedweapons', attributenames.rangedweapons.medium),
    getRepeatingAttributeName('rangedweapons', attributenames.rangedweapons.near)
  ], (attrs) => {
    console.log(attrs);
  });
};

function checkIfWeShouldShowSection(section) {
  getSectionIDs(section, (items) => {
    const key = attributenames.settings[`has${section}`];
    const setVal = items.length > 0 ? 1 : 0;

    const providedVal = { [key]: setVal };
    
    setAttrs(providedVal);
  });
}

function getAttributeName(incomingAttribute) {
  return incomingAttribute.name;
}

function getAttributeAutoName(incomingAttribute) {
  return `auto-${incomingAttribute.name}`;
}

function getAttributeBonusName(incomingAttribute) {
  return `bonus-${incomingAttribute.name}`;
}

function getRepeatingAttributeName(section, name) {
  return `repeating_${section}_${name}`;
}

function getViewName(view) {
  return `show-view-${view}`;
}

function logToConsole(output) {
  console.log('[SR6CS]: ', output);
}

function onSheetOpened() {
  logToConsole('Thanks for using the Shadowrun 6e Charactersheet.');
  updateView('overview');

  // Grab the version
  getAttrs(['sheet_version'], (values) => {
    if (!values.sheet_version) {
      setAttrs({ sheet_version: sheetCurrentVersion });
      return;
    }

    updateSheetVersion(values.sheet_version);
  });
}

function removeRepeating(section) {
  if (repeatingRemovedHandlers[section]) {
    repeatingRemovedHandlers[section]();
  }
}

function selectTheme(roll20event) {
  if (roll20event.newValue == 1) {
    setAttrs({ show_darkly: 1, show_minty: 0 });
  } else if (roll20event.newValue == 2) {
    setAttrs({ show_darkly: 0, show_minty: 1 });
  }
}

function updateAttribute(attr) {
  console.log('Updating', attr);
  if (attr.hasBonus) {
    updateAttributeTotal(attr);
  }
}

function updateAttributeTotal(attr) {
  const attrName = attr.name;
  const bonusName = getAttributeBonusName(attr);
  const totalName = getAttributeAutoName(attr);
  getAttrs([attrName, bonusName], (vals) => {
    const sum = parseInt(vals[attrName]) + parseInt(vals[bonusName]);
    const updateObj = {};
    updateObj[totalName] = sum;
    setAttrs(updateObj);
  });
}

function updateRepeating(section) {
  if (repeatingUpdatedHandlers[section]) {
    repeatingUpdatedHandlers[section]();
  }
}

function updateSheetVersion(currentVersion) {
  logToConsole(`You are currently using sheet version ${currentVersion}`);
    
  if(sheetUpdateCallbacks[currentVersion]) {
    sheetUpdateCallbacks[currentVersion]();
  }
}

function updateView(selectedView) {
  const updatedViewAttributes = {};
  views.forEach(view => updatedViewAttributes[getViewName(view)] = 0);
  updatedViewAttributes[getViewName(selectedView)] = 1;
  setAttrs(updatedViewAttributes);
}

on('change:selected-theme-val', selectTheme);
on('sheet:opened', onSheetOpened);


var attributeArray = Object.values(attributes);
var attributenamekeys = Object.keys(attributenames);

attributenamekeys.forEach(x => on(`change:repeating_${x}`, (roll20event) => updateRepeating(x, roll20event)));
attributenamekeys.forEach(x => on(`remove:repeating_${x}`, (roll20event) => removeRepeating(x, roll20event)));
attributeArray.forEach(attribute => on(`change:${getAttributeName(attribute)}`, (roll20event) => updateAttribute(attribute, roll20event)));
attributeArray.filter(x => x.hasBonus).forEach(attribute => on(`change:${getAttributeBonusName(attribute)}`, (roll20event) => updateAttributeTotal(attribute, roll20event)));
views.forEach((view) => on(`clicked:showview-${view}`, (roll20event) => updateView(view, roll20event)));