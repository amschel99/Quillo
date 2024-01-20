export const idlFactory = ({ IDL }) => {
  const MultiplierData = IDL.Record({
    'growth_prospects' : IDL.Float64,
    'comparable_transactions' : IDL.Float64,
    'risk_factors' : IDL.Float64,
    'industry_comparables' : IDL.Float64,
    'market_conditions' : IDL.Float64,
  });
  const EarningsData = IDL.Record({
    'ebitda' : IDL.Float64,
    'adjustments' : IDL.Float64,
    'consistency' : IDL.Bool,
    'net_income' : IDL.Float64,
  });
  const CompanyInformation = IDL.Record({
    'id' : IDL.Nat64,
    'multiplier' : MultiplierData,
    'initial_tokens' : IDL.Opt(IDL.Float64),
    'shares_public_percent' : IDL.Float64,
    'logo' : IDL.Vec(IDL.Nat8),
    'name' : IDL.Text,
    'registration_number' : IDL.Text,
    'valuation' : IDL.Float64,
    'earnings' : EarningsData,
    'token_value' : IDL.Float64,
    'token_balance' : IDL.Opt(IDL.Float64),
    'industry_sector' : IDL.Text,
    'legal_address' : IDL.Text,
  });
  const Share = IDL.Record({
    'company' : CompanyInformation,
    'quantity' : IDL.Nat64,
  });
  const Investor = IDL.Record({
    'id' : IDL.Nat64,
    'shares' : IDL.Opt(IDL.Vec(Share)),
  });
  const Error = IDL.Variant({ 'NotFound' : IDL.Record({ 'msg' : IDL.Text }) });
  const Result = IDL.Variant({
    'Ok' : IDL.Vec(IDL.Tuple(IDL.Nat64, CompanyInformation)),
    'Err' : Error,
  });
  const Result_1 = IDL.Variant({ 'Ok' : CompanyInformation, 'Err' : Error });
  return IDL.Service({
    'add_company' : IDL.Func(
        [CompanyInformation],
        [IDL.Opt(CompanyInformation)],
        [],
      ),
    'add_investor' : IDL.Func([Investor], [IDL.Opt(Investor)], []),
    'get_companies' : IDL.Func([], [Result], ['query']),
    'get_company' : IDL.Func([IDL.Nat64], [Result_1], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
