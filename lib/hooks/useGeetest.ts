import { GeetestInstance, GeetestResult } from '@/types/geetest';
import { ref } from 'vue';

const geetestInstance = ref<GeetestInstance | undefined>(undefined);
const close = ref(false);
const result = ref<GeetestResult | undefined>(undefined);
const lastResult = ref<GeetestResult | undefined>(undefined);

const awaitVerify = (): Promise<GeetestResult> => {
	return new Promise<GeetestResult>((resolve, reject) => {
		geetestInstance.value?.reset();
		geetestInstance.value?.showCaptcha();
		const timer = setInterval(() => {
			if (result.value || close.value) {
				clearInterval(timer);
				if (close.value) {
					reject();
				} else {
					if (result.value !== undefined) {
						resolve(result.value);
					}
				}
				close.value = false;
				result.value = undefined;
			}
		}, 555);
	});
};

export const useGeetest = () => {
	return {
		instance: geetestInstance,
		_close: close,
		_result: result,
		_lastResult: lastResult,
        awaitVerify
	};
};
