/**
 * 公共工具函数
 */

// 获取URL参数
function getUrlParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// 格式化日期
function formatDate(date) {
  const d = date || new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 复制到剪贴板
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // 降级方案
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  }
}

// 显示消息
function showMessage(type, text, duration = 3000) {
  const icons = {
    success: '✅',
    warning: '⚠️',
    error: '❌'
  };
  
  const msg = document.createElement('div');
  msg.className = `message message-${type}`;
  msg.innerHTML = `<span>${icons[type] || ''}</span><span>${text}</span>`;
  document.body.appendChild(msg);
  
  if (duration > 0) {
    setTimeout(() => {
      msg.style.opacity = '0';
      msg.style.transition = 'opacity 0.3s ease';
      setTimeout(() => msg.remove(), 300);
    }, duration);
  }
}

// 文件大小格式化
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 拖拽上传工具
function initDropArea(element, onFileSelect) {
  if (!element) return;
  
  element.addEventListener('dragover', (e) => {
    e.preventDefault();
    element.classList.add('dragover');
  });
  
  element.addEventListener('dragleave', (e) => {
    e.preventDefault();
    element.classList.remove('dragover');
  });
  
  element.addEventListener('drop', (e) => {
    e.preventDefault();
    element.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  });
  
  element.addEventListener('click', () => {
    const input = element.querySelector('input[type="file"]');
    if (input) input.click();
  });
}

// 文件上传处理
function handleFileUpload(file, accept, maxSize, callback) {
  // 检查文件类型
  if (accept) {
    const acceptTypes = accept.split(',').map(t => t.trim().toLowerCase());
    const fileType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase();
    
    const isValid = acceptTypes.some(type => {
      if (type.startsWith('.')) {
        return fileName.endsWith(type);
      }
      return fileType === type || fileType.startsWith(type.split('/')[0] + '/');
    });
    
    if (!isValid) {
      showMessage('error', `不支持的文件类型，请上传 ${accept} 格式的文件`);
      return;
    }
  }
  
  // 检查文件大小
  if (maxSize && file.size > maxSize) {
    showMessage('error', `文件过大，最大支持 ${formatFileSize(maxSize)}`);
    return;
  }
  
  callback(file);
}

// 读取文件为DataURL
function readFileAsDataURL(file, callback) {
  const reader = new FileReader();
  reader.onload = (e) => callback(e.target.result);
  reader.onerror = () => showMessage('error', '文件读取失败');
  reader.readAsDataURL(file);
}

// 读取文件为ArrayBuffer
function readFileAsArrayBuffer(file, callback) {
  const reader = new FileReader();
  reader.onload = (e) => callback(e.target.result);
  reader.onerror = () => showMessage('error', '文件读取失败');
  reader.readAsArrayBuffer(file);
}

// 暗色模式切换
function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark ? 'true' : 'false');
  updateDarkModeIcon(isDark);
}

function updateDarkModeIcon(isDark) {
  const btn = document.querySelector('.dark-mode-toggle');
  if (btn) btn.textContent = isDark ? '☀️' : '🌙';
}

function initDarkMode() {
  const saved = localStorage.getItem('darkMode');
  if (saved === 'true') {
    document.body.classList.add('dark-mode');
  }
  updateDarkModeIcon(saved === 'true');
}

// 使用统计
function trackVisit(toolName) {
  if (!toolName) return;
  const stats = JSON.parse(localStorage.getItem('toolStats') || '{}');
  stats[toolName] = (stats[toolName] || 0) + 1;
  localStorage.setItem('toolStats', JSON.stringify(stats));
}

function getTopTools(n) {
  const stats = JSON.parse(localStorage.getItem('toolStats') || '{}');
  return Object.entries(stats)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

function getTotalVisits() {
  const stats = JSON.parse(localStorage.getItem('toolStats') || '{}');
  return Object.values(stats).reduce((sum, count) => sum + count, 0);
}

// 最近使用记录
function trackRecent(toolName) {
  if (!toolName) return;
  const key = 'toolRecent';
  let recent = JSON.parse(localStorage.getItem(key) || '[]');
  // 移除已有的同名记录
  recent = recent.filter(r => r.name !== toolName);
  // 添加到最前面
  recent.unshift({ name: toolName, time: Date.now() });
  // 最多保留 20 条
  if (recent.length > 20) recent = recent.slice(0, 20);
  localStorage.setItem(key, JSON.stringify(recent));
}

function getRecentTools() {
  return JSON.parse(localStorage.getItem('toolRecent') || '[]');
}

function clearRecentTools() {
  localStorage.removeItem('toolRecent');
}

// 自动初始化：暗黑模式 + 访问统计（每个页面加载时自动执行）
(function autoInit() {
  // 暗黑模式
  initDarkMode();
  // 访问统计：从URL提取工具名
  const match = window.location.pathname.match(/\/tools\/([^/]+)\//);
  if (match) {
    trackVisit(match[1]);
    trackRecent(match[1]);
  }
})();
