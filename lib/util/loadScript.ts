export default (src: string): Promise<void> => {
	return new Promise((resolve, reject) => {
		if (document.querySelector(`script[src="${src}"]`)) {
			resolve();
			return;
		}

		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = src;
		script.onload = () => resolve();
		script.onerror = () => reject();
        
		document.head.appendChild(script);
	});
};
