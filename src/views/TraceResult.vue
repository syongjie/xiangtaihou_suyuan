<template>
  <div class="xiangtaihou-trace">


    <!-- 头部（含产品图） -->
    <header class="page-header">
      <div style="display: flex; justify-content: space-between; height: 60px; align-items: center;">
        <img style="width: 30px; height: 30px;" src="@/assets/suyuan/首页_slices/返回@3x(1).png" alt="">
        <div>
          <h3>{{ t('traceResult.productName') }}</h3>
          <span>{{ t('traceResult.website') }}</span>
        </div>
        <div class="more-menu">
          <div class="language-switcher">
            <img class="lang-btn" @click="toggleLanguageMenu($event)" src="@/assets/suyuan/lg1.png" alt="">
            <div v-if="showLanguageMenu" class="language-menu">
              <button v-for="lang in languages" :key="lang.value"
                :class="['lang-btn', { active: currentLang === lang.value }]" @click="switchLanguage(lang.value)">
                {{ t('traceResult.' + lang.labelKey) }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 产品图片相册 -->
      <div class="product-gallery" @click="openProductGallery">
        <img style="height: 300px; width: 100%; object-fit: cover;" :src="productImage"
          :alt="t('traceResult.productImageAlt')" class="product-img" />
        <!-- <div class="gallery-indicator" v-if="productGallery.length > 1">
          <span class="current-index">{{ currentImageIndex + 1 }}</span>
          <span class="total-count">/{{ productGallery.length }}</span>
        </div>
        <div class="gallery-icon" v-if="productGallery.length > 1">
          <img src="@/assets/suyuan/首页_slices/更多@3x.png" :alt="t('traceResult.photoAlbum')" style="width: 24px; height: 24px;" />
        </div> -->
      </div>
    </header>

    <!-- 产品标题 -->
    <section class="product-title">
      <h2>{{ t('traceResult.productName') }}</h2>
      <p class="subtitle">{{ t('traceResult.productSubtitle') }}</p>
      <div class="product-basic-info">
        <div class="info-item" style="background-color: #FFFFF2EF; padding: 5px; border-radius: 5px;">
          <span style="color: #F53F3F;" class="label">{{ t('traceResult.shelfLife') }}</span>
          <span style="color: #F53F3F;" class="value">{{ t('traceResult.shelfLifeValue') }}</span>
        </div>
        <div class="info-item" style="background-color: #FFFFF2EF; padding: 5px; border-radius: 5px;">
          <span style="color: #F53F3F;" class="label">{{ t('traceResult.netWeight') }}</span>
          <span style="color: #F53F3F;" class="value">{{ t('traceResult.netWeightValue') }}</span>
        </div>
        <button class="buy-btn">{{ t('traceResult.buyNow') }}</button>
      </div>
    </section>

    <!-- 导航标签 -->
    <nav class="nav-tabs sticky-top">
      <div v-for="tab in tabs" :key="tab.id" class="nav-tab" :class="{ active: activeTab === tab.id }"
        @click="switchTab(tab.id)">
        {{ t('traceResult.' + tab.id) }}
      </div>
    </nav>

    <!-- 主要内容 -->
    <main class="main-content">
      <!-- 基础信息快速显示，不使用全局loading阻塞 -->

      <!-- 错误提示（保留但很少会触发） -->
      <div v-if="error" class="error-state">
        <p>{{ error }}</p>
        <button @click="fetchProductData" class="retry-btn">{{ t('traceResult.retry') }}</button>
      </div>

      <!-- 基础信息 -->
      <section id="basicInfo" class="content-section">
        <h4 class="section-title">{{ t('traceResult.basicInfo') }}</h4>
        <div class="info-grid" style="background-color: #f9f8fe;">
          <div class="info-card" v-for="item in productData.productDetails" :key="item.labelKey">
            <div class="info-label">{{ t('traceResult.' + item.labelKey) }}</div>
            <div class="info-value" :class="{ clickable: item.value === '点击查看' }"
              @click="item.value === '点击查看' ? viewReport(item) : null">
              {{ item.value }}
              <img v-if="item.value === '点击查看'" style="width: 20px; position: relative; top: 5px;"
                src="/imgs/image-02@3x.png" alt="" />
            </div>
          </div>
        </div>
      </section>

      <!-- 检验报告 -->
      <section id="inspectionReport" class="content-section">
        <h4 class="section-title">{{ t('traceResult.inspectionReport') }}</h4>
        <div class="inspection-reports">
          <div class="report-grid">
            <div class="report-item" style="position: relative;"
              v-for="(report, index) in productData.inspectionReports" :key="index">
              <img :src="report.imgUrl" :alt="t('traceResult.inspectionReport')" class="report-img" />
              <button class="view-btn" style="position: absolute; bottom: 5px; right: 5px;"
                @click="viewReport(report, index)">{{ t('traceResult.view') }}</button>
            </div>
          </div>
        </div>
      </section>

      <!-- 公司信息 -->
      <section id="companyInfo" class="content-section">
        <h4 class="section-title">{{ t('traceResult.companyInfo') }}</h4>
        <div class="company-info">
          <div class="company-media">
            <!-- 公司宣传：视频 / 图片 通用 -->
            <div class="media-content" :class="{ video: companyMedia.type === 'video' }">
              <!-- ① 视频模式 -->
              <template v-if="companyMedia.type === 'video'">
                <video ref="companyVideo" :src="companyMedia.url" :poster="companyMedia.poster" class="company-video"
                  @play="onVideoPlay" @pause="onVideoPause" @ended="onVideoEnd"></video>
                <!-- 播放按钮覆盖层 -->
                <div v-if="!videoPlaying" class="play-overlay" @click="playCompanyVideo">
                  <img src="/imgs/play-01@3x.png" class="play-icon" />
                </div>
              </template>

              <!-- ② 图片模式 -->
              <img v-else :src="companyMedia.url" class="company-image" @click="viewCompanyMedia" />
            </div>
          </div>
          <div class="info-grid">
            <div class="info-card" v-for="item in productData.manufacturerInfo" :key="item.label">
              <div style="display: flex;">
                <img v-if="item.labelKey === 'companyName'" style="width: 20px; position: relative; top: -3px;"
                  src="/imgs/bar-group-03@3x.png" alt="" />
                <img v-else-if="item.labelKey === 'socialCreditCode'"
                  style="width: 20px; position: relative; top: -3px;" src="/imgs/shield-check@3x.png" alt="" />
                <img v-else style="width: 20px; position: relative; top: -3px;" src="/imgs/phone-call-01@3x.png"
                  alt="" />
                <div class="info-label">{{ t('traceResult.' + item.labelKey) }}</div>
              </div>
              <div class="info-value" style="text-align: left;">{{ item.value }}</div>
            </div>
          </div>

          <div class="qualification-section">
            <div style="display: flex;">
              <img style="width: 30px; position: relative; top: -5px;" src="/imgs/Frame@3x(1).png" alt="" />
              <h4>{{ t('traceResult.companyQualifications') }}</h4>
            </div>
            <div class="qualification-grid">
              <div class="qualification-item" style="position: relative;"
                v-for="(qual, index) in productData.companyQualifications" :key="index">
                <img :src="qual.imgUrl" :alt="t('traceResult.companyQualifications')" class="qual-img" />
                <button class="view-btn" style="position: absolute; bottom: 15px; right: 5px;"
                  @click="viewQualification(qual, index)">{{ t('traceResult.view') }}</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 生产厂家 -->
      <section id="manufacturer" class="content-section">
        <h4 class="section-title">{{ t('traceResult.manufacturer') }}</h4>
        <div class="identity-section">
          <div style="display: flex;">
            <div style="margin-right: 10px; width: 3px; height: 16px; margin-top: 5px; background-color: #F53F3F;">
            </div>
            <h4>{{ t('traceResult.identity') }}</h4>
          </div>
          <div class="info-item">
            <span class="label">{{ t('traceResult.companyName') }}：</span>
            <span class="value" style="color: #666;">{{ productData.companyInfo.fullName }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ t('traceResult.socialCreditCode') }}：</span>
            <span class="value" style="color: #666;">{{ productData.companyInfo.creditCode }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ t('traceResult.legalRepresentative') }}：</span>
            <span class="value" style="color: #666;">{{ productData.companyInfo.legalRepresentative || '待完善' }}</span>
          </div>
        </div>

        <div class="contact-section">
          <div style="display: flex;">
            <div style="margin-right: 10px; width: 3px; height: 16px; margin-top: 5px; background-color: #F53F3F;">
            </div>
            <h4>{{ t('traceResult.contactInfo') }}</h4>
          </div>
          <div class="info-item">
            <span class="label">{{ t('traceResult.phone') }}：</span>
            <span class="value" style="color: #666;">{{ productData.companyInfo.phone }}</span>
          </div>
          <div class="info-item">
            <span class="label">{{ t('traceResult.website') }}：</span>
            <span class="value">
              <a :href="'http://' + productData.companyInfo.website" target="_blank">{{ productData.companyInfo.website
                }}</a>
            </span>
          </div>
          <div class="info-item">
            <span class="label">{{ t('traceResult.email') }}：</span>
            <span class="value" style="color: #666;">{{ productData.companyInfo.email }}</span>
          </div>
          <div class="info-item">
            <span class="label" style="width: 60px;"></span>
            <span class="value">{{ productData.companyInfo.email2 }}</span>
          </div>
        </div>
      </section>

      <!-- 上游生产 -->
      <section id="upstreamProduction" class="content-section">
        <h4 class="section-title">{{ t('traceResult.upstreamProduction') }}</h4>
        <div class="upstream-info">
          <div style="display: flex;">
            <div style="margin-right: 10px; width: 3px; height: 16px; margin-top: 5px; background-color: #F53F3F;">
            </div>
            <h4>{{ t('traceResult.identity') }}</h4>
          </div>
          <div class="info-grid">
            <div class="info-card" v-for="item in productData.upstreamInfo" :key="item.labelKey">
              <div class="info-label">{{ t('traceResult.' + item.labelKey) }}：</div>
              <div class="info-value" style="color: #666;">{{ item.value }}</div>
            </div>
          </div>
        </div>
        <div class="upstream-info">
          <div style="display: flex;">
            <div style="margin-right: 10px; width: 3px; height: 16px; margin-top: 5px; background-color: #F53F3F;">
            </div>
            <h4>{{ t('traceResult.contactInfo') }}</h4>
          </div>
          <div class="info-grid">
            <div class="info-card" v-for="item in productData.upstreamInfo1" :key="item.labelKey">
              <div class="info-label">{{ t('traceResult.' + item.labelKey) }}：</div>
              <div class="info-value" style="color: #666;">{{ item.value }}</div>
            </div>
          </div>
        </div>
      </section>
      <!-- 视频播放 -->
      <section class="video-player-section" v-if="productData.videoUrl">
        <video :src="productData.videoUrl" controls class="product-video"
          :poster="`https://via.placeholder.com/400x225?text=${t('traceResult.videoCover')}`"></video>
      </section>
      <!-- 评论互动 -->
      <section id="comments" class="content-section">
        <h4 class="section-title">{{ t('traceResult.comments') }}</h4>
        <div class="comments-section">
          <div class="rating-summary">
            <div class="rating-item">
              <span class="rating-label">{{ t('traceResult.quality') }}</span>
              <div class="stars">
                <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= 4 }">★</span>
              </div>
              <span class="rating-text">{{ t('traceResult.good') }}</span>
            </div>
            <div class="rating-item">
              <span class="rating-label">{{ t('traceResult.taste') }}</span>
              <div class="stars">
                <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= 5 }">★</span>
              </div>
              <span class="rating-text">{{ t('traceResult.excellent') }}</span>
            </div>
          </div>

          <div class="interaction-buttons">
            <label class="interaction-label">
              <input type="radio" name="recommend" value="推荐" v-model="recommendType" />
              <img v-if="recommendType === '推荐'" style="width: 20px;" src="/imgs/1.默认@3x.png" alt="" />
              <img v-else style="width: 20px;" src="/imgs/1.默认@3x(1).png" alt="" />
              <span>{{ t('traceResult.recommend') }}</span>
            </label>
            <label class="interaction-label">
              <input type="radio" name="recommend" value="不推荐" v-model="recommendType" />
              <img v-if="recommendType === '不推荐'" style="width: 20px;" src="/imgs/1.默认@3x.png" alt="" />
              <img v-else style="width: 20px;" src="/imgs/1.默认@3x(1).png" alt="" />
              {{ t('traceResult.notRecommend') }}
            </label>
          </div>

          <div class="comment-input">
            <textarea v-model="commentText" :placeholder="t('traceResult.commentPlaceholder')" maxlength="500"
              class="comment-textarea"></textarea>
            <div class="char-count">{{ commentText.length }}/500</div>
          </div>

          <!-- 评论列表 -->
          <div class="comments-list" v-if="productData.comments && productData.comments.length > 0">
            <h4 class="comments-list-title">{{ t('traceResult.userComments') }} ({{ productData.comments.length }})</h4>
            <div class="comment-item" v-for="comment in productData.comments" :key="comment.id">
              <div class="comment-header">
                <img :src="comment.avatar" :alt="t('traceResult.userAvatar')" class="comment-avatar" />
                <div class="comment-user-info">
                  <div class="comment-username">{{ comment.username }}</div>
                  <div class="comment-rating">
                    <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= comment.rating }">{{
                      comment.recommend
                      === '推荐' ? '★' : '☆' }}</span>
                    <span class="comment-recommend">{{ comment.recommend }}</span>
                  </div>
                </div>
                <div class="comment-time">{{ comment.time }}</div>
              </div>
              <div class="comment-content">{{ comment.content }}</div>
            </div>
          </div>
          <div v-else class="no-comments">
            <p>{{ t('traceResult.noComments') }}</p>
          </div>

          <!-- 上传视频 -->
          <div class="video-upload">
            <p class="upload-hint">{{ t('traceResult.videoUploadHint') }}</p>

            <!-- 已选预览 -->
            <video v-if="uploadVideoUrl" :src="uploadVideoUrl" controls class="upload-preview"></video>

            <!-- 选择按钮 -->
            <input ref="videoFile" type="file" accept="video/*" style="display: none" @change="onVideoSelect" />
            <div class="upload-btn" @click="chooseVideo">
              <img style="width: 30px;" src="/imgs/play-01@3x.png" alt="" />
              <div>{{ uploadVideoUrl ? t('traceResult.resElect') : t('traceResult.uploadVideo') }}</div>
            </div>
          </div>

          <div class="suggestion-input">
            <textarea v-model="suggestionText" :placeholder="t('traceResult.suggestionPlaceholder')"
              class="suggestion-textarea"></textarea>
          </div>

          <button class="submit-btn" @click="submitComment" :disabled="submitting">
            {{ submitting ? t('traceResult.submitting') : t('traceResult.submit') }}
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { traceService, commentService } from '@/api/index'
import { getCurrentInstance, ref, onMounted, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

// 国际化支持
const { t, locale } = useI18n()

// 语言配置
const languages = [
  { labelKey: 'chinese', value: 'zh' },
  { labelKey: 'traditionalChinese', value: 'zh-TW' },
  { labelKey: 'english', value: 'en' }
]

const currentLang = computed(() => locale.value)
const showLanguageMenu = ref(false)

const switchLanguage = (lang) => {
  locale.value = lang
  localStorage.setItem('locale', lang)
  showLanguageMenu.value = false // 选择语言后关闭菜单
}

const toggleLanguageMenu = (event) => {
  event.stopPropagation(); // 阻止事件冒泡
  showLanguageMenu.value = !showLanguageMenu.value;
}

const route = useRoute()
// 优先从查询参数code获取商品码，兼容原有的路径参数productId
const productCode = route.query.code || route.params.productId
// 重命名为更通用的变量名，便于后续处理
const productIdentifier = productCode

/* ---------- 基础能力 ---------- */
const { proxy } = getCurrentInstance()

/* ---------- 响应式数据 ---------- */
const activeTab = ref('basicInfo')
// 使用更精细的加载状态管理
const basicLoading = ref(false)
const detailedLoading = ref(false)
const error = ref(null)
const recommendType = ref('推荐')
const submitting = ref(false)
const commentText = ref('')
const suggestionText = ref('')

/* 产品相册 */
const productGallery = ref([
  '/imgs/Group17@3x.png',
  '/imgs/Rectangle12404@3x.png',
  '/imgs/IMG_4457@3x.png'
])
const currentImageIndex = ref(0)
const productImage = ref(productGallery.value[0])

/* 公司宣传媒体 */
const companyMedia = ref({
  type: 'video',          // 'video' | 'image'
  url: '/public/ff934ab7788ffd0ea4bb20f9c78fc3c6.mp4',   // 视频地址 or 图片地址
  poster: '/imgs/image28@3x.png', // 仅视频有效
})

/* 业务数据 */
const productData = ref({
  productName: '八不加精品酱牛肉',
  shelfLife: '270天',
  netWeight: '150g/袋',
  videoUrl: '/public/ff934ab7788ffd0ea4bb20f9c78fc3c6.mp4',   // ① 视频地址

  productDetails: [
    { labelKey: 'certification', value: '地理标志' },
    { labelKey: 'batchNumber', value: '20231022A01' },
    { labelKey: 'detectionReport', value: '点击查看' },
    { labelKey: 'launchDate', value: '2025.10.22' },
    { labelKey: 'origin', value: '宁夏中宁' },
    { labelKey: 'brand', value: '品牌名称' },
    { labelKey: 'productFeatures', value: '蒙古国草原散养牛' },
    { labelKey: 'storageMethod', value: '卫生、阴凉、通风、干燥处常温储藏、冷藏更佳' },
    { labelKey: 'usageMethod', value: '温火慢炖' }
  ],
  inspectionReports: [
    { imgUrl: '/imgs/Group19120@3x.png' },
    { imgUrl: '/imgs/image26(3).png' },
    { imgUrl: '/imgs/image26@2x(3).png' },
    { imgUrl: '/imgs/image26@3x(2).png' },
    { imgUrl: '/imgs/image26@3x.png' }
  ],
  companyInfo: {
    fullName: '香港祥泰厚副食品集团有限公司',
    creditCode: '91410100MAD9K99BXY',
    phone: '15346573661',
    website: 'www.xiangtaihou.com',
    email: 'xiangtaihou@yeah.net（通用）',
    email2: '15346573661@163.com（SU）',
    legalRepresentative: ''
  },
  companyQualifications: [
    { imgUrl: '/imgs/IMG_4456@3x.png' },
    { imgUrl: '/imgs/IMG_4457@3x.png' },
    { imgUrl: '/imgs/Group19126@3x.png' }
  ],
  manufacturerInfo: [
    { labelKey: 'companyName', value: '香港祥泰厚副食品集团有限公司' },
    { labelKey: 'socialCreditCode', value: '91410100MAD9K99BXY' },
    { labelKey: 'phone', value: '15346573661' }
  ],
  upstreamInfo: [
    { labelKey: 'companyName', value: '香港祥泰厚副食品集团有限公司' },
    { labelKey: 'socialCreditCode', value: '91410100MAD9K99BXY' },
    { labelKey: 'legalRepresentative', value: '待完善' }
  ],
  upstreamInfo1: [
    { labelKey: 'phone', value: 'Jas Su: +86 15346573661' },
    { labelKey: 'website', value: 'www.xiangtaihou.com' },
    { labelKey: 'email', value: 'xiangtaihou@yeah.net（通用）' },
    { labelKey: 'email', value: '15346573661@163.com（SU）' }
  ]
})

const tabs = ref([
  { id: 'basicInfo' },
  { id: 'inspectionReport' },
  { id: 'companyInfo' },
  { id: 'manufacturer' },
  { id: 'upstreamProduction' },
  { id: 'comments' }
])

/* ---------- 监听语言变化，实时更新标签名 ---------- */
watch(() => locale.value, () => {
  // 语言变化时不需要特殊处理标签名，因为现在模板中直接使用t函数
  // 每次渲染都会根据当前语言获取最新翻译
  console.log('语言变化:', locale.value)
})

/* ---------- viewer 统一封装 ---------- */
const openProductGallery = () => {
  proxy.$viewerApi({
    images: productGallery.value,
    options: { initialViewIndex: currentImageIndex.value }
  })
}

/* 播放状态 */
const videoPlaying = ref(false)
const companyVideo = ref(null) // template ref

/* 播放/暂停/结束 回调 */
const playCompanyVideo = () => companyVideo.value?.play()
const onVideoPlay = () => videoPlaying.value = true
const onVideoPause = () => videoPlaying.value = false
const onVideoEnd = () => videoPlaying.value = false

/* 图片预览 */
const viewCompanyMedia = () => {
  proxy.$viewerApi({ images: [companyMedia.value.url] })
}

const viewReport = (_, idx) => {
  const imgs = productData.value.inspectionReports.map(r => r.imgUrl)
  proxy.$viewerApi({ images: imgs, options: { initialViewIndex: idx } })
}

const viewQualification = (_, idx) => {
  const imgs = productData.value.companyQualifications.map(q => q.imgUrl)
  proxy.$viewerApi({ images: imgs, options: { initialViewIndex: idx } })
}

/* ---------- 业务函数 ---------- */
const switchTab = (tabId) => {
  activeTab.value = tabId

  // 加载对应标签页的数据
  const tab = tabs.value.find(t => t.id === tabId)
  if (tab) {
    loadTabData(tab.name)
  }

  // 获取目标元素
  const targetElement = document.getElementById(tabId)
  if (targetElement) {
    // 保存原始body的padding-top
    const originalPadding = document.body.style.paddingTop;

    // 临时添加200px的padding-top到body，这样scrollIntoView会考虑这个偏移
    document.body.style.paddingTop = '200px';

    // 使用scrollIntoView滚动到目标元素
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // 滚动完成后移除临时padding
    setTimeout(() => {
      document.body.style.paddingTop = originalPadding;
    }, 1000); // 与滚动动画时间匹配
  }
}

/* 上传相关 */
const videoFile = ref(null)        // file input ref
const uploadVideoUrl = ref('')       // 本地预览地址

const chooseVideo = () => videoFile.value.click()

const onVideoSelect = (e) => {
  const file = e.target.files[0]
  if (!file) return

  const video = document.createElement('video')
  video.preload = 'metadata'
  video.onloadedmetadata = () => {
    window.URL.revokeObjectURL(video.src) // 释放内存
    if (video.duration > 30) {
      alert(t('traceResult.videoTooLong'))
      uploadVideoUrl.value = ''
      return
    }
    // 通过校验
    uploadVideoUrl.value = URL.createObjectURL(file)
  }
  video.src = URL.createObjectURL(file)
}

// const onVideoSelect = async (e) => {
//   const file = e.target.files[0]
//   if (!file) return

//   /* 时长 & 大小校验 */
//   const duration = await getVideoDuration(file)
//   if (duration > 30) return alert(t('traceResult.videoTooLong'))
//   if (file.size > 50 * 1024 * 1024) return alert(t('traceResult.videoTooLarge'))

//   /* 构造 FormData */
//   const fd = new FormData()
//   fd.append('video', file) // 字段名和后端约定好

//   try {
//     /* 直传后端 */
//     const { data } = await axios.post('/api/upload/video', fd, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//       onUploadProgress: (p) => console.log('上传进度', ((p.loaded / p.total) * 100).toFixed(0) + '%')
//     })
//     uploadVideoUrl.value = data.url // 后端返回的可访问地址
//   } catch (e) {
//     alert(t('traceResult.uploadFailed') + ': ' + e.message)
//   }
// }

const submitComment = async () => {
  if (!commentText.value.trim()) return alert(t('traceResult.enterComment'))
  submitting.value = true
  await new Promise((r) => setTimeout(r, 1000))
  alert(t('traceResult.commentSubmitted'))
  commentText.value = suggestionText.value = ''
  submitting.value = false

  // if (!commentText.value.trim()) return proxy.$toast('请输入评价内容')

  // submitting.value = true
  // try {
  //   await commentService.submitComment({
  //     productId: productId,              // 路由里取到的
  //     recommend: recommendType.value,    // '推荐' | '不推荐'
  //     comment: commentText.value,
  //     suggestion: suggestionText.value,
  //     video: videoFile.value?.files?.[0] || null // 原始 File 对象
  //   })

  //   proxy.$toast('提交成功，感谢您的评价！')
  //   // 重置表单
  //   commentText.value = ''
  //   suggestionText.value = ''
  //   recommendType.value = '推荐'
  //   uploadVideoUrl.value = ''
  //   videoFile.value = null
  // } catch (e) {
  //   proxy.$toast(e.message || '提交失败，请重试')
  // } finally {
  //   submitting.value = false
  // }
}


// 加载详细信息
const loadDetailedInfo = async () => {
  detailedLoading.value = true
  try {
    // 模拟详细信息加载
    await new Promise(resolve => setTimeout(resolve, 500))

    // 可以在这里根据需要加载更多详细数据
    if (!productData.value.comments) {
      productData.value.comments = [
        {
          id: '1',
          username: '李先生',
          avatar: '/imgs/Group19120@3x.png',
          rating: 5,
          content: '肉质非常好，口感鲜嫩，值得推荐！',
          time: '2023-11-10 14:30',
          recommend: '推荐'
        },
        {
          id: '2',
          username: '张女士',
          avatar: '/imgs/image26@3x.png',
          rating: 4,
          content: '味道不错，分量也很足，下次还会购买。',
          time: '2023-11-05 10:15',
          recommend: '推荐'
        }
      ]
    }
    if (!productData.value.ratingsSummary) {
      productData.value.ratingsSummary = {
        average: 4.5,
        count: 128,
        fiveStar: 85,
        fourStar: 30,
        threeStar: 10,
        twoStar: 2,
        oneStar: 1
      }
    }
    console.log('详细信息加载完成')
  } catch (e) {
    console.log('详细信息加载失败:', e.message)
  } finally {
    detailedLoading.value = false
  }
}

// 根据标签页加载对应数据
const loadTabData = async (tab) => {
  try {
    switch (tab) {
      case '基础信息':
        // 基础信息已在fetchProductData中加载
        break
      case '评论互动':
        // 加载评论和评分数据
        if (!productData.value.comments) {
          // 如果评论数据未加载，则加载评论数据
          await loadDetailedInfo()
        }
        console.log('评论和评分数据加载完成')
        break
      // 其他标签页的数据通过getProductDetails获取
    }
  } catch (e) {
    console.log(`加载${tab}数据失败:`, e.message)
  }
}

const fetchProductData = async () => {
  basicLoading.value = true
  try {
    // 1. 快速加载基础信息
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 300))
    console.log('基础信息加载完成')

    // 2. 在后台异步加载详细信息
    loadDetailedInfo()
  } catch (e) {
    // 不设置error，这样即使API调用失败也能显示模拟数据
    console.log('API调用失败，使用初始模拟数据:', e.message)
  } finally {
    basicLoading.value = false
  }
}

