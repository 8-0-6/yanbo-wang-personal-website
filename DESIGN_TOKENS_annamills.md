# Anna Mills 设计令牌（Design Tokens）

快速参考指南 - 用于实现相似视觉风格

---

## 🎨 颜色系统

```css
/* 背景色 */
--bg-primary: #FFFFFF;        /* 纯白主背景 */
--bg-secondary: #000000;      /* 黑色卡片背景 */

/* 文本颜色 */
--text-primary: #282828;      /* 主要文本 */
--text-secondary: #E1DEDB;    /* 次要/浅色文本 */
--text-dark: #000000;         /* 强调文本 */
--text-charcoal: #131212;     /* 链接文本 */

/* 强调色 */
--accent-pink: #EA587D;       /* 粉红色强调 */
--accent-blue: #0000EE;       /* 蓝色链接 */

/* 不透明度 */
--opacity-soft: 0.39;         /* 39% - 柔和效果 */
--opacity-light: 0.20;        /* 20% - 更轻效果 */
```

---

## 📝 字体系统

```css
/* 字体家族 */
--font-display: 'Austin', serif;              /* 大标题 */
--font-nav: 'Navigo', sans-serif;             /* 导航 */
--font-modern: 'Inter', sans-serif;           /* 现代小文本 */
--font-body: 'Georgia', serif;                /* 正文 */
--font-heading: 'Roboto', sans-serif;         /* 次要标题 */
--font-times: 'Times New Roman', serif;       /* 辅助文本 */
--font-jp: 'Noto Serif JP', serif;           /* 装饰文本 */

/* 字号 */
--text-xs: 9px;      /* 微型文本 */
--text-sm: 10px;     /* 小号文本 */
--text-base: 12px;   /* 基础小文本 */
--text-md: 13px;     /* 中等小文本 */
--text-lg: 14px;     /* 说明文字 */
--text-xl: 18px;     /* 正文 */
--text-2xl: 23px;    /* H2 */
--text-3xl: 24px;    /* H2 Georgia */
--text-4xl: 38px;    /* 导航/菜单 */
--text-5xl: 48px;    /* H1 */
--text-6xl: 58px;    /* 大标题 */
--text-7xl: 68px;    /* 超大标题 */

/* 字重 */
--font-normal: 400;
--font-medium: 500;
--font-bold: 700;

/* 行高 */
--leading-tight: 1.1;    /* 11/10, 15/13 */
--leading-snug: 1.2;     /* 12/10, 23/18 */
--leading-normal: 1.25;  /* 15/12, 30/24 */
--leading-relaxed: 1.3;  /* 18/14, 23/18 */
--leading-loose: 1.5;    /* 60/48 */

/* 字间距 */
--tracking-tight: -0.2px;  /* 紧凑 */
--tracking-normal: 0px;    /* 标准 */
```

---

## 📐 间距系统

```css
/* 内边距 */
--spacing-0: 0px;
--spacing-1: 1px;
--spacing-10: 10px;
--spacing-16: 16px;

/* 外边距 */
--spacing-none: 0px;
--spacing-negative: -14.5px 0px 0px -14px;  /* 精确定位 */

/* 圆角 */
--radius-none: 0px;
--radius-default: 11px;  /* 标准卡片圆角 */

/* 布局 */
--canvas-width: 3600px;  /* 设计画布宽度 */
```

---

## 🎭 视觉效果

```css
/* 阴影 */
--shadow-none: none;  /* 完全扁平化 */

/* 边框 */
--border-none: 0px;

/* 透明度 */
--alpha-soft: 0.39;
--alpha-light: 0.20;
--alpha-none: 0;
```

---

## 🖼️ 图片处理

```css
/* 容器样式 */
.image-card {
  border-radius: var(--radius-default);
  overflow: hidden;
  /* 自由旋转角度 */
  transform: rotate(-5deg) translateX(10px);
}

/* 堆叠效果 */
.image-stack {
  position: relative;
  /* 图片重叠 */
  z-index: var(--layer);
}
```

---

## 🧭 导航样式

```css
.nav-link {
  font-family: var(--font-nav);
  font-size: var(--text-4xl);
  color: var(--text-charcoal);
  text-decoration: none;
  background-color: transparent;
  text-align: right;
  padding: var(--spacing-10) var(--spacing-16);
}

.nav-link-small {
  font-size: var(--text-xs);
  font-family: 'custom_157018';
  line-height: 11px;
}
```

---

## 📱 响应式设置

