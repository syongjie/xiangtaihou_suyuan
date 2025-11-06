<template>
  <div class="xiangtaihou-trace">
    <!-- 头部（含产品图） -->
    <header class="page-header">
      <div style="display: flex; justify-content: space-between; height: 60px; align-items: center;">
        <img style="width: 30px; height: 30px;" src="@/assets/suyuan/首页_slices/返回@3x(1).png" alt="">
        <div>
          <h3>{{ productData.productName }}</h3>
          <span>fw.xolo.kim</span>
        </div>
        <img style="width: 30px; height: 30px; margin-right: 10px;" src="@/assets/suyuan/首页_slices/更多@3x.png" alt="">
      </div>
      <!-- 产品图片相册 -->
      <div class="product-gallery" @click="openProductGallery">
        <img style="height: 300px; width: 100%; object-fit: cover;" :src="productImage" alt="八不加精品酱牛肉" class="product-img" />
        <!-- <div class="gallery-indicator" v-if="productGallery.length > 1">
          <span class="current-index">{{ currentImageIndex + 1 }}</span>
          <span class="total-count">/{{ productGallery.length }}</span>
        </div>
        <div class="gallery-icon" v-if="productGallery.length > 1">
          <img src="@/assets/suyuan/首页_slices/更多@3x.png" alt="相册" style="width: 24px; height: 24px;" />
        </div> -->
      </div>
    </header>

    <!-- 产品标题 -->
    <section class="product-title">
      <h2>{{ productData.productName }}</h2>
      <p class="subtitle">Premium Braised Beef Jerky</p>
      <div class="product-basic-info">
        <div class="info-item" style="background-color: #FFFFF2EF; padding: 5px; border-radius: 5px;">
          <span style="color: #F53F3F;" class="label">保质期</span>
          <span style="color: #F53F3F;" class="value">{{ productData.shelfLife }}</span>
        </div>
        <div class="info-item" style="background-color: #FFFFF2EF; padding: 5px; border-radius: 5px;">
          <span style="color: #F53F3F;" class="label">净含量</span>
          <span style="color: #F53F3F;" class="value">{{ productData.netWeight }}</span>
        </div>
        <button class="buy-btn">立即购买</button>
      </div>
    </section>

    <!-- 导航标签 -->
    <nav class="nav-tabs sticky-top">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="nav-tab"
        :class="{ active: activeTab === tab.id }"
        @click="switchTab(tab.id)"
      >
        {{ tab.name }}
      </div>
    </nav>

    <!-- 主要内容 -->
    <main class="main-content">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>加载中...</p>
      </div>

      <div v-if="error" class="error-state">
        <p>{{ error }}</p>
        <button @click="fetchProductData" class="retry-btn">重新加载</button>
      </div>

      <!-- 基础信息 -->
      <section id="info" class="content-section" v-if="!loading && !error">
        <h4 class="section-title">基础信息</h4>
        <div class="info-grid" style="background-color: #f9f8fe;">
          <div class="info-card" v-for="item in productData.productDetails" :key="item.label">
            <div class="info-label">{{ item.label }}</div>
            <div
              class="info-value"
              style="width: 200px;"
              :class="{ clickable: item.value === '点击查看' }"
              @click="item.value === '点击查看' ? viewReport(item) : null"
            >
              {{ item.value }}
              <img
                v-if="item.value === '点击查看'"
                style="width: 20px; position: relative; top: 5px;"
                src="/public/imgs/image-02@3x.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <!-- 检验报告 -->
      <section id="inspection" class="content-section" v-if="!loading && !error">
        <h4 class="section-title">检验报告</h4>
        <div class="inspection-reports">
          <div class="report-grid">
            <div class="report-item" style="position: relative;" v-for="(report, index) in productData.inspectionReports" :key="index">
              <img :src="report.imgUrl" alt="检验报告" class="report-img" />
              <button class="view-btn" style="position: absolute; bottom: 5px; right: 5px;" @click="viewReport(report, index)">查看</button>
            </div>
          </div>
        </div>
      </section>

      <!-- 公司信息 -->
      <section id="company" class="content-section" v-if="!loading && !error">
        <h4 class="section-title">公司信息</h4>
        <div class="company-info">
          <div class="company-media">
            <!-- 公司宣传：视频 / 图片 通用 -->
            <div class="company-media" :class="{ video: companyMedia.type === 'video' }">
              <!-- ① 视频模式 -->
              <template v-if="companyMedia.type === 'video'">
                <video
                  ref="companyVideo"
                  :src="companyMedia.url"
                  :poster="companyMedia.poster"
                  class="company-video"
                  @play="onVideoPlay"
                  @pause="onVideoPause"
                  @ended="onVideoEnd"
                ></video>
                <!-- 播放按钮覆盖层 -->
                <div v-if="!videoPlaying" class="play-overlay" @click="playCompanyVideo">
                  <img src="/public/imgs/play-01@3x.png" class="play-icon" />
                </div>
              </template>

              <!-- ② 图片模式 -->
              <img
                v-else
                :src="companyMedia.url"
                class="company-image"
                @click="viewCompanyMedia"
              />
            </div>
          </div>
          <div class="info-grid">
            <div class="info-card" v-for="item in productData.manufacturerInfo" :key="item.label">
              <div style="display: flex;">
                <img
                  v-if="item.label === '企业名称'"
                  style="width: 20px; position: relative; top: -3px;"
                  src="/public/imgs/bar-group-03@3x.png"
                  alt=""
                />
                <img
                  v-else-if="item.label === '统一社会信用代码'"
                  style="width: 20px; position: relative; top: -3px;"
                  src="/public/imgs/shield-check@3x.png"
                  alt=""
                />
                <img v-else style="width: 20px; position: relative; top: -3px;" src="/public/imgs/phone-call-01@3x.png" alt="" />
                <div class="info-label">{{ item.label }}</div>
              </div>
              <div class="info-value" style="text-align: left;">{{ item.value }}</div>
            </div>
          </div>

          <div class="qualification-section">
            <div style="display: flex;">
              <img style="width: 30px; position: relative; top: -5px;" src="/public/imgs/Frame@3x(1).png" alt="" />
              <h4>公司资质</h4>
            </div>
            <div class="qualification-grid">
              <div class="qualification-item" style="position: relative;" v-for="(qual, index) in productData.companyQualifications" :key="index">
                <img :src="qual.imgUrl" alt="公司资质" class="qual-img" />
                <button class="view-btn" style="position: absolute; bottom: 15px; right: 5px;" @click="viewQualification(qual, index)">查看</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 生产厂家 -->
      <section id="manufacturer" class="content-section" v-if="!loading && !error">
        <h4 class="section-title">生产厂家</h4>
        <div class="identity-section">
          <div style="display: flex;">
            <div style="margin-right: 10px; width: 3px; height: 16px; margin-top: 5px; background-color: #F53F3F;"></div>
            <h4>主体身份</h4>
          </div>
          <div class="info-item">
            <span class="label">企业名称：</span>
            <span class="value" style="color: #666;">{{ productData.companyInfo.fullName }}</span>
          </div>
          <div class="info-item">
            <span class="label">统一社会信用代码：</span>
            <span class="value" style="color: #666;">{{ productData.companyInfo.creditCode }}</span>
          </div>
          <div class="info-item">
            <span class="label">法定负责人：</span>
            <span class="value" style="color: #666;">{{ productData.companyInfo.legalRepresentative || '待完善' }}</span>
          </div>
        </div>

        <div class="contact-section">
          <div style="display: flex;">
            <div style="margin-right: 10px; width: 3px; height: 16px; margin-top: 5px; background-color: #F53F3F;"></div>
            <h4>联系方式</h4>
          </div>
          <div class="info-item">
            <span class="label">联系电话：</span>
            <span class="value" style="color: #666;">{{ productData.companyInfo.phone }}</span>
          </div>
          <div class="info-item">
            <span class="label">官方网站：</span>
            <span class="value">
              <a :href="'http://' + productData.companyInfo.website" target="_blank">{{ productData.companyInfo.website }}</a>
            </span>
          </div>
          <div class="info-item">
            <span class="label">电子邮箱：</span>
            <span class="value" style="color: #666;">{{ productData.companyInfo.email }}</span>
          </div>
          <div class="info-item">
            <span class="label" style="width: 60px;"></span>
            <span class="value">{{ productData.companyInfo.email2 }}</span>
          </div>
        </div>
      </section>

      <!-- 上游生产 -->
      <section id="upstream" class="content-section" v-if="!loading && !error">
        <h4 class="section-title">上游生产</h4>
        <div class="upstream-info">
          <div style="display: flex;">
            <div style="margin-right: 10px; width: 3px; height: 16px; margin-top: 5px; background-color: #F53F3F;"></div>
            <h4>主体身份</h4>
          </div>
          <div class="info-grid">
            <div class="info-card" v-for="item in productData.upstreamInfo" :key="item.label">
              <div class="info-label">{{ item.label }}：</div>
              <div class="info-value" style="color: #666;">{{ item.value }}</div>
            </div>
          </div>
        </div>
        <div class="upstream-info">
          <div style="display: flex;">
            <div style="margin-right: 10px; width: 3px; height: 16px; margin-top: 5px; background-color: #F53F3F;"></div>
            <h4>联系方式</h4>
          </div>
          <div class="info-grid">
            <div class="info-card" v-for="item in productData.upstreamInfo1" :key="item.label">
              <div class="info-label">{{ item.label }}：</div>
              <div class="info-value" style="color: #666;">{{ item.value }}</div>
            </div>
          </div>
        </div>
      </section>
       <!-- 视频播放 -->
      <section class="video-player-section" v-if="productData.videoUrl">
        <video :src="productData.videoUrl" controls class="product-video" poster="https://via.placeholder.com/400x225?text=视频封面"></video>
      </section>
      <!-- 评论互动 -->
      <section id="comments" class="content-section" v-if="!loading && !error">
        <h4 class="section-title">评论互动</h4>
        <div class="comments-section">
          <div class="rating-summary">
            <div class="rating-item">
              <span class="rating-label">品质</span>
              <div class="stars">
                <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= 4 }">★</span>
              </div>
              <span class="rating-text">好</span>
            </div>
            <div class="rating-item">
              <span class="rating-label">口感</span>
              <div class="stars">
                <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= 5 }">★</span>
              </div>
              <span class="rating-text">非常好</span>
            </div>
          </div>

          <div class="interaction-buttons">
            <label class="interaction-label">
              <input type="radio" name="recommend" value="推荐" v-model="recommendType" />
              <img v-if="recommendType === '推荐'" style="width: 20px;" src="/public/imgs/1.默认@3x.png" alt="" />
              <img v-else style="width: 20px;" src="/public/imgs/1.默认@3x(1).png" alt="" />
              <span>推荐</span>
            </label>
            <label class="interaction-label">
              <input type="radio" name="recommend" value="不推荐" v-model="recommendType" />
              <img v-if="recommendType === '不推荐'" style="width: 20px;" src="/public/imgs/1.默认@3x.png" alt="" />
              <img v-else style="width: 20px;" src="/public/imgs/1.默认@3x(1).png" alt="" />
              不推荐
            </label>
          </div>

          <div class="comment-input">
            <textarea
              v-model="commentText"
              placeholder="请描述你的评价..."
              maxlength="500"
              class="comment-textarea"
            ></textarea>
            <div class="char-count">{{ commentText.length }}/500</div>
          </div>

          <div class="video-upload">
            <p class="upload-hint">支持上传视频，且时长不得超过30s</p>
            <div class="upload-btn" @click="handleVideoUpload">
              <img style="width: 30px;" src="/public/imgs/play-01@3x.png" alt="" />
              <div>上传视频</div>
            </div>
          </div>

          <div class="suggestion-input">
            <textarea
              v-model="suggestionText"
              placeholder="请输入您的改善建议..."
              class="suggestion-textarea"
            ></textarea>
          </div>

          <button class="submit-btn" @click="submitComment" :disabled="submitting">
            {{ submitting ? '提交中...' : '提交' }}
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { getCurrentInstance, ref, onMounted, watch } from 'vue'