/* ---------- 生命周期 ---------- */
import { onUnmounted } from 'vue'

// 组件挂载时加载基础数据
onMounted(() => {
  // 不设置loading为true，直接显示初始模拟数据
  // 然后异步加载实际数据
  fetchProductData()

  // 点击外部关闭语言菜单
  const closeLanguageMenu = (event) => {
    const languageMenu = document.querySelector('.language-menu');
    const langButton = document.querySelector('.language-switcher .lang-btn');

    // 如果点击的不是语言菜单且不是语言按钮，则关闭菜单
    if (languageMenu && langButton &&
      !languageMenu.contains(event.target) &&
      !langButton.contains(event.target)) {
      showLanguageMenu.value = false;
    }
  };

  document.addEventListener('click', closeLanguageMenu);

  // 清理事件监听器
  onUnmounted(() => {
    document.removeEventListener('click', closeLanguageMenu);
  });
})

// 组件卸载时的清理
onUnmounted(() => {
  // 清理URL对象以避免内存泄漏
  if (uploadVideoUrl.value) {
    URL.revokeObjectURL(uploadVideoUrl.value)
  }

  // 停止视频播放
  if (companyVideo.value) {
    companyVideo.value.pause()
    companyVideo.value.src = ''
  }

  // 可以在这里添加其他清理逻辑，如取消正在进行的异步请求等
  console.log('组件已卸载，资源已清理')
})
</script>

