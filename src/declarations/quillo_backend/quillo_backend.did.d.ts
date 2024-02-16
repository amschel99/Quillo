import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Account {
  'owner' : Principal,
  'subaccount' : [] | [Uint8Array | number[]],
}
export interface Balance {
  'token' : Principal,
  'owner' : Principal,
  'amount' : bigint,
}
export type CancelOrderErr = { 'NotAllowed' : null } |
  { 'NotExistingOrder' : null };
export type Class = { 'ClassA' : null } |
  { 'ClassB' : null } |
  { 'ClassC' : null };
export interface CompanyInformation {
  'id' : bigint,
  'tokenization_info' : CompanyTokenizationInfo,
  'principal' : Principal,
  'dao_id' : [] | [bigint],
  'legal_info' : CompanyLegalDocuments,
  'company_name' : string,
  'company_description' : string,
  'date_founded' : string,
  'location' : Location,
  'industry' : Industry,
}
export interface CompanyLegalDocuments {
  'incorporation_cert' : string,
  'registration_certificate' : string,
  'tax_information' : string,
}
export interface CompanyTokenizationInfo {
  'class' : Class,
  'valuation' : number,
  'percent_to_tokenize' : number,
  'price_per_token' : number,
}
export interface Dao {
  'id' : bigint,
  'token' : [] | [TOKEN],
  'system_params' : SystemParams,
  'total_shares' : bigint,
  'accounts' : [] | [Array<Account>],
  'proposals' : [] | [Array<Proposal>],
}
export type DepositErr = { 'TransferFailure' : null } |
  { 'BalanceLow' : null };
export type Industry = { 'HealthTech' : null } |
  { 'MusicAndRecordingIndustry' : null } |
  { 'Insurance' : null } |
  { 'WasteManagement' : null } |
  { 'LegalServices' : null } |
  { 'RealEstate' : null } |
  { 'FinancialServices' : null } |
  { 'Retail' : null } |
  { 'AerospaceAndDefense' : null } |
  { 'Consulting' : null } |
  { 'PetCare' : null } |
  { 'Biotechnology' : null } |
  { 'Nanotechnology' : null } |
  { 'TravelAndTourism' : null } |
  { 'CleanTechnology' : null } |
  { 'ECommerce' : null } |
  { 'PersonalFinance' : null } |
  { 'Gaming' : null } |
  { 'DigitalMarketing' : null } |
  { 'TransportationAndLogistics' : null } |
  { 'SoftwareAsAService' : null } |
  { 'EnergyAndUtilities' : null } |
  { 'ArchitectureAndDesign' : null } |
  { 'FoodAndBeverage' : null } |
  { 'EnvironmentalServices' : null } |
  { 'MediaAndEntertainment' : null } |
  { 'SportsManagement' : null } |
  { 'ConsumerElectronics' : null } |
  { 'FashionAndApparel' : null } |
  { 'RenewableEnergy' : null } |
  { 'MarketResearch' : null } |
  { 'ArtificialIntelligenceAndMachineLearning' : null } |
  { 'HealthcareAndPharmaceuticals' : null } |
  { 'SocialMedia' : null } |
  { 'VentureCapitalAndPrivateEquity' : null } |
  { 'EventManagement' : null } |
  { 'Cybersecurity' : null } |
  { 'NonprofitAndPhilanthropy' : null } |
  { 'Telecommunications' : null } |
  { 'Agriculture' : null } |
  { 'MobileAppDevelopment' : null } |
  { 'GovernmentServices' : null } |
  { 'FitnessAndWellness' : null } |
  { 'InformationTechnology' : null } |
  { 'HumanResources' : null } |
  { 'Education' : null } |
  { 'Hospitality' : null } |
  { 'Automotive' : null } |
  { 'Construction' : null } |
  { 'Manufacturing' : null };
export interface Investment { 'dao_id' : bigint, 'tokens_owned' : bigint }
export interface Investor {
  'id' : bigint,
  'principal' : Principal,
  'investments' : [] | [Array<Investment>],
}
export interface Location { 'country' : string, 'adress' : string }
export interface Order {
  'id' : number,
  'to' : Principal,
  'fromAmount' : bigint,
  'owner' : Principal,
  'from' : Principal,
  'toAmount' : bigint,
}
export type OrderPlacementErr = { 'InvalidOrder' : null } |
  { 'OrderBookFull' : null };
export interface Proposal {
  'id' : bigint,
  'votes_no' : bigint,
  'voters' : Array<Principal>,
  'state' : ProposalState,
  'timestamp' : bigint,
  'proposer' : Principal,
  'votes_yes' : bigint,
  'payload' : ProposalPayload,
}
export interface ProposalPayload {
  'method' : string,
  'canister_id' : Principal,
  'message' : Uint8Array | number[],
}
export type ProposalState = { 'Failed' : string } |
  { 'Open' : null } |
  { 'Executing' : null } |
  { 'Rejected' : null } |
  { 'Succeeded' : null } |
  { 'Accepted' : null };
export type Result = { 'Ok' : number } |
  { 'Err' : CancelOrderErr };
export type Result_1 = { 'Ok' : bigint } |
  { 'Err' : DepositErr };
export type Result_2 = { 'Ok' : [] | [Order] } |
  { 'Err' : OrderPlacementErr };
export interface SystemParams {
  'transfer_fee' : bigint,
  'proposal_vote_threshold' : bigint,
  'proposal_submission_deposit' : bigint,
}
export interface TOKEN { 'principal' : Principal, 'name' : [] | [string] }
export interface _SERVICE {
  'buy_tokens' : ActorMethod<[bigint], undefined>,
  'cancelOrder' : ActorMethod<[number], Result>,
  'clear' : ActorMethod<[], undefined>,
  'credit' : ActorMethod<[Principal, Principal, bigint], undefined>,
  'deposit' : ActorMethod<[Principal], Result_1>,
  'getAllBalances' : ActorMethod<[], Array<Balance>>,
  'getBalance' : ActorMethod<[Principal], bigint>,
  'getBalances' : ActorMethod<[], Array<Balance>>,
  'getDepositAddress' : ActorMethod<[], Uint8Array | number[]>,
  'getDepositAdress' : ActorMethod<[], Uint8Array | number[]>,
  'getOrder' : ActorMethod<[number], [] | [Order]>,
  'getOrders' : ActorMethod<[], Array<Order>>,
  'getSymbol' : ActorMethod<[Principal], string>,
  'placeOrder' : ActorMethod<[Principal, bigint, Principal, bigint], Result_2>,
  'save_dao' : ActorMethod<[Dao], undefined>,
  'signup_company' : ActorMethod<[CompanyInformation], undefined>,
  'signup_investor' : ActorMethod<[Investor], undefined>,
  'whoami' : ActorMethod<[], Principal>,
  'withdraw' : ActorMethod<[Principal, bigint, Principal], Result_1>,
}
export declare const idlFactory: IDL.InterfaceFactory;
