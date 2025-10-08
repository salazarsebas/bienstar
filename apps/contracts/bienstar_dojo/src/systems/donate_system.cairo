use bienstar_dojo::models::{Player, Tree, DonationLog, Initiative};

// Events for the donate system
#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct DonationEvent {
    #[key]
    pub donor: starknet::ContractAddress,
    pub initiative_id: u128,
    pub amount: u256,
    pub anonymous: bool,
}

#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct PlayerUpdatedEvent {
    #[key]
    pub account: starknet::ContractAddress,
    pub total_donated_wbtc: u256,
    pub donation_count: u32,
}

#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct TreeUpdatedEvent {
    #[key]
    pub owner: starknet::ContractAddress,
    pub growth_level: u8,
}

// Interface for the donate system
#[starknet::interface]
pub trait IDonateSystem<T> {
    fn donate(ref self: T, initiative_id: u128, amount: u256, anonymous: bool);
}

// Donate system implementation
#[dojo::contract]
pub mod donate_system {
    use dojo::event::EventStorage;
    use dojo::model::ModelStorage;
    use bienstar_dojo::models::{Player, Tree, DonationLog, Initiative};
    use starknet::{ContractAddress, get_caller_address, get_block_timestamp};
    use super::{IDonateSystem, DonationEvent, PlayerUpdatedEvent, TreeUpdatedEvent};

    #[abi(embed_v0)]
    impl DonateSystemImpl of IDonateSystem<ContractState> {
        fn donate(ref self: ContractState, initiative_id: u128, amount: u256, anonymous: bool) {
            let donor = get_caller_address();
            let current_time = get_block_timestamp();
            
            // Validate amount is greater than 0
            assert!(amount > 0, "Amount must be greater than 0");

            // Get the default world
            let mut world = self.world_default();

            // For now, we'll simulate the donation process
            // In a real implementation, you would:
            // 1. Check wBTC allowance
            // 2. Transfer wBTC from donor to this contract
            // 3. Get initiative from registry
            // 4. Deposit to Vesu pool

            // Emit donation event
            world.emit_event(@DonationEvent {
                donor,
                initiative_id,
                amount,
                anonymous,
            });

            // Update or create player component
            let mut player = Player {
                account: donor,
                total_donated_wbtc: 0,
                donation_count: 0,
                last_donation_ts: 0,
            };

            // Try to read existing player data
            let existing_player: Player = world.read_model(donor);
            if existing_player.account == donor {
                player = existing_player;
            }

            // Update player statistics
            player.total_donated_wbtc = player.total_donated_wbtc + amount;
            player.donation_count = player.donation_count + 1;
            player.last_donation_ts = current_time;

            // Write updated player to world
            world.write_model(@player);

            // Emit player updated event
            world.emit_event(@PlayerUpdatedEvent {
                account: donor,
                total_donated_wbtc: player.total_donated_wbtc,
                donation_count: player.donation_count,
            });

            // Update or create tree component
            let mut tree = Tree {
                owner: donor,
                growth_level: 0,
            };

            // Try to read existing tree data
            let existing_tree: Tree = world.read_model(donor);
            if existing_tree.owner == donor {
                tree = existing_tree;
            }

            // Calculate growth level based on donation thresholds
            // Thresholds: 0.1 wBTC = level 1, 0.5 wBTC = level 2, 1 wBTC = level 3
            if player.total_donated_wbtc >= 1000000000000000000 { // 1 wBTC
                tree.growth_level = 3;
            } else if player.total_donated_wbtc >= 500000000000000000 { // 0.5 wBTC
                tree.growth_level = 2;
            } else if player.total_donated_wbtc >= 100000000000000000 { // 0.1 wBTC
                tree.growth_level = 1;
            }

            // Write updated tree to world
            world.write_model(@tree);

            // Emit tree updated event
            world.emit_event(@TreeUpdatedEvent {
                owner: donor,
                growth_level: tree.growth_level,
            });

            // Create donation log entry
            let donation_log = DonationLog {
                player: donor,
                initiative_id,
                amount,
                ts: current_time,
                anonymous,
            };

            // Write donation log to world
            world.write_model(@donation_log);
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        /// Use the default namespace "bienstar_dojo"
        fn world_default(self: @ContractState) -> dojo::world::WorldStorage {
            self.world(@"bienstar_dojo")
        }
    }
}
