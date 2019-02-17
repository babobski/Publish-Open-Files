/**
 * Namespaces
 */
if (typeof(extensions) === 'undefined') extensions = {};
if (typeof(extensions.pof) === 'undefined') extensions.pof = {
	version: '1.0.2'
};

(function() {
	var self = this;
	this.publishOpenFiles = () => {
		var tabsView = document.getElementById('tabbed-view'),
			tabs = tabsView.getElementsByTagName('tab');
		
		for (var i = 0; i < tabs.length; i++) {
			var $tab = tabs[i],
				status = $tab.getAttribute('file_publishingStatus');
			if (status === 'edited') {
				var file = tabs[i].tooltipText;
				ko.publishing.push(ko.uriparse.localPathToURI(file));
			}
		}
	}
	
	this._addDynamicToolbarButton = () => {
		const db = require('ko/dynamic-button');
		var isView = () => {
			return ko.views.manager.currentView;
		};
		
		const button = db.register({
			label: "Publish Open Files",
			tooltip: "Publish Open Files",
			icon: "arrow-right2",
			events: [
				"current_view_changed",
			],
			command: () => {
				extensions.pof.publishOpenFiles();
			},
			isEnabled: () => {
				return isView();
			},
		});
	};
	
	self._addDynamicToolbarButton();

}).apply(extensions.pof);

