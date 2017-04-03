'use babel';

import SpadPackageView from './spad-package-view';
import { CompositeDisposable } from 'atom';

export default {

  spadPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.spadPackageView = new SpadPackageView(state.spadPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.spadPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'spad-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.spadPackageView.destroy();
  },

  serialize() {
    return {
      spadPackageViewState: this.spadPackageView.serialize()
    };
  },

  toggle() {
    console.log('SpadPackage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