```css
/* 移动端 */
--mobile-align: top;  /* 顶部对齐 */

/* 桌面端 */
--desktop-width: 1920px;
--desktop-height: 3861px;  /* 全页高度 */
```

---

## 🎯 排版组件示例

### 超大标题
```css
.hero-title {
  font-family: var(--font-display);
  font-size: var(--text-7xl);
  font-weight: var(--font-normal);
  line-height: 64px;
  letter-spacing: var(--tracking-normal);
  text-transform: uppercase;
  color: var(--text-secondary);
  text-align: left;
}
```

### H1 标题
```css
.h1 {
  font-family: var(--font-heading);
  font-size: var(--text-5xl);
  font-weight: var(--font-bold);
  line-height: 60px;
  letter-spacing: var(--tracking-normal);
  color: rgba(34, 34, 34, var(--alpha-soft));
}
```

### H2 标题
```css
.h2 {
  font-family: var(--font-body);
  font-size: var(--text-3xl);
  font-weight: var(--font-normal);
  line-height: 30px;
  letter-spacing: var(--tracking-normal);
  color: rgba(34, 34, 34, var(--alpha-soft));
}
```

### 正文
```css
.body-text {
  font-family: var(--font-body);
  font-size: var(--text-xl);
  font-weight: var(--font-normal);
  line-height: 23px;
  letter-spacing: var(--tracking-normal);
  color: rgba(34, 34, 34, var(--alpha-soft));
}
```

### 说明文字
```css
.caption {
  font-family: var(--font-body);
  font-size: var(--text-lg);
  font-weight: var(--font-normal);
  font-style: italic;
  line-height: 18px;
  letter-spacing: var(--tracking-normal);
  color: rgba(34, 34, 34, var(--alpha-light));
}
```

### 小号文本
```css
.small-text {
  font-family: var(--font-modern);
  font-size: var(--text-md);
  font-weight: var(--font-normal);
  line-height: 15px;
  letter-spacing: var(--tracking-tight);
  color: rgba(225, 222, 219, var(--alpha-soft));
  text-align: center;
}
```

---

## 🎨 实现建议

### CSS 变量定义
```css
:root {
  /* 颜色 */
  --bg-primary: #FFFFFF;
  --text-primary: #282828;
  --text-secondary: #E1DEDB;
  --accent-pink: #EA587D;
  
  /* 字体 */
  --font-display: 'Austin', serif;
  --font-body: 'Georgia', serif;
  --font-modern: 'Inter', sans-serif;
  
  /* 间距 */
  --spacing-0: 0px;
  --spacing-16: 16px;
  --radius-default: 11px;
  
  /* 不透明度 */
  --alpha-soft: 0.39;
}
```

### 重置样式
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### 卡片堆叠效果
```css
.card-stack {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  border-radius: var(--radius-default);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.card:nth-child(1) { transform: rotate(-3deg); }
.card:nth-child(2) { transform: rotate(2deg); }
.card:nth-child(3) { transform: rotate(-1deg); }
.card:nth-child(4) { transform: rotate(4deg); }
```

---

## 📦 字体加载

```html
<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;500&display=swap" rel="stylesheet">

<!-- 自定义字体需要单独加载 -->
<!-- Austin, Navigo, wtqc 等需要购买或使用替代字体 -->
```

---

## 🎯 关键设计原则

1. **零间距优先**：默认使用 0 边距和内边距
2. **透明度分层**：使用 39% 不透明度创造柔和效果
3. **扁平化**：完全无阴影和渐变
4. **紧凑排版**：使用 -0.2px 或 0px 字间距
5. **物理隐喻**：通过旋转和重叠模拟真实卡片
6. **高对比度**：黑白为主，让内容色彩突出
7. **极简 UI**：移除所有非必要控件
8. **内容优先**：设计完全服务于内容展示

---

## 🔧 实用工具类

```css
/* 文本对齐 */
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

/* 大写 */
.uppercase { text-transform: uppercase; }

/* 斜体 */
.italic { font-style: italic; }

/* 透明度 */
.opacity-soft { opacity: var(--alpha-soft); }
.opacity-light { opacity: var(--alpha-light); }

/* 圆角 */
.rounded-default { border-radius: var(--radius-default); }
.rounded-none { border-radius: 0; }

/* 间距 */
.p-0 { padding: 0; }
.m-0 { margin: 0; }
```

---

这些设计令牌可以直接用于 CSS、Tailwind 配置或设计系统中，帮助你快速实现类似 Anna Mills 网站的视觉风格。