/* ---------- 基础能力 ---------- */
const { proxy } = getCurrentInstance()

/* ---------- 响应式数据 ---------- */
const activeTab = ref('info')
const loading = ref(false)
const error = ref(null)
const recommendType = ref('推荐')
const submitting = ref(false)
const commentText = ref('')
const suggestionText = ref('')

/* 产品相册 */
const productGallery = ref([
  '/public/imgs/Group17@3x.png',
  '/public/imgs/Rectangle12404@3x.png',
  '/public/imgs/IMG_4457@3x.png'
])
const currentImageIndex = ref(0)
const productImage = ref(productGallery.value[0])

/* 公司宣传媒体 */
const companyMedia = ref({
  type: 'video',          // 'video' | 'image'
  url: '/public/videos/company.mp4',   // 视频地址 or 图片地址
  poster: '/public/imgs/image28@3x.png' // 仅视频有效
})

/* 业务数据 */
const productData = ref({
  productName: '八不加精品酱牛肉',
  shelfLife: '270天',
  netWeight: '150g/袋',
  videoUrl: '/public/videos/xxx.mp4',   // ① 视频地址
  productDetails: [
    { label: '产品认证', value: '地理标志' },
    { label: '产品批次', value: '20231022A01' },
    { label: '检测报告', value: '点击查看' },
    { label: '上市日期', value: '2025.10.22' },
    { label: '产地', value: '宁夏中宁' },
    { label: '品牌', value: '品牌名称' },
    { label: '产品卖点', value: '蒙古国草原散养牛' },
    { label: '储存形式', value: '卫生、阴凉、通风、干燥处常温储藏、冷藏更佳' },
    { label: '食用方法', value: '温火慢炖' }
  ],
  inspectionReports: [
    { imgUrl: '/public/imgs/Group19120@3x.png' },
    { imgUrl: '/public/imgs/image26(3).png' },
    { imgUrl: '/public/imgs/image26@2x(3).png' },
    { imgUrl: '/public/imgs/image26@3x(2).png' },
    { imgUrl: '/public/imgs/image26@3x.png' }
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
    { imgUrl: '/public/imgs/IMG_4456@3x.png' },
    { imgUrl: '/public/imgs/IMG_4457@3x.png' },
    { imgUrl: '/public/imgs/Group19126@3x.png' }
  ],
  manufacturerInfo: [
    { label: '企业名称', value: '香港祥泰厚副食品集团有限公司' },
    { label: '统一社会信用代码', value: '91410100MAD9K99BXY' },
    { label: '联系电话', value: '15346573661' }
  ],
  upstreamInfo: [
    { label: '企业名称', value: '香港祥泰厚副食品集团有限公司' },
    { label: '统一社会信用代码', value: '91410100MAD9K99BXY' },
    { label: '法定负责人', value: '待完善' }
  ],
  upstreamInfo1: [
    { label: '联系电话', value: 'Jas Su: +86 15346573661' },
    { label: '官方网站', value: 'www.xiangtaihou.com' },
    { label: '电子邮箱', value: 'xiangtaihou@yeah.net（通用）' },
    { label: '电子邮箱', value: '15346573661@163.com（SU）' }
  ]
})