<style scoped>
/* 语言切换样式 */
.language-switcher {
  position: relative;
  display: flex;
  justify-content: flex-end;
  background: white;
}

.lang-btn {
  padding: 6px 12px;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  width: 60px;
}

.language-menu {
  position: absolute;
  top: 100%;
  right: 15px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 120px;
}

.language-menu .lang-btn {
  display: block;
  width: 100%;
  text-align: left;
  border: none;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 0;
}

.language-menu .lang-btn:last-child {
  border-bottom: none;
}

.lang-btn:hover {
  background: #f5f5f5;
}

.lang-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.upload-preview {
  width: 100%;
  max-height: 200px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.video-player-section {
  margin: 15px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, .1);
}

.product-video {
  width: 100%;
  max-height: 240px;
  display: block;
}

.company-media {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 15px;
}

.company-video,
.company-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.play-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, .35);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.play-icon {
  width: 60px;
  height: 60px;
  opacity: .9;
}

/* 产品相册核心样式 */
.product-gallery {
  position: relative;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
}

.product-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.product-gallery:hover .product-img {
  transform: scale(1.02);
}

.gallery-indicator {
  position: absolute;
  bottom: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.7);
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  z-index: 10;
}

.current-index {
  color: #ff5722;
  margin-right: 4px;
}

