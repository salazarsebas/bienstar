use starknet::ContractAddress;

// Player component - tracks donation statistics for each account
#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Player {
    #[key]
    pub account: ContractAddress,
    pub total_donated_wbtc: u256,
    pub donation_count: u32,
    pub last_donation_ts: u64,
}

// Tree component - represents a tree that grows based on donation thresholds
#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Tree {
    #[key]
    pub owner: ContractAddress,
    pub growth_level: u8, // growth_level derived from donation thresholds
}

// DonationLog component - logs individual donations
#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct DonationLog {
    #[key]
    pub player: ContractAddress,
    #[key]
    pub initiative_id: u128,
    pub amount: u256,
    pub ts: u64,
    pub anonymous: bool,
}

// Initiative component - represents donation initiatives/campaigns
#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Initiative {
    #[key]
    pub id: u128,
    pub vesu_pool_addr: ContractAddress,
    pub uri: felt252,
}

#[cfg(test)]
mod tests {
    use super::{Player, Tree, DonationLog, Initiative};
    use starknet::ContractAddress;

    #[test]
    fn test_player_creation() {
        let player = Player {
            account: ContractAddress::default(),
            total_donated_wbtc: 0,
            donation_count: 0,
            last_donation_ts: 0,
        };
        assert(player.account == ContractAddress::default(), 'player not created');
    }

    #[test]
    fn test_tree_creation() {
        let tree = Tree {
            owner: ContractAddress::default(),
            growth_level: 0,
        };
        assert(tree.owner == ContractAddress::default(), 'tree not created');
    }

    #[test]
    fn test_donation_log_creation() {
        let donation_log = DonationLog {
            player: ContractAddress::default(),
            initiative_id: 1,
            amount: 1000000000000000000, // 1 wBTC
            ts: 1234567890,
            anonymous: false,
        };
        assert(donation_log.initiative_id == 1, 'donation log not created');
    }

    #[test]
    fn test_initiative_creation() {
        let initiative = Initiative {
            id: 1,
            vesu_pool_addr: ContractAddress::default(),
            uri: 'https://example.com/initiative',
        };
        assert(initiative.id == 1, 'initiative not created');
    }
}