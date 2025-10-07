// Bienstar Dojo ECS Contract
// This contract implements a donation system using Dojo's Entity-Component-System architecture

// Export models
pub mod models;

// Export systems
pub mod systems;

// Re-export main types for easy access
pub use models::{Player, Tree, DonationLog, Initiative};
pub use systems::donate_system::{IDonateSystem, DonationEvent, PlayerUpdatedEvent, TreeUpdatedEvent};
pub use systems::admin_system::{IAdminSystem, InitiativeRegisteredEvent, InitiativeUpdatedEvent};