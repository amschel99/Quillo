import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface CompanyInformation {
  'id' : bigint,
  'multiplier' : MultiplierData,
  'initial_tokens' : [] | [number],
  'shares_public_percent' : number,
  'logo' : Uint8Array | number[],
  'name' : string,
  'registration_number' : string,
  'valuation' : number,
  'earnings' : EarningsData,
  'token_value' : number,
  'token_balance' : [] | [number],
  'industry_sector' : string,
  'legal_address' : string,
}
export interface EarningsData {
  'ebitda' : number,
  'adjustments' : number,
  'consistency' : boolean,
  'net_income' : number,
}
export type Error = { 'NotFound' : { 'msg' : string } };
export interface Investor { 'id' : bigint, 'shares' : [] | [Array<Share>] }
export interface MultiplierData {
  'growth_prospects' : number,
  'comparable_transactions' : number,
  'risk_factors' : number,
  'industry_comparables' : number,
  'market_conditions' : number,
}
export type Result = { 'Ok' : Array<[bigint, CompanyInformation]> } |
  { 'Err' : Error };
export type Result_1 = { 'Ok' : CompanyInformation } |
  { 'Err' : Error };
export interface Share { 'company' : CompanyInformation, 'quantity' : bigint }
export interface _SERVICE {
  'add_company' : ActorMethod<[CompanyInformation], [] | [CompanyInformation]>,
  'add_investor' : ActorMethod<[Investor], [] | [Investor]>,
  'get_companies' : ActorMethod<[], Result>,
  'get_company' : ActorMethod<[bigint], Result_1>,
}
