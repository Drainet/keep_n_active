const isApplicationWindow = (window) => {
	return window.minimizable &&
		window.normalWindow &&
		window.opacity !== 0
}

let keepOneActiveEnabled = false
workspace.windowActivated.connect((activatedWindow) => {
	if (!keepOneActiveEnabled) {
		return
	}
	if (isApplicationWindow(activatedWindow)) {
		for (window of workspace.windowList()) {
			if (isApplicationWindow(window) && 
				!window.active &&
				!window.minimized) {
				window.minimized = true
			}
		}
	}
})

registerShortcut("keep_one_active", "Toggle enable keep one window active", "Ctrl+!", () => {
	keepOneActiveEnabled = !keepOneActiveEnabled
})
