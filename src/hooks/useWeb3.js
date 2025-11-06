import { computed, ref } from 'vue'
import { Ed25519KeyIdentity, DelegationChain, DelegationIdentity, Delegation } from '@dfinity/identity'
import { HttpAgent, Actor } from '@dfinity/agent'
import { Principal } from '@dfinity/principal' // 可选，用于处理 Principal 数据类型
import { idlFactory } from './idl.js' // SIWB的IDL文件，ICP的Dashboard可以找到
import { idlFactoryBTC } from './ckbtc_converter.did.js' // SIWB的IDL文件，ICP的Dashboard可以找到
import { ModelContractidlFactory } from './ModelContract.js' // SIWB的IDL文件，ICP的Dashboard可以找到
import { useAddressCounterStore } from '@/stores/user.js'
import { TokenIDRS } from './TokenIDR.js'
import {userApi} from '@/api/index.js'
import {storage} from '@/utils/storage.js'
const useAddressCounter = useAddressCounterStore()
const canisterId = 'stxih-wyaaa-aaaah-aq2la-cai' // 替换为你的 Canister ID
const lpCoin = ref()
const leaderAddress = ref()
const allowance = ref()

const account = ref(null) // 存储用户的比特币地址
const captionAccount = computed(() => {
  if (!account.value) return '连接钱包'
  const strLength = account.value.length
  const shortName = account.value.substring(0, 5)
  const shortName2 = account.value.substring(strLength - 4, strLength)
  return `${shortName}***${shortName2}`
})
const formatStringWithPlaceholder = (str, frontLen = 3, endLen = 3, placeholder = '***') => {
  if (!str || typeof str !== 'string') return '' // 参数校验

  const strLength = str.length
  if (strLength <= frontLen + endLen) {
    return str // 如果字符串长度不足，直接返回原字符串
  }

  const shortName = str.substring(0, frontLen) // 前部分
  const shortName2 = str.substring(strLength - endLen, strLength) // 后部分

  return `${shortName}${placeholder}${shortName2}`
}
// 创建siwb合约实例
function createSiwbActor() {
  const agent = new HttpAgent() // 构造空agent即可，不需要身份。
  return Actor.createActor(idlFactory, {
    agent,
    canisterId: 'gknke-niaaa-aaaah-arioa-cai',
  })
}
function createDelegationChainFromGetResult(getResult, middlePubkeyDer) {
  const delegations = [
    {
      delegation: new Delegation(getResult.delegation.pubkey, getResult.delegation.expiration, getResult.delegation.targets ? getResult.delegation.targets[0] : undefined),
      signature: getResult.signature,
    },
  ]

  // 使用传递的middlePubkeyDer来构建委托链
  return DelegationChain.fromDelegations(delegations, middlePubkeyDer)
}

