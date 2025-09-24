use anchor_lang::prelude::*;

// Nom du programme
declare_id!("Fg6PaFpoGXkYsidMpWxqSWYJzQZ1iKhR8p3kYx3hZf1C");

#[program]
pub mod mini_game {
    use super::*;

    // Créer un nouveau personnage
    pub fn create_character(ctx: Context<CreateCharacter>, name: String) -> Result<()> {
        let character = &mut ctx.accounts.character;
        character.name = name;
        character.hp = 100; // Chaque perso commence avec 100 HP
        character.owner = *ctx.accounts.user.key;
        Ok(())
    }

    // Attaquer un personnage
    pub fn attack(ctx: Context<Attack>, damage: u8) -> Result<()> {
        let target = &mut ctx.accounts.target;

        // On réduit les HP du perso attaqué
        if target.hp > damage {
            target.hp -= damage;
        } else {
            target.hp = 0;
        }

        Ok(())
    }
}

#[account]
pub struct Character {
    pub name: String,
    pub hp: u8,
    pub owner: Pubkey,
}

#[derive(Accounts)]
pub struct CreateCharacter<'info> {
    #[account(init, payer = user, space = 8 + 32 + 4 + 100)]
    pub character: Account<'info, Character>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Attack<'info> {
    #[account(mut)]
    pub target: Account<'info, Character>,
}