export const idlFactory = ({ IDL }) => {
  const Error = IDL.Variant({
    'InvalidAmount' : IDL.Null,
    'TemporarilyUnavailable' : IDL.Null,
    'AlreadyProcessed' : IDL.Null,
    'TransactionFailed' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'Other' : IDL.Text,
    'AddressNotFound' : IDL.Null,
    'InProgress' : IDL.Null,
    'InsufficientFunds' : IDL.Null,
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : Error });
  const ConvertArgs = IDL.Record({
    'amount' : IDL.Nat64,
    'btc_address' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : Error });
  const BitcoinAddress = IDL.Text;
  const Result_5 = IDL.Variant({ 'ok' : BitcoinAddress, 'err' : Error });
  const Result_4 = IDL.Variant({ 'ok' : IDL.Nat64, 'err' : Error });
  const Utxo = IDL.Record({
    'height' : IDL.Nat32,
    'value' : IDL.Nat64,
    'outpoint' : IDL.Record({ 'txid' : IDL.Vec(IDL.Nat8), 'vout' : IDL.Nat32 }),
  });
  const Result_3 = IDL.Variant({ 'ok' : IDL.Vec(Utxo), 'err' : Error });
  const TimerId = IDL.Nat;
  const GetUserInfoArgs = IDL.Record({ 'principal' : IDL.Opt(IDL.Principal) });
  const Account = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const UserInfo = IDL.Record({
    'account' : Account,
    'ckbtc_balance' : IDL.Nat,
    'btc_address' : IDL.Text,
  });
  const Result_2 = IDL.Variant({ 'ok' : UserInfo, 'err' : Error });
  const TransferBetweenSubaccountsArgs = IDL.Record({
    'to' : IDL.Principal,
    'from' : IDL.Principal,
    'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'amount' : IDL.Nat,
  });
  const TransferCkbtcArgs = IDL.Record({
    'to' : Account,
    'from' : IDL.Principal,
    'memo' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'amount' : IDL.Nat,
  });
  const CkBtcConverter = IDL.Service({
    'check_ckbtc_balance' : IDL.Func([IDL.Opt(IDL.Principal)], [Result_1], []),
    'convert_ckbtc_to_btc' : IDL.Func([ConvertArgs], [Result], []),
    'emergency_withdraw_all_ckbtc' : IDL.Func([], [Result], []),
    'getOwner' : IDL.Func([], [IDL.Principal], ['query']),
    'get_btc_deposit_address' : IDL.Func(
        [IDL.Opt(IDL.Principal)],
        [Result_5],
        [],
      ),
    'get_cached_address' : IDL.Func(
        [IDL.Principal],
        [IDL.Opt(BitcoinAddress)],
        ['query'],
      ),
    'get_conversion_fee' : IDL.Func([IDL.Nat64], [Result_4], []),
    'get_deposit_fee' : IDL.Func([], [Result_4], []),
    'get_known_utxos' : IDL.Func([IDL.Opt(IDL.Principal)], [Result_3], []),
    'get_params' : IDL.Func(
        [],
        [
          IDL.Record({
            'tokenRegistryCanisterId' : IDL.Principal,
            'ledgerCanisterId' : IDL.Principal,
            'minterCanisterId' : IDL.Principal,
          }),
        ],
        ['query'],
      ),
    'get_registered_users_count' : IDL.Func([], [IDL.Nat], ['query']),
    'get_timer_status' : IDL.Func(
        [],
        [
          IDL.Record({
            'currentIntervalSeconds' : IDL.Opt(IDL.Nat),
            'timerId' : IDL.Opt(TimerId),
            'isRunning' : IDL.Bool,
          }),
        ],
        ['query'],
      ),
    'get_user_info' : IDL.Func([GetUserInfoArgs], [Result_2], []),
    'initialize_timer' : IDL.Func([], [Result], []),
    'is_user_registered' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'manual_update_all_balances' : IDL.Func([], [Result], []),
    'set_params' : IDL.Func(
        [
          IDL.Record({
            'tokenRegistryCanisterId' : IDL.Opt(IDL.Principal),
            'ledgerCanisterId' : IDL.Opt(IDL.Principal),
            'minterCanisterId' : IDL.Opt(IDL.Principal),
          }),
        ],
        [Result],
        [],
      ),
    'start_periodic_balance_update' : IDL.Func([IDL.Nat], [Result], []),
    'stop_periodic_balance_update' : IDL.Func([], [Result], []),
    'transferOwnership' : IDL.Func([IDL.Principal], [Result], []),
    'transfer_between_subaccounts' : IDL.Func(
        [TransferBetweenSubaccountsArgs],
        [Result_1],
        [],
      ),
    'transfer_from_ckbtc' : IDL.Func([TransferCkbtcArgs], [Result_1], []),
    'update_ckbtc_balance' : IDL.Func([], [Result], []),
    'whoami' : IDL.Func([], [IDL.Principal], ['query']),
  });
  return CkBtcConverter;
};
export const init = ({ IDL }) => {
  return [
    IDL.Record({
      'tokenRegistryCanisterId' : IDL.Principal,
      'ledgerCanisterId' : IDL.Principal,
      'owner' : IDL.Principal,
      'updateIntervalSeconds' : IDL.Opt(IDL.Nat),
      'minterCanisterId' : IDL.Principal,
    }),
  ];
};
