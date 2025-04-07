import { App, Plugin } from 'vue';
import loadScript from './util/loadScript';
import { useGeetest } from './hooks/useGeetest';
import { GeetestOptions } from './types/geetest';

export const GeetestProvide = Symbol();

export const defaultOptions: Omit<GeetestOptions, 'captchaId'> = {
	product: 'float',
	nativeButton: {
		width: '260px',
		height: '50px'
	},
	rem: 1,
	language: 'zho',
	timeout: 3000,
	hideBar: [],
	mask: {
		outside: true,
		bgColor: '#0000004d'
	},
	apiServers: ['gcaptcha4.geetest.com'],
	hideSuccess: false
};
let _options: GeetestOptions | undefined = undefined;

export const Geetest4: Plugin<GeetestOptions> = {
	install(app: App, options: GeetestOptions) {
		_options = options;
		app.provide(GeetestProvide, options);
	}
};

export const init = () => {
	return new Promise<void>(async (resolve, reject) => {
		try {
			await loadScript('https://static.geetest.com/v4/gt4.js');
		} catch {
			console.error('Geetest4 script load error!');
			return reject();
		}
		const options = _options;
		if (options === null || options === undefined || Object.keys(options).length === 0) {
			console.error('Geetest Option is empty.');
			return reject();
		}
		window.initGeetest4(
			{
				...defaultOptions,
				...options,
				product: 'bind' // 最适合隐藏绑定式
			},
			(obj) => {
				const gt4 = useGeetest();

				obj.onReady(() => {
					gt4.instance.value = obj;
					gt4.instance.value.onSuccess(() => {
						gt4._result.value = gt4.instance.value?.getValidate();
						gt4._lastResult.value = gt4._result.value;
					});
					gt4.instance.value.onClose(() => {
						gt4._close.value = true;
					});
					gt4.instance.value.onError(() => {
						gt4._close.value = true;
					});
					resolve();
				});
			}
		);
	});
};

export * from './hooks/useGeetest';
