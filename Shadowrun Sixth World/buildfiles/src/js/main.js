const attributes = [
  {
    'agility': { 'name':'agility', 'display':'Agility', 'abbr':'AGI', 'type':'physical' },
    'body': { 'name':'body', 'display':'Body', 'abbr':'BOD', 'type':'physical' },
    'charisma': { 'name':'charisma', 'display':'Charisma', 'abbr':'CHA', 'type':'mental' },
    'intuition': { 'name':'intuition', 'display':'Intuition', 'abbr':'INT', 'type':'mental' },
    'logic': { 'name':'logic', 'display':'Logic', 'abbr':'LOG', 'type':'mental' },
    'magic': { 'name':'magic', 'display':'Magic', 'abbr':'MAG', 'type':'none' },
    'reaction': { 'name':'reaction', 'display':'Reaction', 'abbr':'REA', 'type':'physical' },
    'resonance': { 'name':'resonance', 'display':'Resonance', 'abbr':'RES', 'type':'none' },
    'strength': { 'name':'strength', 'display':'Strength', 'abbr':'STR', 'type':'physical' },
    'willpower': { 'name':'willpower', 'display':'Willpower', 'abbr':'WIL', 'type':'mental' }
  }
];

const skills = {
  'astral': {
    'attributes': [
      'intuition',
      'willpower'
    ],
    'book': 'Core Rulebook',
    'display': 'Astral',
    'name': 'astral',
    'page': 93,
    'primaryAttr': 'intuition',
    'specializations': [
      'Astral Combat',
      'Astral Signatures',
      'Emotional States',
      'Spirit Types'
    ],
    'untrained': false
  },
  'athletics': {
    'attributes': [
      'agility',
      'strength'
    ],
    'book': 'Core Rulebook',
    'display': 'Athletics',
    'name': 'athletics',
    'page': 93,
    'primaryAttr': 'agility',
    'specializations': [
      'Archery',
      'Climbing',
      'Flying',
      'Gymnastics',
      'Sprinting',
      'Swimming',
      'Throwing'
    ],
    'untrained': true
  },
  'biotech': {
    'attributes': [
      'logic',
      'intuition'
    ],
    'book': 'Core Rulebook',
    'display': 'Biotech',
    'name': 'biotech',
    'page': 94,
    'primaryAttr': 'logic',
    'specializations': [
      'Biotechnology',
      'Cybertechnology',
      'First Aid',
      'Medicine'
    ],
    'untrained': false
  },
  'closecombat': {
    'attributes': [
      'agility'
    ],
    'book': 'Core Rulebook',
    'display': 'Close Combat',
    'name': 'closecombat',
    'page': 94,
    'primaryAttr': 'agility',
    'specializations': [
      'Blades',
      'Clubs',
      'Unarmed Combat'
    ],
    'untrained': true
  },
  'con': {
    'attributes': [
      'charisma'
    ],
    'book': 'Core Rulebook',
    'display': 'Con',
    'name': 'con',
    'page': 94,
    'primaryAttr': 'charisma',
    'specializations': [
      'Acting',
      'Disguise',
      'Impersonation',
      'Performance'
    ],
    'untrained': true
  },
  'conjuring': {
    'attributes': [
      'magic'
    ],
    'book': 'Core Rulebook',
    'display': 'Conjuring',
    'name': 'conjuring',
    'page': 94,
    'primaryAttr': 'magic',
    'specializations': [
      'Binding',
      'Summoning'
    ],
    'untrained': false
  },
  'cracking': {
    'attributes': [
      'logic'
    ],
    'book': 'Core Rulebook',
    'display': 'Cracking',
    'name': 'cracking',
    'page': 94,
    'primaryAttr': 'logic',
    'specializations': [
      'Cybercombat',
      'Electronic Warfare',
      'Hacking'
    ],
    'untrained': false
  },
  'electronics': {
    'attributes': [
      'logic',
      'intuition'
    ],
    'book': 'Core Rulebook',
    'display': 'Electronics',
    'name': 'electronics',
    'page': 94,
    'primaryAttr': 'logic',
    'specializations': [
      'Computer',
      'Hardware',
      'Software'
    ],
    'untrained': true
  },
  'enchanting': {
    'attributes': [
      'magic'
    ],
    'book': 'Core Rulebook',
    'display': 'Enchanting',
    'name': 'enchanting',
    'page': 95,
    'primaryAttr': 'magic',
    'specializations': [
      'Alchemy',
      'Artificing',
      'Disenchanting'
    ],
    'untrained': false
  },
  'engineering': {
    'attributes': [
      'logic',
      'intuition',
      'agility'
    ],
    'book': 'Core Rulebook',
    'display': 'Engineering',
    'name': 'engineering',
    'page': 95,
    'primaryAttr': 'logic',
    'specializations': [],
    'untrained': true
  },
  'exoticweapons': {
    'attributes': [
      'agility'
    ],
    'book': 'Core Rulebook',
    'display': 'Exotic Weapons',
    'name': 'exoticweapons',
    'page': 95,
    'primaryAttr': 'agility',
    'specializations': [
      'Flamethrower',
      'Grenade Launchers',
      'Natural',
      'Ranged Weapon',
      'Whips'
    ],
    'untrained': false
  },
  'firearms': {
    'attributes': [
      'agility'
    ],
    'book': 'Core Rulebook',
    'display': 'Firearms',
    'name': 'firearms',
    'page': 95,
    'primaryAttr': 'agility',
    'specializations': [
      'Assault Cannons',
      'Heavy Pistols',
      'Hold-Outs',
      'Light Pistols',
      'Machine Guns',
      'Machine Pistols',
      'Rifles',
      'Shotguns',
      'Submachine Guns',
      'Tasers'
    ],
    'untrained': true
  },
  'influence': {
    'attributes': [
      'charisma',
      'logic'
    ],
    'book': 'Core Rulebook',
    'display': 'Influence',
    'name': 'influence',
    'page': 96,
    'primaryAttr': 'charisma',
    'specializations': [
      'Etiquette',
      'Instruction',
      'Intimidation',
      'Leadership',
      'Negotiation'
    ],
    'untrained': true
  },
  'outdoors': {
    'attributes': [
      'intuition'
    ],
    'book': 'Core Rulebook',
    'display': 'Outdoors',
    'name': 'outdoors',
    'page': 96,
    'primaryAttr': 'intuition',
    'specializations': [
      'Navigation',
      'Survival',
      'Tracking'
    ],
    'untrained': true
  },
  'perception': {
    'attributes': [
      'intuition',
      'logic'
    ],
    'book': 'Core Rulebook',
    'display': 'Perception',
    'name': 'perception',
    'page': 96,
    'primaryAttr': 'intuition',
    'specializations': [
      'Aural',
      'Environment',
      'Tactile',
      'Visual'
    ],
    'untrained': true
  },
  'piloting': {
    'attributes': [
      'reaction'
    ],
    'book': 'Core Rulebook',
    'display': 'Piloting',
    'name': 'piloting',
    'page': 97,
    'primaryAttr': 'reaction',
    'specializations': [
      'Aircraft',
      'Ground Craft',
      'Watercraft'
    ],
    'untrained': true
  },
  'sorcery': {
    'attributes': [
      'magic'
    ],
    'book': 'Core Rulebook',
    'display': 'Sorcery',
    'name': 'sorcery',
    'page': 97,
    'primaryAttr': 'magic',
    'specializations': [
      'Counterspelling',
      'Ritual Spellcasting',
      'Spellcasting'
    ],
    'untrained': false
  },
  'stealth': {
    'attributes': [
      'agility'
    ],
    'book': 'Core Rulebook',
    'display': 'Stealth',
    'name': 'stealth',
    'page': 97,
    'primaryAttr': 'agility',
    'specializations': [
      'Camouflage',
      'Palming',
      'Sneaking'
    ],
    'untrained': true
  },
  'tasking': {
    'attributes': [
      'resonance'
    ],
    'book': 'Core Rulebook',
    'display': 'Resonance',
    'name': 'resonance',
    'page': 97,
    'primaryAttr': 'resonance',
    'specializations': [
      'Compiling',
      'Decompiling',
      'Registering'
    ],
    'untrained': false
  }
};

const magicStrings = {
  auto: 'auto',
  bonus: 'bonus',
  total: 'total'
};

const views = ['overview', 'character', 'background', 'gear', 'augments', 'magic', 'matrix', 'social', 'vehicle', 'settings'];

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
  console.log('[SR6CS]: ', output);
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