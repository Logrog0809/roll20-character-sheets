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

const spriteStats = {
  courier: {
    attack: (level) => { return level; },
    sleaze: (level) => { return level + 3; },
    data: (level) => { return level + 1; },
    firewall: (level) => { return level + 2; },
    initiative: (level) => {
      return {
        bonus: (level*2)+1,
        dice: 4
      };
    },
    resonance: (level) => { return level; },
  },
  crack: {
    attack: (level) => { return level; },
    sleaze: (level) => { return level + 3; },
    data: (level) => { return level + 2; },
    firewall: (level) => { return level + 1; },
    initiative: (level) => {
      return {
        bonus: (level*2)+2,
        dice: 4
      };
    },
    resonance: (level) => { return level; },
  },
  data: {
    attack: (level) => { return level - 1; },
    sleaze: (level) => { return level; },
    data: (level) => { return level + 4; },
    firewall: (level) => { return level + 1; },
    initiative: (level) => {
      return {
        bonus: (level*2)+4,
        dice: 4
      };
    },
    resonance: (level) => { return level; },
  },
  fault: {
    attack: (level) => { return level + 3; },
    sleaze: (level) => { return level; },
    data: (level) => { return level + 1; },
    firewall: (level) => { return level + 2; },
    initiative: (level) => {
      return {
        bonus: (level*2)+1,
        dice: 4
      };
    },
    resonance: (level) => { return level; },
  },
  machine: {
    attack: (level) => { return level + 1; },
    sleaze: (level) => { return level; },
    data: (level) => { return level + 3; },
    firewall: (level) => { return level + 2; },
    initiative: (level) => {
      return {
        bonus: (level*2)+3,
        dice: 4
      };
    },
    resonance: (level) => { return level; },
  },
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

function updateView(selectedView) {
  const updatedViewAttributes = {};
  views.forEach(view => updatedViewAttributes[getViewName(view)] = 0);
  updatedViewAttributes[getViewName(selectedView)] = 1;
  setAttrs(updatedViewAttributes);
}

on('change:selected-theme-val', selectTheme);
on('sheet:opened', onSheetOpened);

var attributeArray = Object.values(attributes);
attributeArray.forEach(attribute => on(`change:${getAttributeName(attribute)}`, (roll20event) => updateAttribute(attribute, roll20event)));
attributeArray.filter(x => x.hasBonus).forEach(attribute => on(`change:${getAttributeBonusName(attribute)}`, (roll20event) => updateAttributeTotal(attribute, roll20event)));
views.forEach((view) => on(`clicked:showview-${view}`, (roll20event) => updateView(view, roll20event)));