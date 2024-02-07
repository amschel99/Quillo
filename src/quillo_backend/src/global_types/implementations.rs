use super::Class;

impl Class {
    pub fn value(&self) -> u128 {
        match *self {
            Class::ClassA => 10000000,
            Class::ClassB => 50000000,
            Class::ClassC => 100000000,
        }
    }
}
