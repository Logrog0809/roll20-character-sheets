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

function getAttributeName(incomingAttribute) {
  return incomingAttribute.name;
}

function getAttributeAutoName(incomingAttribute) {
  return `auto-${incomingAttribute.name}`;
}

function getAttributeBonusName(incomingAttribute) {
  return `bonus-${incomingAttribute.name}`;
}

function getViewName(view) {
  return `show-view-${view}`;
}

function logToConsole(output) {
  console.log('[SR6CS]: ', output);
}

function selectTheme(roll20event) {
  if (roll20event.newValue == 1) {
    setAttrs({ show_darkly: 1, show_minty: 0 });
  } else if (roll20event.newValue == 2) {
    setAttrs({ show_darkly: 0, show_minty: 1 });
  }
}

function onSheetOpened() {
  logToConsole('Thanks for using the Shadowrun 6e Charactersheet.');
  updateView('overview');

  // Grab the version
  getAttrs(['sheet_version'], (values) => {
    logToConsole(`You are currently using sheet version ${values.sheet_version}`);
    
    if(sheetUpdateCallbacks[values.sheet_version]) {
      sheetUpdateCallbacks[values.sheet_version]();
    }
  });
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

function updateRepeating(roll20event) {
  console.log('Update repeating', roll20event);
}

function updateView(selectedView) {
  const updatedViewAttributes = {};
  views.forEach(view => updatedViewAttributes[getViewName(view)] = 0);
  updatedViewAttributes[getViewName(selectedView)] = 1;
  setAttrs(updatedViewAttributes);
}

on('change:selected-theme-val', selectTheme);
on('sheet:opened', onSheetOpened);
on('change:repeating_rangedweapons', (roll20event) => {
  logToConsole(roll20event);
});
on('remove:repeating_rangedweapons', (roll20event) => {
  logToConsole(roll20event);
});


var attributeArray = Object.values(attributes);
var attributenamekeys = Object.keys(attributenames);
console.log(attributenamekeys);
attributenamekeys.forEach(x => on(`change:repeating_${x}`, (roll20event) => updateRepeating(roll20event)));
attributeArray.forEach(attribute => on(`change:${getAttributeName(attribute)}`, (roll20event) => updateAttribute(attribute, roll20event)));
attributeArray.filter(x => x.hasBonus).forEach(attribute => on(`change:${getAttributeBonusName(attribute)}`, (roll20event) => updateAttributeTotal(attribute, roll20event)));
views.forEach((view) => on(`clicked:showview-${view}`, (roll20event) => updateView(view, roll20event)));