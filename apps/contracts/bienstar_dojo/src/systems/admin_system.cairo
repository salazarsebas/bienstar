use bienstar_dojo::models::Initiative;

// Events for the admin system
#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct InitiativeRegisteredEvent {
    #[key]
    pub id: u128,
    pub uri: felt252,
    pub vesu_pool_addr: starknet::ContractAddress,
}

#[derive(Copy, Drop, Serde)]
#[dojo::event]
pub struct InitiativeUpdatedEvent {
    #[key]
    pub id: u128,
    pub uri: felt252,
    pub vesu_pool_addr: starknet::ContractAddress,
}

// Interface for the admin system
#[starknet::interface]
pub trait IAdminSystem<T> {
    fn register_initiative(ref self: T, uri: felt252, vesu_pool: starknet::ContractAddress) -> u128;
    fn update_initiative(ref self: T, id: u128, uri: Option<felt252>, vesu_pool: Option<starknet::ContractAddress>);
    fn get_initiative(self: @T, id: u128) -> Initiative;
}

// Admin system implementation
#[dojo::contract]
pub mod admin_system {
    use dojo::event::EventStorage;
    use dojo::model::ModelStorage;
    use bienstar_dojo::models::Initiative;
    use starknet::{ContractAddress, get_caller_address};
    use starknet::storage::*;
    use super::{IAdminSystem, InitiativeRegisteredEvent, InitiativeUpdatedEvent};

    #[storage]
    pub struct Storage {
        owner: ContractAddress,
        next_initiative_id: u128,
    }

    #[abi(embed_v0)]
    impl AdminSystemImpl of IAdminSystem<ContractState> {
        fn register_initiative(ref self: ContractState, uri: felt252, vesu_pool: ContractAddress) -> u128 {
            let caller = get_caller_address();
            
            // For now, allow anyone to register initiatives
            // TODO: Add proper owner verification later

            // Get the default world
            let mut world = self.world_default();

            // Get next initiative ID
            let initiative_id = self.next_initiative_id.read();
            
            // Create new initiative
            let new_initiative = Initiative {
                id: initiative_id,
                vesu_pool_addr: vesu_pool,
                uri,
            };

            // Store the initiative in the world
            world.write_model(@new_initiative);

            // Increment next initiative ID
            self.next_initiative_id.write(initiative_id + 1);

            // Emit event
            world.emit_event(@InitiativeRegisteredEvent {
                id: initiative_id,
                uri,
                vesu_pool_addr: vesu_pool,
            });

            initiative_id
        }

        fn update_initiative(ref self: ContractState, id: u128, uri: Option<felt252>, vesu_pool: Option<ContractAddress>) {
            let caller = get_caller_address();
            
            // For now, allow anyone to update initiatives
            // TODO: Add proper owner verification later

            // Get the default world
            let mut world = self.world_default();

            // Get existing initiative
            let mut initiative: Initiative = world.read_model(id);
            assert!(initiative.id != 0, "Initiative does not exist");

            // Update fields if provided
            match uri {
                Option::Some(new_uri) => {
                    initiative.uri = new_uri;
                },
                Option::None => {}
            }

            match vesu_pool {
                Option::Some(new_vesu_pool) => {
                    initiative.vesu_pool_addr = new_vesu_pool;
                },
                Option::None => {}
            }

            // Store updated initiative
            world.write_model(@initiative);

            // Emit event
            world.emit_event(@InitiativeUpdatedEvent {
                id,
                uri: initiative.uri,
                vesu_pool_addr: initiative.vesu_pool_addr,
            });
        }

        fn get_initiative(self: @ContractState, id: u128) -> Initiative {
            let world = self.world_default();
            let initiative: Initiative = world.read_model(id);
            assert!(initiative.id != 0, "Initiative does not exist");
            initiative
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
