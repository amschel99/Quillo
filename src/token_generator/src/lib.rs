extern crate proc_macro;

use proc_macro::TokenStream;
use quote::quote;
use syn::{parse_macro_input, DeriveInput};

#[proc_macro]
pub fn generate_token(input: TokenStream) -> TokenStream {
    // Parse the input tokens into a syntax tree
    let input = parse_macro_input!(input as DeriveInput);
    let struct_name = &input.ident;

    // Generate the code using the `quote` crate
    let expanded = quote! {
        use candid::{CandidType, Deserialize, Nat, Principal};

        pub struct #struct_name {
            principal: Principal,
        }

        #[derive(CandidType, Debug, PartialEq, Deserialize)]
        pub enum TxError {
            InsufficientBalance,
            InsufficientAllowance,
            Unauthorized,
            LedgerTrap,
            AmountTooSmall,
            BlockUsed,
            ErrorOperationStyle,
            ErrorTo,
            Other,
        }
        pub type TxReceipt = Result<Nat, TxError>;

        #[allow(non_snake_case)]
        #[derive(CandidType, Clone, Debug, Deserialize)]
        pub struct Metadata {
            pub logo: String,
            pub name: String,
            pub symbol: String,
            pub decimals: u8,
            pub totalSupply: Nat,
            pub owner: Principal,
            pub fee: Nat,
        }

        impl #struct_name {
            pub fn new(principal: Principal) -> Self {
                #struct_name { principal }
            }

            pub async fn transfer(&self, target: Principal, amount: Nat) -> TxReceipt {
                let call_result: Result<(TxReceipt,), _> =
                    ic_cdk::api::call::call(self.principal, "transfer", (target, amount)).await;

                call_result.unwrap().0
            }

            pub async fn transfer_from(
                &self,
                source: Principal,
                target: Principal,
                amount: Nat,
            ) -> TxReceipt {
                let call_result: Result<(TxReceipt,), _> =
                    ic_cdk::api::call::call(self.principal, "transferFrom", (source, target, amount)).await;

                call_result.unwrap().0
            }

            pub async fn allowance(&self, owner: Principal, spender: Principal) -> Nat {
                let call_result: Result<(Nat,), _> =
                    ic_cdk::api::call::call(self.principal, "allowance", (owner, spender)).await;

                call_result.unwrap().0
            }

            pub async fn get_metadata(&self) -> Metadata {
                let call_result: Result<(Metadata,), _> =
                    ic_cdk::api::call::call(self.principal, "getMetadata", ()).await;

                call_result.unwrap().0
            }
        }
    };

    // Convert the generated code back into tokens and return it
    TokenStream::from(expanded)
}
