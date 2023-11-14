window.addEventListener('storage', (event) => {
	if (event.key === 'isDark') {
		document.documentElement.style.colorScheme = JSON.parse(event.newValue) ? 'dark' : 'light';
	}
});