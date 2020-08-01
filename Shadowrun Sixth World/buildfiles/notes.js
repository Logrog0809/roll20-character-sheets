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