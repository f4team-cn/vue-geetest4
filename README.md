# Vue 3 + Geetest 4

## 简单使用

### 安装
```bash
pnpm add vue-geetest4
```

### 初始化
```typescript
import { Geetest4, init as geetest4Init } from 'vue-geetest4';

const app = createApp(App);
app.use(Geetest4, {
	captchaId: '从极验获取的ID',
	product: 'bind', // 推荐使用 bind 隐藏绑定式
    // ... 其他配置详见极验官网
});
// 初始化
await geetest4Init();
app.mount('#app');
```

### 在需要验证的地方使用
```typescript
import { useGeetest } from 'vue-geetest4';

const gt4 = useGeetest();

const login = async () => {
	const result = await gt4.awaitVerify();
    console.log(result);
	alert('验证通过');
};
```
```html
<template>
    <button @click="login()">登录</button>
</template>
```