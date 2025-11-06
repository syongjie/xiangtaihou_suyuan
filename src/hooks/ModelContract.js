export const ModelContractidlFactory = ({ IDL }) => {
  const Result_19 = IDL.Variant({
    'ok' : IDL.Record({
      'lpTokens' : IDL.Nat,
      'tokensUsed' : IDL.Nat,
      'btcUsed' : IDL.Nat,
    }),
    'err' : IDL.Text,
  });
  const Result_18 = IDL.Variant({
    'ok' : IDL.Record({
      'tokenCanisterId' : IDL.Principal,
      'mintedAmount' : IDL.Nat,
    }),
    'err' : IDL.Text,
  });
  const Result_3 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const CreateTokenArgs = IDL.Record({
    'name' : IDL.Text,
    'description' : IDL.Opt(IDL.Text),
    'singleMintAmount' : IDL.Opt(IDL.Nat),
    'iconUrl' : IDL.Opt(IDL.Text),
    'symbol' : IDL.Text,
  });
  const Result_17 = IDL.Variant({ 'ok' : IDL.Principal, 'err' : IDL.Text });
  const Result_16 = IDL.Variant({
    'ok' : IDL.Vec(
      IDL.Record({ 'tokenCid' : IDL.Principal, 'recoveredCycles' : IDL.Nat })
    ),
    'err' : IDL.Text,
  });
  const Result_15 = IDL.Variant({
    'ok' : IDL.Record({
      'tokenCid' : IDL.Principal,
      'recoveredCycles' : IDL.Nat,
    }),
    'err' : IDL.Text,
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Result_14 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat)),
    'err' : IDL.Text,
  });
  const Time = IDL.Int;
  const LiquidityPool = IDL.Record({
    'tokenReserve' : IDL.Nat,
    'totalLPTokens' : IDL.Nat,
    'tokenCid' : IDL.Principal,
    'createdAt' : Time,
    'lastUpdated' : Time,
    'tokenFeesPaid' : IDL.Nat,
    'sellTxCount' : IDL.Nat,
    'volume' : IDL.Nat,
    'btcReserve' : IDL.Nat,
    'buyTxCount' : IDL.Nat,
    'btcFeesPaid' : IDL.Nat,
  });
  const Result_13 = IDL.Variant({ 'ok' : IDL.Float64, 'err' : IDL.Text });
  const AmmTransactionType = IDL.Variant({
    'AddLiquidity' : IDL.Null,
    'SwapTokenToBtc' : IDL.Null,
    'SwapBtcToToken' : IDL.Null,
    'RemoveLiquidity' : IDL.Null,
  });
  const AmmTradeRecord = IDL.Record({
    'id' : IDL.Nat,
    'lpTokens' : IDL.Opt(IDL.Nat),
    'tradeType' : AmmTransactionType,
    'tokenCid' : IDL.Principal,
    'trader' : IDL.Principal,
    'tokenAmount' : IDL.Nat,
    'timestamp' : Time,
    'price' : IDL.Float64,
    'btcAmount' : IDL.Nat,
  });
  const PaginationResult_4 = IDL.Record({
    'total' : IDL.Nat,
    'offset' : IDL.Nat,
    'limit' : IDL.Nat,
    'items' : IDL.Vec(AmmTradeRecord),
  });
  const Candle = IDL.Record({
    'low' : IDL.Float64,
    'high' : IDL.Float64,
    'close' : IDL.Float64,
    'open' : IDL.Float64,
    'time' : IDL.Nat,
    'volume' : IDL.Nat,
  });
  const Result_12 = IDL.Variant({ 'ok' : IDL.Vec(Candle), 'err' : IDL.Text });
  const LPTokenHolder = IDL.Record({
    'lpTokens' : IDL.Nat,
    'user' : IDL.Principal,
  });
  const PaginationResult_5 = IDL.Record({
    'total' : IDL.Nat,
    'offset' : IDL.Nat,
    'limit' : IDL.Nat,
    'items' : IDL.Vec(LPTokenHolder),
  });
  const Result_11 = IDL.Variant({
    'ok' : PaginationResult_5,
    'err' : IDL.Text,
  });
  const Result_10 = IDL.Variant({
    'ok' : IDL.Record({
      'cityFee' : IDL.Nat,
      'feeReceiver' : IDL.Principal,
      'bridgeManager' : IDL.Principal,
      'platformCoinName' : IDL.Text,
      'createTokenCycles' : IDL.Nat,
      'ckBtcConverter' : IDL.Principal,
      'launchFee' : IDL.Nat,
    }),
    'err' : IDL.Text,
  });
  const TokenHolder = IDL.Record({
    'balance' : IDL.Nat,
    'user' : IDL.Principal,
  });
  const PaginationResult_3 = IDL.Record({
    'total' : IDL.Nat,
    'offset' : IDL.Nat,
    'limit' : IDL.Nat,
    'items' : IDL.Vec(TokenHolder),
  });
  const Result_9 = IDL.Variant({ 'ok' : PaginationResult_3, 'err' : IDL.Text });
  const Subaccount = IDL.Vec(IDL.Nat8);
  const Account = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(Subaccount),
  });
  const TokenType = IDL.Variant({
    'SRC20' : IDL.Null,
    'ICRC' : IDL.Null,
    'BRC20' : IDL.Null,
  });
  const TokenState = IDL.Variant({
    'Disabled' : IDL.Null,
    'Trading' : IDL.Null,
    'Funding' : IDL.Null,
  });
  const TokenInfo = IDL.Record({
    'id' : IDL.Nat,
    'fee' : IDL.Nat,
    'creator' : IDL.Principal,
    'decimals' : IDL.Nat8,
    'minting_account' : IDL.Opt(Account),
    'name' : IDL.Text,
    'collateral' : IDL.Nat,
    'description' : IDL.Opt(IDL.Text),
    'min_burn_amount' : IDL.Nat,
    'max_supply' : IDL.Nat,
    'tokenType' : IDL.Opt(TokenType),
    'iconUrl' : IDL.Opt(IDL.Text),
    'created_time' : Time,
    'symbol' : IDL.Text,
    'canisterId' : IDL.Principal,
    'tokenState' : TokenState,
  });
  const TokenInfoExtended = IDL.Record({
    'tradingVolume' : IDL.Nat,
    'marketcap' : IDL.Nat,
    'sellTxCount' : IDL.Nat,
    'price1h' : IDL.Float64,
    'price5m' : IDL.Float64,
    'price6h' : IDL.Float64,
    'buyTxCount' : IDL.Nat,
    'tokenInfo' : TokenInfo,
    'price' : IDL.Float64,
    'price24h' : IDL.Float64,
    'fundingPercent' : IDL.Float64,
    'holderCount' : IDL.Nat,
  });
  const PaginationResult = IDL.Record({
    'total' : IDL.Nat,
    'offset' : IDL.Nat,
    'limit' : IDL.Nat,
    'items' : IDL.Vec(TokenInfoExtended),
  });
  const TradeType = IDL.Variant({ 'Buy' : IDL.Null, 'Sell' : IDL.Null });
  const TradeRecord = IDL.Record({
    'id' : IDL.Nat,
    'tradeType' : TradeType,
    'tokenCid' : IDL.Principal,
    'trader' : IDL.Principal,
    'tokenAmount' : IDL.Nat,
    'timestamp' : Time,
    'price' : IDL.Float64,
    'btcAmount' : IDL.Nat,
  });
  const PaginationResult_1 = IDL.Record({
    'total' : IDL.Nat,
    'offset' : IDL.Nat,
    'limit' : IDL.Nat,
    'items' : IDL.Vec(TradeRecord),
  });
  const UserTokenBalance = IDL.Record({
    'balance' : IDL.Nat,
    'tokenInfoExtended' : TokenInfoExtended,
  });
  const LiquidityPosition = IDL.Record({
    'feeEarningsTokens' : IDL.Nat,
    'lpTokens' : IDL.Nat,
    'providedBtc' : IDL.Nat,
    'sharePercent' : IDL.Float64,
    'tokenInfoExtended' : TokenInfoExtended,
    'feeEarningsBtc' : IDL.Nat,
    'providedTokens' : IDL.Nat,
  });
  const PaginationResult_2 = IDL.Record({
    'total' : IDL.Nat,
    'offset' : IDL.Nat,
    'limit' : IDL.Nat,
    'items' : IDL.Vec(LiquidityPosition),
  });
  const Result_8 = IDL.Variant({ 'ok' : PaginationResult_2, 'err' : IDL.Text });
  const Result_7 = IDL.Variant({
    'ok' : IDL.Record({
      'lpTokens' : IDL.Nat,
      'btcRequired' : IDL.Nat,
      'tokensRequired' : IDL.Nat,
    }),
    'err' : IDL.Text,
  });
  const Result_6 = IDL.Variant({
    'ok' : IDL.Record({
      'usdPrice' : IDL.Float64,
      'platformCoinAmount' : IDL.Nat,
      'btcPrice' : IDL.Float64,
      'platformCoinPrice' : IDL.Float64,
    }),
    'err' : IDL.Text,
  });
  const Result_5 = IDL.Variant({
    'ok' : IDL.Record({
      'btcOut' : IDL.Nat,
      'tokensOut' : IDL.Nat,
      'lpTokensBurned' : IDL.Nat,
    }),
    'err' : IDL.Text,
  });
  const Result_4 = IDL.Variant({
    'ok' : IDL.Record({ 'tokenAmount' : IDL.Nat, 'btcAmount' : IDL.Nat }),
    'err' : IDL.Text,
  });
  const Result_2 = IDL.Variant({ 'ok' : IDL.Bool, 'err' : IDL.Text });
  const Result = IDL.Variant({
    'ok' : IDL.Record({ 'cityFee' : IDL.Nat, 'launchFee' : IDL.Nat }),
    'err' : IDL.Text,
  });
  const TokenRegistry = IDL.Service({
    'addLiquidity' : IDL.Func(
        [
          IDL.Record({
            'tokenCid' : IDL.Principal,
            'minLpTokens' : IDL.Nat,
            'maxTokenAmount' : IDL.Nat,
            'btcAmount' : IDL.Nat,
          }),
        ],
        [Result_19],
        [],
      ),
    'bridgeBrc20Token' : IDL.Func(
        [
          IDL.Record({
            'ticker' : IDL.Text,
            'description' : IDL.Opt(IDL.Text),
            'tokenName' : IDL.Text,
            'recipientBlob' : IDL.Vec(IDL.Nat8),
            'amount' : IDL.Nat,
            'iconUrl' : IDL.Opt(IDL.Text),
          }),
        ],
        [Result_18],
        [],
      ),
    'bridgeInscriptionToken' : IDL.Func(
        [
          IDL.Record({
            'ticker' : IDL.Text,
            'recipient' : IDL.Principal,
            'description' : IDL.Opt(IDL.Text),
            'tokenName' : IDL.Text,
            'tokenType' : IDL.Text,
            'amount' : IDL.Nat,
            'iconUrl' : IDL.Opt(IDL.Text),
          }),
        ],
        [IDL.Nat],
        [],
      ),
    'burnPlatformCoinTokens' : IDL.Func(
        [IDL.Record({ 'usdValue' : IDL.Float64, 'cardID' : IDL.Text })],
        [Result_3],
        [],
      ),
    'buyToken' : IDL.Func(
        [IDL.Record({ 'tokenCid' : IDL.Principal, 'btcAmount' : IDL.Nat })],
        [Result_3],
        [],
      ),
    'calculateFee' : IDL.Func(
        [IDL.Record({ 'btcAmount' : IDL.Nat })],
        [IDL.Nat],
        ['query'],
      ),
    'createToken' : IDL.Func([CreateTokenArgs], [Result_17], []),
    'deleteAllTokens' : IDL.Func([], [Result_16], []),
    'deleteToken' : IDL.Func([IDL.Principal], [Result_15], []),
    'depositCyclesToThis' : IDL.Func([], [], []),
    'depositCyclesToToken' : IDL.Func(
        [IDL.Record({ 'tokenCid' : IDL.Principal, 'cyclesAmount' : IDL.Nat })],
        [Result_1],
        [],
      ),
    'getAllTokenCyclesBalance' : IDL.Func([], [Result_14], []),
    'getAmmFeeRates' : IDL.Func(
        [],
        [
          IDL.Record({
            'lpFeeRate' : IDL.Float64,
            'platformFeeRate' : IDL.Float64,
            'totalFeeRate' : IDL.Float64,
          }),
        ],
        ['query'],
      ),
    'getAmmPoolInfo' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(LiquidityPool)],
        ['query'],
      ),
    'getAmmPrice' : IDL.Func([IDL.Principal], [Result_13], ['query']),
    'getAmmTradeHistory' : IDL.Func(
        [
          IDL.Record({
            'tokenCid' : IDL.Principal,
            'offset' : IDL.Opt(IDL.Nat),
            'limit' : IDL.Opt(IDL.Nat),
          }),
        ],
        [PaginationResult_4],
        ['query'],
      ),
    'getKlineData' : IDL.Func(
        [
          IDL.Record({
            'resolutionMinutes' : IDL.Nat,
            'tokenCid' : IDL.Principal,
            'last' : IDL.Nat,
          }),
        ],
        [Result_12],
        ['query'],
      ),
    'getLpTokenBalance' : IDL.Func(
        [IDL.Record({ 'tokenCid' : IDL.Principal, 'user' : IDL.Principal })],
        [IDL.Nat],
        ['query'],
      ),
    'getLpTokenHolders' : IDL.Func(
        [
          IDL.Record({
            'tokenCid' : IDL.Principal,
            'offset' : IDL.Opt(IDL.Nat),
            'limit' : IDL.Opt(IDL.Nat),
          }),
        ],
        [Result_11],
        ['query'],
      ),
    'getMinSwapAmounts' : IDL.Func(
        [IDL.Record({ 'tokenCid' : IDL.Principal })],
        [
          IDL.Record({
            'minTokenSwapAmount' : IDL.Nat,
            'minBtcSwapAmount' : IDL.Nat,
          }),
        ],
        ['query'],
      ),
    'getOwner' : IDL.Func([], [IDL.Principal], ['query']),
    'getParams' : IDL.Func([], [Result_10], ['query']),
    'getSwapTradeHistory' : IDL.Func(
        [
          IDL.Record({
            'tokenCid' : IDL.Principal,
            'offset' : IDL.Opt(IDL.Nat),
            'limit' : IDL.Opt(IDL.Nat),
          }),
        ],
        [PaginationResult_4],
        ['query'],
      ),
    'getThisCyclesBalance' : IDL.Func([], [IDL.Nat], ['query']),
    'getTokenCIDById' : IDL.Func(
        [IDL.Record({ 'id' : IDL.Nat })],
        [IDL.Opt(IDL.Principal)],
        ['query'],
      ),
    'getTokenFundingPercent' : IDL.Func(
        [IDL.Record({ 'tokenCid' : IDL.Principal })],
        [IDL.Float64],
        ['query'],
      ),
    'getTokenHolderCount' : IDL.Func(
        [IDL.Record({ 'tokenCid' : IDL.Principal })],
        [IDL.Nat],
        ['query'],
      ),
    'getTokenHolders' : IDL.Func(
        [
          IDL.Record({
            'tokenCid' : IDL.Principal,
            'offset' : IDL.Opt(IDL.Nat),
            'limit' : IDL.Opt(IDL.Nat),
          }),
        ],
        [Result_9],
        ['query'],
      ),
    'getTokenInfoByCID' : IDL.Func(
        [IDL.Record({ 'cid' : IDL.Principal })],
        [IDL.Opt(TokenInfo)],
        ['query'],
      ),
    'getTokenInfoExtendedByCID' : IDL.Func(
        [IDL.Record({ 'cid' : IDL.Principal })],
        [IDL.Opt(TokenInfoExtended)],
        ['query'],
      ),
    'getTokenList' : IDL.Func(
        [
          IDL.Opt(
            IDL.Record({
              'sortDirection' : IDL.Opt(
                IDL.Variant({ 'asc' : IDL.Null, 'desc' : IDL.Null })
              ),
              'sortBy' : IDL.Opt(
                IDL.Variant({
                  'marketcap' : IDL.Null,
                  'volume' : IDL.Null,
                  'createdTime' : IDL.Null,
                  'price1h' : IDL.Null,
                  'price5m' : IDL.Null,
                  'price6h' : IDL.Null,
                  'txCount' : IDL.Null,
                  'price24h' : IDL.Null,
                })
              ),
              'offset' : IDL.Opt(IDL.Nat),
              'limit' : IDL.Opt(IDL.Nat),
            })
          ),
        ],
        [PaginationResult],
        ['query'],
      ),
    'getTokenTradeHistory' : IDL.Func(
        [
          IDL.Record({
            'tokenCid' : IDL.Principal,
            'offset' : IDL.Opt(IDL.Nat),
            'limit' : IDL.Opt(IDL.Nat),
          }),
        ],
        [PaginationResult_1],
        ['query'],
      ),
    'getTotalBtcPlatformFees' : IDL.Func([], [IDL.Nat], ['query']),
    'getTotalTokenPlatformFees' : IDL.Func([], [IDL.Nat], ['query']),
    'getTradingTokenList' : IDL.Func(
        [],
        [IDL.Vec(TokenInfoExtended)],
        ['query'],
      ),
    'getUserAllTokenBalances' : IDL.Func(
        [IDL.Record({ 'user' : IDL.Opt(IDL.Principal) })],
        [IDL.Vec(UserTokenBalance)],
        ['composite_query'],
      ),
    'getUserCreatedTokenList' : IDL.Func(
        [IDL.Record({ 'user' : IDL.Principal })],
        [IDL.Vec(TokenInfoExtended)],
        ['query'],
      ),
    'getUserFavoriteTokens' : IDL.Func(
        [IDL.Record({ 'user' : IDL.Opt(IDL.Principal) })],
        [IDL.Vec(TokenInfoExtended)],
        ['query'],
      ),
    'getUserLiquidityPositions' : IDL.Func(
        [
          IDL.Record({
            'user' : IDL.Principal,
            'offset' : IDL.Opt(IDL.Nat),
            'limit' : IDL.Opt(IDL.Nat),
          }),
        ],
        [Result_8],
        ['query'],
      ),
    'getUserTokenBalance' : IDL.Func(
        [
          IDL.Record({
            'tokenCid' : IDL.Principal,
            'user' : IDL.Opt(IDL.Principal),
          }),
        ],
        [IDL.Nat],
        ['composite_query'],
      ),
    'getUserTradeHistory' : IDL.Func(
        [
          IDL.Record({
            'user' : IDL.Principal,
            'offset' : IDL.Opt(IDL.Nat),
            'limit' : IDL.Opt(IDL.Nat),
          }),
        ],
        [PaginationResult_1],
        ['query'],
      ),
    'hasUserFavoritedToken' : IDL.Func(
        [
          IDL.Record({
            'tokenCid' : IDL.Principal,
            'user' : IDL.Opt(IDL.Principal),
          }),
        ],
        [IDL.Bool],
        ['query'],
      ),
    'isCardActivated' : IDL.Func(
        [IDL.Record({ 'cardID' : IDL.Text })],
        [IDL.Bool],
        ['query'],
      ),
    'isTokenNameExists' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'mintPlatformCoin' : IDL.Func(
        [IDL.Record({ 'user' : IDL.Principal, 'amount' : IDL.Nat })],
        [Result_3],
        [],
      ),
    'previewAddLiquidity' : IDL.Func(
        [
          IDL.Record({
            'tokenCid' : IDL.Principal,
            'tokenAmount' : IDL.Opt(IDL.Nat),
            'btcAmount' : IDL.Opt(IDL.Nat),
          }),
        ],
        [Result_7],
        ['query'],
      ),
    'previewBurnPlatformCoinTokens' : IDL.Func(
        [IDL.Record({ 'usdValue' : IDL.Float64 })],
        [Result_6],
        [],
      ),
    'previewBuyTokenOutput' : IDL.Func(
        [
          IDL.Record({
            'tokenCid' : IDL.Principal,
            'totalBtcAmount' : IDL.Nat,
          }),
        ],
        [IDL.Nat],
        ['query'],
      ),
    'previewRemoveLiquidity' : IDL.Func(
        [IDL.Record({ 'lpTokens' : IDL.Nat, 'tokenCid' : IDL.Principal })],
        [Result_5],
        ['query'],
      ),
    'previewSwapBtcToToken' : IDL.Func(
        [IDL.Record({ 'tokenCid' : IDL.Principal, 'btcAmount' : IDL.Nat })],
        [Result_3],
        ['query'],
      ),
    'previewSwapTokenToBtc' : IDL.Func(
        [IDL.Record({ 'tokenCid' : IDL.Principal, 'tokenAmount' : IDL.Nat })],
        [Result_3],
        ['query'],
      ),
    'removeLiquidity' : IDL.Func(
        [
          IDL.Record({
            'lpTokens' : IDL.Nat,
            'tokenCid' : IDL.Principal,
            'minBtcOut' : IDL.Nat,
            'minTokensOut' : IDL.Nat,
          }),
        ],
        [Result_4],
        [],
      ),
    'searchTokens' : IDL.Func(
        [
          IDL.Record({
            'offset' : IDL.Opt(IDL.Nat),
            'limit' : IDL.Opt(IDL.Nat),
            'searchQuery' : IDL.Text,
          }),
        ],
        [PaginationResult],
        ['query'],
      ),
    'setAmmFeeRates' : IDL.Func(
        [
          IDL.Record({
            'lpFeeRate' : IDL.Opt(IDL.Float64),
            'platformFeeRate' : IDL.Opt(IDL.Float64),
            'totalFeeRate' : IDL.Opt(IDL.Float64),
          }),
        ],
        [Result_1],
        [],
      ),
    'setParams' : IDL.Func(
        [
          IDL.Record({
            'cityFee' : IDL.Opt(IDL.Nat),
            'feeReceiver' : IDL.Opt(IDL.Principal),
            'bridgeManager' : IDL.Opt(IDL.Principal),
            'platformCoinName' : IDL.Opt(IDL.Text),
            'createTokenCycles' : IDL.Opt(IDL.Nat),
            'ckBtcConverter' : IDL.Opt(IDL.Principal),
            'launchFee' : IDL.Opt(IDL.Nat),
          }),
        ],
        [Result_1],
        [],
      ),
    'swapBtcToToken' : IDL.Func(
        [
          IDL.Record({
            'tokenCid' : IDL.Principal,
            'btcAmount' : IDL.Nat,
            'minTokensOut' : IDL.Nat,
          }),
        ],
        [Result_3],
        [],
      ),
    'swapTokenToBtc' : IDL.Func(
        [
          IDL.Record({
            'tokenCid' : IDL.Principal,
            'tokenAmount' : IDL.Nat,
            'minBtcOut' : IDL.Nat,
          }),
        ],
        [Result_3],
        [],
      ),
    'toggleFavoriteToken' : IDL.Func([IDL.Principal], [Result_2], []),
    'transferOwnership' : IDL.Func(
        [IDL.Record({ 'newOwner' : IDL.Principal })],
        [Result_1],
        [],
      ),
    'validateCreateParams' : IDL.Func([CreateTokenArgs], [Result], ['query']),
  });
  return TokenRegistry;
};
export const init = ({ IDL }) => {
  return [
    IDL.Record({
      'cityFee' : IDL.Nat,
      'feeReceiver' : IDL.Principal,
      'owner' : IDL.Principal,
      'bridgeManager' : IDL.Principal,
      'ckBtcConverter' : IDL.Principal,
      'launchFee' : IDL.Nat,
    }),
  ];
};
