use crate::Class;

use super::types::Dao;

impl Dao {
    fn add_shares(&mut self, class: Class) {
        self.total_shares = class.value();
    }
}