export default function useWeb3() {
  // 拉起钱包获取地址
  // 拉起钱包获取地址
  const contractLogin = async () => {
    try {
      // 判断当前钱包类型
      let wallet = null
      console.log(window, 'window')
      console.log(window.okxwallet, 'okxwallet')

      if (window.unisat) {
        wallet = window.unisat
      } else if (window.TokenPocketProvider) {
        wallet = window.TokenPocketProvider
      } else if (window.okxwallet) {
        wallet = window.okxwallet
      } else {
        alert('请安装 UniSat、TP钱包或OK钱包后重试！')
        return
      }

      // 获取 Bitcoin 地址
      let accounts = []
      if (window.unisat) {
        // UniSat 和部分钱包支持 requestAccounts 方法
        accounts = await wallet.requestAccounts()
      } else if (window.okxwallet) {
        // 获取账户地址
        accounts = await wallet.bitcoin.requestAccounts()

        // // 如果是 OKX 钱包，确保切换到 BTC 网络
        // if (wallet === window.okxTonWallet) {
        //   const chainInfo = await wallet.getChain()
        //   console.log('当前网络:', chainInfo)

        //   if (chainInfo && chainInfo.chain !== 'BTC') {
        //     alert('请切换到 BTC 网络后重试！')
        //     return
        //   }
        // }
      } else {
        throw new Error('当前钱包不支持获取账户的方法')
      }

      const btcAddress = accounts[0]
      if (!btcAddress) {
        throw new Error('未获取到有效的 Bitcoin 地址')
      }

      // 创建 siwb 实例
      // const actor = createSiwbActor()
      console.log(btcAddress, 'btcAddress')

      // 请求预登录接口获取签名挑战信息
      // const prepare = await actor.siwb_prepare_login(btcAddress)
      // const challenge = prepare.Ok

      let getnonce = await userApi.loginnonce({wallet_address:btcAddress});
      // 签名挑战信息
      let signature = ''
      let signature2 = ''
      if (wallet.signMessage) {
        // signature = await wallet.signMessage(challenge); // UniSat 和 OK钱包
        signature2 = await wallet.signMessage(getnonce.data.nonce); // UniSat 和 OK钱包
      } else if (wallet.bitcoin.signMessage) {
        // TP钱包或其他钱包的签名方式
        // signature = await wallet.bitcoin.signMessage(challenge);
        signature2 = await wallet.bitcoin.signMessage(getnonce.data.nonce);
      } else {
        throw new Error('当前钱包不支持消息签名的方法')
      }

      // 获取钱包的公钥
      // let walletPubKeyHex = ''
      // if (window.unisat) {
      //   walletPubKeyHex = await wallet.getPublicKey() // UniSat 和 OK钱包
      // } else if (wallet.bitcoin.getPublicKey) {
      //   console.log('走的不是这里？')
      //   walletPubKeyHex = await wallet.bitcoin.getPublicKey() // TP钱包
      // } else {
      //   throw new Error('当前钱包不支持获取公钥的方法')
      // }

      // 构造 siwb 所需的 session 会话
      // const edIdentity = Ed25519KeyIdentity.generate()
      // const pubkeyDer = edIdentity.getPublicKey().toDer()
      // const sessionKey = Array.from(new Uint8Array(pubkeyDer))
      // const arr = edIdentity.toJSON()
      // localStorage.setItem('edIdentity', JSON.stringify(arr))
      // console.log(signature, 'signature这是签名信息')

      // 保存会话信息
      // await useAddressCounter.setSessionKey(sessionKey)
      // await useAddressCounter.setSignature(signature)
      // await useAddressCounter.setWalletPubKeyHex(walletPubKeyHex)
      await useAddressCounter.setUserAddress(btcAddress)

      // console.log(useAddressCounter.signature, 'useAddressCounter.signature这是签名信息')
      console.log(useAddressCounter.userBTCAddress, 'useAddressCounter.userBTCAddress这是userBTCAddress')
      // console.log(useAddressCounter.walletPubKeyHex, 'useAddressCounter.userBTCAddress这是walletPubKeyHex')
      // console.log(useAddressCounter.sessionKey, 'useAddressCounter.userBTCAddress这是sessionKey')

      // 登录请求
      // const loginResult = await actor.siwb_login(useAddressCounter.signature, useAddressCounter.userBTCAddress, useAddressCounter.walletPubKeyHex, useAddressCounter.sessionKey, { ECDSA: null })
      // const loginInfo = loginResult.Ok
      // const userCanisterPubkeyDer = loginInfo.user_canister_pubkey

      // 获取代理登录信息
      // const delegationResult = await actor.siwb_get_delegation(useAddressCounter.userBTCAddress, useAddressCounter.sessionKey, loginInfo.expiration)

      // 从代理链获取最终生成的身份
      // const delegationChain = createDelegationChainFromGetResult(delegationResult.Ok, userCanisterPubkeyDer)
      // localStorage.setItem('delegationChain', JSON.stringify(delegationChain.toJSON()))
      
      //调取后端登录方法
      let obj = {
        wallet_address: btcAddress,
        signature: signature2,
        nonce: getnonce.data.nonce,
        referral_code: ""
      }
      let setlogin = await userApi.authlogin(obj);
      if(setlogin.is_succeed){  
        // 保存用户信息
        localStorage.setItem('USERINFO', JSON.stringify(setlogin.data));
        await useAddressCounter.setuserinfom(setlogin.data)
        //保存token
        storage.setToken(setlogin.data.jwt);
      }
      // 调用 BTCCharge 方法
      // await BTCCharge()
    } catch (err) {
      console.error('登录失败或调用合约失败:', err)
    }
  }
  //创建BTC重提合约
  const BTCCharge = async () => {
    const arrsdf = JSON.parse(localStorage.getItem('edIdentity'))
    const identityRestored = Ed25519KeyIdentity.fromParsedJson(arrsdf)
    // console.log(useAddressCounter.signature, '(useAddressCounter.signature')
    // console.log(useAddressCounter.userBTCAddress, '(useAddressCounter.userBTCAddress')
    // console.log(useAddressCounter.walletPubKeyHex, '(useAddressCounter.walletPubKeyHex')
    // console.log(useAddressCounter.sessionKey, '(useAddressCounter.sessionKey')
    // console.log(identityRestored, 'identityRestored')

    // 2. 恢复代理链
    const chainObj = JSON.parse(localStorage.getItem('delegationChain'))
    const getdelegationChain = DelegationChain.fromJSON(chainObj)

    const finalIdentity = DelegationIdentity.fromDelegation(identityRestored, getdelegationChain)
    console.log(finalIdentity.getPrincipal().toString(), 'finalIdentity.getPrincipal().toString()')

    useAddressCounter.setUserPrincipal(finalIdentity.getPrincipal().toString())
    // 创建带身份的 HttpAgent
    const agent = new HttpAgent({
      identity: finalIdentity, // 使用 finalIdentity
      host: 'https://ic0.app', // ICP 主网地址
    })
    // 创建合约 Actor
    const contractActor = Actor.createActor(idlFactoryBTC, {
      agent, // 使用带身份的 HttpAgent
      canisterId: '6zoo4-rqaaa-aaaar-qbsta-cai', // 替换为具体的 Canister ID
    })
    // 如果是开发环境，执行 fetchRootKey（生产环境不需要）
    if (process.env.NODE_ENV === 'development') {
      await agent.fetchRootKey()
    }
    //  // 调用合约方法
    // const balance = await contractActor.whoami()
    // console.log('用户余额:', balance.toString())
    // 使用传递的middlePubkeyDer来构建委托链
    return contractActor
  }
  //创建模式合约
  const ModelContract = async () => {
    const arrsdf = JSON.parse(localStorage.getItem('edIdentity'))
    const identityRestored = Ed25519KeyIdentity.fromParsedJson(arrsdf)
    // 2. 恢复代理链
    const chainObj = JSON.parse(localStorage.getItem('delegationChain'))
    const getdelegationChain = DelegationChain.fromJSON(chainObj)

    const finalIdentity = DelegationIdentity.fromDelegation(identityRestored, getdelegationChain)
    // console.log(finalIdentity.getPrincipal().toString(), 'finalIdentity.getPrincipal().toString()')

    useAddressCounter.setUserPrincipal(finalIdentity.getPrincipal().toString())
    // 创建带身份的 HttpAgent
    const agent = new HttpAgent({
      identity: finalIdentity, // 使用 finalIdentity
      host: 'https://ic0.app', // ICP 主网地址
    })

    // 创建合约 Actor
    const ModelContractActor = Actor.createActor(ModelContractidlFactory, {
      agent, // 使用带身份的 HttpAgent
      canisterId: 'a4sqt-paaaa-aaaab-qb24a-cai', // 替换为具体的 Canister ID
    })
    // 如果是开发环境，执行 fetchRootKey（生产环境不需要）
    if (process.env.NODE_ENV === 'development') {
      await agent.fetchRootKey()
    }
    //  // 调用合约方法
    // const balance = await contractActor.whoami()
    // console.log('用户余额:', balance.toString())
    // 使用传递的middlePubkeyDer来构建委托链
    return ModelContractActor
  }
  //通用代币合约
  const TokenIDR = async (canisterId) => {
    const arrsdf = JSON.parse(localStorage.getItem('edIdentity'))
    const identityRestored = Ed25519KeyIdentity.fromParsedJson(arrsdf)
    // 2. 恢复代理链
    const chainObj = JSON.parse(localStorage.getItem('delegationChain'))
    const getdelegationChain = DelegationChain.fromJSON(chainObj)

    const finalIdentity = DelegationIdentity.fromDelegation(identityRestored, getdelegationChain)

    useAddressCounter.setUserPrincipal(finalIdentity.getPrincipal().toString())
    // 创建带身份的 HttpAgent
    const agent = new HttpAgent({
      identity: finalIdentity, // 使用 finalIdentity
      host: 'https://ic0.app', // ICP 主网地址
    })
    // 创建合约 Actor
    const TokenIDRActor = Actor.createActor(TokenIDRS, {
      agent, // 使用带身份的 HttpAgent
      canisterId: canisterId, // 替换为具体的 Canister ID
    })
    // 如果是开发环境，执行 fetchRootKey（生产环境不需要）
    if (process.env.NODE_ENV === 'development') {
      await agent.fetchRootKey()
    }
    return TokenIDRActor
  }
    // 检测并获取钱包实例
  const getWalletInstance = () => {
    if (window.unisat) return window.unisat // UniSat 钱包
    if (window.okxwallet) return window.okxwallet.bitcoin // OKX 钱包的 Bitcoin 模块
    if (window.TokenPocketProvider) return window.TokenPocketProvider // TP 钱包
    throw new Error('请安装 UniSat、OKX 或 TP 钱包后重试！')
  }

  // 获取用户的比特币地址
  const getBitcoinAddress = async (wallet) => {
    try {
      const accounts = await wallet.requestAccounts() // 获取账户
      if (!accounts || accounts.length === 0) throw new Error('未获取到有效的比特币地址')
      return accounts[0] // 返回用户的比特币地址
    } catch (err) {
      console.error('获取比特币地址失败:', err)
      throw err
    }
  }
  // 发起转账
  const transferBTC = async ({ toAddress, amountBTC, feeRate }) => {
    try {
      const wallet = getWalletInstance() // 获取钱包实例
      console.log(wallet,'wallet');
      
      // 获取用户地址
      const fromAddress = await getBitcoinAddress(wallet)
      console.log('用户地址:', fromAddress)

      // 检查接收地址
      if (!toAddress || typeof toAddress !== 'string') {
        throw new Error('无效的接收地址')
      }

      if (!amountBTC || isNaN(amountBTC) || amountBTC <= 0) {
        throw new Error('无效的转账金额')
      }

      // 构造转账参数
      const transferParams = {
        to: toAddress, // 接收地址
        amount: Math.round(amountBTC * 1e8), // 转换为 Satoshi
        feeRate: feeRate || 10, // 可选，矿工费率（单位：Satoshi/字节）
      }

      console.log('转账参数:', transferParams)

      // 发起转账
      const txHash = await wallet.sendBitcoin(transferParams.to,transferParams.amount)
      console.log('交易哈希:', txHash)
      console.log(`转账成功！交易哈希: ${txHash}`);

      return txHash
    } catch (err) {
      console.error('转账失败:', err)
      console.log(`转账失败: ${err.message}`);
      
      throw err
    }
  }

  // Satoshi 转换为 BTC
  const satoshiToBTC = (satoshi, decimals = 6) => {
    return (Number(satoshi) / 100000000).toFixed(decimals) // 默认保留 8 位小数
  }
  // BTC 转换为 Satoshi
  const btcToSatoshi = (btc) => {
    return BigInt(Math.round(btc * 100000000)) // 转换为 BigInt 类型
  }
  //保留小数后六位
  const getSixDecimalPlaces = (value) => {
    if (value === undefined || value === null || isNaN(value)) {
      console.error('Invalid input: value is undefined, null, or not a number')
      return '' // 返回空字符串
    }
    const strValue = value.toString() // 将输入值转换为字符串
    const match = strValue.match(/^(\d+)(\.\d{0,2})?/) // 使用正则匹配整数部分和小数点后最多6位
    return match ? match[0] : '' // 返回匹配到的部分
  }
  return {
    account,
    captionAccount,
    lpCoin,
    allowance,
    leaderAddress,
    TokenIDR,
    contractLogin,
    BTCCharge,
    satoshiToBTC,
    transferBTC,
    btcToSatoshi,
    ModelContract,
    getSixDecimalPlaces,
    formatStringWithPlaceholder,
  }
}
