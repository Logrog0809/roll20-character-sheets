const attributes = [
  { name: 'agility', abbr: 'Agi', display: 'Agility', hasBonus: true, type: 'physical' },
  { name: 'body', abbr: 'Bod', display: 'Body', hasBonus: true, type: 'physical' },
  { name: 'charisma', abbr: 'Cha', display: 'Charisma', hasBonus: true, type: 'mental' },
  { name: 'edge', display: 'Edge', hasBonus: false },
  { name: 'essence', display: 'Essence', hasBonus: false },
  { name: 'intuition', abbr: 'Int', display: 'Intuition', hasBonus: true, type: 'mental' },
  { name: 'logic', abbr: 'Log', display: 'Logic', hasBonus: true, type: 'mental' },
  { name: 'magic', abbr: 'Mag', display: 'Magic', hasBonus: false },
  { name: 'reaction', abbr: 'Rea', display: 'Reaction', hasBonus: true, type: 'physical' },
  { name: 'resonance', abbr: 'Res', display: 'Resonance', hasBonus: false },
  { name: 'strength', abbr: 'Str', display: 'Strength', hasBonus: true, type: 'physical' },
  { name: 'willpower', abbr: 'Wil', display: 'Willpower', hasBonus: true, type: 'mental' } 
];

const magicStrings = {
  auto: 'auto',
  bonus: 'bonus',
  total: 'total'
};

const views = ['overview', 'character', 'gear', 'augments', 'magic', 'matrix', 'social', 'vehicle', 'settings'];

const sheetUpdateCallbacks = {
  '1.0': function() {
    log('Intro version. Updating to 1.1!');
    sheetUpdateCallbacks['1.1']();
  },
  '1.1': function() {
    log('Sheet is up to date!');
    setAttrs({ sheet_version: '1.1' });
  }
};

function log(output) {
  console.log(`[SR6CS]: `, output);
}

function selectTheme(eve) {
  if (eve.newValue == 1) {
    setAttrs({ show_darkly: 1, show_minty: 0 });
  } else if (eve.newValue == 2) {
    setAttrs({ show_darkly: 0, show_minty: 1 });
  }
}

function sheetOpened() {
  log('Thanks for using the Shadowrun 6e Charactersheet.');
  updateView('overview');

  // Grab the version
  getAttrs(['sheet_version'], (values) => {
    log(`You are currently using sheet version ${values.sheet_version}`);
    
    if(sheetUpdateCallbacks[values.sheet_version]) {
      sheetUpdateCallbacks[values.sheet_version]();
    }
  });

  getSectionIDs(['skills'], (values) => {
    log(values);
  });
}

function updateAttribute(attr) {
  if (attr.hasBonus) {
    updateBonusAttr(attr);
  }
}

function updateBonusAttr(attr) {
  const attrName = attr.name;
  const bonusName = `${attr.name}_${magicStrings.bonus}`;
  const totalName = `${magicStrings.auto}_${attr.name}_${magicStrings.total}`;
  getAttrs([attrName, bonusName], (vals) => {
    const sum = parseInt(vals[attrName]) + parseInt(vals[bonusName]);
    const updateObj = {};
    updateObj[totalName] = sum;
    setAttrs(updateObj);
    log(updateObj);
  });
}

function updateView(view) {
  const viewAttrs = {};
  views.forEach((val) => viewAttrs[`show_view_${val}`] = 0);
  viewAttrs[`show_view_${view}`] = 1;
  setAttrs(viewAttrs);
}

on('change:selected_theme_val', selectTheme);
on('sheet:opened', sheetOpened);

attributes.forEach(attr => on(`change:${attr.name}`, (reve) => updateAttribute(attr, reve)));
attributes.filter(x => x.hasBonus).forEach(attr => on(`change:${attr.name}_${magicStrings.bonus}`, (reve) => updateBonusAttr(attr, reve)));
views.forEach((view) => on(`clicked:showview_${view}`, (reve) => updateView(view, reve)));