.total-count {
  opacity: 0.9;
}

.gallery-icon {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.6);
  padding: 8px;
  border-radius: 50%;
  z-index: 10;
  transition: background 0.3s ease;
}

.gallery-icon:hover {
  background: rgba(0, 0, 0, 0.8);
}

.gallery-icon img {
  width: 24px;
  height: 24px;
  object-fit: contain;
  filter: brightness(100);
}

/* 基础信息响应式布局 */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 15px;
}

/* 确保在不同屏幕尺寸下每行最多显示两个信息卡 */
@media (min-width: 768px) {
  .info-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .info-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.info-card {
  display: flex;
  justify-content: space-between;
  gap: 5px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #f0f0f0;
}

.info-label {
  font-weight: 500;
  color: #666;
  font-size: 14px;
  margin-bottom: 4px;
}

.info-value {
  color: #333;
  font-size: 14px;
  font-weight: 500;
  text-align: right;
  word-break: break-word;
}

/* 页面基础样式 */
.xiangtaihou-trace {
  max-width: 400px;
  margin: 0 auto;
  background: white;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.page-header {
  position: relative;
  text-align: center;
}

.header-content {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.8);
  padding: 8px 0;
}

.page-header h1 {
  font-size: 18px;
  margin: 0;
  font-weight: 600;
  color: #333;
}

.domain {
  font-size: 12px;
  opacity: 0.9;
  margin: 3px 0 0 0;
  color: #666;
}

.upstream-info {
  background-color: #f8f9fa;
  padding: 10px 10px;
}

.section-title {
  margin: 10px 0;
}

.product-title {
  padding: 15px 20px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #ffffff;
  border-radius: 20px 20px 0 0;
  margin-top: -25px;
  position: relative;
  top: -25px;
}

.product-title h2 {
  font-size: 18px;
  margin: 0;
  color: #000000;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin: 5px 0 0 0;
}

.nav-tabs {
  display: flex;
  background: white;
  padding: 0 10px;
  overflow-x: auto;
}

.nav-tab {
  padding: 12px 10px;
  margin: 5px;
  font-size: 14px;
  color: #000000;
  cursor: pointer;
  background-color: #f9f8fe;
  border-radius: 10px;
  white-space: nowrap;
}

.nav-tab.active {
  background-color: #d63031;
  color: #fff;
  border-radius: 10px;
  font-weight: 500;
}

.main-content {
  padding: 15px;
}

.loading-state {
  text-align: center;
  padding: 40px 0;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #e63946;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin: 0 auto 10px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.tab-content {
  animation: fadeIn 0.3s ease;
  margin-top: 15px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.product-basic-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 12px;
  border-radius: 8px;
}

.info-item {
  display: flex;
}

.label {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.value {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.buy-btn {
  background: #e63946;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
}

.qualification-section {
  margin-top: 20px;
}

.qualification-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.qualification-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qual-img {
  width: 100%;
  height: 150px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.view-btn {
  margin-top: 5px;
  background: #e63946;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.selling-points,
.usage-info {
  margin-bottom: 15px;
}

.selling-points h3,
.usage-item h4 {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.selling-points p,
.usage-item p {
  font-size: 13px;
  color: #666;
  line-height: 1.4;
}

.usage-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.inspection-reports h3 {
  font-size: 16px;
  margin-bottom: 12px;
  color: #333;
}

.report-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.report-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.report-img {
  width: 100%;
  height: 200px;
  border: 1px solid #eee;
  border-radius: 4px;
}

.view-btn {
  background-color: rgba(128, 126, 126, 0.8);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 25px;
  font-size: 12px;
  cursor: pointer;
}

.company-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.company-header h3 {
  font-size: 18px;
  color: #333;
  margin: 0;
}

.photo-gallery {
  color: #e63946;
  font-size: 14px;
}

.identity-section {
  background-color: #f8f9fa;
  padding: 10px 10px;
  border-radius: 10px;
}

.contact-section {
  background-color: #f8f9fa;
  padding: 10px 10px;
  border-radius: 10px;
}

.qualification-section {
  margin-bottom: 20px;
}

.identity-section h4,
.contact-section h4,
.qualification-section h4 {
  font-size: 16px;
  margin-bottom: 12px;
  color: #333;
}

.qualification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.qual-name {
  font-size: 14px;
  color: #333;
}

.rating-summary {
  margin-bottom: 15px;
}

.rating-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.rating-label {
  width: 60px;
  font-size: 14px;
  color: #333;
}

.stars {
  flex: 1;
  margin: 0 8px;
}

.star {
  color: #ddd;
  font-size: 16px;
}

.star.filled {
  color: #ff5722;
}

.rating-text {
  font-size: 12px;
  color: #666;
  width: 60px;
}

.interaction-buttons {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.interaction-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.interaction-label input {
  display: none;
}

.radio-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 1px solid #ccc;
  border-radius: 50%;
  margin-right: 5px;
  text-align: center;
  line-height: 18px;
  font-size: 12px;
}

.interaction-label input:checked+.radio-icon {
  background: #ff5722;
  color: white;
  border-color: #ff5722;
}

.interaction-label input[value="不推荐"]+.radio-icon {
  border-color: #ccc;
  background: white;
  color: #666;
}

.recommend-btn {
  border-color: #4CAF50;
  background: #f0fff4;
  color: #4CAF50;
}

.not-recommend-btn {
  border-color: #f44336;
  background: #fff0f0;
  color: #f44336;
}

.comment-input,
.suggestion-input {
  margin-bottom: 15px;
}

.comment-textarea,
.suggestion-textarea {
  width: 100%;
  min-height: 80px;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  resize: vertical;
  font-size: 14px;
}

.char-count {
  text-align: right;
  font-size: 12px;
  color: #999;
  margin-top: 5px;
}

/* 评论列表样式 */
.comments-list {
  margin-top: 30px;
}

.comments-list-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 1px solid #f0f0f0;
}

.comment-item {
  padding: 15px 0;
  border-bottom: 1px solid #f5f5f5;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-header {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 12px;
  object-fit: cover;
}

.comment-user-info {
  flex: 1;
}

.comment-username {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
}

.comment-rating {
  display: flex;
  align-items: center;
}

.comment-rating .star {
  font-size: 12px;
  color: #ddd;
  margin-right: 2px;
}

.comment-rating .star.filled {
  color: #ff5722;
}

.comment-recommend {
  font-size: 12px;
  color: #666;
  margin-left: 8px;
}

.comment-time {
  font-size: 12px;
  color: #999;
}

.comment-content {
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  padding-left: 52px;
}

.no-comments {
  text-align: center;
  padding: 30px 0;
  color: #999;
  font-size: 14px;
}

.upload-hint {
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
}

.upload-btn {
  width: 80px;
  padding: 10px;
  border: 1px dashed #e0e0e0;
  background: #f8f9fa;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: #e63946;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

@media (max-width: 480px) {
  .xiangtaihou-trace {
    max-width: 100%;
  }

  .info-grid,
  .usage-info {
    grid-template-columns: 1fr;
  }
}

.error-state {
  text-align: center;
  padding: 30px 20px;
  color: #d63031;
}

.error-state p {
  margin-bottom: 12px;
}

.retry-btn {
  background: #e63946;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.clickable {
  cursor: pointer;
}

.submit-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.video-player-section {
  margin-bottom: 20px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.product-video {
  width: 100%;
  height: auto;
  max-height: 240px;
}

.company-media {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
  margin-bottom: 15px;
}

.company-video,
.company-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.play-overlay:hover {
  background: rgba(0, 0, 0, 0.5);
}

.play-icon {
  width: 60px;
  height: 60px;
  opacity: 0.8;
}

.qualification-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.qualification-item {
  position: relative;
}

.qual-img {
  width: 100%;
  height: 150px;
  border: 1px solid #eee;
  border-radius: 4px;
  object-fit: cover;
}

.view-btn {
  background-color: rgba(128, 126, 126, 0.8);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 25px;
  font-size: 12px;
  cursor: pointer;
}
</style>