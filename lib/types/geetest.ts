export type GeetestCallback = (instance: GeetestInstance) => void;

export interface GeetestInstance {
	onError(callback: Function): void;

	onClose(callback: Function): void;

	onSuccess(callback: Function): void;

	onReady(callback: Function): void;

	onFail(callback: Function): void;

	getValidate(): GeetestResult;

	showCaptcha(): void;

	reset(): void;
}

export interface GeetestResult {
	captcha_id?: string;
	lot_number?: string;
	pass_token?: string;
	gen_time?: string;
	captcha_output?: string;
}

export interface GeetestOptions {
	captchaId: string;
	product?: 'float' | 'popup' | 'bind';
	nativeButton?: {
		width: string;
		height: string;
	};
	rem?: 1;
	language?:
		| 'zho'
		| 'eng'
		| 'zho-tw'
		| 'zho-hk'
		| 'udm'
		| 'jpn'
		| 'ind'
		| 'kor'
		| 'rus'
		| 'ara'
		| 'spa'
		| 'pon'
		| 'por'
		| 'fra'
		| 'deu';
	protocol?: 'http://' | 'https://';
	timeout?: number;
	hideBar?: ('close' | 'refresh')[];
	mask?: {
		outside: boolean;
		bgColor: string;
	};
	apiServers?: string[];
	nextWidth?: string;
	riskType?: string;
	hideSuccess?: boolean;
	userInfo?: string;
}
