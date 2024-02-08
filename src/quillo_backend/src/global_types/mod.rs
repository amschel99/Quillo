use candid::Nat;
use icrc_ledger_types::icrc1::transfer::NumTokens;

#[derive(candid::CandidType, Clone, Serialize, Deserialize)]
pub enum Industry {
    InformationTechnology,
    HealthcareAndPharmaceuticals,
    FinancialServices,
    ECommerce,
    Manufacturing,
    FoodAndBeverage,
    Retail,
    RealEstate,
    Automotive,
    Education,
    EnergyAndUtilities,
    Telecommunications,
    TransportationAndLogistics,
    Construction,
    Agriculture,
    MediaAndEntertainment,
    TravelAndTourism,
    Biotechnology,
    FashionAndApparel,
    AerospaceAndDefense,
    Gaming,
    Insurance,
    LegalServices,
    Consulting,
    ConsumerElectronics,
    RenewableEnergy,
    FitnessAndWellness,
    Hospitality,
    SoftwareAsAService,
    MarketResearch,
    SocialMedia,
    NonprofitAndPhilanthropy,
    EnvironmentalServices,
    MobileAppDevelopment,
    VentureCapitalAndPrivateEquity,
    HumanResources,
    GovernmentServices,
    DigitalMarketing,
    ArchitectureAndDesign,
    CleanTechnology,
    MusicAndRecordingIndustry,
    HealthTech,
    Cybersecurity,
    WasteManagement,
    SportsManagement,
    PetCare,
    PersonalFinance,
    EventManagement,
    Nanotechnology,
    ArtificialIntelligenceAndMachineLearning,
}
#[derive(candid::CandidType, Clone, Serialize, Deserialize)]
pub struct Location {
    country: String,
    adress: String,
}

#[derive(candid::CandidType, Clone, Serialize, Deserialize)]
pub enum Class {
    ClassA,
    ClassB,
    ClassC,
}

impl Class {
    pub fn value(&self) -> u128 {
        match *self {
            Class::ClassA => 10000000,
            Class::ClassB => 50000000,
            Class::ClassC => 100000000,
        }
    }
}
