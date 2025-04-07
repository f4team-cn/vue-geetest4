import { GeetestInstance } from './geetest';

export {};

declare global {
	interface Window {
		initGeetest4(config: Record<string, any>, callback: (i: GeetestInstance) => void): void;
	}
}
