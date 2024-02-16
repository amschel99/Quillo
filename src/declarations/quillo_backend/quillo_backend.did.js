export const idlFactory = ({ IDL }) => {
  const CancelOrderErr = IDL.Variant({
    'NotAllowed' : IDL.Null,
    'NotExistingOrder' : IDL.Null,
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Nat32, 'Err' : CancelOrderErr });
  const DepositErr = IDL.Variant({
    'TransferFailure' : IDL.Null,
    'BalanceLow' : IDL.Null,
  });
  const Result_1 = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : DepositErr });
  const Balance = IDL.Record({
    'token' : IDL.Principal,
    'owner' : IDL.Principal,
    'amount' : IDL.Nat,
  });
  const Order = IDL.Record({
    'id' : IDL.Nat32,
    'to' : IDL.Principal,
    'fromAmount' : IDL.Nat,
    'owner' : IDL.Principal,
    'from' : IDL.Principal,
    'toAmount' : IDL.Nat,
  });
  const OrderPlacementErr = IDL.Variant({
    'InvalidOrder' : IDL.Null,
    'OrderBookFull' : IDL.Null,
  });
  const Result_2 = IDL.Variant({
    'Ok' : IDL.Opt(Order),
    'Err' : OrderPlacementErr,
  });
  const TOKEN = IDL.Record({
    'principal' : IDL.Principal,
    'name' : IDL.Opt(IDL.Text),
  });
  const SystemParams = IDL.Record({
    'transfer_fee' : IDL.Nat,
    'proposal_vote_threshold' : IDL.Nat,
    'proposal_submission_deposit' : IDL.Nat,
  });
  const Account = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const ProposalState = IDL.Variant({
    'Failed' : IDL.Text,
    'Open' : IDL.Null,
    'Executing' : IDL.Null,
    'Rejected' : IDL.Null,
    'Succeeded' : IDL.Null,
    'Accepted' : IDL.Null,
  });
  const ProposalPayload = IDL.Record({
    'method' : IDL.Text,
    'canister_id' : IDL.Principal,
    'message' : IDL.Vec(IDL.Nat8),
  });
  const Proposal = IDL.Record({
    'id' : IDL.Nat64,
    'votes_no' : IDL.Nat,
    'voters' : IDL.Vec(IDL.Principal),
    'state' : ProposalState,
    'timestamp' : IDL.Nat64,
    'proposer' : IDL.Principal,
    'votes_yes' : IDL.Nat,
    'payload' : ProposalPayload,
  });
  const Dao = IDL.Record({
    'id' : IDL.Nat64,
    'token' : IDL.Opt(TOKEN),
    'system_params' : SystemParams,
    'total_shares' : IDL.Nat,
    'accounts' : IDL.Opt(IDL.Vec(Account)),
    'proposals' : IDL.Opt(IDL.Vec(Proposal)),
  });
  const Class = IDL.Variant({
    'ClassA' : IDL.Null,
    'ClassB' : IDL.Null,
    'ClassC' : IDL.Null,
  });
  const CompanyTokenizationInfo = IDL.Record({
    'class' : Class,
    'valuation' : IDL.Float64,
    'percent_to_tokenize' : IDL.Nat8,
    'price_per_token' : IDL.Float64,
  });
  const CompanyLegalDocuments = IDL.Record({
    'incorporation_cert' : IDL.Text,
    'registration_certificate' : IDL.Text,
    'tax_information' : IDL.Text,
  });
  const Location = IDL.Record({ 'country' : IDL.Text, 'adress' : IDL.Text });
  const Industry = IDL.Variant({
    'HealthTech' : IDL.Null,
    'MusicAndRecordingIndustry' : IDL.Null,
    'Insurance' : IDL.Null,
    'WasteManagement' : IDL.Null,
    'LegalServices' : IDL.Null,
    'RealEstate' : IDL.Null,
    'FinancialServices' : IDL.Null,
    'Retail' : IDL.Null,
    'AerospaceAndDefense' : IDL.Null,
    'Consulting' : IDL.Null,
    'PetCare' : IDL.Null,
    'Biotechnology' : IDL.Null,
    'Nanotechnology' : IDL.Null,
    'TravelAndTourism' : IDL.Null,
    'CleanTechnology' : IDL.Null,
    'ECommerce' : IDL.Null,
    'PersonalFinance' : IDL.Null,
    'Gaming' : IDL.Null,
    'DigitalMarketing' : IDL.Null,
    'TransportationAndLogistics' : IDL.Null,
    'SoftwareAsAService' : IDL.Null,
    'EnergyAndUtilities' : IDL.Null,
    'ArchitectureAndDesign' : IDL.Null,
    'FoodAndBeverage' : IDL.Null,
    'EnvironmentalServices' : IDL.Null,
    'MediaAndEntertainment' : IDL.Null,
    'SportsManagement' : IDL.Null,
    'ConsumerElectronics' : IDL.Null,
    'FashionAndApparel' : IDL.Null,
    'RenewableEnergy' : IDL.Null,
    'MarketResearch' : IDL.Null,
    'ArtificialIntelligenceAndMachineLearning' : IDL.Null,
    'HealthcareAndPharmaceuticals' : IDL.Null,
    'SocialMedia' : IDL.Null,
    'VentureCapitalAndPrivateEquity' : IDL.Null,
    'EventManagement' : IDL.Null,
    'Cybersecurity' : IDL.Null,
    'NonprofitAndPhilanthropy' : IDL.Null,
    'Telecommunications' : IDL.Null,
    'Agriculture' : IDL.Null,
    'MobileAppDevelopment' : IDL.Null,
    'GovernmentServices' : IDL.Null,
    'FitnessAndWellness' : IDL.Null,
    'InformationTechnology' : IDL.Null,
    'HumanResources' : IDL.Null,
    'Education' : IDL.Null,
    'Hospitality' : IDL.Null,
    'Automotive' : IDL.Null,
    'Construction' : IDL.Null,
    'Manufacturing' : IDL.Null,
  });
  const CompanyInformation = IDL.Record({
    'id' : IDL.Nat64,
    'tokenization_info' : CompanyTokenizationInfo,
    'principal' : IDL.Principal,
    'dao_id' : IDL.Opt(IDL.Nat64),
    'legal_info' : CompanyLegalDocuments,
    'company_name' : IDL.Text,
    'company_description' : IDL.Text,
    'date_founded' : IDL.Text,
    'location' : Location,
    'industry' : Industry,
  });
  const Investment = IDL.Record({
    'dao_id' : IDL.Nat64,
    'tokens_owned' : IDL.Nat,
  });
  const Investor = IDL.Record({
    'id' : IDL.Nat64,
    'principal' : IDL.Principal,
    'investments' : IDL.Opt(IDL.Vec(Investment)),
  });
  return IDL.Service({
    'buy_tokens' : IDL.Func([IDL.Nat], [], []),
    'cancelOrder' : IDL.Func([IDL.Nat32], [Result], []),
    'clear' : IDL.Func([], [], ['oneway']),
    'credit' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat],
        [],
        ['oneway'],
      ),
    'deposit' : IDL.Func([IDL.Principal], [Result_1], []),
    'getAllBalances' : IDL.Func([], [IDL.Vec(Balance)], ['query']),
    'getBalance' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'getBalances' : IDL.Func([], [IDL.Vec(Balance)], ['query']),
    'getDepositAddress' : IDL.Func([], [IDL.Vec(IDL.Nat8)], []),
    'getDepositAdress' : IDL.Func([], [IDL.Vec(IDL.Nat8)], []),
    'getOrder' : IDL.Func([IDL.Nat32], [IDL.Opt(Order)], []),
    'getOrders' : IDL.Func([], [IDL.Vec(Order)], []),
    'getSymbol' : IDL.Func([IDL.Principal], [IDL.Text], []),
    'placeOrder' : IDL.Func(
        [IDL.Principal, IDL.Nat, IDL.Principal, IDL.Nat],
        [Result_2],
        [],
      ),
    'save_dao' : IDL.Func([Dao], [], []),
    'signup_company' : IDL.Func([CompanyInformation], [], []),
    'signup_investor' : IDL.Func([Investor], [], []),
    'whoami' : IDL.Func([], [IDL.Principal], ['query']),
    'withdraw' : IDL.Func(
        [IDL.Principal, IDL.Nat, IDL.Principal],
        [Result_1],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return [IDL.Opt(IDL.Principal)]; };