const tabs = ref([
  { id: 'info', name: '基础信息' },
  { id: 'inspection', name: '检验报告' },
  { id: 'company', name: '公司信息' },
  { id: 'manufacturer', name: '生产厂家' },
  { id: 'upstream', name: '上游生产' },
  { id: 'comments', name: '评论互动' }
])

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
const onVideoPlay  = () => videoPlaying.value = true
const onVideoPause = () => videoPlaying.value = false
const onVideoEnd   = () => videoPlaying.value = false

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
  document.getElementById(tabId)?.scrollIntoView({ behavior: 'smooth' })
}

const handleVideoUpload = () => alert('视频上传功能')

const submitComment = async () => {
  if (!commentText.value.trim()) return alert('请输入评价内容')
  submitting.value = true
  await new Promise((r) => setTimeout(r, 1000))
  alert('评价提交成功！')
  commentText.value = suggestionText.value = ''
  submitting.value = false
}

const fetchProductData = async () => {
  loading.value = true
  try {
    // 模拟
    await new Promise((r) => setTimeout(r, 300))
  } catch (e) {
    error.value = e.message || '获取失败'
  } finally {
    loading.value = false
  }
}

/* ---------- 生命周期 ---------- */
onMounted(fetchProductData)
</script>

<style scoped>
.video-player-section {
  margin: 15px;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,.1);
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
  background: rgba(0,0,0,.35);
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

.section-title{
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
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.tab-content {
  animation: fadeIn 0.3s ease;
  margin-top: 15px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
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

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 15px;
}

.info-card {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
}

.info-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}

.info-value {
  font-size: 14px;
  color: #000000;
  font-weight: 500;
  text-align: right;
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

.interaction-label input:checked + .radio-icon {
  background: #ff5722;
  color: white;
  border-color: #ff5722;
}

.interaction-label input[value="不推荐"] + .radio-icon {
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
  color: #666;
  margin-top: 5px;
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
  
  .info-grid, .usage-info {
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