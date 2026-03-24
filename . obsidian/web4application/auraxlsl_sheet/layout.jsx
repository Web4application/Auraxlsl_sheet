class MyPlugin extends Plugin {
    onload(app: App) {
	    super(app);
	    this.app.workspace.onLayoutReady(() => {
	        this.registerEvent(this.app.vault.on('create', this.onCreate, this));
	    });
    }

	onCreate() {
		// ...
	}
}
