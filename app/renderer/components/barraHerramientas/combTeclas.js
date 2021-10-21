const { _TabGroup } = require('../Tabs/Tabs');
const KeyPress = (e) => {
  var evtobj = window.event ? event : e;
  if (evtobj.keyCode == 84 && evtobj.ctrlKey) {
    _TabGroup.addTab();
  }
};

window.addEventListener('keydown', KeyPress, true);

module.exports = {
  KeyPress,
};
