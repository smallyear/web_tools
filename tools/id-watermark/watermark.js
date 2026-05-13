/**
 * 身份证水印工具
 * 参考小程序版实现
 */

(async function() {
  // === 状态 ===
  const state = {
    image: null,
    imageInfo: null,
    watermarkText: '仅供办理银行卡使用',
    selectedTemplate: 0,
    customText: '',
    useCustomText: false,
    opacity: 128,
    fontSize: 30,
    rotation: 0,
    color: '#FF0000',
    dateText: ''
  };

  const templates = [
    '仅供办理银行卡使用',
    '仅供办理签证使用',
    '仅供租房使用',
    '仅供入职使用',
    '仅供办理证件使用',
    '仅供本人使用，他用无效'
  ];

  // === DOM元素 ===
  const uploadArea = document.getElementById('uploadArea');
  const fileInput = document.getElementById('fileInput');
  const watermarkSection = document.getElementById('watermarkSection');
  const canvas = document.getElementById('watermarkCanvas');
  const ctx = canvas.getContext('2d');
  const placeholder = document.getElementById('placeholder');
  const previewWrapper = document.getElementById('previewWrapper');
  
  const templateList = document.getElementById('templateList');
  const customTextInput = document.getElementById('customText');
  const dateInput = document.getElementById('dateInput');
  const opacityRange = document.getElementById('opacityRange');
  const fontSizeRange = document.getElementById('fontSizeRange');
  const rotationRange = document.getElementById('rotationRange');
  const colorPicker = document.getElementById('colorPicker');
  
  const opacityValue = document.getElementById('opacityValue');
  const fontSizeValue = document.getElementById('fontSizeValue');
  const rotationValue = document.getElementById('rotationValue');
  const colorHex = document.getElementById('colorHex');
  
  const resetBtn = document.getElementById('resetBtn');
  const downloadBtn = document.getElementById('downloadBtn');

  // === 初始化 ===
  function init() {
    // 设置默认日期为今天
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    state.dateText = `${year}-${month}-${day}`;
    dateInput.value = state.dateText;
    
    // 初始化拖拽上传
    initDropArea(uploadArea, handleFile);
    
    // 文件选择
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        handleFile(e.target.files[0]);
      }
    });
    
    // 模板选择
    templateList.addEventListener('click', (e) => {
      const item = e.target.closest('.template-item');
      if (!item) return;
      
      const index = parseInt(item.dataset.index);
      state.selectedTemplate = index;
      state.useCustomText = false;
      state.watermarkText = templates[index];
      
      // 更新UI
      templateList.querySelectorAll('.template-item').forEach(el => {
        el.classList.toggle('selected', parseInt(el.dataset.index) === index);
      });
      customTextInput.value = '';
      
      drawWatermark();
    });
    
    // 自定义文字
    customTextInput.addEventListener('input', (e) => {
      const text = e.target.value;
      if (text.length > 50) {
        showMessage('error', '水印文字不能超过50个字符');
        e.target.value = text.substring(0, 50);
        return;
      }
      
      state.customText = text;
      state.useCustomText = text.length > 0;
      state.watermarkText = state.useCustomText ? text : templates[state.selectedTemplate];
      
      drawWatermark();
    });
    
    // 日期选择
    dateInput.addEventListener('change', (e) => {
      state.dateText = e.target.value;
      drawWatermark();
    });
    
    // 透明度
    opacityRange.addEventListener('input', (e) => {
      state.opacity = parseInt(e.target.value);
      opacityValue.textContent = state.opacity;
      drawWatermark();
    });
    
    // 字体大小
    fontSizeRange.addEventListener('input', (e) => {
      state.fontSize = parseInt(e.target.value);
      fontSizeValue.textContent = `${state.fontSize}px`;
      drawWatermark();
    });
    
    // 旋转角度
    rotationRange.addEventListener('input', (e) => {
      state.rotation = parseInt(e.target.value);
      rotationValue.textContent = `${state.rotation}°`;
      drawWatermark();
    });
    
    // 颜色选择
    colorPicker.addEventListener('input', (e) => {
      state.color = e.target.value;
      colorHex.textContent = state.color;
      drawWatermark();
    });
    
    // 重置按钮
    resetBtn.addEventListener('click', resetConfig);
    
    // 下载按钮
    downloadBtn.addEventListener('click', downloadImage);
  }

  // === 文件处理 ===
  function handleFile(file) {
    handleFileUpload(file, 'image/*', 10 * 1024 * 1024, (validFile) => {
      readFileAsDataURL(validFile, (dataUrl) => {
        loadImage(dataUrl);
      });
    });
  }

  // === 加载图片 ===
  function loadImage(src) {
    const img = new Image();
    
    img.onload = function() {
      state.image = img;
      state.imageInfo = {
        width: img.width,
        height: img.height
      };
      
      // 显示水印区域，隐藏Placeholder
      watermarkSection.style.display = '';
      placeholder.style.display = 'none';
      canvas.style.display = '';
      
      drawWatermark();
      showMessage('success', '图片加载成功');
    };
    
    img.onerror = function() {
      showMessage('error', '图片加载失败，请重试');
    };
    
    img.src = src;
  }

  // === 获取水印文字 ===
  function getWatermarkText() {
    if (state.useCustomText && state.customText) {
      return state.customText;
    }
    return templates[state.selectedTemplate] || templates[0];
  }

  // === 绘制水印 ===
  function drawWatermark() {
    if (!state.image) return;
    
    const img = state.image;
    const width = img.width;
    const height = img.height;
    
    // 设置canvas尺寸
    canvas.width = width;
    canvas.height = height;
    
    // 清除画布
    ctx.clearRect(0, 0, width, height);
    
    // 绘制原始图片
    ctx.drawImage(img, 0, 0, width, height);
    
    // 计算缩放后的字体大小
    const scaleFactor = Math.min(width, height) / 300;
    const scaleFont = state.fontSize * scaleFactor;
    
    // 构建完整的水印文字
    const watermarkText = getWatermarkText();
    const fullText = state.dateText ? `${watermarkText}\n${state.dateText}` : watermarkText;
    
    // === 中心水印 ===
    ctx.save();
    ctx.globalAlpha = state.opacity / 255;
    ctx.fillStyle = state.color;
    ctx.font = `bold ${scaleFont}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    ctx.translate(centerX, centerY);
    ctx.rotate((state.rotation * Math.PI) / 180);
    
    // 绘制多行文字（按换行符分割）
    const lines = fullText.split('\n');
    const lineHeight = scaleFont * 1.2;
    const totalHeight = lines.length * lineHeight - lineHeight;
    const startY = -totalHeight / 2;
    
    lines.forEach((line, i) => {
      ctx.fillText(line, 0, startY + i * lineHeight);
    });
    
    ctx.restore();
    
    // === 四周水印 ===
    ctx.font = `bold ${scaleFont * 0.6}px sans-serif`;
    const positions = [
      { x: width * 0.2, y: height * 0.2 },
      { x: width * 0.8, y: height * 0.2 },
      { x: width * 0.2, y: height * 0.8 },
      { x: width * 0.8, y: height * 0.8 }
    ];
    
    positions.forEach((pos) => {
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.rotate((state.rotation * Math.PI) / 180);
      ctx.globalAlpha = state.opacity / 255;
      ctx.fillStyle = state.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // 四周水印也支持多行
      const smallLines = fullText.split('\n');
      const smallLineHeight = scaleFont * 0.6 * 1.2;
      const smallTotalHeight = smallLines.length * smallLineHeight - smallLineHeight;
      const smallStartY = -smallTotalHeight / 2;
      
      smallLines.forEach((line, i) => {
        ctx.fillText(line, 0, smallStartY + i * smallLineHeight);
      });
      
      ctx.restore();
    });
  }

  // === 重置配置 ===
  function resetConfig() {
    state.opacity = 128;
    state.fontSize = 30;
    state.rotation = 0;
    state.color = '#FF0000';
    state.selectedTemplate = 0;
    state.customText = '';
    state.useCustomText = false;
    state.watermarkText = templates[0];
    
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    state.dateText = `${year}-${month}-${day}`;
    
    // 更新UI
    opacityRange.value = 128;
    fontSizeRange.value = 30;
    rotationRange.value = 0;
    colorPicker.value = '#FF0000';
    customTextInput.value = '';
    dateInput.value = state.dateText;
    opacityValue.textContent = '128';
    fontSizeValue.textContent = '30px';
    rotationValue.textContent = '0°';
    colorHex.textContent = '#FF0000';
    
    templateList.querySelectorAll('.template-item').forEach(el => {
      el.classList.toggle('selected', parseInt(el.dataset.index) === 0);
    });
    
    drawWatermark();
    showMessage('success', '已重置为默认配置');
  }

  // === 下载图片 ===
  function downloadImage() {
    if (!state.image) {
      showMessage('warning', '请先上传图片');
      return;
    }
    
    // 导出
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `id-watermark-${Date.now()}.png`;
    link.href = dataURL;
    link.click();
    
    showMessage('success', '图片已下载');
  }

  // 初始化
  init();
})();
