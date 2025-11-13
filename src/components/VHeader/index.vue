<template>
  <div
    class="w-full h-[80px] bg-[#FFF] backdrop-blur fixed top-0 left-0 right-0 z-99 flex justify-center"
  >
    <div class="w-[1230px] px-[30px] flex items-center justify-between">
      <div class="flex items-center" @click="router.push('/')">
        <img
          src="@/assets/NEW_imgs/DCBBPizzaLogo/DCBBPizza.png"
          class="h-[44px] w-[60px]"
          alt=""
        />
      </div>
      <div class="flex items-center">
        <div class="flex items-center mr-[20px]">
          <!-- 用户相关功能 -->
        </div>
        <img
          @click="drawerVisible = true"
          class="w-30px"
          src="@/assets/NEW_imgs/my_Profit/组1@2x.png"
          alt=""
        />
        <Fold />
      </div>
    </div>
  </div>
  <el-drawer v-model="drawerVisible" direction="rtl" class="bg-[#ffffff]" size="50%">
    <ul class="flex flex-col">
      <li
        v-for="v in navList"
        :key="v.key"
        class="c-#000000 cursor-pointer flex flex-col"
        @click="onClick(v)"
      >
        <span
          class="my-[9px] px-[16px] py-[8px] rounded-[8px] hover:bg-[#2B2F36] transition-colors duration-200 whitespace-nowrap"
          >{{ v.name }}</span
        >
      </li>
    </ul>
    <div class="mt-[10px]">
      <div class="c-#000000 text-14px mb-[8px] px-[16px]">
        {{ t('nav.language') || 'Language' }}
      </div>
      <el-select
        v-model="locale"
        @change="changeLanguage"
        class="w-full"
        popper-class="language-select-dropdown"
      >
        <el-option
          v-for="item in langList"
          :key="item.key"
          :label="item.name"
          :value="item.key"
        >
          <div class="flex items-center">
            <img
              :src="item.icon"
              alt="lang"
              class="w-[18px] h-[18px] mr-[8px]"
            />
            <span>{{ item.name }}</span>
          </div>
        </el-option>
      </el-select>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Fold } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'VHeader',
})

const router = useRouter()
const drawerVisible = ref(false)
const { t, locale } = useI18n()
const navKey = ref('1')
const navList = computed(() => {
  return [
    {
      key: '0',
      name: t('nav.home'),
      icon: 'menu-1',
      path: '/',
    },
    {
      key: '6',
      name: t('nav.topup'),
      icon: 'menu-6',
      path: '/topup',
    },
    {
      key: '6',
      name: t('nav.withdrawal'),
      icon: 'menu-6',
      path: '/Withdrawal',
    },
    {
      key: '3',
      name: t('nav.exchange'),
      icon: 'menu-3',
      path: '/exchange',
    },
    {
      key: '2',
      name: t('nav.my_earnings'),
      icon: 'menu-2',
      path: '/NodeEquity',
    },
    {
      key: '9',
      name: t('nav.Internal_rotation'),
      icon: 'menu-9',
      path: '/Internal_rotation',
    },
    {
      key: '4',
      name: t('nav.team_info'),
      icon: 'menu-4',
      path: '/Team',
    },
    {
      key: '5',
      name: t('nav.node_benefits'),
      icon: 'menu-5',
      path: '/interests',
    },
    {
      key: '7',
      name: t('nav.about_us'),
      icon: 'menu-7',
      path: '/aboutUs',
    },
    {
      key: '8',
      name: t('nav.my'),
      icon: 'menu-8',
      path: '/myview',
    },
  ]
})

const onClick = (item) => {
  if (!item.path) return
  drawerVisible.value = false
  navKey.value = item.key
  router.push(item.path)
}

const langList = [
  {
    key: 'zh-TW',
    name: '繁體中文',
    icon: new URL('@/assets/imgs/language/zh.png', import.meta.url).href,
  },
  {
    key: 'en',
    name: 'English',
    icon: new URL('@/assets/imgs/language/en.png', import.meta.url).href,
  },
  {
    key: 'ko',
    name: '한국어',
    icon: new URL('@/assets/imgs/language/kr.png', import.meta.url).href,
  },
  {
    key: 'th',
    name: 'ไทย',
    icon: new URL('@/assets/imgs/language/th.png', import.meta.url).href,
  },
]

const curLocale = computed(() => langList.find((item) => item.key === locale.value))

const changeLanguage = (lang) => {
  console.log('lang', lang);
  locale.value = lang
  localStorage.setItem('longe-vity-locale', lang)
}

onMounted(() => {
  // 组件挂载后的初始化代码
})
</script>

<style scoped lang="scss">
.btn {
  box-shadow: inset 0 -2px 12px 0 rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.16);
}
</style>