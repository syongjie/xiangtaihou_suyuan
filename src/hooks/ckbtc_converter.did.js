export const idlFactoryBTC = ({ IDL }) => {
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
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : Error });
  const Result_6 = IDL.Variant({ 'ok' : IDL.Nat, 'err' : Error });
  const ConvertArgs = IDL.Record({
    'amount' : IDL.Nat64,
    'btc_address' : IDL.Text,
  });
  const Deposit = IDL.Record({ 'timestamp' : IDL.Nat, 'amount' : IDL.Nat });
  const Income = IDL.Record({
    'from' : IDL.Principal,
    'timestamp' : IDL.Nat,
    'amount' : IDL.Nat,
  });
  const NodeStats = IDL.Record({
    'totalIncome' : IDL.Nat,
    'totalPerformance' : IDL.Nat,
  });
  const BitcoinAddress = IDL.Text;
  const Result_4 = IDL.Variant({ 'ok' : BitcoinAddress, 'err' : Error });
  const Result_5 = IDL.Variant({ 'ok' : IDL.Vec(IDL.Text), 'err' : Error });
  const Result_3 = IDL.Variant({ 'ok' : IDL.Nat64, 'err' : Error });
  const Utxo = IDL.Record({
    'height' : IDL.Nat32,
    'value' : IDL.Nat64,
    'outpoint' : IDL.Record({ 'txid' : IDL.Vec(IDL.Nat8), 'vout' : IDL.Nat32 }),
  });
  const Result_2 = IDL.Variant({ 'ok' : IDL.Vec(Utxo), 'err' : Error });
  const TimerId = IDL.Nat;
  const Result_1 = IDL.Variant({ 'ok' : IDL.Bool, 'err' : Error });
  const BtcRich = IDL.Service({
    'bind_invite_code' : IDL.Func([IDL.Text], [Result], []),
    'check_ckbtc_balance' : IDL.Func(
        [IDL.Opt(IDL.Principal)],
        [Result_6],
        ['composite_query'],
      ),
    'convert_ckbtc_to_btc' : IDL.Func([ConvertArgs], [Result], []),
    'emergency_withdraw_all_ckbtc' : IDL.Func([], [Result], []),
    'getAllDepositHistory' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(Deposit)))],
        ['query'],
      ),
    'getAllIncomeHistory' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(Income)))],
        ['query'],
      ),
    'getAllInvitedUsers' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(IDL.Principal)))],
        ['query'],
      ),
    'getAllNodeStats' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, NodeStats))],
        ['query'],
      ),
    'getOwner' : IDL.Func([], [IDL.Principal], ['query']),
    'get_DIVIDEND_RATES' : IDL.Func([], [IDL.Vec(IDL.Nat)], ['query']),
    'get_NODE_PRICE' : IDL.Func([], [IDL.Nat], ['query']),
    'get_btc_deposit_address' : IDL.Func(
        [IDL.Opt(IDL.Principal)],
        [Result_4],
        [],
      ),
    'get_btc_transfer_history' : IDL.Func([], [Result_5], ['query']),
    'get_cached_address' : IDL.Func(
        [IDL.Opt(IDL.Principal)],
        [Result_4],
        ['query'],
      ),
    'get_conversion_fee' : IDL.Func([IDL.Nat64], [Result_3], []),
    'get_known_utxos' : IDL.Func(
        [IDL.Opt(IDL.Principal)],
        [Result_2],
        ['composite_query'],
      ),
    'get_my_invite_code' : IDL.Func([], [Result], ['query']),
    'get_my_invited_users' : IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'get_my_inviter' : IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
    'get_node_count' : IDL.Func([], [IDL.Nat], ['query']),
    'get_node_info' : IDL.Func(
        [],
        [
          IDL.Record({
            'directInviteesCount' : IDL.Nat,
            'totalIncome' : IDL.Nat,
            'totalPerformance' : IDL.Nat,
          }),
        ],
        ['query'],
      ),
    'get_params' : IDL.Func(
        [],
        [
          IDL.Record({
            'ledgerCanisterId' : IDL.Principal,
            'owner' : IDL.Principal,
            'minterCanisterId' : IDL.Principal,
            'nodeFeeReceiver' : IDL.Principal,
            'dividendRates' : IDL.Vec(IDL.Nat),
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
    'get_top_level_invite_code' : IDL.Func([], [IDL.Text], ['query']),
    'initialize_timer' : IDL.Func([], [Result], []),
    'is_user_registered' : IDL.Func([IDL.Principal], [IDL.Bool], ['query']),
    'manual_update_all_balances' : IDL.Func([], [Result], []),
    'record_btc_transfer' : IDL.Func([IDL.Text], [Result_1], []),
    'set_DIVIDEND_RATES' : IDL.Func([IDL.Vec(IDL.Nat)], [Result], []),
    'set_NODE_PRICE' : IDL.Func([IDL.Nat], [Result], []),
    'set_params' : IDL.Func(
        [
          IDL.Record({
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
    'update_ckbtc_balance' : IDL.Func([], [Result], []),
    'whoami' : IDL.Func([], [IDL.Principal], ['query']),
  });
  return BtcRich;
};
export const init = ({ IDL }) => {
  return [
    IDL.Record({
      'ledgerCanisterId' : IDL.Principal,
      'owner' : IDL.Principal,
      'updateIntervalSeconds' : IDL.Opt(IDL.Nat),
      'minterCanisterId' : IDL.Principal,
      'nodeFeeReceiver' : IDL.Principal,
    }),
  ];
};
